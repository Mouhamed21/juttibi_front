import { Component, OnInit } from '@angular/core';
import {FonctionService} from "../../service/Fonction/fonction.service";
import {Fonction} from "../../modele/Fonction";
import {ConfirmationService, MessageService} from "primeng/api";

@Component({
  selector: 'app-fonction',
  templateUrl: './fonction.component.html',
  styleUrls: ['./fonction.component.scss'],
  providers: [FonctionService,MessageService,ConfirmationService]
})
export class FonctionComponent implements OnInit {
    fonction:Fonction;
    fonctions:any;
    submitted: boolean;
    fonctionDialog: boolean;
    fonctionEditDialog: boolean;
    loading:boolean;
    tableau:boolean;

  constructor(private fonctionService: FonctionService,private messageService: MessageService,
              private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
      this.getAllFonction();
  }

    public getAllFonction(){
        console.log('On Init ...');
        this.loading=true;
        this.tableau=true;

        return this.fonctionService.getAllFonction().subscribe((data) =>
        {

            // console.log(JSON.parse(JSON.stringify(data))._embedded.statuts);
            this.fonctions = data;
            if (this.fonctions.length==0){
                this.tableau=false;
            }
            this.loading=false;
            console.log(data)
        })
    }
    editFonction(fonction: Fonction) {
        this.fonction = {...fonction};
        this.fonctionEditDialog = true;
    }
    public postFonction() {

        this.submitted = true;
        //debugger
        if (this.fonction.libelle.trim()) {
            if (this.fonction.id) {
                this.fonctionService.updateFonction(this.fonction.id,this.fonction).subscribe(
                    data => {
                        console.log(data);
                        this.fonctionEditDialog = false;
                        this.fonction = {};
                        this.getAllFonction();

                        this.messageService.add({severity:'success', summary: 'Réussi', detail: 'Mise à jour Fonction', life: 6000});

                    },
                    error => {
                        console.log(error);
                        this.messageService.add({severity:'error', summary: 'Echec', detail: 'Mise à jour Fonction', life: 6000});
                    }
                );
            }
            else {
                //debugger
                this.fonctionService.postFonction(this.fonction).subscribe( data =>
                    {
                        console.log(this.fonction);
                        this.fonctionDialog = false;
                        this.getAllFonction();
                        this.messageService.add({severity:'success', summary: 'Réussi', detail: 'Ajout Fonction', life: 6000});
                    },
                    error => {
                        console.log(error);
                        this.messageService.add({severity:'error', summary: 'Echec', detail: 'Ajout Fonction', life: 6000});
                    }
                );
            }

            this.fonctions = [...this.fonctions];
            this.fonctionDialog = false;
            this.fonctionEditDialog = false;
            this.fonction = {};
        }

    }

    openNew(){
        this.fonction = {};
        this.submitted = false;
        this.fonctionDialog = true;
    }
    hideDialog() {
        this.fonctionDialog = false;
        this.submitted = false;
        this.fonctionEditDialog = false;
        //this.editClasseDialog = false;
    }
    first = 0;

    rows = 10;
    next() {
        this.first = this.first + this.rows;
    }

    prev() {
        this.first = this.first - this.rows;
    }

    reset() {
        this.first = 0;
    }

    isLastPage(): boolean {
        return this.fonctions ? this.first === (this.fonctions.length - this.rows): true;
    }

    isFirstPage(): boolean {
        return this.fonctions ? this.first === 0 : true;
    }

}

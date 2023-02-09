import { Component, OnInit } from '@angular/core';
import {ConfirmationService, MessageService} from "primeng/api";
import {ModepaiementService} from "../../service/Modepaiement/modepaiement.service";
import {Modepaiement} from "../../modele/Modepaiement";

@Component({
  selector: 'app-modepaiement',
  templateUrl: './modepaiement.component.html',
  styleUrls: ['./modepaiement.component.scss'],
  providers: [ModepaiementService,MessageService,ConfirmationService]
})
export class ModepaiementComponent implements OnInit {

    modepaiement:Modepaiement;
    modepaiements:any;
    submitted: boolean;
    modepaiementDialog: boolean;
    modepaiementEditDialog: boolean;
    loading:boolean;
    tableau:boolean;

    constructor(private modepaiementService: ModepaiementService,private messageService: MessageService,
                private confirmationService: ConfirmationService) { }

    ngOnInit(): void {
        this.getAllModepaiement();
    }

    public getAllModepaiement(){
        console.log('On Init ...');
        this.loading=true;
        this.tableau=true;

        return this.modepaiementService.getAllModepaiement().subscribe((data) =>
        {

            // console.log(JSON.parse(JSON.stringify(data))._embedded.statuts);
            this.modepaiements = data;
            if (this.modepaiements.length==0){
                this.tableau=false;
            }
            this.loading=false;
            console.log(data)
        })
    }
    editmodepaiement(modepaiement: Modepaiement) {
        this.modepaiement = {...modepaiement};
        this.modepaiementEditDialog = true;
    }
    public postModepaiement() {

        this.submitted = true;
        //debugger
        if (this.modepaiement.libelle.trim()) {
            if (this.modepaiement.id) {
                this.modepaiementService.updateModepaiement(this.modepaiement.id,this.modepaiement).subscribe(
                    data => {
                        console.log(data);
                        this.modepaiementEditDialog = false;
                        this.modepaiement = {};
                        this.getAllModepaiement();

                        this.messageService.add({severity:'success', summary: 'Réussi', detail: 'Mise à jour mode paiement', life: 6000});

                    },
                    error => {
                        console.log(error);
                        this.messageService.add({severity:'error', summary: 'Echec', detail: 'Mise à jour mode paiement', life: 6000});
                    }
                );
            }
            else {
                //debugger
                this.modepaiementService.postModepaiement(this.modepaiement).subscribe( data =>
                    {
                        console.log(this.modepaiement);
                        this.modepaiementDialog = false;
                        this.getAllModepaiement();
                        this.messageService.add({severity:'success', summary: 'Réussi', detail: 'Ajout mode paiement', life: 6000});
                    },
                    error => {
                        console.log(error);
                        this.messageService.add({severity:'error', summary: 'Echec', detail: 'Ajout mode paiement', life: 6000});
                    }
                );
            }

            this.modepaiements = [...this.modepaiements];
            this.modepaiementDialog = false;
            this.modepaiementEditDialog = false;
            this.modepaiement = {};
        }

    }

    openNew(){
        this.modepaiement = {};
        this.submitted = false;
        this.modepaiementDialog = true;
    }
    hideDialog() {
        this.modepaiementDialog = false;
        this.submitted = false;
        this.modepaiementEditDialog = false;
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
        return this.modepaiements ? this.first === (this.modepaiements.length - this.rows): true;
    }

    isFirstPage(): boolean {
        return this.modepaiements ? this.first === 0 : true;
    }


}

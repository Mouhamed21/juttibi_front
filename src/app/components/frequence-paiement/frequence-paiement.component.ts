import { Component, OnInit } from '@angular/core';
import {ConfirmationService, MessageService} from "primeng/api";
import {FrequencePaiement} from "../../modele/FrequencePaiement";
import {FrequencePaiementService} from "../../service/FrequencePaiement/frequence-paiement.service";
import {CategorieMarchandService} from "../../service/CategorieMarchand/categorie-marchand.service";

@Component({
  selector: 'app-frequence-paiement',
  templateUrl: './frequence-paiement.component.html',
  styleUrls: ['./frequence-paiement.component.scss'],
  providers: [FrequencePaiementService,MessageService,ConfirmationService]
})
export class FrequencePaiementComponent implements OnInit {

    frequencePaiement:FrequencePaiement;
    frequencePaiements:any;
    submitted: boolean;
    frequencePaiementDialog: boolean;
    frequencePaiementEditDialog: boolean;
    loading:boolean;
    tableau:boolean;

    constructor(private frequencePaiementService: FrequencePaiementService,private messageService: MessageService,
                private confirmationService: ConfirmationService) { }

    ngOnInit(): void {
        this.getAllFrequencePaiement();
    }

    public getAllFrequencePaiement(){
        console.log('On Init ...');
        this.loading=true;
        this.tableau=true;

        return this.frequencePaiementService.getAllFrequencePaiement().subscribe((data) =>
        {

            // console.log(JSON.parse(JSON.stringify(data))._embedded.statuts);
            this.frequencePaiements = data;
            if (this.frequencePaiements.length==0){
                this.tableau=false;
            }
            this.loading=false;
            console.log(data)
        })
    }
    editFrequencePaiement(frequencePaiement: FrequencePaiement) {
        this.frequencePaiement = {...frequencePaiement};
        this.frequencePaiementEditDialog = true;
    }
    public postFrequencePaiement() {

        this.submitted = true;
        //debugger
        if (this.frequencePaiement.libelle.trim() && this.frequencePaiement.chiffre.toString().trim() ) {
            if (this.frequencePaiement.id) {
                this.frequencePaiementService.updateFrequencePaiement(this.frequencePaiement.id,this.frequencePaiement).subscribe(
                    data => {
                        console.log(data);
                        this.frequencePaiementEditDialog = false;
                        this.frequencePaiement = {};
                        this.getAllFrequencePaiement();
                        this.messageService.add({severity:'success', summary: 'Réussi', detail: 'Mise à jour Frequence Paiement', life: 6000});
                    },
                    error => {
                        console.log(error);
                        this.messageService.add({severity:'error', summary: 'Echec', detail: 'Mise à jour Frequence Paiement', life: 6000});
                    }
                );
            }
            else {
                //debugger
                this.frequencePaiementService.postFrequencePaiement(this.frequencePaiement).subscribe( data =>
                    {
                        console.log(this.frequencePaiement);
                        this.frequencePaiementDialog = false;
                        this.getAllFrequencePaiement();
                        this.messageService.add({severity:'success', summary: 'Réussi', detail: 'Ajout Frequence Paiement', life: 6000});
                    },
                    error => {
                        console.log(error);
                        this.messageService.add({severity:'error', summary: 'Echec', detail: 'Ajout Frequence Paiement', life: 6000});
                    }
                );
            }

            this.frequencePaiements = [...this.frequencePaiements];
            this.frequencePaiementDialog = false;
            this.frequencePaiementEditDialog = false;
            this.frequencePaiement = {};
        }

    }

    openNew(){
        this.frequencePaiement = {};
        this.submitted = false;
        this.frequencePaiementDialog = true;
    }
    hideDialog() {
        this.frequencePaiementDialog = false;
        this.submitted = false;
        this.frequencePaiementEditDialog = false;
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
        return this.frequencePaiements ? this.first === (this.frequencePaiements.length - this.rows): true;
    }

    isFirstPage(): boolean {
        return this.frequencePaiements ? this.first === 0 : true;
    }

}

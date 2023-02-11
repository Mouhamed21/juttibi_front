import { Component, OnInit } from '@angular/core';
import {Marchand} from "../../modele/Marchand";
import {ConfirmationService, MessageService} from "primeng/api";
import {MarchandService} from "../../service/Marchand/marchand.service";
import {CategorieMarchand} from "../../modele/CategorieMarchand";
import {CategorieMarchandService} from "../../service/CategorieMarchand/categorie-marchand.service";
import {ZoneService} from "../../service/zone/zone.service";
import {FrequencePaiement} from "../../modele/FrequencePaiement";
import {FrequencePaiementService} from "../../service/FrequencePaiement/frequence-paiement.service";
import {Zone} from "../../modele/Zone";

@Component({
  selector: 'app-marchand',
  templateUrl: './marchand.component.html',
  styleUrls: ['./marchand.component.scss'],
  providers: [MarchandService,CategorieMarchandService,MessageService,ConfirmationService]
})
export class MarchandComponent implements OnInit {

    marchand:Marchand;
    marchands:any;
    submitted: boolean;
    marchandDialog: boolean;
    marchandEditDialog: boolean;
    loading:boolean;
    tableau:boolean;

    zones:any;
    zone:Zone;
    filteredZones: Zone[];

    categorieMarchands:any;
    categorieMarchand:CategorieMarchand;
    filteredCategorieMarchands: CategorieMarchand[];

    frequencePaiements:any;
    frequencePaiment:FrequencePaiement;
    filteredFrequencePaiements: FrequencePaiement[];

    constructor(private marchandService: MarchandService,private zoneService: ZoneService, private categorieMarchandService:CategorieMarchandService,private messageService: MessageService,
                private confirmationService: ConfirmationService,private frequencePaiementService: FrequencePaiementService) { }

    ngOnInit(): void {
        this.getAllmarchand();
        this.getAllCategorieMarchand();
        this.getAllZone();
        this.getAllFrequencePaiement()
    }

    getAllZone(){
        return this.zoneService.getAllZone().subscribe(data =>
        {
            this.zones=data;
            console.log(this.zones)
        })
    }
    filterZone(event) {
        const filter: Zone[] = [];
        const query = event.query;
        for (let i = 0; i < this.zones.length; i++) {
            let zone = this.zones[i];
            if (zone.libelle.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filter.push(zone);
            }
        }
        this.filteredZones = filter;
    }


    getAllFrequencePaiement(){
        return this.frequencePaiementService.getAllFrequencePaiement().subscribe(data =>
        {
            this.frequencePaiements=data;
            console.log(this.frequencePaiements)
        })
    }

    filterFrequencePaiement(event) {
        const filter: FrequencePaiement[] = [];
        const query = event.query;
        for (let i = 0; i < this.frequencePaiements.length; i++) {
            let frequencePaiement = this.frequencePaiements[i];
            if (frequencePaiement.libelle.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filter.push(frequencePaiement);
            }
        }
        this.filteredFrequencePaiements = filter;
    }
    getAllCategorieMarchand(){
        return this.categorieMarchandService.getAllCategorieMarchand().subscribe(data =>
        {
            this.categorieMarchands=data;
            console.log(this.categorieMarchands)
        })
    }
    filterCategorieMarchand(event) {
        const filter: CategorieMarchand[] = [];
        const query = event.query;
        for (let i = 0; i < this.categorieMarchands.length; i++) {
            let categorieMarchand = this.categorieMarchands[i];
            if (categorieMarchand.libelle.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filter.push(categorieMarchand);
            }
        }
        this.filteredCategorieMarchands = filter;
    }

/*    filterFrequencePaiement(event) {
        const filter: [] = [];
        const query = event.query;
        for (let i = 0; i < this.categorieMarchands.length; i++) {
            let categorieMarchand = this.categorieMarchands[i];
            if (categorieMarchand.libelle.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filter.push(categorieMarchand);
            }
        }
        this.filteredCategorieMarchands = filter;
    }*/


    public getAllmarchand(){
        console.log('On Init ...');
        this.loading=true;
        this.tableau=true;

        return this.marchandService.getAllMarchand().subscribe((data) =>
        {

            // console.log(JSON.parse(JSON.stringify(data))._embedded.statuts);
            this.marchands = data;
            if (this.marchands.length==0){
                this.tableau=false;
            }
            this.loading=false;
            console.log(data)
        })
    }
    editmarchand(marchand: Marchand) {
        this.marchand = {...marchand};
        this.marchandEditDialog = true;
    }
    public postmarchand() {

        this.submitted = true;
        //debugger
        if (this.marchand.nom.trim() && this.marchand.prenom.trim() && this.marchand.code.trim() && this.marchand.telephone.trim() && this.categorieMarchand.toString().trim()
            && this.frequencePaiment.toString().trim() && this.zone.toString().trim()) {
            if (this.marchand.id) {
                this.marchandService.updateMarchand(this.marchand.id,this.marchand).subscribe(
                    data => {
                        console.log(data);
                        this.marchandEditDialog = false;
                        this.marchand = {};
                        this.getAllmarchand();
                        this.messageService.add({severity:'success', summary: 'Réussi', detail: 'Mise à jour Marchand', life: 6000});
                    },
                    error => {
                        console.log(error);
                        this.messageService.add({severity:'error', summary: 'Echec', detail: 'Mise à jour Marchand', life: 6000});
                    }
                );
            }
            else {
                //debugger
                console.log(this.zone);
                this.marchand.zone=this.zone;
                this.marchand.categorieMarchand=this.categorieMarchand;
                this.marchand.frequencePaiement = this.frequencePaiment;
                //debugger
                this.marchandService.postMarchand(this.marchand).subscribe( data =>
                    {
                        console.log(this.marchand);
                        this.marchandDialog = false;
                        console.log('reusssssssssi');
                        this.getAllmarchand();
                        this.messageService.add({severity:'success', summary: 'Réussi', detail: 'Ajout Marchand', life: 6000});
                    },
                    error => {
                        console.log(error);
                        console.log('test');
                        this.messageService.add({severity:'error', summary: 'Echec', detail: 'Ajout Marchand', life: 6000});
                    }
                );
            }

            this.marchands = [...this.marchands];
            this.marchandDialog = false;
            this.marchandEditDialog = false;
            this.marchand = {};
        }

    }

    openNew(){
        this.marchand = {};
        this.submitted = false;
        this.marchandDialog = true;
    }
    hideDialog() {
        this.marchandDialog = false;
        this.submitted = false;
        this.marchandEditDialog = false;
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
        return this.marchands ? this.first === (this.marchands.length - this.rows): true;
    }

    isFirstPage(): boolean {
        return this.marchands ? this.first === 0 : true;
    }

}

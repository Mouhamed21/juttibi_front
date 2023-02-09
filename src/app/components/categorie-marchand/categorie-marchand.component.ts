import { Component, OnInit } from '@angular/core';
import {Fonction} from "../../modele/Fonction";
import {CategorieMarchand} from "../../modele/CategorieMarchand";
import {FonctionService} from "../../service/Fonction/fonction.service";
import {ConfirmationService, MessageService} from "primeng/api";
import {CategorieMarchandService} from "../../service/CategorieMarchand/categorie-marchand.service";

@Component({
  selector: 'app-categorie-marchand',
  templateUrl: './categorie-marchand.component.html',
  styleUrls: ['./categorie-marchand.component.scss'],
  providers: [CategorieMarchandService,MessageService,ConfirmationService]
})
export class CategorieMarchandComponent implements OnInit {
    categorieMarchand:CategorieMarchand;
    categorieMarchands:any;
    submitted: boolean;
    categorieMarchandDialog: boolean;
    categorieMarchandEditDialog: boolean;
    loading:boolean;
    tableau:boolean;

    constructor(private categorieMarchandService: CategorieMarchandService,private messageService: MessageService,
                private confirmationService: ConfirmationService) { }

    ngOnInit(): void {
        this.getAllCategorieMarchand();
    }

    public getAllCategorieMarchand(){
        console.log('On Init ...');
        this.loading=true;
        this.tableau=true;

        return this.categorieMarchandService.getAllCategorieMarchand().subscribe((data) =>
        {

            // console.log(JSON.parse(JSON.stringify(data))._embedded.statuts);
            this.categorieMarchands = data;
            if (this.categorieMarchands.length==0){
                this.tableau=false;
            }
            this.loading=false;
            console.log(data)
        })
    }
    editCategorieMarchand(categorieMarchand: CategorieMarchand) {
        this.categorieMarchand = {...categorieMarchand};
        this.categorieMarchandEditDialog = true;
    }
    public postCategorieMarchand() {

        this.submitted = true;
        //debugger
        if (this.categorieMarchand.libelle.trim() && this.categorieMarchand.montant.toString().trim() ) {
            if (this.categorieMarchand.id) {
                this.categorieMarchandService.updateCategorieMarchand(this.categorieMarchand.id,this.categorieMarchand).subscribe(
                    data => {
                        console.log(data);
                        this.categorieMarchandEditDialog = false;
                        this.categorieMarchand = {};
                        this.getAllCategorieMarchand();
                        this.messageService.add({severity:'success', summary: 'Réussi', detail: 'Mise à jour Categorie Marchand', life: 6000});
                    },
                    error => {
                        console.log(error);
                        this.messageService.add({severity:'error', summary: 'Echec', detail: 'Mise à jour Categorie Marchand', life: 6000});
                    }
                );
            }
            else {
                //debugger
                this.categorieMarchandService.postCategorieMarchand(this.categorieMarchand).subscribe( data =>
                    {
                        console.log(this.categorieMarchand);
                        this.categorieMarchandDialog = false;
                        this.getAllCategorieMarchand();
                        this.messageService.add({severity:'success', summary: 'Réussi', detail: 'Ajout Categorie Marchand', life: 6000});
                    },
                    error => {
                        console.log(error);
                        this.messageService.add({severity:'error', summary: 'Echec', detail: 'Ajout Categorie Marchand', life: 6000});
                    }
                );
            }

            this.categorieMarchands = [...this.categorieMarchands];
            this.categorieMarchandDialog = false;
            this.categorieMarchandEditDialog = false;
            this.categorieMarchand = {};
        }

    }

    openNew(){
        this.categorieMarchand = {};
        this.submitted = false;
        this.categorieMarchandDialog = true;
    }
    hideDialog() {
        this.categorieMarchandDialog = false;
        this.submitted = false;
        this.categorieMarchandEditDialog = false;
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
        return this.categorieMarchands ? this.first === (this.categorieMarchands.length - this.rows): true;
    }

    isFirstPage(): boolean {
        return this.categorieMarchands ? this.first === 0 : true;
    }

}

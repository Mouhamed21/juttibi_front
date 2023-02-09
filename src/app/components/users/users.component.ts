import { Component, OnInit } from '@angular/core';
import {ConfirmationService, MessageService} from "primeng/api";
import {UserService} from "../../service/users/user.service";


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
    providers: [MessageService,ConfirmationService]
})
export class UsersComponent implements OnInit {
    tableau: boolean;
    loading:boolean;
    public users: any;
    public user: any;
    public submitted: boolean;
    public userDialog: boolean;
    public userEditDialog: boolean;

  constructor(private userService:UserService, private messageService: MessageService) { }

  ngOnInit(): void {
      this.getAllUsers();
  }

    public getAllUsers(){
        console.log('On Init ...');
        this.loading=true;
        this.tableau=true;

        return this.userService.getAllUsers().subscribe((data) =>
        {
            this.users = data;
            if (this.users.length==0){
                this.tableau=false;
            }
            this.loading=false;
            console.log(data)
        })
    }

    public postUser() {
        this.submitted = true;
        //debugger
        if (this.user.libelle.trim()) {
            if (this.user.id) {
                this.userService.updateUser(this.user.id,this.user).subscribe(
                    data => {
                        console.log(data);
                        this.userEditDialog = false;
                        this.user = {};
                        //this.getSatuts();

                        this.messageService.add({severity:'success', summary: 'Réussi', detail: 'Mise à jour User', life: 6000});

                    },
                    error => {
                        console.log(error);
                        this.messageService.add({severity:'error', summary: 'Echec', detail: 'Mise à jour User', life: 6000});
                    }
                );
            }
            else {
                //debugger
                this.userService.saveUser(this.user).subscribe( data =>
                    {
                        console.log(this.user);
                        this.userDialog = false;
                        //this.getSatuts();
                        this.messageService.add({severity:'success', summary: 'Réussi', detail: 'Ajout Statut', life: 6000});
                    },
                    error => {
                        console.log(error);
                        this.messageService.add({severity:'error', summary: 'Echec', detail: 'Ajout Statut', life: 6000});
                    }
                );
            }

            this.users = [...this.users];
            this.userDialog = false;
            this.userEditDialog = false;
            this.user = {};
        }
    }

    openNew(){
        this.user = {};
        this.submitted = false;
        this.userDialog = true;
    }
    editUser(user: any) {
        this.user = {...user};
        this.userEditDialog = true;
    }
    hideDialog() {
        this.userDialog = false;
        this.submitted = false;
        this.userEditDialog = false;
        //this.editClasseDialog = false;
    }

}

import { Component, OnDestroy } from '@angular/core';
import { AppMainComponent } from './app.main.component';
import { Subscription } from 'rxjs';
import { MenuItem } from 'primeng/api';
import { KeycloakService } from 'keycloak-angular';
import { environment } from 'src/environments/environment';
import { UserService } from './service/user.service';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent {

    items: MenuItem[];
    user

    constructor(public appMain: AppMainComponent,private userService: UserService,
        public keycloak: KeycloakService) { 
            this.keycloak.loadUserProfile().then( res => {
                console.log(res);
                this.user = res;
                this.getUserByUsername(res.username );
            })
        }

    public getUserByUsername(username){
        console.log(username);
        return this.userService.getUserByUsername(username).subscribe(data => {
            console.log(data);
            this.user = data;
        })
    }

    public deconnexion() {
        return this.keycloak.logout();
    }
}

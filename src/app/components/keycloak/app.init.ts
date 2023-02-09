
import { state } from '@angular/animations';
import { RouterStateSnapshot } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { environment } from 'src/environments/environment';


export  function  initializeKeycloak(keycloak: KeycloakService,state: RouterStateSnapshot): () => Promise<any> {

    return () =>
        keycloak.init({
            config: {
                url: 'http://10.14.14.232:8180/auth/',
                // realm:"Digital-Poste",
                realm:"Digital_post",
                clientId:"jfront",
            },
            initOptions : {
                onLoad:"login-required"
            }

        })
}

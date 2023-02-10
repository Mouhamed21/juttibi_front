import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Modepaiement} from "../../modele/Modepaiement";



@Injectable({
  providedIn: 'root'
})
export class ModepaiementService {
    baseUrl = environment.urlApi;
    constructor(private httpClient: HttpClient) { }

    getAllModepaiement() {
        return this.httpClient.get(this.baseUrl + '/ModePaiement');
    }

    postModepaiement(modepaiement:Modepaiement) {
        return this.httpClient.post(this.baseUrl + '/ModePaiement',  modepaiement)
    }

    updateModepaiement(id: number,modepaiement:Modepaiement) {
        return this.httpClient.put(this.baseUrl + '/ModePaiement/' + id,  modepaiement)
    }
}

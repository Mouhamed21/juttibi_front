import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Fonction} from "../../modele/Fonction";

@Injectable({
  providedIn: 'root'
})
export class FonctionService {
    baseUrl = environment.urlApi;
  constructor(private httpClient: HttpClient) { }

    getAllFonction() {
        return this.httpClient.get(this.baseUrl + '/Fonction');
    }

    postFonction(fonction:Fonction) {
        return this.httpClient.post(this.baseUrl + '/Fonction',  fonction)
    }
    updateFonction(id: number,fonction:Fonction) {
        return this.httpClient.put(this.baseUrl + '/Fonction/' + id,  fonction)
    }
}

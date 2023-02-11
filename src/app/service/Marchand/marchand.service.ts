import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Marchand} from "../../modele/Marchand";


@Injectable({
  providedIn: 'root'
})
export class MarchandService {

    baseUrl = environment.urlApi;
    constructor(private httpClient: HttpClient) { }

    getAllMarchand() {
        return this.httpClient.get(this.baseUrl + '/Marchand');
    }

    postMarchand(marchand:Marchand) {
        return this.httpClient.post(this.baseUrl + '/Marchand',  marchand)
    }
    updateMarchand(id: number,marchand:Marchand) {
        return this.httpClient.put(this.baseUrl + '/Marchand/' + id,  marchand)
    }
}

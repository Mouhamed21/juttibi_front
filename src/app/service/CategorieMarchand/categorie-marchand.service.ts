import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {CategorieMarchand} from "../../modele/CategorieMarchand";

@Injectable({
  providedIn: 'root'
})
export class CategorieMarchandService {

    baseUrl = environment.urlApi;
    constructor(private httpClient: HttpClient) { }

    getAllCategorieMarchand() {
        return this.httpClient.get(this.baseUrl + '/CategorieMarchand');
    }

    postCategorieMarchand(categorieMarchand:CategorieMarchand) {
        return this.httpClient.post(this.baseUrl + '/CategorieMarchand',  categorieMarchand)
    }
    updateCategorieMarchand(id: number,categorieMarchand:CategorieMarchand) {
        return this.httpClient.put(this.baseUrl + '/CategorieMarchand/' + id,  categorieMarchand)
    }
}

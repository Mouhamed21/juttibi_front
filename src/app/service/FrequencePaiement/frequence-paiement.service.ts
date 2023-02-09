import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {FrequencePaiement} from "../../modele/FrequencePaiement";

@Injectable({
  providedIn: 'root'
})
export class FrequencePaiementService {

   baseUrl = environment.urlApi;
    constructor(private httpClient: HttpClient) { }

    getAllFrequencePaiement() {
        return this.httpClient.get(this.baseUrl + '/FrequencePaiement');
    }

    postFrequencePaiement(frequencePaiement:FrequencePaiement) {
        return this.httpClient.post(this.baseUrl + '/FrequencePaiement',  frequencePaiement)
    }
    updateFrequencePaiement(id: number,frequencePaiement:FrequencePaiement) {
        return this.httpClient.put(this.baseUrl + '/FrequencePaiement/' + id,  frequencePaiement)
    }
}

import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {

    baseUrl = environment.urlApi;

  constructor(private httpClient: HttpClient) { }

    getAllUsers() {
        return this.httpClient.get(this.baseUrl + '/user');
    }

    updateUser(id:number, user:any) {
        return this.httpClient.put(this.baseUrl + '/user/'+id, user);
    }

    saveUser(user:any) {
        return this.httpClient.post(this.baseUrl + '/user',user);
    }
}

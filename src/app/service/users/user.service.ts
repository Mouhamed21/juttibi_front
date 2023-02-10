import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

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
        return this.httpClient.put(this.baseUrl + '/user/update/'+id, user);
    }

    saveUser(user:any) {
        return this.httpClient.post(this.baseUrl + '/user',user);
    }

    getUserByUsername(userName):Observable<any> {
        console.log(userName);
        return this.httpClient.get(this.baseUrl + "/user/username/"  + userName);
    }

    getUserById(id:number):Observable<any> {
        return this.httpClient.get(this.baseUrl + '/user/' + id);
    }

    addUser(user){
        return this.httpClient.post(this.baseUrl + '/user',user )
    }

    deleteUser(id){
        return this.httpClient.delete(this.baseUrl + '/user',id )
    }
}

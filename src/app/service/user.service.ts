import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = environment.urlApi;
  constructor(private httpClient: HttpClient) { }

  getUserByUsername(email):Observable<any> {
    console.log(this.baseUrl);
    
    console.log(this.httpClient.get(this.baseUrl + '/user/email/' + email));
    
    return this.httpClient.get(this.baseUrl + '/user/email/' + email);
}

getUserById(id:number):Observable<any> {
    return this.httpClient.get(this.baseUrl + '/user/' + id);
}
}

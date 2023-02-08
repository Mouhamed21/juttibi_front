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

  getUserByUsername(userName):Observable<any> {
    console.log(this.baseUrl);    
    return this.httpClient.get(this.baseUrl + "/api/user"  + userName);
}

getUserById(id:number):Observable<any> {
    return this.httpClient.get(this.baseUrl + '/user/' + id);
}

addUser(user){
  return this.httpClient.post(this.baseUrl + '/user',user )
}

updateUser(user){
  // return this.httpClient.post(this.baseUrl + '/user',user )

}
deleteUser(id){
  return this.httpClient.delete(this.baseUrl + '/user',id )
}
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Zone } from 'src/app/modele/zone';


@Injectable({
  providedIn: 'root'
})
export class ZoneService {

  baseUrl = environment.urlApi;
  constructor(private httpClient: HttpClient) { }

  getAllZone():Observable<any> {
    return this.httpClient.get(this.baseUrl + '/zone');
}

postZone(zone:Zone):Observable<any> {
    return this.httpClient.post(this.baseUrl + '/zone',  zone)
}
updateZone(id: number,zone:Zone):Observable<any> {
    return this.httpClient.put(this.baseUrl + '/zone/' + id,  zone)
}

deleteZone(id: number):Observable<any>{
  return this.httpClient.delete(this.baseUrl + '/zone'+ id)
}

getZoneById(id: number):Observable<any>{
  return this.httpClient.get(this.baseUrl + '/zone'+ id)

}

}

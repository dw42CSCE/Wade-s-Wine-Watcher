import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Wine } from '../models/wine.model';
import { Observable } from 'rxjs';
import { UserService } from './userservice';

@Injectable({
  providedIn: 'root'
})
export class WineService {

  private readonly isLocalhost = window.location.hostname === 'localhost';

  private readonly apiUrl = this.isLocalhost
  ? 'http://localhost:5094/api/wines'
  : 'https://wwwapi-fkdkdbhjeefbg8be.centralus-01.azurewebsites.net/api/wines';

  constructor(private http: HttpClient, private userServ: UserService) {}

  getWines(): Observable<Wine[]> {
    console.log("Got wines")
    return this.http.get<Wine[]>(this.apiUrl, {headers: new HttpHeaders ({'Authorization': 'Bearer ' + this.userServ.getToken()})});
  }
}

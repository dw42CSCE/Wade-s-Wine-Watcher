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
    return this.http.get<Wine[]>(this.apiUrl, {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.userServ.getToken()
      })
    });
  }

  

  newWine(wine: Wine): Observable<Wine> {
    console.log("Added Wine");

    const wine1 = {
      Name: wine.name,
      Description: wine.description,
      StartDate: new Date(wine.startDate),
      StartSpecificGravity: wine.startSpecificGravity,
      EndSpecificGravity: wine.endSpecificGravity,
      Ingredients: wine.ingredients,
      RackDates: "" // convert array to string before sending
    }

    return this.http.post<Wine>(`${this.apiUrl}/addwine`, wine1, {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.userServ.getToken()
      })
    });
  }

  // ---------------- NEW: Remove Wine ----------------
  removeWine(wineId: number): Observable<any> {
    console.log("Removing Wine with ID:", wineId);
    return this.http.delete(`${this.apiUrl}/${wineId}`, {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.userServ.getToken()
      })
    });
  }
}

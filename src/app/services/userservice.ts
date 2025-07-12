import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { LoginResponse } from '../models/loginresponse.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'https://wwwapi-fkdkdbhjeefbg8be.centralus-01.azurewebsites.net/api/users';
  private token: LoginResponse | null = null;

  constructor(private http: HttpClient) {}

  public checkToken(): boolean {
    if (!this.token || !this.token.expiration) {
      return false;
    }

    const now = new Date();
    const exp = new Date(this.token.expiration);

    return now < exp;
  } 

  public getToken(): string | null {
    return this.token?.token ?? null;
  }

  login(username: string, password: string): Observable<LoginResponse | null> {
    const body = { username, password };
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, body).pipe(
      tap(res => {
        this.token = res;
        console.log('Token received: ', res);
      }),
      catchError(err => {
        console.error('Login failed:', err);
        return of(null);
      })
    );
  }

}

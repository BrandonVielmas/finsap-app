import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUser = "http://localhost:3000/api/v1/"

  constructor(
    private _http: HttpClient
  ) { }

  public getUserAccount(userId: number): Observable<any> {
    return this._http.get<any>(`${this.apiUser}user-account/${userId}`);
  }

}

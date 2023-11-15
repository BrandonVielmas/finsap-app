import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IncomeService {

  private apiIncome = "http://localhost:8080/api/v1/"

  constructor(private _http: HttpClient) { }

  public saveIncomeUser(ingreso: number, userId: number) : Observable<any> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }

    return this._http.post<any>(`${this.apiIncome}income/${userId}`, ingreso, httpOptions)

  }

}

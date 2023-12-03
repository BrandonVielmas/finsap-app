import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IncomeService {

  private apiIncome = "http://localhost:3000/api/v1/"

  constructor(private _http: HttpClient) { }

  public saveIncomeUser(ingreso: number, userId: number) : Observable<any> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }

    const body = {
      incomeEntered: ingreso
    }

    return this._http.post<any>(`${this.apiIncome}income/${userId}`, JSON.stringify(body), httpOptions)

  }

}

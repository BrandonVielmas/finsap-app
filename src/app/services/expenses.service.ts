import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExpensesService {

  private apiExpenses = "http://localhost:3000/api/v1/";

  constructor(private _http: HttpClient) { }

  public getExpensesByUser(userId: number): Observable<any> {

    return this._http.get<any>(`${this.apiExpenses}expenses/${userId}`);

  }

  public insertExpenseByUser(expense: any): Observable<any> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }

    return this._http.post<any>(`${this.apiExpenses}expenses`, JSON.stringify(expense), httpOptions)

  }

}

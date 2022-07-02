import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoanService {

  constructor(private http: HttpClient) { }

  private jsonURL = './assets/current-loans.json';
  
  getJSONData(): Observable<any> {
    return this.http.get(this.jsonURL)
  }

  convertStringToNumber(string: string) {
    return +string.split(',').join('')
  }

  convertNumberToStringFormat(available: number, invested: number): string {
    return (available - invested).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
}

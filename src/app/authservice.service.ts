import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from   'rxjs/operators';
import { Observable, ReplaySubject } from 'rxjs';
import { Login } from './model/login';

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {

  private url = 'http://localhost:8080/api/';

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  postLogin(data: Login): Observable<any>{
    return this.http.post<any>(
      `${this.url}/auth/login`, data, this.httpOptions
    ).pipe(
      map(
        result => {
          return result;
        }
      )
    )
  }


}

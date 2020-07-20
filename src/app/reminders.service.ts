import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from   'rxjs/operators';
import { Observable } from 'rxjs';
import { Reminder } from './model/reminder';

@Injectable({
  providedIn: 'root'
})
export class RemindersService {

  private url = 'http://localhost:8080/api/';

  constructor(private http: HttpClient) { }

  getPatientMappingByDoctor(doctorId: number): Observable<any>{
    return this.http.get(
      `${this.url}/mapping/bydoctor/${doctorId}`
    ).pipe(
      map(
        results => {
          return results;
        }
      )
    )
  }

  getRemindersByMid(mid: number): Observable<any>{
    return this.http.get(
      `${this.url}/reminders/bymapping/${mid}`
    ).pipe(
      map(
        results => {
          return results;
        }
      )
    )
  }

  getMappingById(mid: number): Observable<any>{
    return this.http.get(
      `${this.url}/mapping/${mid}`
    ).pipe(
      map(
        results => {
          return results;
        }
      )
    )
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  postReminder(data: Reminder): Observable<any>{
    return this.http.post<any>(
      `${this.url}/reminder`, data, this.httpOptions
    ).pipe(
      map(
        results => {
          console.log(results);
          return results;
        }
      )
    )
  }

}

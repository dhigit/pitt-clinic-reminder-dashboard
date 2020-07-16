import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from   'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RemindersService {

  private url = 'http://localhost:8080/api/';

  constructor(private http: HttpClient) { }

  getPatientMappingByDoctor(doctorId: number): Observable<any>{
    return this.http.get(
      this.url + '/mapping/bydoctor/' + doctorId
    ).pipe(
      map(
        results => {
          //console.log(results);
          return results;
        }
      )
    )
  }

}

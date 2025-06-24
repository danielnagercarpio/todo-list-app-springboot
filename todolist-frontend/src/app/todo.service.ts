import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private apiUrl : string = environment.apiUrl;

  constructor(private http : HttpClient) { }

  getTasks() : Observable<any> {
    const url = `${this.apiUrl}/todo`;
    return this.http.get(url);
  }
}

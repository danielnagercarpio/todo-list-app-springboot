import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../models/task.model';

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
  editTask(id : number, taskdata : Task) : Observable<any> {
    const url = `${this.apiUrl}/todo/${id}`;
    return this.http.put(url, taskdata);
  }
  saveTask(taskdata : Task) : Observable<any> {
    const url = `${this.apiUrl}/todo`;
    return this.http.post(url, taskdata);
  }

}

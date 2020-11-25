import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {Poll} from '../models/poll';

@Injectable({
  providedIn: 'root'
})
export class PollsService {

  constructor(private http: HttpClient) { }


  getAllPollsById(id: string){
    return this.http.get<any>(`${environment.url}/polls/${id}`)
  }

  getPollById(id, pollname): Observable<any>{
    return this.http.get<Poll>(`${environment.url}/poll/${id}/${pollname}`)
  }

  addNewPoll(poll: any, id: any){
    return this.http.post<any>(`${environment.url}/polls/new/${id}`, poll);
  }

  getByReference(ref: string): Observable<any>{
    return this.http.get<any>(`${environment.url}/poll/ref/${ref}`)
  }


  //toDo refactor with patch
  setReference(ref: string, name: string, id: number){
    return this.http.post<any>(`${environment.url}/poll/ref/${id}`, {name, ref})
  }
}

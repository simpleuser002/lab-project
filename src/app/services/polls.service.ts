import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PollsService {

  constructor(private http: HttpClient) { }


  getAllPollsById(id: string){
    return this.http.get<any>(`${environment.url}/polls/${id}`)
  }

  addNewPoll(poll: any, id: any){
    return this.http.post<any>(`${environment.url}/polls/new/${id}`, poll);
  }

  getByReference(){
    return this.http.get<any>(`${environment.url}/poll/ref/qwerty`)
  }


  //toDo refactor with patch
  setReference(ref: string, name: string, id: number){
    return this.http.post<any>(`${environment.url}/poll/ref/${id}`, {name, ref})
  }
}

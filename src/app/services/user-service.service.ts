import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {User} from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private http: HttpClient) { }

  getUsers(): Observable<any>{
    return this.http.get<any>(`${environment.url}/users`);
  }

  editUser(user: User): Observable<any>{
    return this.http.put<any>(`${environment.url}/user/edit`, user)
  }

  getUserById(id: string){
    return this.http.get<any>(`${environment.url}/user/${id}`  )
  }

  deleteUser(id: string){
    return this.http.delete(`${environment.url}/user/delete/${id}`)
  }
}

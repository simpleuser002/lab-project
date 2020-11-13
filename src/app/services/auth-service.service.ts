import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private currentUser: BehaviorSubject<any>;
  public currentUserObservable: Observable<User>;

  constructor(
    private http: HttpClient
  ) {
    this.currentUser = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUserObservable = this.currentUser.asObservable();
  }

  public get currentUserValue(): any{
    return this.currentUser.value;
  }

  login(username: string, password: string): Observable<any>{
    return this.http.post<any>(`${environment.url}/auth`, {username, password})
      .pipe(map(user => {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUser.next(user);
        return user;
      }));
  }

  // tslint:disable-next-line:typedef
  register(){

  }

  logout(): void{
    localStorage.removeItem('currentUser');
    this.currentUser.next(null);
  }
}

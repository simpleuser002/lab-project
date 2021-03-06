import {Injectable} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {User} from '../models/user';
import {delay, dematerialize, materialize, mergeMap} from 'rxjs/operators';
import {Observable, of, throwError} from 'rxjs';
import {element} from 'protractor';
import {url} from 'inspector';


const users: User[] = [{ id: 1, username: 'test', password: 'test', role: 'user', registrationDate: '19.02.2000' },
                              {id: 2, username: 'admin', password: 'admin', role: 'admin', registrationDate: '19.02.1992'},
                              {id: 3, username: 'user', password: 'user', role: 'user', registrationDate: '19.02.2001'}];
localStorage.setItem('users', JSON.stringify(users));


@Injectable()
export class Backend implements HttpInterceptor{

   user: User;

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const { url, method, headers, body } = request;

    // wrap in delayed observable to simulate server api call
    // @ts-ignore
    return of(null)
      .pipe(mergeMap(handleRoute))
      // tslint:disable-next-line:max-line-length
      .pipe(materialize()) // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
      .pipe(delay(500))
      .pipe(dematerialize());

    // tslint:disable-next-line:typedef
    function handleRoute() {
      switch (true) {
        case url.endsWith('/auth') && method === 'POST':
          return authenticate();
        case url.endsWith('/users') && method === 'GET':
          return getUsers();
        case url.endsWith('/user/edit') && method === 'PUT':
          return editUser();
        case url.match(/\/user\/\d+$/) && method === 'GET':
          return getUserById();
        case url.match(/\/user\/delete\/\d+$/) && method === 'DELETE':
          return deleteUser();
        default:
          // pass through any requests not handled above
          return next.handle(request);
      }
    }

    // route functions

    // tslint:disable-next-line:typedef
    function authenticate() {
      const { username, password } = body;
      const user = users.find(x => x.username === username && x.password === password);
      if (!user) { return error('Username or password is incorrect'); }
      return ok({
        id: user.id,
        username: user.username,
        token: 'fake-jwt-token'
      });
    }

    // tslint:disable-next-line:typedef
    function getUsers() {
      if (!isLoggedIn()) { return unauthorized(); }
      console.log(getFromLocalStorage());
      return ok(getFromLocalStorage());
    }

    function editUser() {
      let user = body;
      let users= getFromLocalStorage();
      users.forEach(element=>{
        if(element.id == user.id){
         users[users.indexOf(element)]=user;
         console.log(users)
        }
      });
      localStorage.setItem('users', JSON.stringify(users));
      return ok(user);
    }

    function getUserById() {
      let id = idFromUrl();
      console.log(id);
      return ok(getFromLocalStorage().find(el =>{
        if(el.id==id){
         return ok(el);
        }
      }))
    }

    function deleteUser() {
      let id = idFromUrl();
      let users= getFromLocalStorage();
      console.log(id);
      users.forEach(el =>{
        if(el.id==id){
          const arrayId= users.indexOf(el);
          users.splice(arrayId, 1);
          console.log(users)
        }
      })
      localStorage.setItem('users', JSON.stringify(users));
      return ok(users);
    }

    function idFromUrl() {
      const urlParts = url.split('/');
      return parseInt(urlParts[urlParts.length - 1]);
    }

    function getFromLocalStorage(){
      return JSON.parse(localStorage.getItem('users'));
    }
    // helper functions

    // tslint:disable-next-line:no-shadowed-variable typedef
    function ok(body?) {
      return of(new HttpResponse({ status: 200, body }));
    }

    // tslint:disable-next-line:typedef
    function error(message) {
      return throwError({ error: { message } });
    }

    // tslint:disable-next-line:typedef
    function unauthorized() {
      return throwError({ status: 401, error: { message: 'Unauthorised' } });
    }

    // tslint:disable-next-line:typedef
    function isLoggedIn() {
      return headers.get('Authorization') === 'Bearer fake-jwt-token';
    }
  }


}

export let fakeBackendProvider = {
  // use fake backend in place of Http service for backend-less development
  provide: HTTP_INTERCEPTORS,
  useClass: Backend,
  multi: true
};

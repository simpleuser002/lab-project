import {Injectable} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {User} from '../models/user';
import {delay, dematerialize, materialize, mergeMap} from 'rxjs/operators';
import {Observable, of, throwError} from 'rxjs';
import {element} from 'protractor';
import {url} from 'inspector';
import {saveAs} from 'file-saver'
import {Poll} from '../models/poll';
import {USERS} from '../mock/usersData';


const users: User[] = USERS;
localStorage.setItem('users', JSON.stringify(users));

const uploadPath='D://';
@Injectable()
export class Backend implements HttpInterceptor{

   user: User;


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const { url, method, headers, body } = request;


    return of(null)
      .pipe(mergeMap(handleRoute))
      .pipe(materialize()) // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
      .pipe(delay(200))
      .pipe(dematerialize());


    function handleRoute() {
      switch (true) {
        case url.endsWith('/auth') && method === 'POST':
          return authenticate();
        case url.endsWith('/registration') && method === 'POST':
          return registate();

        case url.endsWith('/users') && method === 'GET':
          return getUsers();
        case url.endsWith('/user/edit') && method === 'PUT':
          return editUser();
        case url.match(/\/user\/\d+$/) && method === 'GET':
          return getUserById();
        case url.match(/\/user\/delete\/\d+$/) && method === 'DELETE':
          return deleteUser();
        case url.match(/\/user\/templates\/\d+$/) && method === 'GET':
          return getPollTemplates();
        case url.match(/\/user\/templates\/\d+\/\w+$/) && method === 'GET':
          return getPollTemplateById();
        case url.match(/\/user\/templates\/\d+$/) && method === 'POST':
          return addNewPoll();




        case url.match(/\/polls\/\d+$/) && method === 'GET':
          return getPollsById();
        case url.match(/\/polls\/new\/\d+$/) && method === 'POST':
          return addNewPoll();
        case url.match(/\/poll\/ref\/\d+$/) && method === 'POST':
          return setReference();
        case url.match(/\/poll\/ref\/\w+$/) && method === 'GET':
          return getByReference();
        case url.match(/\/poll\/\d+\/\w+$/) && method === 'GET':
          return getPollById();




        case url.endsWith('/files') && method === 'POST':
          return uploadFile();


        default:
          // pass through any requests not handled above
          return next.handle(request);
      }
    }

    // route functions

    function authenticate() {
      const { email, password } = body;
      const user = users.find(x => x.email === email && x.password === password);
      if (!user) { return error('Username or password is incorrect'); }
      return ok({
        id: user.id,
        username: user.username,
        email: user.email,
        token: 'fake-jwt-token'
      });
    }

    function registate(){
      let users = getFromLocalStorage();
      let user = body;
      user.id=getLastId(users)+1;
      users.push(user)
      localStorage.setItem('users', JSON.stringify(users))
      console.log(users);
      return ok('200')
    }


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









    function getPollsById(){
      let id = idFromUrl();
      return ok(getFromLocalStorage().find(el =>{
        if(el.id==id){
          console.log(JSON.stringify(el.polls));
          return ok(el.polls);
        }
      }).polls)
    }

    function addNewPoll(){
    let id = idFromUrl();
    let poll = body;
    let users: User[] = [];
    users=getFromLocalStorage();
    users.forEach((user) => {
      if(user.id==id){
        console.log(user.polls)
       user.polls.push(poll) ;
      }
    })
      localStorage.setItem('users', JSON.stringify(users));
    console.log(JSON.stringify(users));
    return ok('')
    }


    function setReference(){
      console.log(body)
       let users = getFromLocalStorage();
      users.forEach((user) => {
        if(user.id==idFromUrl()){
          console.log(idFromUrl())
         user.polls.forEach((p)=>{
           if(p.pollname==body.name){
             p.reference=body.ref;
           }
         })
        }
      })
      localStorage.setItem('users', JSON.stringify(users));
      console.log(JSON.stringify(users));
      return ok(users)
    }

    function getByReference(){
      let poll: Poll=null;
      let users = getFromLocalStorage();
      users.forEach((user) => {
          user.polls.forEach((p)=>{
            if(p.reference==stringFromUrl()){
             poll=p;
             console.log(poll)
            }
          })

      })
      return ok(poll)
    }


    function  getPollById(){
     let users=getFromLocalStorage();
     let pollname=stringFromUrl();
     let poll=null;
     users.forEach(u=>{
       if (u.id==idFromUrl2()){
         u.polls.forEach(p=>{
           if (p.pollname==pollname){
             poll=p;
           }
         })
       }
     })
      console.log(poll)
      return ok(poll)
    }



    function getPollTemplates(){
     let users = getFromLocalStorage();
     let id = idFromUrl();
     let templates =[]
     users.forEach(u=>{
       if(u.id==id){
         templates=u.templates
       }
     })
      console.log(templates)
      return ok(templates)
    }



    function  getPollTemplateById(){
      let id=idFromUrl2();
      let templateName=stringFromUrl();
      let template=null;
      users.forEach(u=>{
        if(u.id==id){
          u.templates.forEach(t=>{
            if(t.pollname==templateName){
              template=t;
            }})
        }
      })
       console.log(template)
      return ok(template)
    }


//todo save total answers




    function uploadFile(){
      /*let blob = new Blob([body], {type: 'text/plain'});
      saveAs(blob, body)*/
      console.log('created')
      return ok('created')
    }

    function idFromUrl() {
      const urlParts = url.split('/');
      return parseInt(urlParts[urlParts.length - 1]);
    }

    function idFromUrl2() {
      const urlParts = url.split('/');
      return parseInt(urlParts[urlParts.length - 2]);
    }

    function stringFromUrl() {
      const urlParts = url.split('/');
      return urlParts[urlParts.length - 1];
    }


    function getFromLocalStorage(){
      return JSON.parse(localStorage.getItem('users'));
    }


    function  getLastId(arr){
      return arr.length;
    }
    // helper functions


    function ok(body?) {
      return of(new HttpResponse({ status: 200, body }));
    }


    function error(message) {
      return throwError({ error: { message } });
    }


    function unauthorized() {
      return throwError({ status: 401, error: { message: 'Unauthorised' } });
    }


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

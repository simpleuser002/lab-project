import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthServiceService} from '../services/auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class JwtInterceptor implements HttpInterceptor{

  constructor(private authService: AuthServiceService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const currentUser = this.authService.currentUserValue;
    if (currentUser && currentUser.token){
        req = req.clone({
          setHeaders: {
            Authorization: `Bearer ${currentUser.token}`}
        });

      }
    return next.handle(req);
  }
}

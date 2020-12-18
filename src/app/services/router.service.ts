import { Injectable } from '@angular/core';
import {NavigationEnd, Router, RoutesRecognized} from '@angular/router';
import {filter, pairwise} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RouterService {
  private previousURL: string;

  constructor(private router: Router) {
    this.router.events
      .pipe(filter((evt: any) => evt instanceof RoutesRecognized), pairwise())
      .subscribe((events) => {
        console.log('previous url', events[0].urlAfterRedirects);
        console.log('current url', events[1].urlAfterRedirects);
        this.previousURL = events[0].urlAfterRedirects;
        //this.router.navigate([this.previousURL])
        // this.getPreviousURL(events[0].urlAfterRedirects)
      });
  }

  getPreviousUrl(){
    return this.previousURL;
  }

}

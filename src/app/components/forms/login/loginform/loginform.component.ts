import { Component, OnInit } from '@angular/core';
import {LoginComponent} from '../login.component';
import {MatDialog} from '@angular/material/dialog';
import {filter, pairwise} from 'rxjs/operators';
import {NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-loginform',
  templateUrl: './loginform.component.html',
  styleUrls: ['./loginform.component.sass']
})
export class LoginformComponent implements OnInit {
  previousURL: string;

  constructor(private dialog: MatDialog, private router: Router) {
    this.openLoginForm();
  }

  ngOnInit(): void {
    this.router.events
      .pipe(filter((evt: any) => evt instanceof NavigationEnd), pairwise())
      .subscribe((events) => {
        console.log('previous url', events[0].urlAfterRedirects);
        console.log('current url', events[1].urlAfterRedirects);
        this.previousURL = events[0].urlAfterRedirects;
        //this.router.navigate([this.previousURL])
        this.getPreviousURL(events[0].urlAfterRedirects)
      });
  }

  openLoginForm(): void{
    const loginForm = this.dialog.open(LoginComponent,
      {width: '600px',
        height: '350px'});

    loginForm.afterClosed().subscribe(result=>{
     // console.log(this.previousURL)
      this.router.navigate(['/'])


    })
  }

  getPreviousURL(url: string){
    this.previousURL = url;
    console.log(this.previousURL)
  }

}

import { Component, OnInit } from '@angular/core';
import {LoginComponent} from '../login.component';
import {MatDialog} from '@angular/material/dialog';
import {filter, pairwise} from 'rxjs/operators';
import {NavigationEnd, Router, RoutesRecognized} from '@angular/router';
import {RouterService} from '../../../../services/router.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-loginform',
  templateUrl: './loginform.component.html',
  styleUrls: ['./loginform.component.sass']
})
export class LoginformComponent implements OnInit {
  previousURL: string;

  constructor(private dialog: MatDialog,
              private router: Router,
              private routerService: RouterService,
              private location: Location) {
    this.openLoginForm();
  }

  ngOnInit(): void {
  }

  openLoginForm(): void{
    const loginForm = this.dialog.open(LoginComponent,
      {width: '600px',
        height: '350px'});


    loginForm.afterClosed().subscribe(result=>{
     /* if (location.href.startsWith('')){

      }*/
     // this.router.navigate(['/'])
      this.location.back();


    })
  }

  getPreviousURL(url: string){
    this.previousURL = url;
    console.log(this.previousURL)
  }

}

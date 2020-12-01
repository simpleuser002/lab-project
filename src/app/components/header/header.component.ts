import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {LoginComponent} from '../forms/login/login.component';
import {User} from '../../models/user';
import {AuthServiceService} from '../../services/auth-service.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {
  currentUser: User;
  routeQueryParams: string;

  constructor(
    public dialog: MatDialog,
    private authService: AuthServiceService,
    private router: Router
  ) {
    this.authService.currentUserObservable.subscribe(data => this.currentUser = data);
  }

  ngOnInit(): void {
  }

  openLoginForm(): void{
    this.router.navigate(['login']);
  }

  openRegisterForm(): void{

  }

  logout(): void{
    this.authService.logout();
    this.router.navigate(['/home']);
  }

}

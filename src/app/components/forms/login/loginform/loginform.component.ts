import { Component, OnInit } from '@angular/core';
import {LoginComponent} from '../login.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-loginform',
  templateUrl: './loginform.component.html',
  styleUrls: ['./loginform.component.sass']
})
export class LoginformComponent implements OnInit {

  constructor(private dialog: MatDialog) {
    this.openLoginForm();
  }

  ngOnInit(): void {
  }

  openLoginForm(): void{
    const loginForm = this.dialog.open(LoginComponent,
      {width: '600px',
        height: '350px'});
  }

}

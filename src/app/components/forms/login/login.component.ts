import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {AuthService} from '../../../services/auth.service';
import {NavigationEnd, Router, RoutesRecognized} from '@angular/router';
import {environment} from '../../../../environments/environment';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {RegisterComponent} from '../register/register.component';
import {filter, pairwise} from 'rxjs/operators';

import {RouterService} from '../../../services/router.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  private previousURL: string;


  constructor(private authService: AuthService,
              private router: Router,
              private dialog: MatDialog,
              private dialogRef: MatDialogRef<any>,
              private routerService: RouterService
              ) {
    this.loginForm = new FormGroup({
      email :  new FormControl(''),
      password : new FormControl('')
    });
     }

  ngOnInit() {

  }


  // tslint:disable-next-line:typedef
  get formControls(){
    return this.loginForm.controls;
  }

  // tslint:disable-next-line:typedef
  login(){
    this.authService.login(this.formControls.email.value, this.formControls.password.value).subscribe(data => {
      console.log(data);
     //this.router.navigate(['']);
      this.dialogRef.close();
    });
  }

  registation() {
    const registrationForm = this.dialog.open(RegisterComponent,
      {width: '600px',
        height: '500px'});
    this.dialogRef.close();
  }
}

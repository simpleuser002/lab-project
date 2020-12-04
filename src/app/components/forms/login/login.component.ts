import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {AuthServiceService} from '../../../services/auth-service.service';
import {NavigationEnd, Router, RoutesRecognized} from '@angular/router';
import {environment} from '../../../../environments/environment';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {RegisterComponent} from '../register/register.component';
import {filter, pairwise} from 'rxjs/operators';

import {RouterServiceService} from '../../../services/router-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  private previousURL: string;


  constructor(private authService: AuthServiceService,
              private router: Router,
              private dialog: MatDialog,
              private dialogRef: MatDialogRef<any>,
              private routerService: RouterServiceService
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

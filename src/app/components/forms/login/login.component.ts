import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {AuthServiceService} from '../../../services/auth-service.service';
import {Router} from '@angular/router';
import {environment} from '../../../../environments/environment';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;


  constructor(private authService: AuthServiceService,
              private router: Router,
              private dialog: MatDialog) {
    this.loginForm = new FormGroup({
      username :  new FormControl(''),
      password : new FormControl('')
    });
  }

  ngOnInit(): void {
  }

  // tslint:disable-next-line:typedef
  get formControls(){
    return this.loginForm.controls;
  }

  // tslint:disable-next-line:typedef
  login(){
    this.authService.login(this.formControls.username.value, this.formControls.password.value).subscribe(data => {
      console.log(data);
      this.router.navigate(['/home']);
      this.dialog.closeAll();
    });
  }
}

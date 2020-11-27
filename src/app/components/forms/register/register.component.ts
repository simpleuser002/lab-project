import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {AuthServiceService} from '../../../services/auth-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {
  registrationForm: FormGroup;

  constructor(private dialog:MatDialog,
    private matdialogRef: MatDialogRef<any>,
              private authService: AuthServiceService) {
    this.registrationForm = new FormGroup({
      username :  new FormControl(''),
      email :  new FormControl(''),
      password : new FormControl(''),
      confirmpassword : new FormControl('')
    });
  }

  ngOnInit(): void {
  }

  get formControls(){
    return this.registrationForm;
  }

  submit() {
      this.authService.register(this.formControls.value).subscribe();

    this.matdialogRef.close();
  }
}

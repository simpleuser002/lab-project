import {Component, Inject, OnInit} from '@angular/core';
import {UserServiceService} from '../../../services/user-service.service';
import {User} from '../../../models/user';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.sass']
})
export class EditUserComponent implements OnInit {

  user: User;


  constructor(private userService: UserServiceService,
              private dialog: MatDialogRef<any>,
              @Inject(MAT_DIALOG_DATA) public data: any) {

  }

  ngOnInit(): void {
    this.getUserById();
  }

  getUserById(){
    this.userService.getUserById(this.data).subscribe(data => this.user=data);
  }

  editUser(){
    this.userService.editUser(this.user).subscribe();
    this.dialog.close()

  }

}

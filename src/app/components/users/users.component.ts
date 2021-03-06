import { Component, OnInit } from '@angular/core';
import {User} from '../../models/user';
import {UserServiceService} from '../../services/user-service.service';
import {first} from 'rxjs/operators';
import {LoginComponent} from '../forms/login/login.component';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {EditUserComponent} from '../forms/edit-user/edit-user.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.sass']
})
export class UsersComponent implements OnInit {
  users: User[];
  columns: string[] = ['username', 'password', 'role', 'registrationDate', 'actions'];
  constructor(private userService: UserServiceService,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.getUsers();
  }

  getUsers(): any{
    this.userService.getUsers().subscribe(data => {
      this.users=data;
    });
  }

  openEditForm(id: string): void{
    const loginForm = this.dialog.open(EditUserComponent,
      {data:id,
        width: '600px',
        height: '500px'});
      loginForm.afterClosed().subscribe(()=>this.getUsers());
  }

  deleteUser(id: string){
    this.userService.deleteUser(id).subscribe();
    this.getUsers();
  }
}

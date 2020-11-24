import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './components/forms/login/login.component';
import {AppComponent} from './app.component';
import {AuthGuardService} from './helpers/auth-guard.service';
import {HomeComponent} from './components/home/home.component';
import {combineAll} from 'rxjs/operators';
import {UsersComponent} from './components/users/users.component';
import {EditUserComponent} from './components/forms/edit-user/edit-user.component';
import {MypollsComponent} from './components/poll/mypolls/mypolls.component';
import {NewpollComponent} from './components/poll/newpoll/newpoll.component';
import {PollComponent} from './components/poll/poll/poll.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent, canActivate: [AuthGuardService]},
  {path: 'login', component: LoginComponent},
  {path: 'users', component: UsersComponent},
  {path: 'user/edit', component: EditUserComponent},
  {path: 'user/polls', component: MypollsComponent},
  {path: 'user/polls/new', component: NewpollComponent},
  {path: 'poll/ref/:reference', component: PollComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

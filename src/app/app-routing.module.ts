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
import {PollResultsComponent} from './components/poll/poll-results/poll-results.component';
import {MyPollTemplatesComponent} from './components/poll/my-poll-templates/my-poll-templates.component';
import {PollTemplateComponent} from './components/poll/poll-template/poll-template.component';
import {RegisterComponent} from './components/forms/register/register.component';
import {LoginformComponent} from './components/forms/login/loginform/loginform.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent, canActivate: [AuthGuardService]},
  {path: 'login', component: LoginformComponent},
  {path: 'registration', component: RegisterComponent},
  {path: 'users', component: UsersComponent},
  {path: 'user/edit', component: EditUserComponent},
  {path: 'user/polls', component: MypollsComponent},
  {path: 'user/polls/new', component: NewpollComponent},
  {path: 'poll/ref/:reference', component: PollComponent},
  {path: 'poll/results/:id/:pollname', component: PollResultsComponent},
  {path: 'user/templates', component: MyPollTemplatesComponent},
  {path: 'user/templates/:pollname', component: PollTemplateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

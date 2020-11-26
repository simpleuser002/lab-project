import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import { LoginComponent } from './components/forms/login/login.component';
import { RegisterComponent } from './components/forms/register/register.component';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {fakeBackendProvider} from './helpers/backend';
import {JwtInterceptor} from './helpers/jwt-interceptor';
import { HomeComponent } from './components/home/home.component';
import { UsersComponent } from './components/users/users.component';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { EditUserComponent } from './components/forms/edit-user/edit-user.component';
import { MypollsComponent } from './components/poll/mypolls/mypolls.component';
import { NewpollComponent } from './components/poll/newpoll/newpoll.component';
import {AngularEditorModule} from '@kolkov/angular-editor';
import {MatSliderModule} from '@angular/material/slider';
import {RatingModule} from 'ng-starrating';
import {MatTabsModule} from '@angular/material/tabs';
import {MatProgressBarModule} from "@angular/material/progress-bar";
import { PollComponent } from './components/poll/poll/poll.component';
import { PollResultsComponent } from './components/poll/poll-results/poll-results.component';
import {ChartsModule} from 'ng2-charts';
import {MatSelectModule} from '@angular/material/select';
import { PollTemplateComponent } from './components/poll/poll-template/poll-template.component';
import { MyPollTemplatesComponent } from './components/poll/my-poll-templates/my-poll-templates.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    UsersComponent,
    EditUserComponent,
    MypollsComponent,
    NewpollComponent,
    PollComponent,
    PollResultsComponent,
    PollTemplateComponent,
    MyPollTemplatesComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatToolbarModule,
        MatDialogModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        MatTableModule,
        MatButtonModule,
        MatIconModule,
        AngularEditorModule,
        MatSliderModule,
        RatingModule,
        MatTabsModule,
        MatProgressBarModule,
        ChartsModule,
        MatSelectModule
    ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    /*{ provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },*/

    // provider used to create fake backend
    fakeBackendProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }

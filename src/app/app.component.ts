import { Component } from '@angular/core';
import {AuthServiceService} from './services/auth-service.service';
import {User} from './models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'lab-project';


}

import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goToUsers(){
    this.router.navigate(['/users']);
  }

  goToPolls() {
    this.router.navigate(['user/polls'])
  }

  goToNewPoll() {
    this.router.navigate(['user/polls/new'])
  }

  goToMyTemplates() {
    this.router.navigate(['user/templates'])
  }
}

import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.sass']
})
export class SidebarComponent implements OnInit {

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

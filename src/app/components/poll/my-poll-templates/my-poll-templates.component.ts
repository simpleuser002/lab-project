import { Component, OnInit } from '@angular/core';
import {PollsService} from '../../../services/polls.service';
import {User} from '../../../models/user';
import {AuthService} from '../../../services/auth.service';
import {Poll} from '../../../models/poll';
import {Router} from '@angular/router';

@Component({
  selector: 'app-my-poll-templates',
  templateUrl: './my-poll-templates.component.html',
  styleUrls: ['./my-poll-templates.component.sass']
})
export class MyPollTemplatesComponent implements OnInit {
  private currentUser: User;
   templates: Poll[];

  constructor(private pollService: PollsService,
              private authService: AuthService,
              private router: Router) {
    this.authService.currentUserObservable.subscribe(data => this.currentUser = data);
  }

  ngOnInit(): void {
    this.getTemplatesByUserId()
  }


  getTemplatesByUserId(){
    this.pollService.getTemplatesByUserId(this.currentUser.id).subscribe(data=>this.templates=data)
  }

  createPollFromTemplate(pollname: string) {
    this.router.navigate(['/user/templates/' +  pollname])
  }
}

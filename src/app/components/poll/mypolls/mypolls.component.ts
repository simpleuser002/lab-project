import { Component, OnInit } from '@angular/core';
import {PollsService} from '../../../services/polls.service';
import {Poll} from '../../../models/poll';
import {AuthServiceService} from '../../../services/auth-service.service';
import {User} from '../../../models/user';

@Component({
  selector: 'app-mypolls',
  templateUrl: './mypolls.component.html',
  styleUrls: ['./mypolls.component.sass']
})
export class MypollsComponent implements OnInit {

  polls: Poll[];
  columns: string[] = ['pollname', 'answers', 'reference'];
  private currentUser: User;

  constructor(private pollService: PollsService, private authService: AuthServiceService) {
    this.authService.currentUserObservable.subscribe(data => this.currentUser = data);
  }

  ngOnInit(): void {
    this.getPollsById();
  }

  getPollsById(){
     this.pollService.getAllPollsById(String(this.currentUser.id)).subscribe(data => {
       console.log(data);
       this.polls = data
     console.log(this.polls)});
  }

  //todo change to id
  setReference(name: string){
    this.pollService.setReference(this.generateRandomString(6), name, this.currentUser.id).subscribe()
  }

  generateRandomString(length:number){
    let randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for ( var i = 0; i < length; i++ ) {
      result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    console.log('localhost:4200/poll/ref/'+result)
    return result;
  }

}

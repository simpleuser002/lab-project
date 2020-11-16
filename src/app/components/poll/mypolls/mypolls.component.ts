import { Component, OnInit } from '@angular/core';
import {PollsService} from '../../../services/polls.service';
import {Poll} from '../../../models/poll';

@Component({
  selector: 'app-mypolls',
  templateUrl: './mypolls.component.html',
  styleUrls: ['./mypolls.component.sass']
})
export class MypollsComponent implements OnInit {

  polls: Poll[];
  columns: string[] = ['name', 'answers'];

  constructor(private pollService: PollsService) { }

  ngOnInit(): void {
    this.getPollsById();
  }

  getPollsById(){
     this.pollService.getAllPollsById(String(1)).subscribe(data => {
       console.log(data);
       this.polls = data
     console.log(this.polls)});
  }

}

import { Component, OnInit } from '@angular/core';
import {PollsService} from '../../../services/polls.service';
import {Poll} from '../../../models/poll';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-poll',
  templateUrl: './poll.component.html',
  styleUrls: ['./poll.component.sass']
})
export class PollComponent implements OnInit {
  poll: Poll;
  pollForm: FormGroup;

  isNumberQuestions: boolean = false;
  isRandomQuestions: boolean  = false;
  isNumberPage: boolean = false;
  isRequiredStar: boolean= false;
  isIndicator: boolean = false;

  constructor(private pollService: PollsService) {
    this.pollForm = new FormGroup({
      pollname: new FormControl(''),
      parameters: new FormArray([]),
      questions: new FormArray([])
    });
  }


  initQuestions(){
    return new FormGroup({
      name: new FormControl(''),
      type: new FormControl('radio'),
      page:new FormControl(''),
      mandatory: new FormControl(false),
      answers: new FormArray([this.initAnswers()])
    })
  }


  initAnswers(){
    return new FormGroup({
      name: new FormControl('answer'),
      right: new FormControl('false', Validators.requiredTrue),
    })
  }


  ngOnInit(): void {
    this.getPoll()
  }

  getPoll(){
    this.pollService.getByReference().subscribe(data => {this.poll=data
    console.log(this.poll)})
  }

  getQuestions(form){
    return form.controls.questions.controls;
  }

  saveResults() {

  }

  selected(i: number, j: number) {

  }
}

import { Component, OnInit } from '@angular/core';
import {PollsService} from '../../../services/polls.service';
import {Poll} from '../../../models/poll';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {Question} from '../../../models/question';
import {ActivatedRoute} from '@angular/router';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import {AngularEditorConfig} from '@kolkov/angular-editor';

@Component({
  selector: 'app-poll',
  templateUrl: './poll.component.html',
  styleUrls: ['./poll.component.sass']
})
export class PollComponent implements OnInit {
  poll: Poll;
  pollSub: Subscription;
 /* private poll = new BehaviorSubject<any>('')
  public pollObs = this.poll.asObservable();*/
  questions: Question[];
  pollname: string;
  pollForm: FormGroup;
  ref: string

  isNumberQuestions: boolean = false;
  isRandomQuestions: boolean  = false;
  isNumberPage: boolean = false;
  isRequiredStar: boolean= false;
  isIndicator: boolean = false;

  params: string[]

  max = 100;
  min = 0;
  value = 0;
  thumbLabel = true;

  currentPage: number=0;
  pages:number;


  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: 'auto',
    minHeight: '0',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Enter text here...',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [
      {class: 'arial', name: 'Arial'},
      {class: 'times-new-roman', name: 'Times New Roman'},
      {class: 'calibri', name: 'Calibri'},
      {class: 'comic-sans-ms', name: 'Comic Sans MS'}
    ],
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    uploadUrl: 'v1/image',
    uploadWithCredentials: false,
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      ['bold', 'italic'],
      ['fontSize']
    ]
  };

  constructor(private pollService: PollsService,
              private activateRoute: ActivatedRoute) {
    this.pollForm = new FormGroup({
      pollname: new FormControl(''),
      parameters: new FormArray([]),
      questions: new FormArray([]),
    });
    this.activateRoute.params.subscribe(params => this.ref =params['reference'])
  }

  ngOnInit(): void {
    this.getPoll();
  }

  getPoll(){
      this.pollSub = this.pollService.getByReference(this.ref).subscribe(data => {
        this.poll=data
        console.log(this.poll)
        this.initParams(this.poll.parameters)
        this.pages=this.poll.pages;
        if(this.isRandomQuestions==true){
          this.initQ(this.shuffleQuestions(this.poll.questions));
        }else {
          this.initQ(this.poll.questions)
        }
      })
  }


  initQuestions(q){
         return new FormGroup({
        name: new FormControl(q.name),
        type: new FormControl(q.type),
        page:new FormControl(q.page),
        mandatory: new FormControl(q.mandatory),
        answers: new FormArray([])
      })
  }

  initQ(questions: any){

    for (let i = 0; i < questions.length; i++) {
      (<FormArray>this.pollForm.controls['questions']).push(this.initQuestions(questions[i]));
      for (let j = 0; j <questions[i].answers.length; j++) {
        (<FormArray>this.pollForm.get(['questions', i, 'answers'])).push(this.initAnswers());
      }
    }
  }


  initAnswers(){
    return new FormGroup({
      name: new FormControl('answer'),
      right: new FormControl('false', Validators.requiredTrue),
    })
  }

  private initParams(array: any) {
      array.forEach((p)=>{
        switch (p.name){
          case 'num_q':
            return  this.isNumberQuestions = p.status == true;

          case 'num_p':
            return  this.isNumberPage = p.status == true;

          case 'random_q':
            return  this.isRandomQuestions = p.status == true;


          case 'req_star':
            return  this.isRequiredStar = p.status == true;

          case 'indicate':
            return  this.isIndicator = p.status == true;
        }
      })
  }


  getQuestions(form){
    return form.controls.questions.controls;
  }

  getAnswers(form: any) {
    return form.controls.answers.controls;
  }

  saveResults() {

  }

  selected(i: number, j: number) {

  }


  onRate($event:{oldValue:number, newValue:number}, i:number) {
    // this.addPollForm.get(['questions',i,'answers',j]).setValue($event.newValue)

    console.log(`Old Value:${$event.oldValue},
      New Value: ${$event.newValue}`);

    this.pollForm.get(['questions', i, 'answers', 0, 'right']).setValue($event.newValue);
  }


  shuffleQuestions(array){
    let currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {

      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  nextPage(){
    this.currentPage++;
  }

  previousPage(){
    if(this.currentPage!=0){
      this.currentPage--;
    }else{
      this.currentPage;
    }

  }
}

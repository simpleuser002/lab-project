import { Component, OnInit } from '@angular/core';
import {PollsService} from '../../../services/polls.service';
import {Poll} from '../../../models/poll';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {Question} from '../../../models/question';
import {ActivatedRoute, Router} from '@angular/router';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import {AngularEditorConfig} from '@kolkov/angular-editor';
import {AuthService} from '../../../services/auth.service';
import {User} from '../../../models/user';
import {editorConfig} from '../../../mock/editorConfigData';

@Component({
  selector: 'app-poll',
  templateUrl: './poll.component.html',
  styleUrls: ['./poll.component.sass'],
  providers:[PollsService, AuthService, ActivatedRoute ]
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

  isAnon: boolean = false;
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


  editorConfig: AngularEditorConfig = editorConfig;
  private currentUser: User;

  constructor(private pollService: PollsService,
              private activateRoute: ActivatedRoute,
              private authService: AuthService,
              private router: Router, private route: ActivatedRoute) {
    this.pollForm = new FormGroup({
      pollname: new FormControl(''),
      parameters: new FormArray([]),
      questions: new FormArray([]),
    });
    this.authService.currentUserObservable.subscribe(data => this.currentUser = data);
    this.activateRoute.params.subscribe(params => this.ref =params['reference'])
  }

  ngOnInit(): void {
    this.checkAnon()
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
        answers: new FormArray([]),
        interviewed: new FormArray([this.initInterviewed()])
      })
  }

  initQ(questions: any){
    for (let i = 0; i < questions.length; i++) {
      (<FormArray>this.pollForm.controls['questions']).push(this.initQuestions(questions[i]));
      for (let j = 0; j <questions[i].answers.length; j++) {
        (<FormArray>this.pollForm.get(['questions', i, 'interviewed', 0, 'answers'])).push(this.initAnswers());
      }
    }
    console.log(this.pollForm)
  }


  initAnswers(){
    return new FormGroup({
      name: new FormControl('answer'),
      right: new FormControl('', Validators.requiredTrue),
    })
  }

  initInterviewed(){
    return new FormGroup({
      username: new FormControl(this.handlingAnon()),
      answers: new FormArray([])
    })
  }

  private initParams(array: any) {
      array.forEach((p)=>{
        switch (p.name){

          case 'anon':
            return  this.isNumberQuestions = p.status == true;

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

  getInterviewed(form: any){
    return form.controls.interviewed.controls;
  }

  saveResults() {
    console.log(this.formControls.value)
    // this.pollForm.get('pages').setValue(this.tabs.length)
    this.pollService.addNewPoll(this.pollForm.value, 3).subscribe();
  }

  selected(i: number, j: number) {

  }


  onRate($event:{oldValue:number, newValue:number}, i:number) {
    // this.addPollForm.get(['questions',i,'answers',j]).setValue($event.newValue)

    console.log(`Old Value:${$event.oldValue},
      New Value: ${$event.newValue}`);

    this.pollForm.get(['questions', i, 'interviewed', 0, 'answers', 0, 'right']).setValue($event.newValue);
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
    if (this.pages-1!=this.currentPage){
      this.currentPage++;
    }else {
      this.currentPage;
    }

  }

  previousPage(){
    if(this.currentPage!=0){
      this.currentPage--;
    }else{
      this.currentPage;
    }
  }

  get formControls(){
    return this.pollForm;
  }

  checkAnon(){
    if(this.isAnon==false && this.currentUser==null){
      console.log(this.route)
      this.router.navigate(['/login']);
    }
  }


  handlingAnon(){
    if(this.isAnon){
        return 'anon'
    }else {
      return this.currentUser.username;
    }
  }
}

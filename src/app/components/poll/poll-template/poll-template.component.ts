import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PollsService} from '../../../services/polls.service';
import {AuthServiceService} from '../../../services/auth-service.service';
import {User} from '../../../models/user';
import {Poll} from '../../../models/poll';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {AngularEditorConfig} from '@kolkov/angular-editor';

@Component({
  selector: 'app-poll-template',
  templateUrl: './poll-template.component.html',
  styleUrls: ['./poll-template.component.sass']
})
export class PollTemplateComponent implements OnInit {
  templateName: string
  private currentUser: User;
   poll: Poll;
   pollForm: FormGroup;

  isNumberQuestions: boolean = false;
  isRandomQuestions: boolean  = false;
  isNumberPage: boolean = false;
  isRequiredStar: boolean= false;
  isIndicator: boolean = false;

  isSelected=new FormControl(0);
  tabs=new Set();
  params: string[];

  max = 100;
  min = 0;
  value = 0;
  thumbLabel = true;

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


  constructor(private activateRoute: ActivatedRoute,
              private pollService: PollsService,
              private authService: AuthServiceService) {
    this.activateRoute.params.subscribe(params => this.templateName =params['pollname']);
    this.authService.currentUserObservable.subscribe(data => this.currentUser = data);

    this.pollForm = new FormGroup({
      pollname: new FormControl(''),
      parameters: new FormArray([]),
      questions: new FormArray([]),
    });
  }

  ngOnInit(): void {
    this.getTemplateById()
  }


  getTemplateById(){
      this.pollService.getTemplateById(this.currentUser.id, this.templateName).subscribe(data=>{
        this.poll=data;
        this.initQ(this.poll.questions)

      })
  }

  initQuestions(q){
    return new FormGroup({
      name: new FormControl(q.name),
      type: new FormControl(q.type),
      page:new FormControl(q.page),
      mandatory: new FormControl(q.mandatory),
      answers: new FormArray([]),
      interviewed: new FormArray([])
    })
  }

  initQ(questions: any){
    for (let i = 0; i < questions.length; i++) {
      (<FormArray>this.pollForm.controls['questions']).push(this.initQuestions(questions[i]));
      this.tabs.add(questions[i].page)
      for (let j = 0; j <questions[i].answers.length; j++) {
        (<FormArray>this.pollForm.get(['questions', i, 'answers'])).push(this.initAnswers());
      }
    }
    console.log(this.pollForm)
  }


  initAnswers(){
    return new FormGroup({
      name: new FormControl(''),
      right: new FormControl(false, Validators.requiredTrue),
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

  getInterviewed(form: any){
    return form.controls.interviewed.controls;
  }

  saveResults() {
    console.log(this.formControls.value)
    // this.pollForm.get('pages').setValue(this.tabs.length)
    this.pollService.addNewPoll(this.pollForm.value, 3).subscribe();
  }

  get formControls(){
    return this.pollForm;
  }

  onRate($event:{oldValue:number, newValue:number}, i:number) {
    // this.addPollForm.get(['questions',i,'answers',j]).setValue($event.newValue)

    console.log(`Old Value:${$event.oldValue},
      New Value: ${$event.newValue}`);

    this.pollForm.get(['questions', i,  'answers', 0, 'right']).setValue($event.newValue);
  }
}

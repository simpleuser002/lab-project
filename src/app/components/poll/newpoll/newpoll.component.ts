import { Component, OnInit } from '@angular/core';
import {FormArray, FormControl, FormGroup} from '@angular/forms';
import {PollsService} from '../../../services/polls.service';
import {AngularEditorConfig} from '@kolkov/angular-editor';

@Component({
  selector: 'app-newpoll',
  templateUrl: './newpoll.component.html',
  styleUrls: ['./newpoll.component.sass']
})
export class NewpollComponent implements OnInit {
  addPollForm: FormGroup;
  clickEdit: boolean = false;
  isRadio: boolean = false;
  isTextQuestion: boolean = false;
  isSlideQuestion: boolean = false;
   isStarQuestion: boolean = false;

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


  constructor(private pollService: PollsService) {
    this.addPollForm = new FormGroup({
      pollname: new FormControl(''),
      questions: new FormArray([this.initQuestions()])
    })
  }

  ngOnInit(): void {
  }

  initQuestions(){
    return new FormGroup({
      name: new FormControl(''),
      type: new FormControl(''),
      answers: new FormArray([this.initAnswers()])
    })
  }

  initAnswers(){
    return new FormGroup({
      name: new FormControl('answer'),
      right: new FormControl('')
    })
  }

  get formControls(){
    return this.addPollForm;
  }

  getQuestions(form){
    return form.controls.questions.controls;
  }

  addNewPoll(){
    console.log(this.formControls.value)
    this.pollService.addNewPoll(this.formControls.value, 3).subscribe();
  }

  addQuestion(i){
   // console.log(this.addPollForm.get('questions').controls[i].get('name').value);
     //this.addPollForm.patchValue({pollname: 'd'})
    this.addPollForm.controls.questions.controls[i].patchValue({type: 'radio'})
   // console.log(this.getQuestions(this.addPollForm))
 //   console.log(this.addPollForm.controls);
   (<FormArray>this.addPollForm.controls['questions']).push(this.initQuestions());
  }

  getAnswers(form: any) {
    return form.controls.answers.controls;
  }

  addAnswer(i){
    const control = <FormArray>this.addPollForm.get(['questions',i,'answers']);
    control.push(this.initAnswers());

    //(<FormArray>this.addPollForm.get('questions').controls[i]).get('questions').push(this.initAnswers());
  }

  changeQuestion(i: number) {
    this.clickEdit=true;
  }

  /*addCheckBoxQuestion(){
    this.isRadio=false;
    this.addQuestion();
  }

  addTextQuestion() {
    this.isTextQuestion=true;
    this.addQuestion();
  }

  addSlideQuestion() {
    this.isSlideQuestion=true;
    this.addQuestion();
  }

  addStarQuestion() {
    this.isStarQuestion=true;
    this.addQuestion();
  }*/

  onRate($event:{oldValue:number, newValue:number}) {
   // this.addPollForm.get(['questions',i,'answers',j]).setValue($event.newValue)

    console.log(`Old Value:${$event.oldValue},
      New Value: ${$event.newValue}`);
  }
}

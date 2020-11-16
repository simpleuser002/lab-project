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
  isRadio: boolean = true;
  isTextQuestion: boolean = false;

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

  addQuestion(){
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

  addCheckBoxQuestion(){
    this.isRadio=false;
    this.addQuestion();
  }

  addTextQuestion() {
    this.isTextQuestion=true;
    this.addQuestion();
  }
}

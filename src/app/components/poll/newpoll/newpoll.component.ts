import { Component, OnInit } from '@angular/core';
import {FormArray, FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {PollsService} from '../../../services/polls.service';
import {AngularEditorConfig} from '@kolkov/angular-editor';
import {UploadService} from '../../../services/upload.service';

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

   isNumberQuestions: boolean = false;
   isRandomQuestions: boolean  = false;
   isNumberPage: boolean = false;
   isRequiredStar: boolean= false;
   isIndicator: boolean = false;

   currentSelected:number=0;
   previousSelected:number=0;

  isSelected=new FormControl(0);
   tabs=['page '];


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
  private index: any;
  ind;
   params = ['anon', 'num_q', 'num_p', 'random_q', 'req_star', 'indicate']


  constructor(private pollService: PollsService, private uploadService: UploadService) {
    this.addPollForm = new FormGroup({
      pollname: new FormControl(''),
      parameters: new FormArray([]),
      questions: new FormArray([]),
      pages: new FormControl('')
    });
    this.initParams();
  }

  ngOnInit(): void {
  }

  initQuestions(type:string){
    switch (type){
      case '':
        return new FormGroup({
          name: new FormControl(''),
          type: new FormControl(''),
          page:new FormControl(this.isSelected.value),
          mandatory: new FormControl(false),
          answers: new FormArray([this.initAnswers()])
        })
      case 'radio':
        return new FormGroup({
          name: new FormControl(''),
          type: new FormControl('radio'),
          page:new FormControl(this.isSelected.value),
          mandatory: new FormControl(false),
          answers: new FormArray([this.initAnswers()])
        })
      case 'checkbox':
        return new FormGroup({
          name: new FormControl(''),
          type: new FormControl('checkbox'),
          page:new FormControl(this.isSelected.value),
          mandatory: new FormControl(false),
          answers: new FormArray([this.initAnswers()])
        })
      case 'text':
        return new FormGroup({
          name: new FormControl(''),
          type: new FormControl('text'),
          page:new FormControl(this.isSelected.value),
          mandatory: new FormControl(false),
          answers: new FormArray([this.initAnswers()])
        })
      case 'slider':
        return new FormGroup({
          name: new FormControl(''),
          type: new FormControl('slider'),
          page:new FormControl(this.isSelected.value),
          mandatory: new FormControl(false),
          answers: new FormArray([this.initAnswers()])
        })
      case 'star':
        return new FormGroup({
          name: new FormControl(''),
          type: new FormControl('star'),
          page:new FormControl(this.isSelected.value),
          mandatory: new FormControl(false),
          answers: new FormArray([this.initAnswers()])
        })
      case 'file':
        return new FormGroup({
          name: new FormControl(''),
          type: new FormControl('file'),
          page:new FormControl(this.isSelected.value),
          mandatory: new FormControl(false),
          answers: new FormArray([this.initAnswers()])
        })
      default:
        return new FormGroup({
          name: new FormControl(''),
          type: new FormControl('r'),
          page:new FormControl(this.isSelected.value),
          mandatory: new FormControl(false),
          answers: new FormArray([this.initAnswers()])
        })
    }

  }

 /* initRadioQuestion(){
    return new FormGroup({
      name: new FormControl(''),
      type: new FormControl(''),
      answers: new FormArray([this.initAnswers()])
    })
  }*/

  initAnswers(){
    return new FormGroup({
      name: new FormControl('answer'),
      right: new FormControl('false', Validators.requiredTrue),
    })
  }

  initParameters(p){
    return  new FormGroup({
      name: new FormControl(p),
      status: new FormControl(false)
    })
  }

  initParams(){
      this.params.forEach(p=>{
        (<FormArray>this.addPollForm.controls['parameters']).push(this.initParameters(p))
    })
  }

  get formControls(){
    return this.addPollForm;
  }

  getQuestions(form){
    return form.controls.questions.controls;
  }

  getParameters(form){
    return form.controls.parameters.controls;
  }

  savePoll(){
    console.log(this.formControls.value)
    this.addPollForm.get('pages').setValue(this.tabs.length)
    this.pollService.addNewPoll(this.formControls.value, 3).subscribe();
  }

  addQuestion(){
    console.log(this.addPollForm);

   // console.log(this.addPollForm.get('questions').controls[i].get('name').value);
     //this.addPollForm.patchValue({pollname: 'd'})
   // console.log(this.index);
    (<FormArray>this.addPollForm.controls['questions']).push(this.initQuestions('radio'));
    console.log(this.addPollForm.get('questions'));
    console.log(this.addPollForm.get(['questions']).value[0].type);
   // this.addPollForm.get(['questions', i, 'answers', this.previousSelected, 'right']).setValue('false');

   //   this.addPollForm.get(['questions', 0]).patchValue({type: 'rrrr'})
   // this.addPollForm.get(['questions', i]).patchValue({type: 'radio'})
   // console.log(this.getQuestions(this.addPollForm))
 //   console.log(this.addPollForm.controls);

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
   (<FormArray>this.addPollForm.controls['questions']).push(this.initQuestions('checkbox'));
  }

  addTextQuestion() {
    (<FormArray>this.addPollForm.controls['questions']).push(this.initQuestions('text'));
  }

  addSlideQuestion() {
    (<FormArray>this.addPollForm.controls['questions']).push(this.initQuestions('slider'));
  }

  addStarQuestion() {
    (<FormArray>this.addPollForm.controls['questions']).push(this.initQuestions('star'));
  }

  addFileQuestion() {
    (<FormArray>this.addPollForm.controls['questions']).push(this.initQuestions('file'));
  }

  onRate($event:{oldValue:number, newValue:number}, i:number) {
   // this.addPollForm.get(['questions',i,'answers',j]).setValue($event.newValue)

    console.log(`Old Value:${$event.oldValue},
      New Value: ${$event.newValue}`);

    this.addPollForm.get(['questions', i, 'answers', 0, 'right']).setValue($event.newValue);
  }


  selected(i:number, j: number) {
    this.currentSelected=j;
    if(this.previousSelected!=this.currentSelected){
      this.addPollForm.get(['questions', i, 'answers', this.previousSelected, 'right']).setValue('false');
      this.previousSelected=this.currentSelected;
    }
        console.log(i,j)
  }

  onFileChange($event: Event, i:number) {
    console.log('sd')
    if((<HTMLInputElement>$event.target).files.length>0){
      const file = (<HTMLInputElement>$event.target).files[0];
      this.addPollForm.get(['questions', i, 'answers', 0, 'right']).setValue(file.name);
    }
    this.uploadFile(i)
  }

  uploadFile(i){
    const formData= new FormData();
    formData.append('file', this.addPollForm.get(['questions', i, 'answers', 0, 'right']).value )

      this.uploadService.upload(formData).subscribe(()=>console.log('created'))


  }


  addTab(){
    this.tabs.push('page' + this.isSelected.value)
      this.isSelected.setValue(this.tabs.length -1 )
    console.log(this.isSelected.value)
    console.log(this.tabs)
  }


  removeTab(index: number){
    console.log(index)

    console.log(this.tabs)
    this.addPollForm.get('questions').value.forEach(q=>{
      if(q.page==index ){
   (<FormArray>this.addPollForm.get('questions')).removeAt(q.page)
        console.log(q)
      }
      if (q.page>index){
        q.page--;
      }
    });
    /* this.addPollForm.get('questions').value.forEach(q=>{
          if (index!=0 || this.tabs.length-1 !=index){
            q--;
          }
        });*/

    this.tabs.splice(index, 1);
    console.log(this.tabs )
  console.log(this.addPollForm.get('questions'))
    console.log(this.isSelected.value)
  }

  checkForParameters(event: Event){

this.isNumberQuestions=true;
     this.addPollForm.get('parameters').value.forEach(p=> {
       console.log(p.status)
       switch (p.name) {
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


  saveAsTemplate(){

  }


}

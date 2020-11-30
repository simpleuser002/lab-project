import { Component, OnInit } from '@angular/core';
import {PollsService} from '../../../services/polls.service';
import {Poll} from '../../../models/poll';
import {FormControl} from '@angular/forms';
import {ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import {Label} from 'ng2-charts';
import {Question} from '../../../models/question';
import {AuthServiceService} from '../../../services/auth-service.service';
import {User} from '../../../models/user';
import {ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-poll-results',
  templateUrl: './poll-results.component.html',
  styleUrls: ['./poll-results.component.sass']
})
export class PollResultsComponent implements OnInit {
  poll: Poll;
  allPages: number

  questions: Question[]

  isSelected=new FormControl(0);
  pages = new Set();
  interviewedPeople= new Set();
  results = new Map();
  interviewedCount=0;

  questionsShow = new FormControl();
  questionsShowList: string[] = [];

  interviewedShow = new FormControl();

  resultsForAllQuestions: boolean=true;
  resultsForSelectedInterviewed: boolean=false;

  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'horizontalBar';
  public barChartLegend = true;
  //public barChartPlugins = [pluginDataLabels];

  public barChartData: ChartDataSets[] = [
    { data: [], label: '', backgroundColor: 'orange' }
  ];
  private currentUser: User;
  private pollname: any;




  constructor(private pollService: PollsService, private authService: AuthServiceService, private activateRoute: ActivatedRoute) {
    this.activateRoute.params.subscribe(params => this.pollname =params['pollname'])
    this.authService.currentUserObservable.subscribe(data => this.currentUser = data);
  }

  ngOnInit(): void {
    this.getPollById();
    this.questionsShowList.push('all')
  }


  getPollById(){
      this.pollService.getPollById(this.currentUser.id, this.pollname).subscribe(data=> {
        this.poll = data;
        this.allPages=this.poll.pages;
        this.getQuestionsFromPoll(this.poll.questions)

      })
  }

  getQuestionsFromPoll(questions: any){
   /* this.questionsShow.value.forEach(qs=>{*/


    questions.forEach(q=>{
      this.pages.add(q.page)
      this.calculateAnswers(q.interviewed);
      console.log(this.pages)


      this.questionsShowList.push(q.name)
     /* if(this.questionsShow.value.length!=0 && qs==q.name){
        this.questions.push(q);
      }*/


      q.answers.forEach(a=>{
        this.barChartLabels.push(a.name);
        this.barChartData[0].data.push(a.total);
        /*  this.barChartData.push({data: data.map(item=>item.cool_data)})*/
      })
    })
   /* })*/
  }

  private calculateAnswers(interviewed: any) {






      interviewed.forEach(i=>{
        this.interviewedPeople.add(i.username);
        console.log(this.interviewedPeople)
      })
  }

  updateQuestionsShow() {
    console.log(this.questionsShow)
  }



  getResultsForAllQuestions(){
    this.resultsForAllQuestions=true;
    this.resultsForSelectedInterviewed=false;
  }


  getResultsForSelectedInterviewed(){
    this.resultsForSelectedInterviewed=true;
    this.resultsForAllQuestions=false;
  }

  updateInterviewedShow() {

  }
}

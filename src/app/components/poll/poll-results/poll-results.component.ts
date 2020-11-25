import { Component, OnInit } from '@angular/core';
import {PollsService} from '../../../services/polls.service';
import {Poll} from '../../../models/poll';
import {FormControl} from '@angular/forms';
import {ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import {Label} from 'ng2-charts';


@Component({
  selector: 'app-poll-results',
  templateUrl: './poll-results.component.html',
  styleUrls: ['./poll-results.component.sass']
})
export class PollResultsComponent implements OnInit {
  poll: Poll;
  allPages: number

  isSelected=new FormControl(0);
  pages = new Set();
  interviewedPeople= new Set();
  results = new Map();
  interviewedCount=0;

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
    { data: [], label: '' }
  ];




  constructor(private pollService: PollsService) { }

  ngOnInit(): void {
    this.getPollById();
  }


  getPollById(){
      this.pollService.getPollById(1, 'poll2').subscribe(data=> {
        this.poll = data;
        this.allPages=this.poll.pages;
        this.poll.questions.forEach(q=>{
          this.pages.add(q.page)
          this.calculateAnswers(q.interviewed);
          console.log(this.pages)


          q.answers.forEach(a=>{
            this.barChartLabels.push(a.name);
            this.barChartData[0].data.push(a.total);
          })
        })

      })
  }

  private calculateAnswers(interviewed: any) {
      if(interviewed.username!='anon'){
        this.interviewedPeople.add(interviewed.username);
      }


      interviewed.forEach(i=>{

      })
  }
}

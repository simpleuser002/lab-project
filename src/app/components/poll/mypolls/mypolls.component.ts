import {AfterViewChecked, AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {PollsService} from '../../../services/polls.service';
import {Poll} from '../../../models/poll';
import {AuthServiceService} from '../../../services/auth-service.service';
import {User} from '../../../models/user';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {Router} from '@angular/router';

@Component({
  selector: 'app-mypolls',
  templateUrl: './mypolls.component.html',
  styleUrls: ['./mypolls.component.sass']
})
export class MypollsComponent implements OnInit, AfterViewInit {


  polls : MatTableDataSource<Poll>;
  columns: string[] = ['pollname', 'questions', 'reference', 'results'];
  private currentUser: User;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private pollService: PollsService, private authService: AuthServiceService,
              private router: Router) {
    this.authService.currentUserObservable.subscribe(data => this.currentUser = data);
  }

  ngOnInit(): void {
    this.getPollsById();
    this.polls.paginator = this.paginator;
  }

  ngAfterViewInit() {
  /*  this.polls.paginator = this.paginator;
    console.log(this.polls)*/
  }

  getPollsById(){
     this.pollService.getAllPollsById(String(this.currentUser.id)).subscribe(data => {
       console.log(data);
       this.polls = data

     console.log(this.polls)});
  }

  //todo change to id
  setReference(name: string){
    this.pollService.setReference(this.generateRandomString(6), name, this.currentUser.id).subscribe()
  }

  generateRandomString(length:number){
    let randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for ( var i = 0; i < length; i++ ) {
      result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    console.log('localhost:4200/poll/ref/'+result)
    return result;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log(filterValue)
    this.polls.filter = filterValue.trim().toLowerCase();
    console.log(this.polls)

    if (this.polls.paginator) {
      this.polls.paginator.firstPage();
    }
  }
  /*onPageFired(event){
    this.pollService.getAllPollsById(String(this.currentUser.id)).subscribe((data)=>{
      // then you can assign data to your dataSource like so
      this.polls = data
    })
  }*/
  goToResults(pollname: string) {
    this.router.navigate(['/poll/results/' + this.currentUser.id + '/' + pollname])
  }
}

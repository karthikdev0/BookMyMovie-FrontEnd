import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { theatreDetails } from 'src/_interfaces/theatreDetails.model';
import { ticketClass } from 'src/_interfaces/ticketClass.model';
import { TicketSucess } from 'src/_interfaces/ticketSuccess.model';
import { MovieListComponent } from '../movie-list/movie-list.component';
import { GeneralService } from '../services/general.service';
import { MovieService } from '../services/movie.service';
import { TicketService } from '../services/ticket.service';

@Component({
  selector: 'app-movie-ticket-booking',
  templateUrl: './movie-ticket-booking.component.html',
  styleUrls: ['./movie-ticket-booking.component.css']
})
export class MovieTicketBookingComponent implements OnInit {


  user:any;
  theatreData: theatreDetails[] = [];
  public  movieId:any;
  username :any;
  mId:number=0;
 
/* ticketPrint:TicketSucess={
  createdDate: new Date(),
  fullName: '',
  numOfSeats: 0,
  price: 0,
  theatreCity: '',
  theatreName: '',
  ticketClass: '',
  ticketId: 0,
  title: '',
  movieDate: new Date()
} */
ticketPrintArray:TicketSucess[]=[];


  constructor(private location:Location,
    private mservice:MovieService,
    private service:GeneralService,
    private route: ActivatedRoute,
    private router: Router,
    private tService:TicketService
    ) { 
      this.route.params.subscribe( params => {}  );
    }

  ngOnInit(): void {
 
  this.route.params.subscribe( params => this.movieId= params['id']);
  this.username = localStorage.getItem('username');
 // console.log(this.movieId);
 
 // this.getCurrentMovie();

  this.getTheatreDetails();

//console.log(this.getMovie);
    
  }


  

  takeMetoDashBoard(){
    this.router.navigate(['dashboard',this.username]);
  }




  getTheatreDetails(){
    this.tService.getTheatreDetails(this.movieId).subscribe( (res) => {
      this.theatreData =  res as [];
    //  console.log(res);
    });
  }

  recommendedId(id:number){
   // console.log(id);
    this.mId= id;
  }




  public getCurrentUser(){

    let details = localStorage.getItem("userdetails");
    if(details != null){
      this.user  = JSON.parse(details);
    }

  }



  ticketDetailsPrint(event:TicketSucess[]){
      this.ticketPrintArray = event ;
     // console.log(event);
     // console.log(this.ticketPrintArray);
  }

}



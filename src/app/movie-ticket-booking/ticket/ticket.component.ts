import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { TicketSucess } from 'src/_interfaces/ticketSuccess.model';
@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {

  
  ticketPrintArray:TicketSucess[]=[];
  ticket:TicketSucess = {
    createdDate: new Date(),
    fullName: '',
    numOfSeats: 0,
    price: 0,
    screenDate: new Date(),
    screenTimeEnd: new Date(),
    screenTimeStart: new Date(),
    seatClass: '',
    seatNumber: '',
    theatreCity: '',
    theatreName: '',
    ticketClass: '',
    ticketId: 0,
    title: '',
    bookingId: '',
    screenName: '',
    movieId: 0,
    reviewId: 0,
    rating: 0,
    reviewContent: ''
  }
  username:any;
  constructor(private route:ActivatedRoute,private location:Location,private router:Router) { }

  ngOnInit(): void {
  this.username = localStorage.getItem('username');
this.ticket = history.state.TicketArray;
  }

  takeMetoDashBoard(){
    this.router.navigate(['dashboard',this.username]);
  }


}

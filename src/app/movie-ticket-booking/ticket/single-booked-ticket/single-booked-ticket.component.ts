import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TicketSucess } from 'src/_interfaces/ticketSuccess.model';

@Component({
  selector: 'app-single-booked-ticket',
  templateUrl: './single-booked-ticket.component.html',
  styleUrls: ['./single-booked-ticket.component.css']
})
export class SingleBookedTicketComponent implements OnInit {


  username:any;
  ticket:TicketSucess={
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
  constructor(private router:Router) { }

  ngOnInit(): void {
    this.username = localStorage.getItem('username');
    this.ticket = history.state.ticket;
    console.log(this.ticket)

  }

  takeMetoDashBoard(){
    this.router.navigate(['dashboard',this.username]);
  }

}

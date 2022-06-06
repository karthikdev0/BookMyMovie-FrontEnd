import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { movieTicketBooking } from 'src/_interfaces/movieTicketBooking.model';
import { theatreDetails } from 'src/_interfaces/theatreDetails.model';
import { ticketBooking } from 'src/_interfaces/ticketBooking.model';
import { TicketSucess } from 'src/_interfaces/ticketSuccess.model';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  bookingUrl = 'https://localhost:7254/movieBooking/'; 
  ticketUrl = 'https://localhost:7254/ticket/'
   
  constructor(private http:HttpClient) { }


  getTheatreDetails(movieId:number):Observable<theatreDetails[]>{
    return this.http.get<theatreDetails[]>(this.bookingUrl + 'getAllTheatreDataByMovieId/' + movieId);
  }

  ticketBooking(model:movieTicketBooking):Observable<TicketSucess[]>{
    return this.http.post<TicketSucess[]>(this.bookingUrl+ 'movieTicketBooking',model);
  }

  getSeatsByScreenId(screenId:number):Observable<any>{
    return this.http.get<any>(this.bookingUrl + 'getAllAvailableSeats/' + screenId);
  }
  getAllSeatsByScreenId(screenId:number):Observable<any>{
    return this.http.get<any>(this.bookingUrl + 'getAllSeats/' + screenId);
  }

  getAllTicketTitle(userId:number):Observable<any>{
    return this.http.get<any>(this.ticketUrl + 'getAllTicketsTitles/' + userId);
  }
 // https://localhost:7254/ticket/getAllTicketsByuserAndMovie

 getFullTicketDetails(userId:number,title:string):Observable<any>{
  let params  = new HttpParams();
  params.append("userId",userId);
  params.append("title",title);
  //return this.http.get<any>(this.ticketUrl + 'getAllTicketsByuserAndMovie/',{params:params})
  return this.http.get<any>(this.ticketUrl + 'getAllTicketsByuserAndMovie?userId='+userId +'&title='+title);
 }



}

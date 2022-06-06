import { Movie } from "./movie.model";
import { Ticket } from "./ticket.model";
import { user } from "./user.model";

export interface ticketBooking{
    //movie:Movie;
    ticket:Ticket;
   // user:user;
    movieId:number;
    userId:number;
}
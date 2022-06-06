import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { movieFilter } from 'src/_interfaces/movieFilter.model';
import { ticketBooking } from 'src/_interfaces/ticketBooking.model';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  Url = 'https://localhost:7254/movie'; 
  bookingUrl = 'https://localhost:7254/movieBooking/';  
  searchUrl="https://localhost:7254/search/movie/" ;
  
  constructor(private http:HttpClient) { }



  getAll():Observable<any[]>{
    //  return this.http.get<MovieVM[]>(this.Url + 'getAll').subscribe(data => {this.list=data; console.log(data);});
       return this.http.get<any>(this.Url + '/getAll')
   }
   

   

   
     ticketBooking(model:ticketBooking):Observable<ticketBooking>{
       const httpOptions = { headers : new HttpHeaders ( {'Content-Type':'application/json'})  };
       return this.http.post<ticketBooking>(this.bookingUrl+ 'TicketBooking',model,httpOptions);
     }
   
     FilterMovieByTitle(title:any):Observable<any[]>{
       return this.http.get<any>(this.searchUrl+'title/'+title);
     }
     FilterMovieByTags(tags:any):Observable<any[]>{
       return this.http.get<any>(this.searchUrl+'tags',{params:{tags:tags}});
     }

     FilterMovieByRatings(rating:number):Observable<any[]>{
       return this.http.get<any>(this.searchUrl + 'rating/'+rating);
     }
   

   
     FilterMovieByParam(movie:any):Observable<any>{
     //  return this.http.post<any[]>(this.searchUrl+'params' ,movie);
     return this.http.get<any>(this.searchUrl+'params',{params:movie});
     }

     RecommendMovieByTags(model:any):Observable<any>{
       return this.http.get<any>(this.searchUrl+'recommendationByTags',{params:model});
     }

     LatestReleasedMovies():Observable<any>{
       return this.http.get<any>(this.searchUrl+'latestMovies');
     }

}

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { login } from 'src/_interfaces/login.model';
import { review } from 'src/_interfaces/review.model';
import { user } from 'src/_interfaces/user.model';
import { userDetails } from 'src/_interfaces/userDetails.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {




 //private Username :BehaviorSubject<string> = new BehaviorSubject<string>("");
 // dataUsername:Observable<string> = this.Username.asObservable();

 username = new Subject();
 role = new Subject();
 isLoggedIn = new BehaviorSubject<boolean>(false);

  
  
  


  
 
 constructor(private http:HttpClient) {
  }
 

 url = "https://localhost:7254/user/";
 authUrl = "https://localhost:7254/user-authentication/";
 bookingUrl = 'https://localhost:7254/movieBooking/';  
 reviewUrl = 'https://localhost:7254/review/';

  insertReview(review:review):Observable<any>{
   return this.http.post<any>(this.reviewUrl +'addReview' ,review);
  }

  getMovieReviewByuserId(userdId:number,movieId:number):Observable<any>{
    return this.http.get<any>(this.reviewUrl + 'getMovieReviewByUserId',
    {params : new HttpParams().set('userId',userdId).set('movieId',movieId)});
  }

  getAllReviewsByUserId(userId:number):Observable<any>{
    return this.http.get<any>(this.reviewUrl +'getAllReviewsByUserId/' + userId);
  }

  getMovieReviewsByMovieId(movieId:number):Observable<any>{
    return this.http.get<any>(this.reviewUrl + 'getAllReviewsByMovieId/' + movieId);
  }


  insertUser(user:user):Observable<user>{
    return this.http.post<user>(this.url + 'addUser',user);
  }

  getUserByUserName(userName:string):Observable<user>{
    return this.http.get<user>(this.url + 'getUserByName/' + userName);
  }
  loginUser(data:login):Observable<any>{
    const httpOptions = { headers : new HttpHeaders ( {'Content-Type':'application/json'})  };
    return this.http.post<any>(this.authUrl +'login',data,httpOptions);
  }

  getUserDetailsByUserName(userName:any):Observable<any>{
    return this.http.get<any>(this.url+'getUserDetailsByUserName?username='+userName);
  }

  getUserTicketDetails(userId:number):Observable<any[]>{
    return this.http.get<any[]>(this.bookingUrl+'getAllTickets/'+userId);
  }

  getUserDetails():Observable<any>{
    return this.http.get<any>(this.url + 'getUserDetails');
  }

  registerUser(data:any):Observable<any>{
    return this.http.post<any>(this.authUrl + 'register',data);
  }
  registerUserDetails(data:any):Observable<any>{
    return this.http.post<any>(this.url+'addUser',data);
  }
}

import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-movie-reviews',
  templateUrl: './movie-reviews.component.html',
  styleUrls: ['./movie-reviews.component.css']
})
export class MovieReviewsComponent implements OnInit ,OnChanges {

  @Input() movieId:number = 0;
  //@Output() allReviews =  new EventEmitter<any[]>();


  currentMovieId:number =0;

  myReviews:any[] =[];

  constructor(private userService:UserService) { }
  ngOnChanges(changes: SimpleChanges): void {
    this.currentMovieId = changes['movieId'].currentValue;
   // console.log(this.currentMovieId);

    this.getMovieReviews();
  //  console.log(this.myReviews);
  }

  ngOnInit(): void {
    this.getMovieReviews();
  }

  getMovieReviews(){
    this.userService.getMovieReviewsByMovieId(this.currentMovieId).
    subscribe( res => {
    //  console.log(res);
      this.myReviews =  res as [];
    //  this.myReviews = this.myReviews.filter( (x) => x.rating >= 4)
    } )
  }



}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { review } from 'src/_interfaces/review.model';

@Component({
  selector: 'app-write-review',
  templateUrl: './write-review.component.html',
  styleUrls: ['./write-review.component.css']
})
export class WriteReviewComponent implements OnInit {

  @Input() userId:number=0;
  @Input() title:string ='';

  @Output() isSubmitClicked = new EventEmitter<boolean>();

  @Input() reviewModel:review={
    reviewId: 0,
    rating: 0,
    review_Content: '',
    movieId: 0,
    userId: 0
  }
  starRating:number=5;
  reviewContent:string='';
  movieId:number=0;
 // userId:number=0;
  review:review={
    reviewId: 0,
    rating: 0,
    review_Content: '',
    movieId: 0,
    userId: 0
  }
  constructor(private uService:UserService) { }

  ngOnInit(): void {
    this.movieId = history.state.movieId;
    console.log(history.state.movieId)
    this.userId =  history.state.userId;

    this.starRating = this.reviewModel.rating;

    this.reviewContent = this.reviewModel.review_Content;
  }

  submitReview(){
 //   this.review.review_Content= this.reviewContent;
//    this.review.rating = this.starRating;
 //   this.review.userId = this.userId;
    this.review = {
      review_Content : this.reviewContent,
      reviewId :this.reviewModel.reviewId,
      movieId :this.reviewModel.movieId,
      rating :this.starRating,
      userId :this.reviewModel.userId
    }
    console.log(this.review);

    this.uService.insertReview(this.review).subscribe(
      res => {
        console.log(res);
        this.isSubmitClicked.emit(true);
      }
    )
  }
}

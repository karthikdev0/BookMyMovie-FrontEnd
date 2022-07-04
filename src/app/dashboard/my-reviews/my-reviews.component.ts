import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-my-reviews',
  templateUrl: './my-reviews.component.html',
  styleUrls: ['./my-reviews.component.css']
})
export class MyReviewsComponent implements OnInit {

  myReviews:any;

  constructor(private uService:UserService) { }

  ngOnInit(): void {
    this.getAllReviewsByUserId();
  }

  getAllReviewsByUserId(){
   let userDetails = localStorage.getItem('userdetails');
   let User;
   if(userDetails != null){
        User  = JSON.parse(userDetails);
   }

   this.uService.getAllReviewsByUserId(User.userId).subscribe( (res) => {
    //console.log(res)
          this.myReviews =  res as  [];
  });

  }

}

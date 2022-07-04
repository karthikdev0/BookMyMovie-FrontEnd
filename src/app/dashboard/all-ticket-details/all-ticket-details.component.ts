import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ReviewModalComponent } from 'src/app/review-modal/review-modal.component';
import { MovieService } from 'src/app/services/movie.service';
import { TicketService } from 'src/app/services/ticket.service';
import { UserService } from 'src/app/services/user.service';
import { review } from 'src/_interfaces/review.model';
import { TicketSucess } from 'src/_interfaces/ticketSuccess.model';

@Component({
  selector: 'app-all-ticket-details',
  templateUrl: './all-ticket-details.component.html',
  styleUrls: ['./all-ticket-details.component.css']
})
export class AllTicketDetailsComponent implements OnInit,AfterViewInit {

  role:any;
  ticketsDetails:TicketSucess[] =[];
  ticketTitle:any[]=[];
  isClicked:boolean=false;

  reviewModel:review={
    reviewId: 0,
    rating: 0,
    review_Content: '',
    movieId: 0,
    userId: 0
  }

  ratingControl = new FormControl();
  movieId:number =0;

  starRating:number = 0; 
  togglerating:boolean = false;

  userDetails:any;




  constructor(private userService:UserService,
    private mService:MovieService,private tService:TicketService,private router:Router
    ,public route:ActivatedRoute,private dialog:MatDialog,private cdr: ChangeDetectorRef) { 

    
     
    }
    ngAfterViewInit(): void {
      this.ticketSource.paginator = this.paginator;
      this.ticketSource.sort = this.sort;
    }
    displayedColumns: string[] = ['title', 'theatreName', 'screenDate','screenTimeStart','actions'];
    ticketSource = new MatTableDataSource<TicketSucess>();
    @ViewChild(MatPaginator,{static: false}) paginator!: MatPaginator;
    @ViewChild(MatSort)sort!: MatSort;
  ngOnInit(): void {
    this.role = localStorage.getItem('role');
    let details = localStorage.getItem('userdetails');
    if(details != null){
     this.userDetails =  JSON.parse(details);
    }
    this.getUserTicketDetails();
  }

  addRating(movieId:number){
    this.movieId = movieId;
    this.togglerating = ! this.togglerating;
  }

  getUserTicketDetails(){
 
   
     this.userService.getUserTicketDetails(this.userDetails.userId).subscribe(
      (res) => { 
        this.ticketsDetails = res as [];
       this.ticketSource.data = this.ticketsDetails;
      }
    ) 
    this.tService.getAllTicketTitle(this.userDetails.userId).subscribe(
      (res) => {
        this.ticketTitle =  res as [];
      }
    )
  }
title:string='';
  getFullTicketDetails(title:string){
    this.isClicked = !this.isClicked;
    this.title = title;
  }

  toWriteReview(ticket :TicketSucess){
  
    const dialogConfig  = new MatDialogConfig();
    let review :review={
      reviewId: ticket.reviewId,
      rating: ticket.rating,
      review_Content: ticket.reviewContent,
      movieId: ticket.movieId,
      userId: this.userDetails.userId
    }
    dialogConfig.autoFocus = true;
    dialogConfig.width =  '600px',
    dialogConfig.height =  '400px',
    dialogConfig.data = {
     reviewModel:review
    };
    this.dialog.open(ReviewModalComponent,dialogConfig)
  }
  



  updateRating(id:number){
  this.reviewModel ={
      reviewId: 0,
   rating:this.starRating,
    review_Content: '',
    movieId: id,
  userId:this.userDetails.userId
    }
   this.userService.insertReview(this.reviewModel).subscribe( res => 
   { 
  //  console.log(res)
   }
   );
  }

  getUserRating(userId:number,movieId:number){
    this.userService.getMovieReviewByuserId(userId,movieId)
    .subscribe( res => { 
      //console.log(res);
      this.starRating = res.rating;
    })
  }











}






  

  

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
   // this.userService.getMovieReviewByuserId()
 //  this.cdr.detectChanges(); 
 //  this.dataSource.paginator = this.paginator;
  }

  addRating(movieId:number){
    this.movieId = movieId;
    this.togglerating = ! this.togglerating;
  }

  getUserTicketDetails(){
 
   
     this.userService.getUserTicketDetails(this.userDetails.userId).subscribe(
      (res) => { 
        this.ticketsDetails = res as [];
         // console.log(this.ticketsDetails);
       this.ticketSource.data = this.ticketsDetails;
     //   console.log(this.ticketSource.data);
      }
    ) 
    this.tService.getAllTicketTitle(this.userDetails.userId).subscribe(
      (res) => {
        console.log(res);
        this.ticketTitle =  res as [];
      }
    )
  }
title:string='';
  getFullTicketDetails(title:string){
    this.isClicked = !this.isClicked;
    this.title = title;
/*     this.tService.getFullTicketDetails(this.userDetails.userId,title).subscribe(
      (res) => {
        console.log(res);
        this.ticketsDetails = res as [];
      }
    ) */
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
    //dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width =  '600px',
    dialogConfig.height =  '400px',
    dialogConfig.data = {
     reviewModel:review
    };
    this.dialog.open(ReviewModalComponent,dialogConfig)
  //  this.router.navigate(['../write-review'], {relativeTo:this.route,state:{movieId:movieId,userId:userId}}  );
  }
  



  updateRating(id:number){

    console.log(this.ratingControl.value);
    console.log(id);

    this.reviewModel ={
      reviewId: 0,
   // rating: this.ratingControl.value,
   rating:this.starRating,
    review_Content: '',
    movieId: id,
  //  userId: this.ticketsDetails[0].userId
  userId:this.userDetails.userId
    }

    console.log(this.reviewModel);

   this.userService.insertReview(this.reviewModel).subscribe( res => console.log(res));
   // this.mService.updateMovieRating(this.ratingControl.value,id)
    //.subscribe( res => console.log(res));


  }

  getUserRating(userId:number,movieId:number){
    this.userService.getMovieReviewByuserId(userId,movieId)
    .subscribe( res => { console.log(res);
            this.starRating = res.rating;
    })
  }











}






  

  

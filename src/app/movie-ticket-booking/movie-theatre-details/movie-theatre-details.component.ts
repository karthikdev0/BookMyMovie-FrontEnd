import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from 'src/app/services/movie.service';
import { TicketService } from 'src/app/services/ticket.service';
import { TicketBookingModalComponent } from 'src/app/ticket-booking-modal/ticket-booking-modal.component';
import { theatreDetails } from 'src/_interfaces/theatreDetails.model';

@Component({
  selector: 'app-movie-theatre-details',
  templateUrl: './movie-theatre-details.component.html',
  styleUrls: ['./movie-theatre-details.component.css']
})
export class MovieTheatreDetailsComponent implements OnInit,OnChanges {

  @Input() TheatreData : theatreDetails[] =[];
  @Input() mId :number=0;

  movieId:number =0;
  username:any;
  getMovie:any;
  movie:any;

  toggleTheatreData:boolean = true;

  availableTheatreDetails:theatreDetails[]=[];

  constructor(private route:ActivatedRoute,
    private mService:MovieService,
    private tService:TicketService,
    private dialog:MatDialog
    ) { 
    //  this.route.params.subscribe( params => this.movieId= params['id']);
   //   console.log(this.movieId);
   //   this.getCurrentMovie();
    }
  ngOnChanges(changes: SimpleChanges): void {
    
   this.availableTheatreDetails = changes['TheatreData'].currentValue;
  
  this.movieId = changes['mId'].currentValue;
  this.route.params.subscribe( params => this.movieId= params['id']);
   //console.log(this.movieId);
   this.getCurrentMovie();
  }

  ngOnInit(): void {
 //   this.route.params.subscribe( params => this.movieId= params['id']);
    this.username = localStorage.getItem('username');
 //   console.log(this.movieId);
 //   this.getCurrentMovie();
  }

  public createImgPath = (serverPath: string) => {
    // return `https://localhost:7254/${serverPath}`;
     return this.mService.getMovieImagePath(serverPath);
   }
 
 
 

   public getCurrentMovie(){
    this.mService.getMovieById(this.movieId).subscribe( (res) =>{
     // console.log(res);
      this.getMovie = res;
   //   console.log(this.getMovie);
      this.movie = this.getMovie;    
    }
      );
 //console.log(this.getMovie);
   
  }


toggleTheatreDetails(){
this.toggleTheatreData = ! this.toggleTheatreData;
  }

  openTicketController(){
    const dialogConfig  = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = this.availableTheatreDetails;

   // console.log(this.availableTheatreDetails);
    this.dialog.open(TicketBookingModalComponent,dialogConfig);
  }

}

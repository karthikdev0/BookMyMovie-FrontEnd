import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { GeneralService } from 'src/app/services/general.service';
import { MovieService } from 'src/app/services/movie.service';
import { Movie } from 'src/_interfaces/movie.model';

@Component({
  selector: 'app-movie-recommendation',
  templateUrl: './movie-recommendation.component.html',
  styleUrls: ['./movie-recommendation.component.css']
})
export class MovieRecommendationComponent implements OnInit ,OnChanges {

  @Input() MovieId:number =0;
  @Output() RecommendedMovieId  = new EventEmitter<number>();
 

  movies:Movie[] =[];
  tags:string[]=[];

  constructor(private gService:GeneralService,private mService:MovieService
    ,private router:Router) { }



  ngOnChanges(changes: SimpleChanges): void {
    let id  = changes['MovieId'].currentValue;

    this.mService.getMovieById(id)
    .subscribe( (res) => {
      this.tags =  res.tags.split(",")
      //console.log(this.tags)
      this.gService.RecommendMovieByTags({movieId:id,tags:this.tags[0]}).subscribe(
        (res) => {
          console.log(res);
          this.movies = res as [];
        }
      )
    })
    




  }

  public createImgPath = (serverPath: string) => {
    // return `https://localhost:7254/${serverPath}`;
     return this.mService.getMovieImagePath(serverPath);
   }

  ngOnInit(): void {
  }

  toTicketBookingPage(id:number){
    this.RecommendedMovieId.emit(id);
this.router.navigateByUrl("movie-ticket-booking/" + id).then( () => {
  window.location.reload();
});
  }

}

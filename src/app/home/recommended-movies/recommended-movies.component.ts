import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GeneralService } from 'src/app/services/general.service';
import { MovieService } from 'src/app/services/movie.service';
import { Movie } from 'src/_interfaces/movie.model';

@Component({
  selector: 'app-recommended-movies',
  templateUrl: './recommended-movies.component.html',
  styleUrls: ['./recommended-movies.component.css']
})
export class RecommendedMoviesComponent implements OnInit {

  movieList1:Movie[]=[];

  movieList2:Movie[]=[];

  recommendedMoviesList:Movie[]=[];

  constructor(private gService:GeneralService,private mService:MovieService
    ,private router:Router) { 

  }

  ngOnInit(): void {
    const tags = ['TagA']
    this.gService.FilterMovieByTags(tags).subscribe(
      (res) =>{
        this.movieList1 = res as [];
        console.log(this.movieList1);
      }
    ) 

    this.gService.FilterMovieByRatings(3).subscribe(
      (res) => {
        this.movieList2 = res as [];
       // console.log(this.movieList2);
      }
    )

    this.gService.LatestReleasedMovies().subscribe( res => this.recommendedMoviesList = res as []);
  }

  public createImgPath = (serverPath: string) => {
    // return `https://localhost:7254/${serverPath}`;
     return this.mService.getMovieImagePath(serverPath);
   }



  toTicketBookingPage(id:number){
   // this.RecommendedMovieId.emit(id);
this.router.navigateByUrl("movie-ticket-booking/" + id).then( () => {
 // window.location.reload();
});


}
}

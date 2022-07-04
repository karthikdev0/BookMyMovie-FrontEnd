import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/services/movie.service';
import { Movie } from 'src/_interfaces/movie.model';
import { MovieToCreate } from 'src/_interfaces/movieToCreate.model';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';


@Component({
  selector: 'app-movie',
 // templateUrl: 'src/app/dashboard/insert-movie-record/movie/movie.component.html',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {


  ratingsList:number[] = [1,2,3,4,5] ;

  public title: string='';
  public description: string ='';
  public ratings:number= 0;
  public posterImgPath:string ='';
  public releaseDate: Date =  new Date();

  public movie: MovieToCreate = {
    title: '',
    ratings: 0,
    description: '',
    posterImgPath :'',
    releaseDate: new Date(),
    tags:'',
    isDeleted:false
  };
  public movies: Movie[] = [];
  public response: {dbPath: ''};

  constructor(private movieService:MovieService){
    this.response = {
      dbPath:''
    };
  }

  ngOnInit(){
    this.getmovies();
  }

  public onCreate = () => {
    this.movie = {
      title: this.title,
      ratings: this.ratings,
      description:this.description,
      releaseDate:this.releaseDate,
      posterImgPath: this.response.dbPath,
      tags:'',
      isDeleted:false
    }
    console.log(this.movie);

/*     this.http.post('https://localhost:7254/movie/addMovie', this.movie)
    .subscribe( res => {
      this.getmovies();
    }); */

    this.returnToCreate();

     this.movieService.insertMovie(this.movie).subscribe(res => {
      this.getmovies();
    }); 
    
  }

  private getmovies = () => {


     this.movieService. getAllMovies().subscribe((res) => {
      this.movies = res as [];
    }); 
  }

  public returnToCreate = () => {
    this.title = '',
    this.ratings = 0,
    this.description = '',
    this.releaseDate = new Date()
  }

  public uploadFinished = (event:any) => {
    console.log(event);
    this.response = event.body;
  }

 /*  public createImgPath = (serverPath: string) => {
    return `https://localhost:7254/${serverPath}`;
  } */

  public createImgPath = (serverPath:string) => {
    return this.movieService.getMovieImagePath(serverPath);
  }

}

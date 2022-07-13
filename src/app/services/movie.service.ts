import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Movie } from 'src/_interfaces/movie.model';
import { MovieToCreate } from 'src/_interfaces/movieToCreate.model';

@Injectable({
  providedIn: 'root'
})
export class MovieService {


  movieToEdit = new BehaviorSubject<Movie>( {
    id: 0,
    title: '',
    ratings: 0,
    description: '',
    posterImgPath :'',
    releaseDate: new Date(),
    tags:'',
    isDeleted:false
  });


  Url = 'https://localhost:7254/movie'; 
  ImgUrl = 'https://localhost:7254/';
  
  constructor(private http:HttpClient) { }

 
  getMovieImagePath(path:string){
    return this.ImgUrl+path;
  }

  getAllMovies():Observable<any[]>{
    //  return this.http.get<MovieVM[]>(this.Url + 'getAll').subscribe(data => {this.list=data; console.log(data);});
       return this.http.get<any>(this.Url + '/getAll')
   }
   
     getMovieById(id:number):Observable<any>{
       return this.http.get<any>(this.Url + '/getById/'+ id);
     }
   
     insertMovie(movie:MovieToCreate):Observable<Movie>{
       const httpOptions = { headers : new HttpHeaders ( {'Content-Type':'application/json'})  };
       return this.http.post<Movie>(this.Url + '/addMovie',movie,httpOptions);
     }
   
     updateMovie(movie:Movie):Observable<Movie>{
       const httpOptions = { headers : new HttpHeaders ( {'Content-Type':'application/json'})  };
       return this.http.put<Movie>(this.Url + '/updateMovie',movie,httpOptions);
     }
   
     deleteMovieById(id:number):Observable<number>{
       //const httpOptions = { headers : new HttpHeaders ( {'Content-Type':'application/json'})  };
       return this.http.post<number>(this.Url + '/deleteMovie?id=' + id,null);
     }

     getAllMovieTitles():Observable<any>{
       return this.http.get<any>(this.Url+'/getAllMovieTitles');
     }

     uploadMoviePoster(data:any,eventData:any):Observable<any>{
        return this.http.post<any>(this.Url+'/UploadMovieData',data,eventData);
     }

     updateMovieRating(rating:number,id:number):Observable<number>{
       return this.http.put<number>(this.Url + '/updateMovieRating' + '?rating=' +rating +'&movieId=' +id,null);
     }

     getTheatreNameByMovieId(id:number):Observable<any>{
       return this.http.get<any>(this.Url +'/getTheatreByMovieId/' + id);
     }


}

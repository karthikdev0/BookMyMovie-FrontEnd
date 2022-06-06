import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
//import { release } from 'process';
import { MovieService } from 'src/app/services/movie.service';
import { Movie } from 'src/_interfaces/movie.model';

@Component({
  selector: 'app-edit-movie',
  templateUrl: './edit-movie.component.html',
  styleUrls: ['./edit-movie.component.css']
})
export class EditMovieComponent implements OnInit {


  tagsControl = new FormControl();
  tagsList: string[] = ['TagA', 'TagB', 'TagC', 'TagD', 'TagE'];
  disableSelect  = new FormControl(false);
  disablePosterUpload = new FormControl(true);

  public response: {dbPath: ''};

  moviePosterPath:string='';
  movieId:number=0;
  rating:any;

  movie:Movie={
    id: 0,
    title: '',
    ratings: 0,
    description: '',
    posterImgPath: '',
    releaseDate: new Date(),
    tags: '',
    isDeleted: false
  }

  constructor(private mService:MovieService,private fb:FormBuilder) { 

    this.response = {
      dbPath:''
    };
  }

  ngOnInit(): void {

    this.returnImgPath();
    this.mService.movieToEdit.subscribe((res) => {
      console.log(res);
      this.movieForm.controls['title'].setValue(res.title);
      this.movieForm.controls['ratings'].setValue(res.ratings);
      this.rating = res.ratings;
      this.movieForm.controls['description'].setValue(res.description);
      this.movieForm.controls['releaseDate'].setValue(res.releaseDate);
      this.tagsControl.setValue(res.tags.split(','));
      this.moviePosterPath  = res.posterImgPath;
      this.movieId = res.id;
    });
  }

 movieForm = this.fb.group({
    title: ['', [Validators.required]],
    ratings: ['', ],
    description:['', [Validators.required]],
    releaseDate: ['', [Validators.required]],
  });

  public uploadFinished = (event:any) => {
    console.log(event);
    this.response = event.body;
  }

  public returnImgPath = () => {

    //return `https://localhost:7254/${serverPath}`;
   // var path =  this.mService.getMovieImagePath(this.response.dbPath);
var mpath ='';
   if(this.disablePosterUpload.value === true){
    mpath = this.moviePosterPath;
   }
   else{
     mpath= this.response.dbPath;
   }

   var path= this.mService.getMovieImagePath(mpath);
    return path;
   }

   saveDetails(form:any){

     this.movie.id = this.movieId
     this.movie.title = form.value.title;
    // this.movie.ratings = form.value.ratings;
    this.movie.ratings = this.rating;
     this.movie.description = form.value.description;
     this.movie.releaseDate = form.value.releaseDate;

     if(this.disablePosterUpload.value === true){
      this.movie.posterImgPath = this.moviePosterPath;
     }
     else{
      this.movie.posterImgPath = this.response.dbPath;
     }
     if(this.disableSelect.value === true){
      this.movie.tags = this.tagsList.join();
    }
    else{
      this.movie.tags = this.tagsControl.value.join();
    }
     this.movie.isDeleted = false;

     console.log(this.movie);

     this.mService.updateMovie(this.movie).subscribe(
       (res)=>{
         console.log(res);
         alert('movie updated success ' + res.title);
         this.movieForm.reset();
       }
     );

   }


}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MovieService } from 'src/app/services/movie.service';
import { Movie } from 'src/_interfaces/movie.model';
import { MovieToCreate } from 'src/_interfaces/movieToCreate.model';

@Component({
  selector: 'app-insert-movie-record',
  templateUrl: './insert-movie-record.component.html',
  styleUrls: ['./insert-movie-record.component.css']
})
export class InsertMovieRecordComponent implements OnInit {

  tagsControl = new FormControl();
  tagsList: string[] = ['TagA', 'TagB', 'TagC', 'TagD', 'TagE'];
  disableSelect  = new FormControl(false);
 

  public response: {dbPath: ''};

  moviePosterPath:string='';

  movie:MovieToCreate={
    
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
  }


  
 movieForm = this.fb.group({
  title: ['', [Validators.required]],
  ratings: ['0', [Validators.required]],
  description:['', [Validators.required]],
  releaseDate: ['', [Validators.required]],
});

public uploadFinished = (event:any) => {
  console.log(event);
  this.response = event.body;
}

public returnImgPath = () => {
 var path= this.mService.getMovieImagePath(this.response.dbPath);
  return path;
 }

 saveDetails(form:any){

   this.movie.title = form.value.title;
   this.movie.ratings = form.value.ratings;
   this.movie.description = form.value.description;
   this.movie.releaseDate = form.value.releaseDate;
    this.movie.posterImgPath = this.response.dbPath;

 if(this.disableSelect.value === true){
   this.movie.tags = this.tagsList.join();
 }
 else{
   this.movie.tags = this.tagsControl.value.join();
 }
   this.movie.isDeleted = false;

  

   this.mService.insertMovie(this.movie).subscribe((res)=>{
    console.log(res);
    alert('movie record inserted successfully ' + res.title);
    this.movieForm.reset();
   }
   );
 }

}

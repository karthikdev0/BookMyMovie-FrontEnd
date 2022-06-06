import { HttpEventType } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {


  public progress:number=0;
  public message:string='';

  @Input() public disableField:boolean = false;
  @Output() public onUploadFinished = new EventEmitter();

  constructor(private movieService:MovieService) { }

  ngOnInit(): void {

  }

  public uploadFile = (files:any) => {
    if(files.length === 0){
      return;
    }
    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file',fileToUpload,fileToUpload.name);

  //  this.http.post('https://localhost:7254/movie/UploadMovieData',formData,{reportProgress:true,observe:'events'})
    this.movieService.uploadMoviePoster(formData,{reportProgress:true,observe:'events'})
    .subscribe(event =>{
      if(event.type === HttpEventType.UploadProgress){
        if (event.total) {  
          const total: number = event.total;  
          this.progress = Math.round(100 * event.loaded / total);    
      }   
      }
      else if (event.type === HttpEventType.Response)
        this.message="Upload Success";
     //   console.log(event);
        this.onUploadFinished.emit(event);

    });
  }


}

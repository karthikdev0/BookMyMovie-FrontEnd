import { AfterContentInit, AfterViewInit, Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { GeneralService } from 'src/app/services/general.service';
import { Movie } from 'src/_interfaces/movie.model';
import { movieFilter } from 'src/_interfaces/movieFilter.model';

@Component({
  selector: 'app-movie-filter',
  templateUrl: './movie-filter.component.html',
  styleUrls: ['./movie-filter.component.css']
})
export class MovieFilterComponent implements OnInit,AfterViewInit {

  tagsControl = new FormControl();
tagsList: string[] = ['TagA', 'TagB', 'TagC', 'TagD', 'TagE'];


@Output() filteredMovies  = new EventEmitter<Movie[]>();


  @ViewChild('allSelected')
  private allSelected!: MatOption;

disableSelect  = new FormControl(false);
title:string='';
ratings:number = 5;
tags:any[] = [];
searchTitle:string='';

tList:string[] =[];

public movies: Movie[] = [];

movieFilter:movieFilter = {
  title : this.title,
  rating  : +this.ratings,
  tags : this.tags
}

  constructor(private service:GeneralService) {

   }
  ngAfterViewInit(): void {
  //  console.log(this.tagsControl);
    if(this.tagsControl.value === null){
      this.allSelected.select();
      this.tagsControl
      .patchValue([...this.tagsList.map(item => item), 0]);
    }
  }
 

  ngOnInit(): void {

  
 
  }
  

  tosslePerOne(all:any){ 
    if (this.allSelected.selected) {  
     this.allSelected.deselect();
     return false;
 }
   if(this.tagsControl.value.length==this.tagsList.length){
     this.allSelected.select();
     return true;
   }

   return false;
 }
   toggleAllSelection() {
     if (this.allSelected.selected) {
       this.tagsControl
         .patchValue([...this.tagsList.map(item => item), 0]);
     } else {
       this.tagsControl.patchValue([]);
     }
   }


  doFilter(){
    console.log(this.ratings);
    this.movieFilter.title = this.title;
    this.isTitleNull();
    this.movieFilter.rating  = +this.ratings;
/*     if(this.disableSelect.value){
    this.movieFilter.tags = this.tagsList;
    }else{
     this.movieFilter.tags = this.tagsControl.value;
     } */
console.log(this.allSelected.selected);
console.log(this.tagsControl.value.length)
     if(this.allSelected.selected){
       this.movieFilter.tags = this.tagsList;
     }
     else{
       console.log(this.tagsControl.value.length)
       if(this.tagsControl.value.length == 0){
        this.movieFilter.tags = this.tagsControl.value;
       }
      this.movieFilter.tags = this.tagsControl.value;
     }

     

console.log(this.movieFilter);
this.service.FilterMovieByParam(this.movieFilter).subscribe(
    res => {
    this.movies = res as [];
    this.filteredMovies.emit(this.movies);
}
)
}

isTitleNull(){
  console.log(this.movieFilter.title);
  if(this.movieFilter.title == ''){
    this.movieFilter.title = 'All';
  }
}

}

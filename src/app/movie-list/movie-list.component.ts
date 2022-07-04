import { AfterContentInit, AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { map, Observable, startWith, Subject } from 'rxjs';
import { Movie } from 'src/_interfaces/movie.model';
import { movieFilter } from 'src/_interfaces/movieFilter.model';
import { theatreDetails } from 'src/_interfaces/theatreDetails.model';
import { GeneralService } from '../services/general.service';
import { MovieService } from '../services/movie.service';
import { TicketService } from '../services/ticket.service';
import { TicketBookingModalComponent } from '../ticket-booking-modal/ticket-booking-modal.component';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit ,OnDestroy{

  @ViewChild(MatPaginator,{static: false}) paginator!: MatPaginator;
  //obs!: Subject<Movie[]>;
  obs!: Observable<Movie[]>;
  dataSource =  new MatTableDataSource<Movie>();

 

  titleCheck:boolean = false;
  releaseDateCheck:boolean = false;
  ratingsCheck:boolean =false;

  role:any;
  username:any;

  public movies: Movie[] = [];


  public selectedMovie: any;

  myControl = new FormControl();
  options: string[] = [''];
  filteredOptions: Observable<string[]> | undefined;

title:string='';
ratings:string ='';
tags:any[] = [];
searchTitle:string='';

tList:string[] =[];

movieFilter:movieFilter = {
  title : this.title,
  rating  : +this.ratings,
  tags : this.tags
}

tagsControl = new FormControl();
tagsList: string[] = ['TagA', 'TagB', 'TagC', 'TagD', 'TagE'];

disableSelect  = new FormControl(true);
  availableTheatreDetails: theatreDetails[]=[];
  constructor(private service:GeneralService,private router:Router,
    private mService:MovieService,private dialog:MatDialog,private tService:TicketService
    ,private changeDetectorRef: ChangeDetectorRef) {

   }
 


 
  ngOnDestroy(): void {
    if (this.dataSource) { 
      this.dataSource.disconnect(); 
    }
    
  }



   toggleTheatreData:boolean =true;

  ngOnInit(): void {
    this.changeDetectorRef.detectChanges();
    this.role = localStorage.getItem('role');
    this.username = localStorage.getItem('username');
    this.getmovies();
    this.getAlltitles();

   // console.log(this.options);
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value)),
    );

    
    this.changeDetectorRef.detectChanges();
    this.dataSource.paginator = this.paginator;
    this.obs = this.dataSource.connect();

 
    
  }

  selected = this.titleCheck;
  sortedData:Movie[]=[];
  unsortedData:Movie[]=[];

  removeSorting(){
   // console.log(this.unsortedData);
    this.mService.getAllMovies().subscribe( res  => {
      this.dataSource.connect().next(res);
    });
    
  }

  sortByRatings(){
    
    if(this.ratingsCheck){
   //   this.sortedData = this.dataSource.data.sort( (a,b) =>{
    this.sortedData = this.sortedData.sort( (a,b) =>{
        return a.ratings - b.ratings;
      });
      this.dataSource.connect().next(this.sortedData);
      this.ratingsCheck = !this.ratingsCheck;
    }
    else{
      this.sortedData = this.sortedData.sort( (a,b) =>{
        return b.ratings - a.ratings;
      });
      this.dataSource.connect().next(this.sortedData);
      this.ratingsCheck = !this.ratingsCheck;
    }
  }

  sortByReleaseDate(){
   // console.log(this.releaseDateCheck);
   // console.log(this.movies);
    if(this.releaseDateCheck){
      this.sortedData = this.sortedData.sort( (a,b) =>{
     //   console.log(new Date(a.releaseDate).getTime())
    //    console.log(new Date(b.releaseDate).getTime())
    //    console.log(new Date(a.releaseDate).getTime() > new Date(b.releaseDate).getTime())
           let aDate  =  new Date(a.releaseDate).getTime();
        let bDate = new Date(b.releaseDate).getTime();
       // let aDate  =  Date.parse(a.releaseDate.toDateString());
       // let bDate = Date.parse(a.releaseDate.toDateString());
         if(aDate >bDate){
           return 1;
         }
         else if( aDate < bDate){
           return -1;
         }
         else{
           return 0;
         }
      }
      
      );
     // console.log(this.sortedData);
      this.dataSource.connect().next(this.sortedData);
      this.releaseDateCheck = !this.releaseDateCheck;
    }
    else{
   
      this.sortedData = this.sortedData.sort( (a,b) =>{
        let aDate  =  new Date(a.releaseDate).getTime();
        let bDate = new Date(b.releaseDate).getTime();
       //let aDate  =  Date.parse(a.releaseDate.toString());
       //let bDate = Date.parse(a.releaseDate.toString());
         if(aDate >bDate){
           return -1;
         }
         else if( aDate < bDate){
           return 1;
         }
         else{
           return 0;
         }
        });
        //console.log(this.sortedData);
        this.dataSource.connect().next(this.sortedData);
        this.releaseDateCheck = !this.releaseDateCheck;
  } 
    
  }


  sortByTitle(){
    if(this.titleCheck){

      this.sortedData = this.sortedData.sort( 
        (a,b) => a.title.localeCompare(b.title));
      this.dataSource.connect().next(this.sortedData);
   this.titleCheck = ! this.titleCheck;

    }
    else{
      this.sortedData = this.sortedData.sort( (a,b) =>
       b.title.localeCompare(a.title));
     this.dataSource.connect().next(this.sortedData);
     this.titleCheck = ! this.titleCheck;
    }
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  private getmovies = () => {
    this.service.getAll().subscribe(res => {
      this.movies = res as [];
      this.dataSource.data = this.movies;
      this.sortedData = this.movies;
      this.unsortedData = res as [];
    });


}

private getAlltitles = () => {
  this.mService.getAllMovieTitles().subscribe( res => {
    //console.log(res);
    this.options = res ;
  });
}

public createImgPath = (serverPath: string) => {

 //return `https://localhost:7254/${serverPath}`;
 var path =  this.mService.getMovieImagePath(serverPath);
 return path;
}

public redirectToBookingPage(movie:Movie){
  this.selectedMovie = movie;
  this.router.navigateByUrl('/movie-ticket-booking/'+movie.id,{ state: { movie } });
}

openTicketController(id:number){
  this.tService.getTheatreDetails(id).subscribe( (res) => {
    this.availableTheatreDetails =  res as [];
    //console.log(res);
    const dialogConfig  = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = this.availableTheatreDetails;
  
   // console.log(this.availableTheatreDetails);
    this.dialog.open(TicketBookingModalComponent,dialogConfig);
  });

}

searchByTitle(){

  this.service.FilterMovieByTitle(this.myControl.value).subscribe(
      res => {
        this.movies = res as []
      }
    
  )
}

getFilteredMovies(movie:Movie[]){
  //console.log(movie);
this.movies = movie;
}


doFilter(){
        this.movieFilter.title = this.title;
        this.isTitleNull();
        this.movieFilter.rating  = +this.ratings;
        if(this.disableSelect.value){
        this.movieFilter.tags = this.tagsList;
        }else{
         this.movieFilter.tags = this.tagsControl.value;
         }
  

   // console.log(this.movieFilter);
    this.service.FilterMovieByParam(this.movieFilter).subscribe(
        res => {
        this.movies = res as []
    }
)
}

getTheatres(id:number){
  this.toggleTheatreData = ! this.toggleTheatreData;
  this.mService.getTheatreNameByMovieId(id).subscribe( (res) =>  {
    this.tList = res as [];
    
   // console.log(this.tList);
  //  return this.tList;
  });
}

ToEditpage(movie:Movie){
  //  console.log(movie);
    this.mService.movieToEdit.next(movie);
    this.router.navigate(['../dashboard/'+this.username+'/movie-edit']);
}
ToDeletePage(movie:Movie){
  confirm('Do you want to delete this movie');
  this.mService.deleteMovieById(movie.id).subscribe(
    (res) => {
   //   console.log("Deleted succesfully "+res);
      this.getmovies();
      alert('deleted successfully');
    }
  )
}







//utility mehtods

isTitleNull(){
 // console.log(this.movieFilter.title);
  if(this.movieFilter.title == ''){
    this.movieFilter.title = 'All';
  }
}

}









import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { MovieTicketBookingComponent } from 'src/app/movie-ticket-booking/movie-ticket-booking.component';
import { GeneralService } from 'src/app/services/general.service';
import { MovieService } from 'src/app/services/movie.service';
import { Movie } from 'src/_interfaces/movie.model';

import { RecommendedMoviesComponent } from './recommended-movies.component';

 describe('RecommendedMoviesComponent', () => {
  let component: RecommendedMoviesComponent;
  let fixture: ComponentFixture<RecommendedMoviesComponent>;
  let MockGeneralService:any;
  let MockMovieService:any;
  let router:Router;

  let Movies:Movie[]=[
    { id:1,title:"movie 1",description:"",isDeleted:false,posterImgPath:"m1",ratings:3,releaseDate:new Date(),tags:'tagA'},
    { id:2,title:"movie 2",description:"",isDeleted:false,posterImgPath:"m2",ratings:3,releaseDate:new Date(),tags:'tagA'},
    { id:3,title:"movie 3",description:"",isDeleted:false,posterImgPath:"m3",ratings:3,releaseDate:new Date(),tags:'tagA'},
    { id:4,title:"movie 4",description:"",isDeleted:false,posterImgPath:"m4",ratings:3,releaseDate:new Date(),tags:'tagA'}
  ];

 


  beforeEach(() => {
    MockGeneralService = jasmine.createSpyObj(['FilterMovieByTags','FilterMovieByRatings','LatestReleasedMovies']);
    MockMovieService  =  jasmine.createSpyObj(['getMovieImagePath']);
    TestBed.configureTestingModule({
      declarations: [ RecommendedMoviesComponent ],
      imports : [
        RouterTestingModule
        .withRoutes([{path:'movie-ticket-booking/:id',component:MovieTicketBookingComponent}])
      ],
      providers :[
        { provide : GeneralService , useValue: MockGeneralService},
        { provide : MovieService ,useValue: MockMovieService}
      ],
      schemas :[NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    MockGeneralService.FilterMovieByTags.and.returnValue(of(Movies));
    MockGeneralService.FilterMovieByRatings.and.returnValue(of(Movies));
    MockGeneralService.LatestReleasedMovies.and.returnValue(of(Movies));
    MockMovieService.getMovieImagePath.and.returnValue("https://localhost:7254/movie1");

    router = TestBed.inject(Router);
   
    
    fixture = TestBed.createComponent(RecommendedMoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    

  });


  it('should make http request and updates movieList1 ,movieList2 , recommendedMoviesList property', () => {
    expect(component.movieList1.length).toEqual(Movies.length);
    expect(fixture.componentInstance.movieList2.length).toEqual(Movies.length);
    expect(fixture.componentInstance.recommendedMoviesList.length).toEqual(Movies.length);
  });

  it('should display movie title',() => {

    let ele  = fixture.debugElement.queryAll(By.css('mat-card-title'));
   // console.log(ele);
   // console.log(Movies[0].title.toUpperCase());
  /* ele.forEach( ( x , i)=> {
    expect(x.nativeElement.textContent).toBe(Movies[i].title.toUpperCase());
  })  */
  expect(ele[0].nativeElement.textContent).toContain(Movies[0].title.toUpperCase());

  })

  it('should correctly construct the image path' ,() =>{
      let imgElement  =  fixture.debugElement.queryAll(By.css('img'));
     // console.log(imgElement[0].nativeElement.src);

      expect(imgElement[0].nativeElement.src).toEqual("https://localhost:7254/movie1");

  })

  it('should call toTicketBookingPage(m.id) on clicking the movie title',() =>{
    spyOn(fixture.componentInstance,'toTicketBookingPage');
    let titleElement  =  fixture.debugElement.queryAll(By.css('mat-card-title'));
  //  console.log(titleElement[0].nativeElement);
    titleElement[0].triggerEventHandler('click',null);
    expect(fixture.componentInstance.toTicketBookingPage).toHaveBeenCalledWith(1);
  })

   it('should route to movie-ticket-booking/:id path when movie title is clicked',()=>{

    const navigateSpy = spyOn(router, 'navigateByUrl');

    let titleElement  =  fixture.debugElement.queryAll(By.css('mat-card-title'));
    titleElement[0].triggerEventHandler('click',null);

    expect(navigateSpy).toHaveBeenCalledWith('movie-ticket-booking/1');
    
  }) 

}); 



/* describe('Component: NavTool', () => {
  let mockRouter = {
    navigateByUrl: jasmine.createSpy('navigateByUrl')
  };
  let MockGeneralService:any;
  let MockMovieService:any;
  let Movies:Movie[]=[
    { id:1,title:"movie 1",description:"",isDeleted:false,posterImgPath:"m1",ratings:3,releaseDate:new Date(),tags:'tagA'},
    { id:2,title:"movie 2",description:"",isDeleted:false,posterImgPath:"m2",ratings:3,releaseDate:new Date(),tags:'tagA'},
    { id:3,title:"movie 3",description:"",isDeleted:false,posterImgPath:"m3",ratings:3,releaseDate:new Date(),tags:'tagA'},
    { id:4,title:"movie 4",description:"",isDeleted:false,posterImgPath:"m4",ratings:3,releaseDate:new Date(),tags:'tagA'}
  ];
  beforeEach(() => {
    MockGeneralService = jasmine.createSpyObj(['FilterMovieByTags','FilterMovieByRatings','LatestReleasedMovies']);
    MockMovieService  =  jasmine.createSpyObj(['getMovieImagePath']);
    TestBed.configureTestingModule({
      declarations: [ RecommendedMoviesComponent ],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide : GeneralService , useValue: MockGeneralService},
        { provide : MovieService ,useValue: MockMovieService}
      ]
    });

    MockGeneralService.FilterMovieByTags.and.returnValue(of(Movies));
    MockGeneralService.FilterMovieByRatings.and.returnValue(of(Movies));
    MockGeneralService.LatestReleasedMovies.and.returnValue(of(Movies));
    MockMovieService.getMovieImagePath.and.returnValue("https://localhost:7254/movie1");
  });
  it('should click link', () => {
    let fixture = TestBed.createComponent(RecommendedMoviesComponent);
    fixture.detectChanges();
    let component: RecommendedMoviesComponent = fixture.componentInstance;

    let titleElement  =  fixture.debugElement.queryAll(By.css('mat-card-title'));
    titleElement[0].triggerEventHandler('click',null);

    
    expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('movie-ticket-booking/1');
  });
}); */





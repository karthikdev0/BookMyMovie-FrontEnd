import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieTheatreDetailsComponent } from './movie-theatre-details.component';

describe('MovieTheatreDetailsComponent', () => {
  let component: MovieTheatreDetailsComponent;
  let fixture: ComponentFixture<MovieTheatreDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovieTheatreDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieTheatreDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

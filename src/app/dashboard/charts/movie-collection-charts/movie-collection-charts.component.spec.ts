import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieCollectionChartsComponent } from './movie-collection-charts.component';

describe('MovieCollectionChartsComponent', () => {
  let component: MovieCollectionChartsComponent;
  let fixture: ComponentFixture<MovieCollectionChartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovieCollectionChartsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieCollectionChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

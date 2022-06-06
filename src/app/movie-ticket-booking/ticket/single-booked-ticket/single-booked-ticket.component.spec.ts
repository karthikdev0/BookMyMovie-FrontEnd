import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleBookedTicketComponent } from './single-booked-ticket.component';

describe('SingleBookedTicketComponent', () => {
  let component: SingleBookedTicketComponent;
  let fixture: ComponentFixture<SingleBookedTicketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleBookedTicketComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleBookedTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

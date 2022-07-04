import { DatePipe } from '@angular/common';
import { Component, Inject, OnChanges, OnInit, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { movieTicketBooking } from 'src/_interfaces/movieTicketBooking.model';
import { seat } from 'src/_interfaces/seat.model';
import { theatreDetails } from 'src/_interfaces/theatreDetails.model';
import { TicketSucess } from 'src/_interfaces/ticketSuccess.model';
import { TicketService } from '../services/ticket.service';
import { ConfirmationComponent } from '../shared/confirmation/confirmation.component';

@Component({
  selector: 'app-ticket-booking-modal',
  templateUrl: './ticket-booking-modal.component.html',
  styleUrls: ['./ticket-booking-modal.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class TicketBookingModalComponent implements OnInit,OnChanges {

  theatreData:theatreDetails[]=[];


  theatreDetailsReceived:theatreDetails[] =[]; 
 selectedTheatreScreenData:theatreDetails[] =[];
 selScreenDataByDate:any[]=[];

  selectedTheatreData:theatreDetails ={
    theatreId: 0,
    theatreName: '',
    theatreCity: '',
    movieId: 0,
    theatreMovieId: 0,
    totalSeatCount: 0,
    silverSeatCount: 0,
    goldSeatCount: 0,
    platinumSeatCount: 0,
    silverSeatPrice: 0,
    goldSeatPrice: 0,
    platinumSeatPrice: 0,
    fromDate: new Date(),
    toDate: new Date(),
    screenId: 0,
    screenName: '',
    screeFromTime: new Date(),
    screenToTime: new Date(),
    screenDate: ''
  };  

 price:number =0;

 ticketModel:movieTicketBooking={
   numOfseat: 0,
   movieId: 0,
   userId: 0,
   theatreId: 0,
   movieDate: new Date(),
   seatNumber: [],
   screenId: 0
 }


selectedSeat:any[]=[];

confirmstr:string='';


  constructor(private dialogRef:MatDialogRef<TicketBookingModalComponent>,
    @Inject(MAT_DIALOG_DATA) data:theatreDetails[],private dialog:MatDialog,private snackBar:MatSnackBar
    ,private tService:TicketService,private router:Router
    ) { 
this.theatreData = data;
this.theatreDetailsReceived = this.theatreData;
//console.log(this.theatreData);
  }
  ngOnChanges(changes: SimpleChanges): void {
    //  console.log(changes['theatreDetails'].currentValue);
  //  this.theatreDetailsReceived = changes['theatreDetails'].currentValue;
   // console.log(this.selScreenDataByDate)
    this.selScreenDataByDate[0] = (this.theatreDetailsReceived.filter( x => x.screenDate === this.today))
  //  console.log(this.selScreenDataByDate)
    this.selScreenDataByDate[1] = (this.theatreDetailsReceived.filter( x => x.screenDate === this.nextDay))
  //  console.log(this.selScreenDataByDate)
    this.selScreenDataByDate[2] = (this.theatreDetailsReceived.filter( x => x.screenDate === this.nextNextDay))
   // console.log(this.selScreenDataByDate[0][0].screenId)
   // this.selectedTheatreScreenData = this.theatreDetailsReceived.filter( x => x.screenDate ===this.today)
    //console.log(this.selectedTheatreScreenData)
 this.calculatePrice(this.selectedSeat.filter( x => x.isSelected === true))
  }

  


  save() {
    this.dialogRef.close();
}

close() {
    this.dialogRef.close();
}

getseatNumber(seat:any){
//  console.log(seat);
 if(seat.isSelected  === true){
   this.selectedSeat.push(seat); 
  }


 this.selectedSeat = this.selectedSeat.filter( x => x.isSelected === true)
 this.selectedSeat = this.selectedSeat.filter((item, i, ar) => ar.indexOf(item) === i)
 //console.log(this.selectedSeat);
  this.calculatePrice(this.selectedSeat)
 
}

removeAllSelectedSeat(){
  this.selectedSeat.length =0;
}



calculatePrice(data:seat[]){
 // console.log(data);

 this.price =0;
 this.confirmstr ='';
  data.forEach( (x) => {
    if(x.seatClass === 'silver' && x.isSelected === true){
     let p   =  this.selectedTheatreData.silverSeatPrice;
     this.price = this.price + p;
  //  this.confirmstr += '\n'+' Seat Number : ' + x.seatNumber + ' --- ' + 'Seat Class : '+ x.seatClass + ' ---- ' + 'Seat Price : ' + p.toString() + ' . \n ';
    this.confirmstr += '<div>SeatNumber:<strong>' + x.seatNumber +'</strong> , '
    +'Seat Class:<strong>' +x.seatClass+'</strong> , ' +'Seat Price:<strong>'+p.toString() +'</strong></div>'
    }
    else if(x.seatClass === 'gold' && x.isSelected === true){
     // this.confirmstr += '<br><h1>My confirm List</h1>'
      let p = this.selectedTheatreData.goldSeatPrice;
      this.price = this.price + p;
  //    this.confirmstr += '\n Seat Number : ' + x.seatNumber + ' --- ' + 'Seat Class : '+ x.seatClass + ' ---- ' + 'Seat Price : ' + p.toString() + ' . \n ';
      this.confirmstr += '<div>SeatNumber:<strong>' + x.seatNumber +'</strong> , '
      +'Seat Class:<strong>' +x.seatClass+'</strong> , ' +'Seat Price:<strong>'+p.toString() +'</strong></div>'
    }
    else if(x.seatClass === 'platinum' && x.isSelected === true){
      let  p = this.selectedTheatreData.platinumSeatPrice;
      this.price = this.price + p;
//      this.confirmstr += '\n Seat Number : ' + x.seatNumber + ' --- ' + 'Seat Class : '+ x.seatClass + ' ---- ' + 'Seat Price : ' + p.toString() + ' . \n ';
      this.confirmstr += '<div>SeatNumber:<strong>' + x.seatNumber +'</strong> , '
      +'Seat Class:<strong>' +x.seatClass+'</strong> , ' +'Seat Price:<strong>'+p.toString() +'</strong></div>'
    }
    

  })

/*   if(this.price > 0){
    this.confirmstr += '\n Total Price :' + this.price.toString();
  }
  else{
    this.confirmstr = '';
  } */

    

  
 
}

/* getScreens( val :Date){

  var datePipe = new DatePipe('en-US');
  let d = datePipe.transform(val, 'dd-MM-yyyy');
//  console.log(d);
 // console.log(datePipe.transform(d,'dd-MM-yyyy'));
//console.log(d);
//this.theatreDetailsReceived.forEach( x => console.log(x.screenDate));
this.selectedTheatreScreenData = this.theatreDetailsReceived.filter( x => x.screenDate ===d)
// console.log(this.selectedTheatreScreenData);
} */

today:any;
nextDay:any;
nextNextDay:any;
dateArray:any[]=[];


ngOnInit(): void {
 // console.log(this.theatreDetails);
 let today:Date=new Date();
 let tommorrow:Date  = new Date(new Date().setDate(new Date().getDate() + 1));
 let dayAfterTommorrow: Date = new Date(new Date().setDate(new Date().getDate() + 2));

 let datePipe = new DatePipe('en-US');
 this.today = datePipe.transform(today, 'dd-MM-yyyy');
 this.nextDay = datePipe.transform(tommorrow, 'dd-MM-yyyy');
 this.nextNextDay = datePipe.transform(dayAfterTommorrow, 'dd-MM-yyyy');
 this.dateArray.push(this.today);
 this.dateArray.push(this.nextDay);
 this.dateArray.push(this.nextNextDay);


 this.selScreenDataByDate[0] = (this.theatreDetailsReceived.filter( x => x.screenDate === this.today))
 //  console.log(this.selScreenDataByDate)
   this.selScreenDataByDate[1] = (this.theatreDetailsReceived.filter( x => x.screenDate === this.nextDay))
 //  console.log(this.selScreenDataByDate)
   this.selScreenDataByDate[2] = (this.theatreDetailsReceived.filter( x => x.screenDate === this.nextNextDay))

}
onChangeInTab(event :MatTabChangeEvent){
console.log(event);
this.selectedTheatreData ={
  theatreId: 0,
  theatreName: '',
  theatreCity: '',
  movieId: 0,
  theatreMovieId: 0,
  totalSeatCount: 0,
  silverSeatCount: 0,
  goldSeatCount: 0,
  platinumSeatCount: 0,
  silverSeatPrice: 0,
  goldSeatPrice: 0,
  platinumSeatPrice: 0,
  fromDate: new Date(),
  toDate: new Date(),
  screenId: 0,
  screenName: '',
  screeFromTime: new Date(),
  screenToTime: new Date(),
  screenDate: ''
};
this.confirmstr='';
  this.price=0;
  this.seatsDataStr='';
 this.removeAllSelectedSeat();
}

selectedScreen(id:number){
//console.log(id);
this.confirmstr='';
  this.price=0;
  this.seatsDataStr='';
 this.removeAllSelectedSeat();
let res = this.theatreDetailsReceived.find( x => x.screenId === id);
if(res !== undefined){
this.selectedTheatreData = res;
}
}



seatsDataStr:string='';
getseatsData(screen:theatreDetails){
this.seatsDataStr = 'Seat class : Silver ,'  +  'Price : ' +screen.silverSeatPrice +', Available Seats ' + screen.silverSeatCount +'. \n'
                    + 'Seat class : Gold '  +  'Price : ' +screen.goldSeatPrice +', Available Seats ' + screen.goldSeatCount +'. \n' 
                    + 'Seat class : Platinum '  +  'Price : ' +screen.platinumSeatPrice +', Available Seats ' + screen.platinumSeatCount +'. \n';

/*       this.seatsDataStr = 'Rs. ' + screen.silverSeatPrice + '        ' + 'Rs. ' + screen.goldSeatPrice+ '        ' + 'Rs. ' + screen.platinumSeatPrice + ' \n'
                         + '         Silver              ' + '                    Gold                            ' +'              Platinum           ' +' \n'
                        + '             '   +screen.silverSeatCount    + '          '   +screen.goldSeatCount      + '          '   +screen.platinumSeatCount +' \n' ; */

}














































/* sList:any[] = this.selectedSeat.filter( x => x.isSelected === true); */
bookTicketForme(){
  this.confirmstr += '<div> Total Price : <strong>' + this.price.toString() + '</strong></div>';
this.openCompDialog(this.confirmstr);

}


setTicketData(){

  let list  = this.selectedSeat.filter( x => x.isSelected === true);
  let seatArray:string[]=[];
  list.forEach( (x) => {
    seatArray.push(x.seatNumber);
  });


  let user;
  let details = localStorage.getItem("userdetails");
      if(details != null){
        user  = JSON.parse(details);
      }
var str  = this.selectedTheatreData.screenDate.split('-');
var fmtstr = str[2] + '-'+str[1]+'-'+str[0];
//console.log(fmtstr)

      this.ticketModel = {
        numOfseat : seatArray.length,
        movieId:this.selectedTheatreData.movieId,
        theatreId:this.selectedTheatreData.theatreId,
        userId: user.userId,
        movieDate: new Date(fmtstr),
        screenId:this.selectedTheatreData.screenId,
        seatNumber: seatArray
      }
     // console.log(this.ticketModel)


}

bookTicket(){
  let config = new MatSnackBarConfig();
  config.horizontalPosition = 'right';
  config.verticalPosition = 'top';
  config.duration = 5000;
    this.tService.ticketBooking(this.ticketModel).subscribe( (res) => {
   // console.log(res);
    var t:TicketSucess[]  = res as [];
    this.snackBar.open('Ticket booked successfully','x',config);
   // this.router.navigate(['ticket'],{state:t})
   this.router.navigateByUrl('/ticket',{state:{ TicketArray : t}})
 //   this.ticketSuccessDetails.emit(t);
     // this.router.navigate(['ticket'],{state:t})
   });
}

openCompDialog(data:string) {
   

  const myCompDialog = this.dialog.open(ConfirmationComponent, { data: data });
  myCompDialog.afterClosed().subscribe((res) => {
    // Trigger After Dialog Closed 
    if(res.event === 'yes-option'){
      this.dialogRef.close()
      this.setTicketData();
      this.bookTicket();
       // console.log('yes');

    }
    else if(res.event === 'no-option'){
      
    //  console.log('no')
     this.confirmstr='';
    //  this.price=0;
     // this.seatsDataStr='';
     //this.removeAllSelectedSeat();
      return;
    }
  });

}

           

}









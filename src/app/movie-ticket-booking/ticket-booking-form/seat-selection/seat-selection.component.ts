import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, Renderer2, SimpleChanges, ViewChild } from '@angular/core';
import { TicketService } from 'src/app/services/ticket.service';
import { seat } from 'src/_interfaces/seat.model';

@Component({
  selector: 'app-seat-selection',
  templateUrl: './seat-selection.component.html',
  styleUrls: ['./seat-selection.component.css']
})
export class SeatSelectionComponent implements OnInit ,OnChanges {

  @Input() screenId:number=0;
 // @Input() numberOfSeats:number=0;
  @Output() seat = new EventEmitter<seat>();

  @ViewChild('seat', { static: false })
  selSeat!: ElementRef;


  seatData:seat[] =[];

  silverSeats:seat[]=[];
  goldSeats:seat[]=[];
  platinumSeats:seat[]=[];


  row:number=0;
  col:number=0;

  gRow:number=0;
  gCol:number=0;

  pRow:number=0;
  pCol:number=0;

silverSeatMatrix:any[][]=[];
goldSeatMatrix:any[][]=[];
platinumSeatMatrix:any[][]=[];

allseatMatrix:any[][]=[];

isSeatSelected:boolean = false;
num : number =0;
id:number=0;
seatNumberArray:string[]=[];

  constructor(private ticketService:TicketService,private renderer:Renderer2) { }






  ngOnChanges(changes: SimpleChanges): void {
/*     for ( const i in changes){
      if(i === 'screenId'){
        this.id  =  changes[i].currentValue;
      }
      else if( i === 'numberOfSeats'){
        this.num = changes['numberOfSeats'].currentValue;
      }
    } */
 //   if(changes['numberOfSeats'] !== undefined){
 //     this.num = changes['numberOfSeats'].currentValue;
 //   }
    if(changes['screenId'] !== undefined){
      this.id = changes['screenId'].currentValue;
    }
this.ticketService. getAllSeatsByScreenId(this.id).subscribe( (res) => {
  this.seatData = res as [] ; 
  this.seatDataAlter();
  //  console.log(this.seatData);
});
 //console.log(this.seatData);
 //this.goldSeatsArranagement();
//this.platinumSeatsArranagement();
  }
  

  seatDataAlter(){
    this.silverSeats =  this.seatData.filter( x =>  x.seatClass === 'silver');
    this.goldSeats = this.seatData.filter(x=> x.seatClass === 'gold');
    this.platinumSeats = this.seatData.filter( x => x.seatClass === 'platinum');

//console.log(this.silverSeats);
this.silverSeatsArranagement();
 this.goldSeatsArranagement();
this.platinumSeatsArranagement();
this.allDataMatrix();
  }

  allDataMatrix(){
    this.allseatMatrix.push(this.silverSeatMatrix);
    this.allseatMatrix.push(this.goldSeatMatrix);
    this.allseatMatrix.push(this.platinumSeatMatrix);
 console.log(this.allseatMatrix);

  }





  platinumSeatsArranagement() {
    this.getRowsAndColumnsPlatinum();
    // var grid :any[][]= [];
 var iMax = this.pRow;
  var jMax = this.pCol;
  var count = 0;
 
     for (let i = 0; i < iMax; i++) {
       this.platinumSeatMatrix[i] = [];
 
       for (let j = 0; j < jMax; j++) {
         if(this.platinumSeats[count] !== undefined){
          this.platinumSeatMatrix[i][j] = this.platinumSeats[count];
          count++;
         }
       }
     }
     console.log(this.platinumSeatMatrix);
  }
  goldSeatsArranagement() {
    this.getRowsAndColumnsGold();
    // var grid :any[][]= [];
 var iMax = this.gRow;
  var jMax = this.gCol;
  var count = 0;
 
     for (let i = 0; i < iMax; i++) {
       this.goldSeatMatrix[i] = [];
 
       for (let j = 0; j < jMax; j++) {
         if(this.goldSeats[count] !== undefined){
          this.goldSeatMatrix[i][j] = this.goldSeats[count];
          count++;
         }

       }
     }
     console.log(this.goldSeatMatrix);
  }


  silverSeatsArranagement(){
    this.getRowsAndColumns();
   // var grid :any[][]= [];
var iMax = this.row;
 var jMax = this.col;
 var count = 0;

    for (let i = 0; i < iMax; i++) {
      this.silverSeatMatrix[i] = [];

      for (let j = 0; j < jMax; j++) {
        if(this.silverSeats[count] !== undefined){
          this.silverSeatMatrix[i][j] = this.silverSeats[count];
          count++;
        }

      }
    }
    console.log(this.silverSeatMatrix);
    
  }

  getRowsAndColumns(){
    let max =0;
    this.silverSeats.forEach( x => {
      
      //console.log(x.seatNumber.charAt(1))
      if( +x.seatNumber.charAt(1) > max ){
         max = +x.seatNumber.charAt(1);
      }
     })
     this.col = max;
   
     if( this.silverSeats[0].seatNumber.charAt(1) === '0'){
       this.col   =  this.col + 1;
     }
     this.row = +(this.silverSeats.length / this.col ).toFixed(0);
     console.log(this.col);
     console.log(this.row);
  }

  getRowsAndColumnsGold(){
    let max =0;
    this.goldSeats.forEach( x => {
      
      //console.log(x.seatNumber.charAt(1))
      if( +x.seatNumber.charAt(1) > max ){
         max = +x.seatNumber.charAt(1);
      }
     })
     this.gCol = max;
   
     if( this.goldSeats[0].seatNumber.charAt(1) === '0'){
       this.gCol   =  this.gCol + 1;
     }
     this.gRow = +(this.goldSeats.length /this.gCol  ).toFixed(0);
     console.log(this.gCol);
     console.log(this.gRow);
  }

  getRowsAndColumnsPlatinum(){
    let max =0;
    this.platinumSeats.forEach( x => {
      
      //console.log(x.seatNumber.charAt(1))
      if( +x.seatNumber.charAt(1) > max ){
         max = +x.seatNumber.charAt(1);
      }
     })
     this.pCol = max;
   
     if( this.platinumSeats[0].seatNumber.charAt(1) === '0'){
       this.pCol   =  this.pCol + 1;
     }
     this.pRow = +(this.platinumSeats.length /this.pCol  ).toFixed(0);
     console.log(this.pCol);
     console.log(this.pRow);
  }



















  selectedSeats(data:seat){
    //console.log(this.numberOfSeats);
    if(data.isSelected === true){
     /*  for( var i = 0 ; i < this.seatNumberArray.length;i++ ){
        if(this.seatNumberArray[i] === data.seatNumber){
          console.log( i + '  ' +this.seatNumberArray[i] + '====' + data.seatNumber)
          
          console.log(this.seatNumberArray.slice(i,1));
        }
      } */
      data.isSelected = false;
    }
    else{
      data.isSelected = true;
    //  this.seatNumberArray.push(data);
    }

    


    console.log(data);
   // console.log(this.num);

/*   if(this.seatNumberArray.length > 10000){
    let s =   this.seatNumberArray.shift();
   let unselseat =  this.silverSeats.find( x=> x.seatNumber === s);
   if( unselseat !== undefined){
     unselseat.isSelected = false;
   }
   
   } */ 
//  this.silverSeats
//  .forEach( x=> { if(x.isSelected === true) this.seatNumberArray.push(x.seatNumber)});
//this.seatNumberArray = this.seatNumberArray.filter( x => )

   // this.renderer.addClass(this.selSeat.nativeElement,'selectedSeat')
   
    this.seat.emit(data);


  }

  selectedSeatsG(c:any){

  }
  selectedSeatsP(c:any){

  }







  ngOnInit(): void {
  }


}



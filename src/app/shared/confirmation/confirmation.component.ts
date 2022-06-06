import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {

  fromPage!: string;
  fromDialog!: string;

  constructor(public dialogRef: MatDialogRef<ConfirmationComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public mydata: any) { }

  ngOnInit(): void {
    this.fromDialog = "I am from dialog land...";
  }

  yesDialog() {
    this.dialogRef.close({ event: 'yes-option'});
  }
  noDialog() {
    this.dialogRef.close({ event: 'no-option'});
  }

}

import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {

  userData:any;
  username:any;
  role:any;
  constructor(private userService:UserService) { }

  ngOnInit(): void {
    this.username = localStorage.getItem("username");
    this.role = localStorage.getItem("role");
    this.userService.getUserDetailsByUserName(localStorage.getItem("username"))
    .subscribe((res) => {
      this.userData = res;
      localStorage.setItem("userdetails",JSON.stringify(res));
  }
    )}
}


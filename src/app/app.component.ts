import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})



export class AppComponent implements OnInit {
title = 'BookMyMovie';

username:any;
role:any;
isLoggedIn : boolean = false;
isDashboard :boolean  =  false;
  constructor(private router:Router,private jwtHelper: JwtHelperService,private uService:UserService) {  
  }
  ngOnInit(): void {
   // this.getUsername();
    this.uService.username.subscribe( res => this.username = res);
    this.uService.isLoggedIn.subscribe( res => this.isLoggedIn = res );
    this.username = localStorage.getItem("username");
    this.role  = localStorage.getItem("role");
    this.checkLoginStatus();
  }

  checkLoginStatus(){
    const token  = localStorage.getItem("token");
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      this.isLoggedIn = true;
    }
    else{
      this.isLoggedIn = false;
    }
  }
  logOut() {

  let ans  =   confirm("Do you want to logout from Application");
  if(ans){
    this.uService.isLoggedIn.next(false);
    localStorage.clear();
    this.uService.username.next('');
    this.router.navigate(['home']);
  }
    
 }
 isUserAuthenticated() {
  const token  = localStorage.getItem("token");
  if (token && !this.jwtHelper.isTokenExpired(token)) {
  //  this.isLoggedIn = true;
    this.router.navigate(['dashboard',localStorage.getItem("username")]);
   // return true;
  }
  else {
    this.router.navigate(['login']);
   // return false;
  }
}

takeMetoUserDashboard(){
  console.log('/dashboard/'+this.username + '/charts');
  console.log(this.isDashboard);
  if(this.isLoggedIn === true || this.isDashboard === false){
  //  if( this.router.url !== '/dashboard/'+this.username + '/charts'){
      this.isDashboard = !this.isDashboard;
    this.router.navigate(['dashboard',localStorage.getItem("username")]);
  //  }
    
  }
  else if(this.isLoggedIn === false){
    this.router.navigate(['login']);
  }
}


}



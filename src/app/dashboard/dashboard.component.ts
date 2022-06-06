import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  dataSource: any[] = [];

  constructor(private route:ActivatedRoute,private userService:UserService,
    private router:Router
    ) { }

role:any;

username:any;
  ngOnInit(): void {
  //  this.route.params.subscribe( params => this.username= params['username']);
    this.username = localStorage.getItem("username");
    this.role = localStorage.getItem("role");
  }

  toMoviePage(){
  this.router.navigate(['movie-insert'],{relativeTo:this.route});
  }

}

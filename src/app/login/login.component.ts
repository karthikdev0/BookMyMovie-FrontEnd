import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from  '@angular/material/dialog';
import { Router } from '@angular/router';
import { login } from 'src/_interfaces/login.model';
import { user } from 'src/_interfaces/user.model';
import { ErrorComponent } from '../error/error.component';
import { UserService } from '../services/user.service';
import { JwtHelperService } from '@auth0/angular-jwt';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username:any;
  Tpassword:any;
  //registrationForm: any;

  //registrationForm: any;
  loginModel: login = {
    userName: "",
    password:""
  }
  token:any;
  
userModel:any;
  invalidLogin: boolean = false;

  userDetails:any;


  AuthUsername:any;
  AuthUserRole:any;

  // form: FormGroup;
  constructor(private  dialog:  MatDialog, private  router:  Router
    ,private fb: FormBuilder,private userService:UserService,private jwtHelper:JwtHelperService) { }
 
  

  form: any;
  flag: boolean = true;

 

  ngOnInit(): void {
    this.form = this.fb.group({
      LuserName: [null, [Validators.required, Validators.pattern("^[a-zA-Z0-9]{6,20}")]],
      Lpassword: [null, [Validators.required, Validators.pattern("^(?=.*[0-9])+(?=.*[a-z])(?=.*[A-Z])+(?=.*[@#$%^&+=])+(?=\\S+$).{8,20}$")]],
    });
  }

 

  loginAuthentication(form: { value: any; }): void{
  //  console.log(form.value);
    this.loginModel.userName  = form.value.LuserName;
    this.loginModel.password = form.value.Lpassword;
    console.log(this.loginModel);

    this.userService.loginUser(this.loginModel).subscribe(
      (res) => {       
        this.token = res.token;
        localStorage.setItem("token",this.token);
      //  console.log(this.token);
        this.getUsername();    
      }
     
    );

   // var decodedToken = this.jwtHelper.decodeToken(this.token);
  

      
     
  
   
  }

  getUsername(){  
   // console.log(this.token);
  //  this.userService.Username.next(this.loginModel.userName);
  if(localStorage.getItem("token") == null){
    this.invalidLogin = true;
  }
  else{
    this.userService.isLoggedIn.next(true);
    this.userService.getUserDetails().subscribe((res)=>{
      // this.userService.Username.next(res);
    //   console.log(res.username[0]);
       this.AuthUsername = res.username[0],
       this.AuthUserRole = res.username[1],
       this.userService.username.next(this.AuthUsername);
       this.userService.role.next(this.AuthUserRole);
       console.log(this.AuthUsername);
       localStorage.setItem("username",this.AuthUsername);
       localStorage.setItem("role",this.AuthUserRole);
       this.router.navigate(['dashboard',this.AuthUsername]);
       
     });
  // this.router.navigate(['dashboard',this.loginModel.userName]);
  
 
  }

  

  }

 








  // registration conmponent 

  hide = true;
  registrationForm = this.fb.group({
    firstName: ['', [Validators.required,Validators.minLength(6)]],
    lastName: [''],
    email: ['', [Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
    userName:['', [Validators.required,Validators.pattern("^[a-zA-Z0-9]{6,20}")]],
    dob: ['', [Validators.required]],
    gender: ['', [Validators.required]],
    password:['', [Validators.required,Validators.pattern("^(?=.*[0-9])+(?=.*[a-z])(?=.*[A-Z])+(?=.*[@#$%^&+=])+(?=\\S+$).{8,20}$")]],
    confirmPassword:['', [Validators.required]]
  });
  
 
   onSubmit() {
    console.log('form data is ', this.registrationForm);
   }

   onPasswordChange() {
    if (this.confirm_password.value == this.password.value) {
      this.confirm_password.setErrors(null);
    } else {
      this.confirm_password.setErrors({ mismatch: true });
    }
  }
  
  // getting the form control elements
  get password(): AbstractControl {
    return this.registrationForm.controls['password'];
  }
  
  get confirm_password(): AbstractControl {
    return this.registrationForm.controls['confirmPassword'];
  }

   saveDetails(form: { value: any; }) {
  //  alert('SUCCESS!! :-)\n\n' + JSON.stringify(form.value, null, 4));
  console.log(form.value)
  }

}

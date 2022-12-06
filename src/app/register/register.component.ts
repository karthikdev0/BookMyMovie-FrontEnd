import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { user } from 'src/_interfaces/user.model';
import { userDetails } from 'src/_interfaces/userDetails.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  hide = true;



  userData:any ={
    userName:'',
    password:''
  }

  userModelId:number=0;

  userDetailsData:userDetails = {
    userId: 0,
    firstName: '',
    lastName: '',
    email: '',
    dateOfBirth: new Date(),
    gender: '',
    userModelId: 0
  }

  constructor(private fb:FormBuilder,private uService:UserService,
    private router:Router) { }

  ngOnInit(): void {
 
   }
   registrationForm = this.fb.group({
    firstName: ['', [Validators.required,Validators.minLength(6)]],
    lastName: [''],
    email: ['', [Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
    userName:['', [Validators.required,Validators.pattern("^[a-zA-Z0-9]{6,20}")]],
    dob: ['', [Validators.required]],
    gender: ['', [Validators.required]],
    password:['', [Validators.required,
/*       Validators.pattern("^(?=.*[0-9])+(?=.*[a-z])(?=.*[A-Z])+(?=.*[@#$%^&+=])+(?=\\S+$).{8,20}$") */
    ]],
    confirmPassword:['', [Validators.required]]
  });
  
 
   onSubmit() {
   // console.log('form data is ', this.registrationForm);
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
  //console.log(form.value);
  
  this.userData.userName  = form.value.userName;
  this.userData.password  = form.value.password;


  

 this.uService.registerUser(this.userData).subscribe(
   (res) => {

       // console.log("register user " + res);
          this.userModelId = res;
          this.userDetailsData.userModelId = res;
          this.userDetailsData.firstName = form.value.firstName;
          this.userDetailsData.lastName = form.value.lastName;
          this.userDetailsData.email = form.value.email;
          this.userDetailsData.gender = form.value.gender;
          this.userDetailsData.dateOfBirth = form.value.dob;
         // this.userDetailsData.userModelId = this.userModelId ;
         
         console.log(this.userDetailsData);
         
          this.uService.registerUserDetails(this.userDetailsData).subscribe(
            (res) => {
              console.log("register userdetails " + res);
              
            }
          );

          this.router.navigate(['login']);



   }
 );

 







  
  }

}

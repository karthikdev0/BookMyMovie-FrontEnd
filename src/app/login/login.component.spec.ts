import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { HttpRequestInterceptorMock } from 'src/mocks/HttpInterceptors';
import { login } from 'src/_interfaces/login.model';
import { HomeComponent } from '../home/home.component';
import { UserService } from '../services/user.service';

import { LoginComponent } from './login.component';

 describe('LoginComponent', () => {
  let component: LoginComponent;
  let userService : UserService;
  let fixture: ComponentFixture<LoginComponent>;
  let user:login ={
    password:'',
    userName:''
  }

  beforeEach( () => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes(
          [{path: 'home', component: HomeComponent}]
        ),
        ReactiveFormsModule, FormsModule
      ],
      providers :[
        LoginComponent,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: HttpRequestInterceptorMock,
          multi: true
        },
        /* { provide: UserService, useValue: {loginUser: (user) => { of( {token:'generated token'} ) } } as Partial<UserService> } */
      ]
     ,
      declarations: [ LoginComponent ]
    });
    component = TestBed.inject(LoginComponent);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  

  it('should store token in local storage when called login method' , () =>{
    
    component.loginAuthentication("username","password");

    let token  =   localStorage.getItem("token");

    expect(token).toEqual("abcd");
  });

  it('should store token as undefined when login method called and authentication is failed',() =>{
    component.loginAuthentication("u","p");

    let token = localStorage.getItem("token");

    expect(token).toEqual('undefined');
  })
}); 

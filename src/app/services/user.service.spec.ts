import { HttpClient, HttpHandler } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';



import { UserService } from './user.service';
import { login } from 'src/_interfaces/login.model';



describe('UserService', () =>{
  let service:UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], 
      providers: [UserService]
    });
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

 
  it('isLoggedIn should be equal to false before loggin',() =>{
    service.isLoggedIn.subscribe( res =>{
      expect(res).toBeFalse();
    })
  })

  it('isLoggedIn should be true after loggin',() =>{
    service.isLoggedIn.next(true);
    service.isLoggedIn.subscribe( res =>{
      expect(res).toBeTrue();
    })
  })

  it('username and role should be empty string',() =>{
      service.username.subscribe( res =>{
        expect(res).toEqual('');
      });
      service.role.subscribe((res) =>{
        expect(res).toEqual('');
      })
  })

  it('username and role should not be empty string after loggin',() =>{

    service.username.next('admin');
    service.role.next('admin');

    service.username.subscribe( res =>{
      expect(res).not.toEqual('');
    });
    service.role.subscribe((res) =>{
      expect(res).not.toEqual('');
    })
  })

 

})

describe('User Service HTTP methods',() =>{
  let service:UserService;
  let httpController :HttpTestingController;

  let url = 'https://localhost:7254/user-authentication/';
  let user :login = {
userName: "usertest",
password : "usertest"
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], 
      providers: [UserService]
    });
    service = TestBed.inject(UserService);
    httpController  =  TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpController.verify();
  });

  it('should call registerUser and returns value',() =>{

     service.registerUser({userName:"usertest1",password:"user@test10"}).subscribe(res => {
      expect(res).not.toBeNull();
    });  

     const req =  httpController.expectOne({
      url:`${url}register`,
      method:"POST"
    });
    req.flush(user);  
  });

  it('should call loginUser and returns value',() =>{

      service.loginUser(user).subscribe(res => {
      expect(res).not.toBeNull();
    });  

    const req =  httpController.expectOne({
      url:`${url}login`,
      method:"POST"
    });
    req.flush(user);  
 
  });

  




})
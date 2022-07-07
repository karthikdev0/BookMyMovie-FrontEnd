import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from "@angular/common/http";
import { Injectable, Injector } from "@angular/core";
import { Observable, of } from "rxjs";



@Injectable()
export class HttpRequestInterceptorMock implements HttpInterceptor {
    constructor(private injector: Injector) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): 
              Observable<HttpEvent<any>> {
        if (request.url && request.url
         .indexOf(`https://localhost:7254/user-authentication/login`) > -1) {
           if(request.body.userName === "username" && request.body.password === "password"){
            return of(new HttpResponse({ status: 200, body: {token:"abcd"} }));
           }
           else{
            return of(new HttpResponse({status:404,body:{"title": "Not Found"}}))
           }
            
        }

        return next.handle(request);
    }
}
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {
  constructor(private jwtHelper: JwtHelperService, private router: Router) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const token = localStorage.getItem("token");

     const decoded = JSON.stringify(this.jwtHelper.decodeToken(token as string));

     console.log(decoded.split(',')[1].split(':')[2].replace('"','').replace('"',''));

      if (token && !this.jwtHelper.isTokenExpired(token)){
        return true;
      }
    //  this.router.navigate(["login"]);
      return true;
  }
  
}

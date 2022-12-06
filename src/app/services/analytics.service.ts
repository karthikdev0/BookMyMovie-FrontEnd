import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {

  analyticsUrl =  "https://localhost:7254/Analytics/";

  constructor(private http:HttpClient) { }

  getAll():Observable<any>{
    return this.http.get(this.analyticsUrl +'getReviewChartData');
  }
}

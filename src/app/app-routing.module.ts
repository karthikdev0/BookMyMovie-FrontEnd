import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MovieListComponent } from './movie-list/movie-list.component';
import { SingleBookedTicketComponent } from './movie-ticket-booking/ticket/single-booked-ticket/single-booked-ticket.component';
import { TicketComponent } from './movie-ticket-booking/ticket/ticket.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'home',component:HomeComponent},
  {path:'movie-list',component:MovieListComponent},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'ticket',component:TicketComponent},
  {path:'single-ticket',component:SingleBookedTicketComponent},
  { path: 'dashboard',
   loadChildren : () => import('./dashboard/dashboard.module').then( m => m.DashboardModule) ,
  },
  {
    path:'movie-ticket-booking',
    loadChildren : () => import('./movie-ticket-booking/movie-ticket-booking.module').then( m => m.MovieTicketBookingModule),
  },
  {path:'**',redirectTo:'/home',pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{preloadingStrategy:PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }

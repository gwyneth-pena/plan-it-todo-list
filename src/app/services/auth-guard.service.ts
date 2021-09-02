import { Injectable } from '@angular/core';
import { CanActivate,  Router,  } from '@angular/router';
import { AuthenticateService } from './authenticate.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor( private router:Router, private authService : AuthenticateService) { }

  canActivate():boolean{
      var logged=false; 
          if(localStorage.getItem('token')){
                logged=true;
               
          }else{
                logged = false;
                this.router.navigate(['/login']);
                
          }
  this.authService.loggedIn=logged;    
   return logged  ;
  }

 

}

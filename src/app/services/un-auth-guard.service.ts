import { Injectable } from '@angular/core';
import { CanActivate,  Router } from '@angular/router';
import { AuthenticateService } from './authenticate.service';

@Injectable({
  providedIn: 'root'
})
export class UnAuthGuardService implements CanActivate{
   constructor( private router:Router, private authService:AuthenticateService) { }
  
   canActivate():boolean{
    var go=false; 
        if(localStorage.getItem('token')){
            go=false;
            this.authService.loggedIn =true;
            this.router.navigate(['/dashboard']);
        } else{
            go=true;
            this.authService.loggedIn=false;
            
        }        

 return go  ;
}



  }

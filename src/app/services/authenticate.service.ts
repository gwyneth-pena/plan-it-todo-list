import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {   Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';
import { User } from 'src/models/user.model';
import { HandleErrorService } from './handle-error.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {
loggedIn = false;


  constructor(private http:HttpClient,private errorHandlerService:HandleErrorService) { }
  private url = 'https://plan-it-todo.herokuapp.com/users';
  httpOptions = {
    headers:new HttpHeaders({
      'Content-Type':'application/json'
    })
  }

 userId :number|null= null;
 currentUser:any;

  login(loginFormData:any):Observable<any>{
           
         return this.http.post<any>(`${this.url}/login`,loginFormData,this.httpOptions).pipe(
           
           catchError(this.errorHandlerService.errorHandler)
           
         );
  }

 signUp(signUpFormData:User):Observable<User>{
       
      
      return this.http.post<User>(`${this.url}/signup`,signUpFormData,this.httpOptions)
       .pipe(
         catchError(this.errorHandlerService.errorHandler)
        
       )
 }
 
 getCurrentUser(loggedIn:any):Observable<any>{
     return this.http.get(`${this.url}/currentUser/${loggedIn}`,this.httpOptions).pipe(
      catchError(this.errorHandlerService.errorHandler)

     )        
 }



}

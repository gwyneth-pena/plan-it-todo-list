
import { Component,  OnInit } from '@angular/core';
import {  AbstractControl,    FormBuilder,        ValidationErrors,       Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { fall } from 'src/app/animations/animations';



import { AuthenticateService } from 'src/app/services/authenticate.service';



@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
  animations:[fall]
})
export class SignUpComponent implements OnInit {

  constructor(private authService:AuthenticateService, 
             private fb:FormBuilder,
             private router:Router) { }

  ifHasExistingEmailError:any;
  signUpForm :any;
  tempValue:boolean = false;


  ngOnInit(): void {

    this.signUpForm = this.fb.group({
      first_name:['',[Validators.required]],
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.minLength(7),Validators.required]],
      confirm_password:['',[Validators.minLength(7),Validators.required]],
      last_name:['',[Validators.required]]
    },{validators:this.passwordMatchValidator} )
  }

 
 
signUp(){

   
    this.authService.signUp(this.signUpForm.value).subscribe(
       (success)=>{
       

        
              this.ifHasExistingEmailError=false;
              var data = {
                email:this.signUpForm.value.email,
                password:this.signUpForm.value.password
              }
            
               this.login(data);
             
                  
           

       },(err)=>{
         this.ifHasExistingEmailError=true;
         
       }

    );

}



login(data:any){
  this.authService.login(data).subscribe((msg)=>{
    
    if(msg?.token){
      this.authService.userId=msg.userIdFromDb;
      this.signUpForm.reset();
      localStorage.setItem('token',msg.token);
      this.router.navigate(['./dashboard']);
    
     }
 
 });
    
}

  passwordMatchValidator(control:AbstractControl):ValidationErrors|null{
  
         if(control.get('password')?.value===control.get('confirm_password')?.value){
           return null;
         }else{
         return {'mismatch':true};}
  } 
}

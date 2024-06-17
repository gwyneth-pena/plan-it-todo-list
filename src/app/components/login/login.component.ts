import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { fall } from 'src/app/animations/animations';
import { AuthenticateService } from 'src/app/services/authenticate.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [fall],
})
export class LoginComponent implements OnInit {
  constructor(
    private authService: AuthenticateService,
    private router: Router
  ) {}

  hasError: boolean = false;

  ngOnInit(): void {}

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  login() {
    this.authService.login(this.loginForm.value).subscribe(
      (msg) => {
        if (msg.token) {
          this.hasError = false;
          this.authService.userId = msg.userIdFromDb;
          this.authService.currentUser = `${this.loginForm.value.first_name} ${this.loginForm.value.last_name}`;
          localStorage.setItem('token', msg.token);
          this.router.navigate(['./dashboard']);
          this.loginForm.reset();
        }
      },
      () => {
        this.hasError = true;
      }
    );
  }
}

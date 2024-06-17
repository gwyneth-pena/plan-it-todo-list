import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class HandleErrorService {
  constructor(private router: Router) {}

  errorHandler = (error: HttpErrorResponse) => {
    let errorMessage = '';

    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else if (error.error.msg) {
      if (error.error.msg.loginError) {
        errorMessage = `Error:  ${error.status}  ${error.statusText} | ${error.error.msg.loginError}`;
      } else if (error.error.msg.existingEmailError) {
        errorMessage = `Error:  ${error.status}  ${error.statusText} | ${error.error.msg.existingEmailError}`;
      } else if (
        error.error.msg.unauthorizedAccessError ||
        error.error.msg == "User doesn't exist."
      ) {
        errorMessage = `Error:  ${error.status}  ${error.statusText} | ${error.error.msg.unauthorizedAccessError}`;
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
      } else {
        errorMessage = `Error:  ${error.status} | ${error.statusText}  `;
      }
    } else {
      errorMessage = `Error:  ${error.status} | ${error.statusText}  `;
    }

    return throwError(errorMessage);
  };
}

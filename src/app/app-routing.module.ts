import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { LoginComponent } from './components/login/login.component';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { TermsConditionsComponent } from './components/terms-conditions/terms-conditions.component';
import { AuthGuardService as AuthGuard } from './services/auth-guard.service';
import { UnAuthGuardService as UnAuthGuard } from './services/un-auth-guard.service';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: LandingPageComponent,
    canActivate: [UnAuthGuard],
  },
  { path: 'login', component: LoginComponent, canActivate: [UnAuthGuard] },
  { path: 'sign-up', component: SignUpComponent, canActivate: [UnAuthGuard] },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  { path: 'privacy-policy', component: PrivacyPolicyComponent },
  { path: 'terms-and-conditions', component: TermsConditionsComponent },
  { path: '**', component: ErrorPageComponent, canActivate: [UnAuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

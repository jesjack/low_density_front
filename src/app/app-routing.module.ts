import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';
import { SharedFileComponent } from './views/shared-file/shared-file.component';
import { SigninComponent } from './views/signin/signin.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signin',
    component: SigninComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'shared-file/:cid',
    component: SharedFileComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

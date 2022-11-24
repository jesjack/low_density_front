import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './views/login/login.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './views/home/home.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { AddFileButtonComponent } from './components/add-file-button/add-file-button.component';
import { FileViewComponent } from './components/file-view/file-view.component';
import { SharedFileComponent } from './views/shared-file/shared-file.component';
import { SigninComponent } from './views/signin/signin.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NavbarComponent,
    AddFileButtonComponent,
    FileViewComponent,
    SharedFileComponent,
    SigninComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

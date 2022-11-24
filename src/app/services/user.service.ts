import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
    private route: Router
  ) { }

  login(username: string, password: string) {
    return this.http.post('/api/users/login', { username, password });
  }

  redirectToHome() {
    this.route.navigate(['/home']);
  }

  checkSession() {
    return this.http.get('/api/users/check-session')
  }

  logout() {
    return this.http.get('/api/users/logout');
  }

  redirectToLogin() {
    this.route.navigate(['/login']);
  }
}

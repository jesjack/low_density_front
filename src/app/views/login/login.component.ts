import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username = '';
  password = '';
  
  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.userService.checkSession().subscribe((isLogged: any) => {
      if (isLogged) {
        this.userService.redirectToHome();
      }
    });
  }

  login() {
    this.userService.login(this.username, this.password)
      .subscribe((response: any) => {
        if (response.error) {
          alert(response.error);
        } else {
          this.userService.redirectToHome();
        }
      });
  }

}

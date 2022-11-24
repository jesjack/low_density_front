import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  username: string = '';
  password: string = '';
  password2: string = '';
  
  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
  }

  signin() {
    if (this.password !== this.password2) {
      return alert('Las contraseñas no coinciden');
    }
    this.userService.signin(this.username, this.password)
      .subscribe((response: any) => {
        if (response.error) {
          alert(response.error);
        } else {
          this.userService.redirectToHome();
        }
      });
  }
}

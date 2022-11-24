import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  files: any[] = [];
  
  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.userService.checkSession().subscribe((isLogged: any) => {
      if (!isLogged) {
        this.userService.redirectToLogin();
      }

      this.userService.getFiles().subscribe((files: any) => {
        if (files.error) {
          return alert(files.error)
        }

        this.files.push(...files)
      })
    });
  }

  addFiles(files: any[]) {
    console.log(files, 'eeee');
    this.files = [...this.files, ...files]
  }

}

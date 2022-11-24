import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpEventType } from '@angular/common/http';
import { Router } from '@angular/router';
import { ModalService } from './modal.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
    private route: Router,
    private modalService: ModalService
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

  sendFiles(files: File[]) {
    this.modalService.openLoadingModal({});
    const formData = new FormData();
    files.forEach(file => formData.append('files', file));
    const upload$: Observable<HttpEvent<any>> = this.http.post('/api/user-files/upload-files', formData, {
      reportProgress: true,
      observe: 'events'
    });

    // this.modalService.setProgress(1-100);
    upload$.subscribe((event: HttpEvent<any>) => {
      if (event.type === HttpEventType.DownloadProgress || event.type === HttpEventType.UploadProgress) {
        const progress = Math.round(event.loaded / (event.total??100) * 100);
        this.modalService.setProgress(progress);
      }

      if (event.type === HttpEventType.Response) {
        this.modalService.closeLoadingModal();
      }

      
      
    })

    return upload$;
  }

  getFiles() {
    return this.http.get('/api/user-files/get-files');
  }

  signin(username: string, password: string) {
    return this.http.post('/api/users/signin', { username, password });
  }
}

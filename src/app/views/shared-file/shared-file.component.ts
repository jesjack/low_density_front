import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-shared-file',
  templateUrl: './shared-file.component.html',
  styleUrls: ['./shared-file.component.scss']
})
export class SharedFileComponent implements OnInit {

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const cid = this.route.snapshot.paramMap.get('cid');
    window.open('/api/user-files/get-file-by-link/' + cid, '_self');
  }

}

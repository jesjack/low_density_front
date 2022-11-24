import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-file-view',
  templateUrl: './file-view.component.html',
  styleUrls: ['./file-view.component.scss']
})
export class FileViewComponent implements OnInit {

  icon: unknown
  @Input() name!: string
  @Input() size!: number
  @Input() ngStyle!: any
  @Input() cid!: string
  
  constructor(
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    const tooltipTriggerList: any = document.querySelectorAll('[data-bs-toggle="tooltip"]')
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

  }

  vizualize() {
    window.open(`https://ipfs.io/ipfs/${this.cid}`, '_blank')
  }

  shareFile() {
    this.http.get('/api/user-files/share-file/' + this.cid).subscribe((response: any) => {
      const url = window.location.protocol + '//' + window.location.host + '/shared-file/' + response.link;
      copyTextToClipboard(url);
    })
  }

  delete___() {
    this.http.delete('/api/user-files/delete-file/' + this.cid).subscribe(() => {
      window.location.reload();
    })
  }

}


function fallbackCopyTextToClipboard(text: string) {
  var textArea = document.createElement("textarea");
  textArea.value = text;
  
  // Avoid scrolling to bottom
  textArea.style.top = "0";
  textArea.style.left = "0";
  textArea.style.position = "fixed";

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    var successful = document.execCommand('copy');
    var msg = successful ? 'successful' : 'unsuccessful';
    console.log('Fallback: Copying text command was ' + msg);
  } catch (err) {
    console.error('Fallback: Oops, unable to copy', err);
  }

  document.body.removeChild(textArea);
}
function copyTextToClipboard(text: string) {
  if (!navigator.clipboard) {
    fallbackCopyTextToClipboard(text);
    return;
  }
  navigator.clipboard.writeText(text).then(function() {
    console.log('Async: Copying to clipboard was successful!');
  }, function(err) {
    console.error('Async: Could not copy text: ', err);
  });
}
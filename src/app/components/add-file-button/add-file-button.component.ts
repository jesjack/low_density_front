import { HttpEventType } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild, ViewChildren } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-file-button',
  templateUrl: './add-file-button.component.html',
  styleUrls: ['./add-file-button.component.scss']
})
export class AddFileButtonComponent implements OnInit {

  @ViewChild('dropper') dropper!: ElementRef<HTMLDivElement>;

  @Output() files = new EventEmitter<any>();
  
  constructor(
    private modalService: ModalService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    window.addEventListener('dragenter', (event: any) => {
      event.preventDefault();
      this.dropper.nativeElement.style.display = 'flex';
    })
  }

  // dragstart(event: any) {
  //   event.preventDefault();
  // }

  dragend(event: any) {
    event.preventDefault();
    this.dropper.nativeElement.style.display = 'none';
  }

  dropHandler(event: any) {
    event.preventDefault();

    const files: File[] = [...event.dataTransfer.files];

    this.userService.sendFiles(files).subscribe((response: any) => {
      if (event.type === HttpEventType.Response) {
        this.files.emit(event.body);
      }
    });

    this.dropper.nativeElement.style.display = 'none';
  }

  selectFiles(event?: any) {
    event?.preventDefault();
    const input = document.createElement('input');
    input.type = 'file';
    input.multiple = true;
    input.onchange = (event: any) => {
      const files = [...event.target.files];
      this.userService.sendFiles(files).subscribe({
        next: (response: any) => {
          if (event.type === HttpEventType.Response) {
            this.files.emit(event.body);
          }
        },
      });
    }
    input.click();
  }

}

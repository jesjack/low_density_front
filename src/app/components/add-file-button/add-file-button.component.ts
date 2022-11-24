import { Component, ElementRef, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-add-file-button',
  templateUrl: './add-file-button.component.html',
  styleUrls: ['./add-file-button.component.scss']
})
export class AddFileButtonComponent implements OnInit {

  @ViewChild('dropper') dropper!: ElementRef<HTMLDivElement>;
  
  constructor(
    private modalService: ModalService
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

    if (event.dataTransfer.items) {
      [...event.dataTransfer.items].forEach((item, i) => {
        // If dropped items aren't files, reject them
        if (item.kind === 'file') {
          const file = item.getAsFile();
          console.log(`… file[${i}].name = ${file.name}`);
        }
      });
    } else {
      // Use DataTransfer interface to access the file(s)
      [...event.dataTransfer.files].forEach((file, i) => {
        console.log(`… file[${i}].name = ${file.name}`);
      });
    }

    this.dropper.nativeElement.style.display = 'none';
  }

  selectFiles(event?: any) {
    event?.preventDefault();
    const input = document.createElement('input');
    input.type = 'file';
    input.multiple = true;
    input.onchange = (event: any) => {
      [...event.target.files].forEach((file, i) => {
        console.log(`… file[${i}].name = ${file.name}`);
      });
      this.modalService.openModal({});
    }
    input.click();
  }

}

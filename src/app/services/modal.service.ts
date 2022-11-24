import { Injectable } from '@angular/core';
import * as bootstrap from 'bootstrap';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  modal?: bootstrap.Modal
  
  constructor() { }

  openModal({
    title = '',
    html = '',
  }) {
    const modalContainer = document.createElement('div');
    modalContainer.innerHTML = `<!-- Modal -->
      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">${title}</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              ${html}
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary">Save changes</button>
            </div>
          </div>
        </div>
      </div>`;

    document.body.appendChild(modalContainer);
    const modalDiv = modalContainer.querySelector('#exampleModal');
    if (modalDiv) {
      const modal = new bootstrap.Modal(modalDiv);
      modal.show();
    }
  }

  openLoadingModal( {
  }) {
    const modalContainer = document.createElement('div');
    modalContainer.innerHTML = `<!-- Modal -->
      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">Espere a que se termine de procesar los archivos...</h1>
            </div>
            <div class="modal-body">
            <div class="progress">
            <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-label="Espere a que se termine de procesar los" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: 75%"></div>
             </div>
              </div>
          
          </div>
        </div>
      </div>`;

    document.body.appendChild(modalContainer);
    const modalDiv = modalContainer.querySelector('#exampleModal');
    if (modalDiv) {
      this.modal = new bootstrap.Modal(modalDiv, {
        backdrop: 'static',
        keyboard: false,
      });
      this.modal.show();
    }
    //
  }

  closeLoadingModal() {
    const modalDiv = document.querySelector('#exampleModal');
    if (modalDiv) {
      modalDiv.remove();
    }
    this.modal?.dispose();
    console.log(this.modal);
    if (modalDiv) {
      // this.modal = new bootstrap.Modal(modalDiv);
    }
    //reload page
    window.location.reload();
  }

  setProgress(n: number) {
    const progress = document.querySelector('.progress-bar');
    if (progress) {
      progress.setAttribute('aria-valuenow', n.toString());
      progress.setAttribute('style', `width: ${n}%`);
    }
  }
}

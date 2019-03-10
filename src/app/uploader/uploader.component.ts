import { Component } from '@angular/core';

@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.css']
})
export class UploaderComponent {
  displayDialog: boolean = false;
  selectedFiles: null;
  uploadDirectory: string;
  overwriteExisting: boolean = false;

  onDirectorySelect(event) {
    if (event.target.files) {
      this.selectedFiles = event.target.files;
      this.adjustWindowPlacement();
    }
  }

  private adjustWindowPlacement() {
    this.displayDialog = false;
    setTimeout(() => {
      this.displayDialog = true;
    }, 1);
  }

  showUploadDialog() {
    this.displayDialog = true;
  }
}

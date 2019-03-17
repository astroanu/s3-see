import { Component } from '@angular/core';
import { remote } from 'electron';

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

  showDialog() {
    remote.dialog.showOpenDialog(
      {
        title: 'Select a folder',
        properties: ['openDirectory']
      },
      (folderPath) => {
        if (folderPath === undefined) {
          console.log("You didn't select a folder");
          return;
        }
        console.log(folderPath);
      }
    );

    this.displayDialog = true;
  }
}

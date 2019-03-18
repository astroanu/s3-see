import { Component } from '@angular/core';
import { readdir } from 'file-system';
import { ElectronService } from 'ngx-electron';

@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.scss']
})
export class UploaderComponent {
  displayDialog: boolean = false;
  selectedFiles: null;
  uploadDirectory: string;
  overwriteExisting: boolean = false;

  selectDirectory() {
    this.electronService.remote.dialog.showOpenDialog(
      {
        title: 'Select a folder',
        properties: ['openDirectory']
      },
      (paths) => {
        if (paths) {
          this.uploadDirectory = paths[0];
          window.dispatchEvent(new Event('resize'));

          this.readFilesInDirectory();
        }
      }
    );
  }

  private readFilesInDirectory() {
    readdir(this.uploadDirectory, (err, files) => {
      files.forEach((file) => {
        console.log(file);
      });
    });
  }

  private adjustWindowPlacement() {
    this.displayDialog = false;
    setTimeout(() => {
      this.displayDialog = true;
    }, 1);
  }

  showDialog() {
    this.displayDialog = true;
  }

  constructor(private electronService: ElectronService) {}
}

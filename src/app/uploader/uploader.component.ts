import { Component } from '@angular/core';
import { ElectronService } from 'ngx-electron';

import { UploaderService } from '../../services/uploader/uploader.service';

@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.scss']
})
export class UploaderComponent {
  displayDialog: boolean = false;
  selectedFiles: Array<object> = null;
  uploadDirectory: string;
  overwriteExisting: boolean = false;
  uploaderService: UploaderService;

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

          this.initializeUploaderService();
        }
      }
    );
  }

  private initializeUploaderService() {
    this.uploaderService = new UploaderService(this.uploadDirectory);

    this.uploaderService.createFileTree().then((files: any) => {
      this.selectedFiles = files;

      this.adjustWindowPlacement();
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

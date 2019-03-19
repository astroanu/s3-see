import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ElectronService } from 'ngx-electron';

import { UploaderService } from '../../services/uploader/uploader.service';

@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.scss']
})
export class UploaderComponent {
  displayDialog: boolean = false;

  displayOptions: boolean = false;

  optionsForm: FormGroup = new FormGroup({
    prefix: new FormControl(),
    suffix: new FormControl(),
    flattern: new FormControl(false),
    overwrite: new FormControl(true),
    toLowerCase: new FormControl(true),
    noSpaces: new FormControl(true)
  });

  selectedFiles: Array<object> = null;

  selectedFile = null;

  files: Array<object> = null;

  uploadDirectory: string;

  filesSelectedTotalSize = 0;

  uploaderService: UploaderService;

  columns: Array<object> = [
    {
      field: 'fileName',
      header: 'File'
    },
    {
      field: 'sizePretty',
      header: 'Size'
    },
    {
      field: 'lastModified',
      header: 'Last Modified'
    },
    {
      field: 'destinationKey',
      header: 'Upload Destination'
    }
  ];

  selectDirectory() {
    this.electronService.remote.dialog.showOpenDialog(
      {
        title: 'Select a folder',
        properties: ['openDirectory']
      },
      (paths) => {
        if (paths) {
          this.uploadDirectory = paths[0];

          this.initializeUploaderService();
        }
      }
    );
  }

  previewFile(file) {
    this.selectedFile = file;
  }

  updateFileSize() {
    const fileSizes = this.selectedFiles.map((file: any) => {
      return file.size;
    });

    this.filesSelectedTotalSize = fileSizes.length ? fileSizes.reduce((a, b) => a + b) : 0;
  }

  queueUpload() {}

  showOptions() {
    this.displayOptions = true;
  }

  hideOptions() {
    this.displayOptions = false;
  }

  applyOptions() {
    this.uploaderService.setUploadOptions(this.optionsForm.value);
    this.createFileTree();
    this.hideOptions();
  }

  private initializeUploaderService() {
    this.uploaderService = new UploaderService(this.uploadDirectory);

    this.createFileTree();
  }

  private createFileTree() {
    this.uploaderService.createFileTree().then((files: any) => {
      this.files = files;

      window.dispatchEvent(new Event('resize'));
    });
  }

  showDialog() {
    this.clearVars();

    this.displayDialog = true;
  }

  clearVars() {
    this.selectedFiles = null;
    this.selectedFile = null;
    this.files = null;
    this.uploadDirectory = null;
  }

  constructor(private electronService: ElectronService) {}
}

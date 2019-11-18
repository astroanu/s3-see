import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ElectronService } from "ngx-electron";

import { LocalFile } from "../../models/file/local-file.model";
import { UploaderService } from "../../services/uploader/uploader.service";
import { BrowserWindow, OpenDialogOptions } from "electron";

@Component({
  selector: "app-uploader",
  templateUrl: "./uploader.component.html",
  styleUrls: ["./uploader.component.scss"]
})
export class UploaderComponent {
  @Output() uploadQueued = new EventEmitter<any>();

  @Input() set bucket(bucketName: any) {
    this.bucketName = bucketName;
  }

  private bucketName: string;

  public displayDialog: boolean = false;

  public displayOptions: boolean = false;

  public optionsForm: FormGroup = new FormGroup({
    prefix: new FormControl(null, [Validators.required]),
    suffix: new FormControl(),
    flattern: new FormControl(false),
    overwrite: new FormControl(true),
    toLowerCase: new FormControl(true),
    noSpaces: new FormControl(true)
  });

  public selectedFiles: Array<LocalFile> = null;

  public selectedFile = null;

  public files: Array<object> = null;

  public uploadDirectory: string;

  public filesSelectedTotalSize: number = 0;

  public columns: Array<object> = [
    {
      field: "fileName",
      header: "File"
    },
    {
      field: "sizePretty",
      header: "Size"
    },
    {
      field: "lastModified",
      header: "Last Modified"
    },
    {
      field: "destinationKey",
      header: "Upload Destination"
    }
  ];

  public selectDirectory() {
    const options: OpenDialogOptions = {
      title: "Select a folder",
      properties: ["openDirectory"]
    };

    this.electronService.remote.dialog
      .showOpenDialog(new BrowserWindow(), options)
      .then(paths => {
        if (paths) {
          this.uploadDirectory = paths[0];

          this.initializeUploaderService();
        }
      });
  }

  public previewFile(file) {
    this.selectedFile = file;
  }

  public updateFileSize() {
    const fileSizes = this.selectedFiles.map((file: any) => {
      return file.size;
    });

    this.filesSelectedTotalSize = fileSizes.length
      ? fileSizes.reduce((a, b) => a + b)
      : 0;
  }

  public queueUpload() {
    this.uploadQueued.emit(
      this.uploaderService.getJob(this.selectedFiles, this.bucketName)
    );
    this.hideDialog();
  }

  public showOptions() {
    this.displayOptions = true;
  }

  public hideOptions() {
    this.displayOptions = false;
  }

  public applyOptions() {
    this.uploaderService.setUploadOptions(this.optionsForm.value);
    this.createFileTree();
    this.hideOptions();
  }

  private initializeUploaderService() {
    this.uploaderService.setUploadDirectory(this.uploadDirectory);

    this.applyOptions();
  }

  private createFileTree() {
    this.uploaderService.createFileTree().subscribe((files: any) => {
      this.files = files;
      this.selectedFiles = files;
      this.updateFileSize();

      window.dispatchEvent(new Event("resize"));
    });
  }

  public showDialog() {
    this.clearVars();

    this.displayDialog = true;
  }

  public hideDialog() {
    this.displayDialog = false;
  }

  private clearVars() {
    this.selectedFiles = null;
    this.selectedFile = null;
    this.files = null;
    this.uploadDirectory = null;
  }

  constructor(
    private electronService: ElectronService,
    private uploaderService: UploaderService
  ) {}
}

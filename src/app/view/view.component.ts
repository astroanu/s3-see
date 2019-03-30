import { Component, ElementRef, Input } from '@angular/core';

import { DirectoryInterface } from '../../models/directory/directory.interface';
import { S3FileInterface } from '../../models/file/s3-file.interface';
import { FileService } from '../../services/file/file.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent {
  public columns: Array<object> = [
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
    }
  ];

  public thumbH: number = 200;

  public thumbW: number = 25;

  public thumbMultiplier: number = 7;

  public filesShown: Array<S3FileInterface> = [];

  public listView: boolean = false;

  public loading: boolean = false;

  public selectedFile: S3FileInterface = null;

  public filesShownTotalSize = 0;

  public currentDirectory: DirectoryInterface;

  @Input() set currentNode(node: DirectoryInterface) {
    if (node) {
      this.resetFilesShown();
      this.setThumbSize();

      this.currentDirectory = node;

      this.currentDirectory
        .loadFiles()
        .then(() => {
          this.filesShown = this.currentDirectory.files;
          const fileSizes = this.filesShown.map((file) => {
            return file.size;
          });

          this.filesShownTotalSize = fileSizes.length ? fileSizes.reduce((a, b) => a + b) : 0;
        })
        .catch(() => console.log(' @Input() set currentNode failed'));
    }
  }

  @Input() set files(files: any) {
    if (files) {
      this.resetFilesShown();
      this.setThumbSize();

      this.filesShown = files;
    }
  }

  public onZoomChange() {
    this.setThumbSize();
  }

  public setSelectedFile(file) {
    this.selectedFile = file;
  }

  public get panelHeight() {
    const dataViewEl = this.el.nativeElement.querySelector('.ui-dataview');

    return window.innerHeight - dataViewEl.getBoundingClientRect().top - 60;
  }

  public setThumbSize() {
    const dataViewEl = this.el.nativeElement.querySelector('.ui-dataview');

    const containerWidth = dataViewEl.offsetWidth - 14;

    this.thumbW = 100 / this.thumbMultiplier;
    this.thumbH = containerWidth / this.thumbMultiplier;
  }

  public resetFilesShown() {
    this.filesShownTotalSize = 0;
    this.filesShown = [];
  }

  private viewList() {
    this.listView = true;
  }

  private viewThumbs() {
    this.listView = false;
  }

  constructor(private fileService: FileService, private el: ElementRef) {}
}

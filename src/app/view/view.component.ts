import { Component, ElementRef, Input } from '@angular/core';

import { Directory } from '../../models/directory.model';
import { File } from '../../models/file.model';
import { FileService } from '../../services/file.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent {
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
    }
  ];

  thumbH: number = 200;
  thumbW: number = 25;
  thumbMultiplier: number = 7;
  filesShown: Array<File> = [];
  listView: boolean = false;
  loading: boolean = false;
  selectedFile: File = null;
  filesShownTotalSize = 0;
  currentDirectory: Directory;

  @Input() set currentNode(node: Directory) {
    if (node) {
      this.resetFilesShown();
      this.setThumbSize();

      this.currentDirectory = node;

      this.currentDirectory.loadFiles().then(() => {
        this.filesShown = this.currentDirectory.files;
        const fileSizes = this.filesShown.map((file) => {
          return file.size;
        });

        this.filesShownTotalSize = fileSizes.length ? fileSizes.reduce((a, b) => a + b) : 0;
      });
    }
  }

  onZoomChange() {
    this.setThumbSize();
  }

  setSelectedFile(file) {
    this.selectedFile = file;
  }

  setThumbSize() {
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

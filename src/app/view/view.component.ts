import { Component, Input } from '@angular/core';

import { File } from '../../models/file.model';
import { Directory } from '../../models/directory.model';

import { FileService } from '../../services/file.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent {
  columns: Array<object> = [
    { field: 'fileName', header: 'File' },
    { field: 'sizePretty', header: 'Size' },
    { field: 'lastModified', header: 'Last Modified' }
  ];

  thumbSize: number = 200;
  filesShown: Array<File> = [];
  listView: boolean = false;
  loading: boolean = false;
  selectedFile: File = null;
  filesShownTotalSize = 0;

  @Input() set currentNode(node: Directory) {
    if (node) {
      this.resetFilesShown();

      node.loadFiles().then(() => {
        this.filesShown = node.files;
      });
    }
  }

  setSelectedFile(file) {
    this.selectedFile = file;
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

  constructor(private fileService: FileService) {}
}

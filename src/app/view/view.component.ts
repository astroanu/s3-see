import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { TreeNode } from 'primeng/api';

import { FileList } from '../../models/file-list.model';
import { File } from '../../models/file.model';
import { Directory } from '../../models/directory.model';

import { FileService } from '../../services/file.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  columns: Array<object> = [{ field: 'fileName', header: 'File' }, { field: 'sizePretty', header: 'Size' }];
  filesShown: Array<File> = [];
  thumbSize: number = 200;
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

  private getFiles(prefix = null, NextContinuationToken = null) {
    this.loading = true;
    return new Promise((resolve, reject) => {
      return this.fileService.listObjects(prefix, NextContinuationToken).then((list: FileList) => {
        if (list.hasFiles) {
          list.files.forEach((file: File) => {
            const pathParts = file.key.replace(prefix, '.').split('/');
            if (pathParts.length === 2 && pathParts[1].length) {
              this.filesShown.push(file);
              this.filesShownTotalSize = this.filesShownTotalSize + file.size;
            }
          });
        }

        if (list.hasMore) {
          return this.getFiles(prefix, list.nextContinuationToken);
        } else {
          this.loading = false;
          resolve();
        }
      });
    });
  }

  constructor(private fileService: FileService) {}

  ngOnInit() {}
}

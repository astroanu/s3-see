import { Component, EventEmitter, Input, Output } from '@angular/core';

import { DirectoryInterface } from '../../models/directory/directory.interface';
import { FileListInterface } from '../../models/file-list/file-list.interface';
import { TreeService } from '../../services/tree/tree.service';

@Component({
  selector: 'app-dir-tree',
  templateUrl: './dir-tree.component.html',
  styleUrls: ['./dir-tree.component.scss']
})
export class DirTreeComponent {
  @Output() selected = new EventEmitter<any>();

  @Input() set bucket(bucketName: any) {
    if (bucketName) {
      this.treeService.fileService.setBucket(bucketName);
      this.initializeDirPane();
    }
  }

  selectedFiles: Array<any> = [];
  fileCache: Array<object> = [];
  fileTree: Array<object> = [];
  folderStructor: Object = {};
  loading: boolean = true;

  initializeDirPane() {
    this.selectedFiles = [];
    this.fileTree = [];
    this.folderStructor = {};
    this.loading = true;

    this.getDirStructure().then(() => {
      this.loading = false;
      console.log('Dir listing complete');
    });
  }

  selectNode(event) {
    const node: DirectoryInterface = event.node;

    node.loadSubdirectories().then(() => {
      console.log('subdirectories loaded');
      this.selected.emit(node);
    });
  }

  private getDirStructure(prefix = null, NextContinuationToken = null) {
    return new Promise((resolve, reject) => {
      return this.treeService.listDirectories(prefix, NextContinuationToken).then((list: FileListInterface) => {
        if (list.hasDirectories) {
          list.directories.forEach((directory: DirectoryInterface) => {
            this.fileTree.push(directory);
          });
        }

        if (list.hasMore) {
          return this.getDirStructure(prefix, list.nextContinuationToken);
        } else {
          resolve();
        }
      });
    });
  }

  constructor(private treeService: TreeService) {}
}

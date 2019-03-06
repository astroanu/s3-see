import { Component, EventEmitter, Input, Output } from '@angular/core';
import * as _ from 'lodash';
import { TreeNode } from 'primeng/api';

import { FileList } from '../../models/file-list.model';
import { File } from '../../models/file.model';
import { Directory } from '../../models/directory.model';

import { FileService } from '../../services/file.service';
import { TreeService } from '../../services/tree.service';

@Component({
  selector: 'app-dir-tree',
  templateUrl: './dir-tree.component.html',
  styleUrls: ['./dir-tree.component.css']
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

  private selectNode(event) {
    const node: Directory = event.node;

    node.loadSubdirectories().then(() => {
      console.log('subdirectories loaded');
    });

    this.selected.emit(node);
  }

  private getDirStructure(prefix = null, NextContinuationToken = null) {
    return new Promise((resolve, reject) => {
      return this.treeService.listDirectories(prefix, NextContinuationToken).then((list: FileList) => {
        if (list.hasDirectories) {
          list.directories.forEach((directory: Directory) => {
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

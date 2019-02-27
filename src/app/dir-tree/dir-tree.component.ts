import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import * as _ from 'lodash';

import { FileList } from '../../models/file-list.model';
import { File } from '../../models/file.model';
import { FileService } from '../../services/file.service';

@Component({
  selector: 'app-dir-tree',
  templateUrl: './dir-tree.component.html',
  styleUrls: ['./dir-tree.component.css']
})
export class DirTreeComponent implements OnInit {
  @Output() selected = new EventEmitter<any>();

  selectedFiles: Array<any> = [];
  fileCache: Array<object> = [];
  fileTree: Array<object> = [];
  folderStructor: Object = {};

  selectNode(event) {
    const node = event.node;

    this.selected.emit(node);
  }

  constructor(private fileService: FileService) {}

  buildTree() {
    this.fileTree = this.objectToNodeArray(this.folderStructor);
  }

  objectToNodeArray(obj, parent = null) {
    return Object.entries(obj).map(([label, children]) => {
      return {
        label: label,
        prefix: `${parent ? parent + '/' : ''}${label}`,
        children: this.childrenToNode(children, label)
      };
    });
  }

  childrenToNode(children, label) {
    if (typeof children === 'object' && children !== null) {
      return this.objectToNodeArray(children, label);
    } else {
      return children;
    }
  }

  getFileStructure(prefix = null, NextContinuationToken = null) {
    return new Promise((resolve, reject) => {
      return this.fileService.listObjects(prefix, NextContinuationToken).then((list: FileList) => {
        if (list.hasFiles) {
          list.files.forEach((file: File) => {
            if (!file.key.includes('_thumbs')) {
              this.addFileToTree(file);
              // this.fileCache.push(file);
            }
          });
        }

        if (list.hasMore) {
          return this.getFileStructure(prefix, list.nextContinuationToken);
        } else {
          this.buildTree();
          resolve();
        }
      });
    });
  }

  private createTreeFolder(path: Array<string>) {
    _.set(this.folderStructor, path, {});
  }

  private addFileToTree(file: any) {
    const keyParts = file.key.split('/');

    this.createTreeFolder(keyParts.slice(0, -1));
  }

  ngOnInit() {
    this.getFileStructure().then(() => {
      console.log('Dir listing complete');
    });
  }
}
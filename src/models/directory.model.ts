import { S3 } from 'aws-sdk';
import { TreeNode } from 'primeng/api';
import { FileList } from './file-list.model';
import { FileService } from 'src/services/file.service';
import * as path from 'path';

export class Directory {
  public children = [];
  public files = [];
  public icon = 'pi pi-folder';
  public expanded = false;

  public loadFiles() {
    return new Promise((resolve, reject) => {
      if (this.files.length) {
        resolve();
      } else {
        return this.fileService.listObjects(this.key).then((list: FileList) => {
          this.files = list.files;

          resolve();
        });
      }
    });
  }

  public loadSubdirectories(): Promise<TreeNode> {
    return new Promise((resolve, reject) => {
      if (this.children.length) {
        resolve();
      } else {
        return this.fileService.listDirectories(this.key).then((list: FileList) => {
          this.children = list.directories;

          this.expanded = this.children.length > 0;

          resolve();
        });
      }
    });
  }

  get leaf() {
    return !this.children.length;
  }

  get label() {
    return path.basename(this.key);
  }

  constructor(public fileService: FileService, public key: S3.Types.Prefix) {}
}

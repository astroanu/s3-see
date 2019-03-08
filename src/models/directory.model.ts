import { S3 } from 'aws-sdk';
import * as path from 'path';
import { TreeNode } from 'primeng/api';
import { FileService } from 'src/services/file.service';

import { FileList } from './file-list.model';

const FOLDER_ICON_NORMAL = 'pi pi-folder';
const FOLDER_ICON_EXPANDED = 'pi pi-folder-open';
const FOLDER_ICON_LOADING = 'pi pi-spinner pi-spin pi-spinner';

export class Directory {
  public children = [];
  public files = [];
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

  get icon() {
    return this.expanded ? FOLDER_ICON_EXPANDED : FOLDER_ICON_NORMAL;
  }

  get leaf() {
    return !this.children.length;
  }

  get label() {
    return path.basename(this.key).replace('_', ' ');
  }

  constructor(public fileService: FileService, public key: S3.Types.Prefix) {}
}

import { S3 } from 'aws-sdk';
import * as path from 'path';
import { TreeNode } from 'primeng/api';
import { FileService } from '../../services/file/file.service';

import { FileListInterface } from '../file-list/file-list.interface';
import { FileInterface } from '../file/file.interface';
import { DirectoryInterface } from '../directory/directory.interface';

export const FOLDER_ICON_NORMAL = 'pi pi-folder';
export const FOLDER_ICON_EXPANDED = 'pi pi-folder-open';
export const FOLDER_ICON_LOADING = 'pi pi-spinner pi-spin pi-spinner';

export class Directory implements DirectoryInterface {
  public children: Array<DirectoryInterface> = [];
  public files: Array<FileInterface> = [];
  public expanded: boolean = false;

  public loadFiles(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.files.length) {
        resolve();
      } else {
        return this.fileService.listObjects(this.prefix).then((list: FileListInterface) => {
          this.files = list.files;

          resolve();
        });
      }
    });
  }

  public loadSubdirectories(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.children.length) {
        resolve();
      } else {
        return this.fileService.listDirectories(this.prefix).then((list: FileListInterface) => {
          this.children = list.directories;

          this.expanded = this.children.length > 0;

          resolve();
        });
      }
    });
  }

  get icon(): string {
    return this.expanded ? FOLDER_ICON_EXPANDED : FOLDER_ICON_NORMAL;
  }

  get leaf(): boolean {
    return !this.children.length;
  }

  get label(): string {
    return path.basename(this.prefix).replace('_', ' ');
  }

  constructor(public fileService: FileService, public prefix: S3.Types.Prefix) {}
}

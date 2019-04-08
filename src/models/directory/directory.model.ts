import { S3 } from 'aws-sdk';
import * as path from 'path';

import { FileService } from '../../services/file/file.service';
import { DirectoryInterface } from '../directory/directory.interface';
import { FileListInterface } from '../file-list/file-list.interface';
import { S3FileInterface } from '../file/s3-file.interface';
import { Observable } from 'rxjs';

export const FOLDER_ICON_NORMAL = 'pi pi-folder';
export const FOLDER_ICON_EXPANDED = 'pi pi-folder-open';
export const FOLDER_ICON_LOADING = 'pi pi-spinner pi-spin pi-spinner';

export class Directory implements DirectoryInterface {
  public children: Array<DirectoryInterface> = [];
  public files: Array<any> = [];
  public expanded: boolean = false;
  public selectable: boolean = true;

  public loadFiles(): Observable<void> {
    return new Observable((observer) => {
      if (this.files.length) {
        observer.next();
      } else {
        this.fileService.listObjects(this.prefix).subscribe((list: FileListInterface) => {
          this.files = list.files;

          observer.next();
        });
      }
    });
  }

  public loadSubdirectories(): Observable<void> {
    return new Observable((observer) => {
      if (this.children.length) {
        observer.next();
      } else {
        return this.fileService.listDirectories(this.prefix).subscribe((list: FileListInterface) => {
          this.children = list.directories;

          this.expanded = this.children.length > 0;

          observer.next();
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

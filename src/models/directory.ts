import { S3 } from 'aws-sdk';
import { TreeNode } from 'primeng/api';
import { FileList } from '../models/file-list';
import { FileService } from 'src/services/file.service';
import * as path from 'path';

export class Directory {
  public children = [];

  public loadSubdirectories(): Promise<TreeNode> {
    return new Promise((resolve, reject) => {
      return this.fileService.listDirectories(this.key).then((list: FileList) => {
        this.children = list.directories;

        resolve();
      });
    });
  }

  get label() {
    return path.basename(this.key);
  }

  constructor(public fileService: FileService, public key: S3.Types.Prefix) {}
}

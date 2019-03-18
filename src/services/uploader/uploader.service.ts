import { Injectable } from '@angular/core';
import { lstatSync, readdirSync } from 'file-system';
import { join } from 'path';

import { LocalFile } from '../../models/file/local-file.model';

@Injectable({
  providedIn: 'root'
})
export class UploaderService {
  private files = [];

  createFileTree() {
    return this.processDirectory(this.uploadDirectory);
  }

  private processDirectory(directory: string) {
    return new Promise((resolve, reject) => {
      const items = readdirSync(directory);

      items
        .filter((item) => {
          return lstatSync(join(directory, item)).isFile();
        })
        .forEach((item) => {
          this.files.push(new LocalFile(this.uploadDirectory, item));
        });

      resolve(this.files);

      return Promise.all(
        items
          .filter((item) => {
            return lstatSync(join(directory, item)).isDirectory();
          })
          .map((item) => {
            return this.processDirectory(join(directory, item));
          })
      );
    });
  }

  constructor(private uploadDirectory: string) {
    this.createFileTree();
  }
}

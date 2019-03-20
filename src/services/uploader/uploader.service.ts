import { Injectable } from '@angular/core';
import { recurseSync } from 'file-system';

import { LocalFile } from '../../models/file/local-file.model';

@Injectable()
export class UploaderService {
  private files = [];
  private options: UploadOptions = {
    prefix: null,
    suffix: null,
    flattern: false,
    overwrite: true,
    toLowerCase: true,
    noSpaces: true
  };

  setUploadOptions(options: UploadOptions) {
    this.options = options;
  }

  createFileTree() {
    this.files = [];
    return new Promise((resolve, reject) => {
      recurseSync(this.uploadDirectory, (filepath, relative, filename) => {
        if (filename) {
          const file = new LocalFile(relative, filepath);
          file.setUploadOptions(this.options);
          this.files.push(file);
        }
      });

      resolve(this.files);
    });
  }

  constructor(private uploadDirectory: string) {
    this.createFileTree();
  }
}

export type UploadOptions = {
  prefix: string | null;
  suffix: string | null;
  flattern: boolean;
  overwrite: boolean;
  toLowerCase: boolean;
  noSpaces: boolean;
};

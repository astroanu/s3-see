import { Injectable } from '@angular/core';
import * as fs from 'fs';

import { LocalFile } from '../../models/file/local-file.model';

@Injectable({
  providedIn: 'root'
})
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

  walk(dir: string) {
    let results = [];
    fs.readdirSync(dir).forEach((file) => {
      file = dir + '/' + file;
      const stat = fs.statSync(file);
      if (stat && stat.isDirectory()) {
        results = results.concat(this.walk(file));
      } else {
        results.push(new LocalFile(file.replace(`${this.uploadDirectory}/`, ''), file));
      }
    });
    return results;
  }

  createFileTree() {
    return new Promise((resolve, reject) => {
      resolve(this.walk(this.uploadDirectory));
    });
  }

  constructor(private uploadDirectory: string) {}
}

export type UploadOptions = {
  prefix: string | null;
  suffix: string | null;
  flattern: boolean;
  overwrite: boolean;
  toLowerCase: boolean;
  noSpaces: boolean;
};

import { Injectable } from '@angular/core';
import * as fs from 'fs';
import { NgxPicaService } from 'ngx-pica';

import { LocalFile } from '../../models/file/local-file.model';
import { Job } from '../../models/job/job';

@Injectable({
  providedIn: 'root'
})
export class UploaderService {
  private options: UploadOptions = {
    prefix: null,
    suffix: null,
    flattern: false,
    overwrite: true,
    toLowerCase: true,
    noSpaces: true
  };

  public setUploadOptions(options: UploadOptions) {
    this.options = options;
  }

  private walk(dir: string) {
    let results = [];
    fs.readdirSync(dir).forEach((file) => {
      file = dir + '/' + file;
      const stat = fs.statSync(file);
      if (stat && stat.isDirectory()) {
        results = results.concat(this.walk(file));
      } else {
        const localFile = new LocalFile(file.replace(`${this.uploadDirectory}/`, ''), file);
        localFile.setUploadOptions(this.options);
        results.push(localFile);
      }
    });
    return results;
  }

  public createFileTree() {
    return new Promise((resolve, reject) => {
      resolve(this.walk(this.uploadDirectory));
    });
  }

  public getJob(files: Array<LocalFile>, bucketName: string) {
    return new Job(files, this.options, bucketName, this.picaService);
  }

  constructor(private uploadDirectory: string, private picaService: NgxPicaService) {}
}

export type UploadOptions = {
  prefix: string | null;
  suffix: string | null;
  flattern: boolean;
  overwrite: boolean;
  toLowerCase: boolean;
  noSpaces: boolean;
};

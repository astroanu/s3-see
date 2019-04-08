import { Injectable } from '@angular/core';
import * as fs from 'fs';

import { LocalFile } from '../../models/file/local-file.model';
import { JobFactoryService } from '../../services/uploader/job.factory.service';
import { UploaderServiceInterface } from './uploader.service.interface';

@Injectable({
  providedIn: 'root'
})
export class UploaderService implements UploaderServiceInterface {
  private options: UploadOptions = {
    prefix: null,
    suffix: null,
    flattern: false,
    overwrite: true,
    toLowerCase: true,
    noSpaces: true
  };

  private uploadDirectory: string;

  public setUploadDirectory(directorypath: string): void {
    this.uploadDirectory = directorypath;
  }

  public setUploadOptions(options: UploadOptions): void {
    this.options = options;
  }

  private walk(dir: string): Array<LocalFile> {
    let results = [];
    fs.readdirSync(dir).forEach((file) => {
      file = `${dir}/${file}`;
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

  public createFileTree(): Promise<Array<LocalFile>> {
    return new Promise((resolve, reject) => {
      resolve(this.walk(this.uploadDirectory));
    });
  }

  public getJob(files: Array<LocalFile>, bucketName: string) {
    return this.jobFactoryservice.make(files, this.options, bucketName);
  }

  constructor(private jobFactoryservice: JobFactoryService) {}
}

export type UploadOptions = {
  prefix: string | null;
  suffix: string | null;
  flattern: boolean;
  overwrite: boolean;
  toLowerCase: boolean;
  noSpaces: boolean;
};

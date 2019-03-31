import PromiseQueue from 'easy-promise-queue';
import { Injectable } from '@angular/core';

import { Job } from '../../models/job/job';
import { LocalFile } from '../../models/file/local-file.model';

import { FileService } from '../../services/file/file.service';
import { UploadOptions } from '../../services/uploader/uploader.service';
import { NgxPicaService } from 'ngx-pica';

@Injectable({
  providedIn: 'root'
})
export class JobFactory {
  public make(files: Array<LocalFile>, options: UploadOptions, bucketName: string) {
    const job = new Job(files, options, bucketName);

    job.promiseQueue = new PromiseQueue({
      concurrency: 1
    });

    job.fileService = this.fileService;
    job.picaService = this.picaService;

    return job;
  }

  constructor(private picaService: NgxPicaService, private fileService: FileService) {}
}

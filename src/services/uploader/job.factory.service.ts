import { Injectable } from '@angular/core';
import PromiseQueue from 'easy-promise-queue';
import { NgxPicaService } from 'ngx-pica';

import { LocalFile } from '../../models/file/local-file.model';
import { Job } from '../../models/job/job';
import { FileService } from '../../services/file/file.service';
import { UploadOptions } from '../../services/uploader/uploader.service';

@Injectable({
  providedIn: 'root'
})
export class JobFactoryService {
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

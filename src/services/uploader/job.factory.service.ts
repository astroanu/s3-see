import { Injectable } from '@angular/core';
import PromiseQueue from 'easy-promise-queue';
import { NgxPicaService } from 'ngx-pica';

import { LocalFile } from '../../models/file/local-file.model';
import { UploadJob } from '../../models/job/upload-job';
import { FileService } from '../../services/file/file.service';
import { UploadOptions } from '../../services/uploader/uploader.service';

@Injectable({
  providedIn: 'root'
})
export class JobFactoryService {
  public make(files: Array<LocalFile>, options: UploadOptions, bucketName: string): UploadJob {
    const job = new UploadJob(files, options, bucketName);

    job.promiseQueue = new PromiseQueue({
      concurrency: 1
    });

    job.fileService = this.fileService;
    job.picaService = this.picaService;

    return job;
  }

  constructor(private picaService: NgxPicaService, private fileService: FileService) {}
}

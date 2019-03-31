import PromiseQueue from 'easy-promise-queue';

import { LocalFile } from '../../models/file/local-file.model';
import { ConfigService } from '../../services/config/config.service';
import { FileService } from '../../services/file/file.service';
import { UploadOptions } from '../../services/uploader/uploader.service';

export const JOB_QUEUED = 'queued';
export const JOB_STARTED = 'started';
export const JOB_COMPLETE = 'complete';

export class Job {
  public bytesTransfered: number = 0;

  public state: string = JOB_QUEUED;

  public status: string = 'Queued...';

  private queue: PromiseQueue;

  private fileService: FileService;

  public start() {
    this.state = JOB_STARTED;

    this.files.forEach((file: LocalFile) => {
      this.queue.add(() => {
        return this.fileService
          .setBucket(this.bucketName)
          .then(() => {
            this.status = `Uploading file  ${file.key}`;

            return this.fileService
              .upload(file)
              .then(() => {
                this.recordBytes(file.size);
              })
              .catch((e) => console.log(e));
          })
          .catch((e) => console.log(e));
      });
    });
  }

  public get progress() {
    return (100 / this.totalBytes) * this.bytesTransfered;
  }

  private recordBytes(bytes: number) {
    this.bytesTransfered += bytes;
  }

  private get totalBytes() {
    return this.files
      .map((file: LocalFile) => {
        return file.size;
      })
      .reduce((a, b) => a + b);
  }

  constructor(private files: Array<LocalFile>, private options: UploadOptions, private bucketName: string) {
    this.queue = new PromiseQueue({
      concurrency: 1
    });

    this.fileService = new FileService(new ConfigService());
  }
}

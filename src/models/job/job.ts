import PromiseQueue from 'easy-promise-queue';

import { LocalFile } from '../../models/file/local-file.model';
import { ConfigService } from '../../services/config/config.service';
import { FileService } from '../../services/file/file.service';
import { UploadOptions } from '../../services/uploader/uploader.service';
import { NgxPicaService } from 'ngx-pica';
const pica = require('pica')();
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

            return this.uploadFile(file).then(() => {
              this.status = `Generating thumbnail  ${file.key}`;

              return this.resize(file).then((thumbnail: Blob) => {
                return this.uploadThumbnail(file.thumbnailKey, thumbnail);
              });
            });
          })
          .catch((e) => console.log(e));
      });
    });
  }

  private resize(file: LocalFile) {
    var offScreenCanvas = document.createElement('canvas');
    offScreenCanvas.width = 200;
    offScreenCanvas.height = 200;

    return new Promise((resolve, reject) => {
      console.log('canv', offScreenCanvas);

      return file.getBinaryData().then((blob: Blob) => {
        console.log('blob', blob);
        const f = this.blobToFile(blob, file.fileName);
        console.log('f', f);
        return this.picaService.resizeImage(f, 100, 100).subscribe((result) => {
          console.log(result);

          resolve(result);
        });
      });
    });
  }

  private blobToFile(theBlob: Blob, fileName: string): File {
    var b: any = theBlob;
    //A Blob() is almost a File() - it's just missing the two properties below which we will add
    b.lastModifiedDate = new Date();
    b.name = fileName;

    //Cast to a File() type
    return <File>theBlob;
  }

  private uploadThumbnail(key: string, data: Blob) {
    return this.fileService.upload(key, data);
  }

  private uploadFile(file: LocalFile) {
    return file.getBinaryData().then((data: Blob) => {
      return this.fileService
        .upload(file.key, data)
        .then(() => {
          this.recordBytes(file.size);
        })
        .catch((e) => console.log(e));
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

  constructor(
    private files: Array<LocalFile>,
    private options: UploadOptions,
    private bucketName: string,
    private picaService: NgxPicaService
  ) {
    this.queue = new PromiseQueue({
      concurrency: 1
    });

    this.fileService = new FileService(new ConfigService());
  }
}

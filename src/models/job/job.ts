import PromiseQueue from 'easy-promise-queue';
import { NgxPicaService } from 'ngx-pica';

import { LocalFile } from '../../models/file/local-file.model';
import { FileService } from '../../services/file/file.service';
import { UploadOptions } from '../../services/uploader/uploader.service';

export const JOB_QUEUED = 'queued';
export const JOB_STARTED = 'started';
export const JOB_COMPLETE = 'complete';

export const THUMB_SIZE = 200;

export class Job {
  public bytesTransfered: number = 0;

  public state: string = JOB_QUEUED;

  public status: string = 'Waiting...';

  public promiseQueue: PromiseQueue;

  public fileService: FileService;

  public picaService: NgxPicaService;

  public itemStatusMap = {};

  public xhrProgress: number = 0;

  public start() {
    return new Promise((resolve, reject) => {
      this.state = JOB_STARTED;

      this.files.forEach((file: LocalFile, itemId: number) => {
        this.itemStatusMap[itemId] = 'queued';

        this.promiseQueue.add(() => {
          this.itemStatusMap[itemId] = 'started';

          return this.fileService.setBucket(this.bucketName).then(() => {
            this.status = `Uploading: ${file.key}`;

            return this.uploadFile(file).then(() => {
              this.status = `Generating thumbnail: ${file.key}`;

              return this.resize(file).then((thumbnail: Blob) => {
                return this.uploadThumbnail(file.thumbnailKey, thumbnail).then(() => {
                  this.itemStatusMap[itemId] = 'complete';
                });
              });
            });
          });
        });
      });

      const timer = setInterval(() => {
        if (
          Object.values(this.itemStatusMap).filter((value) => {
            return value === 'complete';
          }).length === Object.values(this.itemStatusMap).length
        ) {
          clearTimeout(timer);
          resolve();
        }
      }, 5000);
    });
  }

  private resize(file: LocalFile) {
    const offScreenCanvas = document.createElement('canvas');
    offScreenCanvas.width = THUMB_SIZE;
    offScreenCanvas.height = THUMB_SIZE;

    return new Promise((resolve, reject) => {
      return file.getBinaryData().then((blob: Blob) => {
        return this.picaService
          .resizeImage(this.blobToFile(blob, file.fileName), THUMB_SIZE, THUMB_SIZE, {
            aspectRatio: {
              keepAspectRatio: true,
              forceMinDimensions: true
            }
          })
          .subscribe((result) => {
            resolve(result);
          });
      });
    });
  }

  private blobToFile(blob: Blob, fileName: string): File {
    const file: any = blob;
    file.lastModifiedDate = new Date();
    file.name = fileName;

    return <File> blob;
  }

  private uploadThumbnail(key: string, data: Blob) {
    return this.fileService.upload(key, data, (progress) => {
      this.xhrProgress = Math.round((100 / progress.total) * progress.loaded);
    });
  }

  private uploadFile(file: LocalFile) {
    return file.getBinaryData().then((data: Blob) => {
      return this.fileService
        .upload(file.key, data, (progress) => {
          this.xhrProgress = Math.round((100 / progress.total) * progress.loaded);
        })
        .then(() => {
          this.recordBytes(file.size);
        })
        .catch((e) => console.log(e));
    });
  }

  public get progress() {
    return (100 / this.bytesInQueue) * this.bytesTransfered;
  }

  private recordBytes(bytes: number) {
    this.bytesTransfered += bytes;
  }

  public get bytesInQueue() {
    const bytes = this.files.map((file: LocalFile) => {
      return file.size;
    });

    return bytes.length ? bytes.reduce((a, b) => a + b) : 0;
  }

  constructor(private files: Array<LocalFile>, private options: UploadOptions, private bucketName: string) {}
}

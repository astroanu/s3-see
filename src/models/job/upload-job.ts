import { LocalFile } from '../file/local-file.model';
import { JobInterface } from './job.interface';
import { Job, JOB_STARTED, JOB_COMPLETE, JOB_QUEUED, THUMB_SIZE } from './job';

export class UploadJob extends Job implements JobInterface {
  public start(): Promise<UploadJob> {
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
          resolve(this);
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

    return <File>blob;
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
}

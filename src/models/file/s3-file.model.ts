import { Config as AWSConfig, S3 } from 'aws-sdk';
import { DateFormatPipe } from 'ngx-moment';
import { basename } from 'path';

import { PrettySizePipe } from '../../pipes/pretty-size.pipe';
import { ConfigService } from '../../services/config/config.service';
import { FileService } from '../../services/file/file.service';
import { FileInterface } from './file.interface';

const config = new ConfigService();

export class S3File implements FileInterface {
  private thumbUrl: string = null;
  private fullUrl: string = null;

  private s3: S3;

  get sizePretty(): string {
    const pipe = new PrettySizePipe();

    return pipe.transform(this.size);
  }

  get size(): number {
    return this.entity.Size;
  }

  get lastModified() {
    const pipe = new DateFormatPipe();
    return pipe.transform(this.entity.LastModified, 'Do MMM YYYY, h:mm a');
  }

  get fileName(): string {
    return basename(this.key);
  }

  private getSignedUrl(key: string) {
    return new Promise((resolve, reject) => {
      const params = { Bucket: this.fileService.getBucketName(), Key: key };

      this.s3.getSignedUrl('getObject', params, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

  private createSignedUrls() {
    config
      .getBucketCredentials(this.fileService.getBucketName())
      .then((credentials) => {
        this.s3 = new S3(new AWSConfig(credentials));

        if (!this.key.includes('_thumbs')) {
          const ext = this.fileName.split('.').pop();
          const thumbKey = this.key.replace(
            this.fileName,
            `_thumbs/${this.fileName.toLowerCase().replace(ext, 'jpg')}`
          );

          this.getSignedUrl(this.key).then((url: string) => {
            this.fullUrl = url;
          });

          this.getSignedUrl(thumbKey).then((url: string) => {
            this.thumbUrl = url;
          });
        }
      })
      .catch(() => console.log('createSignedUrls failed'));
  }

  get key(): string {
    return this.entity.Key;
  }

  constructor(public fileService: FileService, public entity: S3.Types.Object) {
    this.createSignedUrls();
  }
}

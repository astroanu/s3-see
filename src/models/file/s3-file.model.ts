import { Config as AWSConfig, S3 } from 'aws-sdk';
import { DateFormatPipe } from 'ngx-moment';
import { basename } from 'path';

import { PrettySizePipe } from '../../pipes/pretty-size.pipe';
import { ConfigService } from '../../services/config/config.service';
import { FileService } from '../../services/file/file.service';
import { S3FileInterface } from './s3-file.interface';

const config = new ConfigService();

export class S3File implements S3FileInterface {
  private thumbUrl: string = null;

  public fullUrl: string = null;

  public needsThumbnail: boolean = false;

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
    config.getBucketCredentials(this.fileService.getBucketName()).subscribe((credentials) => {
      this.s3 = new S3(new AWSConfig(credentials));

      if (!this.key.includes('_thumbs')) {
        const ext = this.fileName.split('.').pop();
        const thumbKey = this.key.replace(this.fileName, `_thumbs/${this.fileName.toLowerCase().replace(ext, 'jpg')}`);

        this.getSignedUrl(this.key).then((url: string) => {
          this.fullUrl = url;
        });

        this.getSignedUrl(thumbKey).then((url: string) => {
          this.thumbUrl = url;
          this.checkThumbnail();
        });
      }
    });
  }

  public generateThumbnail() {
    console.log('ss');
  }

  private checkThumbnail() {
    const img = document.createElement('img');

    img.onerror = () => {
      this.needsThumbnail = true;
    };

    img.src = this.thumbUrl;
  }

  get key(): string {
    return this.entity.Key;
  }

  constructor(public fileService: FileService, public entity: S3.Types.Object) {
    this.createSignedUrls();
  }
}

import { S3 } from 'aws-sdk';
import * as AWS from 'aws-sdk';
import * as path from 'path';

import { PrettySizePipe } from '../pipes/pretty-size.pipe';
import { ConfigService } from '../services/config.service';
import { FileService } from 'src/services/file.service';

const config = new ConfigService();

export class File {
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
    return this.entity.LastModified;
  }

  get fileName(): string {
    return path.basename(this.key);
  }

  private getSignedUrl(key: string) {
    return new Promise((resolve, reject) => {
      const params = { Bucket: this.fileService.bucketName, Key: key };

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
    this.s3 = new AWS.S3(new AWS.Config(config.getBucketConfig(this.fileService.bucketName)));

    if (!this.key.includes('_thumbs')) {
      const ext = this.fileName.split('.').pop();
      const thumbKey = this.key.replace(this.fileName, `_thumbs/${this.fileName.toLowerCase().replace(ext, 'jpg')}`);

      this.getSignedUrl(this.key).then((url: string) => {
        this.fullUrl = url;
      });

      this.getSignedUrl(thumbKey).then((url: string) => {
        this.thumbUrl = url;
      });
    }
  }

  get key(): string {
    return this.entity.Key;
  }

  constructor(public fileService: FileService, public entity: S3.Types.Object) {
    this.createSignedUrls();
  }
}

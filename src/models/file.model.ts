import { S3 } from 'aws-sdk';
import * as AWS from 'aws-sdk';

import { PrettySizePipe } from '../pipes/pretty-size.pipe';
import { ConfigService } from '../services/config.service';

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
    return this.file.Size;
  }

  get key(): string {
    return this.file.Key;
  }

  private getSignedUrl(key: string) {
    return new Promise((resolve, reject) => {
      const params = { Bucket: this.bucketName, Key: key };

      this.s3.getSignedUrl('getObject', params, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

  get fileName(): string {
    return this.key.replace(/^.*[\\\/]/, '');
  }

  constructor(private bucketName, private file: S3.Types.Object) {
    this.s3 = new AWS.S3(new AWS.Config(config.getBucketConfig(bucketName)));

    if (!this.key.includes('_thumbs')) {
      const ext = this.key.split('.').pop();
      const thumbKey = this.key.replace(this.fileName, `_thumbs/${this.fileName.toLowerCase().replace(ext, 'jpg')}`);

      this.getSignedUrl(this.key).then((url: string) => {
        this.fullUrl = url;
      });

      this.getSignedUrl(thumbKey).then((url: string) => {
        this.thumbUrl = url;
      });
    }
  }
}

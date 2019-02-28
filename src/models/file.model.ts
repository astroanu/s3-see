import { S3 } from 'aws-sdk';
import * as AWS from 'aws-sdk';

import { ConfigService } from '../services/config.service';

const config = new ConfigService();

export class File {
  private url: string = null;
  private bucketName = config.currentBucket;
  private s3: S3;

  get sizePretty(): string {
    let bytes = this.size;
    const thresh = 1000;
    if (Math.abs(bytes) < thresh) {
      return bytes + ' B';
    }
    const units = ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    let u = -1;
    do {
      bytes /= thresh;
      ++u;
    } while (Math.abs(bytes) >= thresh && u < units.length - 1);
    return bytes.toFixed(1) + ' ' + units[u];
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

  get signedUrl(): string {
    return this.url;
  }

  get fileName(): string {
    return this.key.replace(/^.*[\\\/]/, '');
  }

  constructor(private file: S3.Types.Object) {
    this.s3 = new AWS.S3(new AWS.Config(config.currentBucketConfig));

    if (!this.key.includes('_thumbs')) {
      const ext = this.key.split('.').pop();
      const thumbKey = this.key.replace(this.fileName, `_thumbs/${this.fileName.toLowerCase().replace(ext, 'jpg')}`);

      this.getSignedUrl(thumbKey).then((url: string) => {
        this.url = url;
      });
    }
  }
}

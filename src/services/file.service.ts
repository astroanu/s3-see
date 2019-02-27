import { Injectable } from '@angular/core';
import * as AWS from 'aws-sdk';
import { S3 } from 'aws-sdk';
import { FileList } from '../models/file-list.model';
import { ConfigService } from './config.service';

const config = new ConfigService();

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private bucketName = config.currentBucket;
  private s3: AWS.S3;

  constructor() {
    this.s3 = new AWS.S3(new AWS.Config(config.currentBucketConfig));
  }

  listObjects(prefix: any, continuationToken = null) {
    return new Promise((resolve, reject) => {
      const params = { Bucket: this.bucketName };

      if (prefix) {
        params['Prefix'] = `${prefix}/`;
        params['Delimiter'] = prefix;
      }

      if (continuationToken) {
        params['ContinuationToken'] = continuationToken;
      }

      this.s3.listObjectsV2(params, (err, data: S3.Types.ListObjectsV2Output) => {
        if (err) {
          reject(err);
        } else {
          resolve(new FileList(data));
        }
      });
    });
  }
}
import { Injectable } from '@angular/core';
import * as AWS from 'aws-sdk';
import { S3 } from 'aws-sdk';
import { FileList } from '../models/file-list';
import { ConfigService } from './config.service';

const config = new ConfigService();

@Injectable({
  providedIn: 'root'
})
export class FileService {
  public bucketName = config.currentBucket;
  private s3: AWS.S3;

  constructor() {
    this.initializeS3Object();
  }

  private initializeS3Object() {
    this.s3 = new AWS.S3(new AWS.Config(config.currentBucketConfig));
  }

  setBucket(bucketName) {
    config.currentBucket = bucketName;
    this.initializeS3Object();
    this.bucketName = bucketName;
  }

  listDirectories(prefix: any, continuationToken = null): Promise<FileList> {
    return new Promise((resolve, reject) => {
      const params = { Bucket: this.bucketName };

      if (prefix) {
        params['Prefix'] = `${prefix}`;
      }
      params['Delimiter'] = '/';

      if (continuationToken) {
        params['ContinuationToken'] = continuationToken;
      }

      this.s3.listObjectsV2(params, (err, data: S3.Types.ListObjectsV2Output) => {
        if (err) {
          reject(err);
        } else {
          resolve(new FileList(this, data));
        }
      });
    });
  }

  listObjects(prefix: any, continuationToken = null) {
    return new Promise((resolve, reject) => {
      const params = { Bucket: this.bucketName };

      //if (prefix) {
      //params['Prefix'] = `${prefix}/`;
      params['Delimiter'] = '/';
      //}

      if (continuationToken) {
        params['ContinuationToken'] = continuationToken;
      }

      this.s3.listObjectsV2(params, (err, data: S3.Types.ListObjectsV2Output) => {
        if (err) {
          reject(err);
        } else {
          resolve(new FileList(this, data));
        }
      });
    });
  }
}

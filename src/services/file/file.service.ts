import { Injectable } from '@angular/core';
import * as AWS from 'aws-sdk';
import { S3 } from 'aws-sdk';
import { FileList } from '../../models/file-list/file-list.model';
import { FileListInterface } from '../../models/file-list/file-list.interface';
import { ConfigService } from '../config/config.service';
import { FileServiceInterface } from './file.service.interface';

@Injectable({
  providedIn: 'root'
})
export class FileService implements FileServiceInterface {
  private bucketName = this.config.defaultBucket;
  private s3: AWS.S3;

  constructor(private config: ConfigService) {
    this.initializeS3Object();
  }

  private initializeS3Object() {
    console.log(this.config);
    this.s3 = new AWS.S3(new AWS.Config(this.config.getBucketCredentials(this.bucketName)));
  }

  getBucketName(): string {
    return this.bucketName;
  }

  setBucket(bucketName: string): void {
    this.bucketName = bucketName;
    this.initializeS3Object();
  }

  listDirectories(prefix: string, continuationToken: null | string = null): Promise<FileListInterface> {
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

  listObjects(prefix: any, continuationToken = null): Promise<FileListInterface> {
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
}

import { Injectable } from "@angular/core";
import * as AWS from "aws-sdk";
import { S3 } from "aws-sdk";
import { FileList } from "../../models/file-list/file-list.model";
import { FileListInterface } from "../../models/file-list/file-list.interface";
import { ConfigService } from "../config/config.service";
import { FileServiceInterface } from "./file.service.interface";

import { Observable, from } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class FileService implements FileServiceInterface {
  private bucketName = this.config.defaultBucket;
  private s3: AWS.S3;

  public upload(
    key: string,
    data: Blob,
    progressCallback: any
  ): Observable<object> {
    return new Observable((observer) => {
      this.s3
        .upload(
          {
            Body: data,
            Bucket: this.bucketName,
            Key: key,
          },
          {
            partSize: 10 * 1024 * 1024,
            queueSize: 1,
          },
          (err, data: S3.Types.PutObjectOutput) => {
            if (!err) {
              observer.next(data);
            } else {
              observer.next(err);
            }
          }
        )
        .on("httpUploadProgress", progressCallback);
    });
  }

  public initializeS3Object(): Observable<void> {
    return new Observable((observer) => {
      const credentials = this.config.getBucketCredentials(this.bucketName);

      if (!credentials) {
        observer.next();
      }
      return credentials.subscribe(
        (creds) => {
          this.s3 = new AWS.S3(new AWS.Config(creds));
          observer.next();
        },
        () => console.log("initializeS3Object failed")
      );
    });
  }

  public getBucketName(): string {
    return this.bucketName;
  }

  public setBucket(bucketName: string): Observable<any> {
    if (bucketName) {
      this.bucketName = bucketName;

      return this.initializeS3Object();
    }
    return from(null);
  }

  public listDirectories(
    prefix: string,
    continuationToken: null | string = null
  ): Observable<FileListInterface> {
    return new Observable((observer) => {
      const params = { Bucket: this.bucketName };

      if (prefix) {
        params["Prefix"] = `${prefix}`;
      }

      params["Delimiter"] = "/";

      if (continuationToken) {
        params["ContinuationToken"] = continuationToken;
      }

      this.s3
        .listObjectsV2(params, (err, data: S3.Types.ListObjectsV2Output) => {
          if (err) {
            observer.next();
          } else {
            observer.next(new FileList(this, data));
          }
        })
        .on("complete", (response) => {
          if (response.error) {
            observer.next();
          }
        });
    });
  }

  public listObjects(
    prefix: any,
    continuationToken = null
  ): Observable<FileListInterface> {
    return new Observable((observer) => {
      const params = { Bucket: this.bucketName };

      if (prefix) {
        params["Prefix"] = `${prefix}`;
      }

      params["Delimiter"] = "/";

      if (continuationToken) {
        params["ContinuationToken"] = continuationToken;
      }

      this.s3.listObjectsV2(
        params,
        (err, data: S3.Types.ListObjectsV2Output) => {
          if (err) {
            observer.next();
          } else {
            observer.next(new FileList(this, data));
          }
        }
      );
    });
  }

  constructor(private config: ConfigService) {}
}

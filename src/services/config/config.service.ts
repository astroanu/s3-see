import { Injectable } from '@angular/core';

import { ConfigServiceInterface } from './config.service.interface';

@Injectable({
  providedIn: 'root'
})
export class ConfigService implements ConfigServiceInterface {
  private config: any;
  public defaultBucket: string;

  public getBucketCredentials(bucketName: string): object {
    return this.getBucket(bucketName).getCredentials();
  }

  public getBucket(bucketName: string): Bucket {
    const currentBucket = this.buckets.filter((bucket: Bucket) => {
      return bucket.bucketName === bucketName;
    });

    if (!currentBucket.length) {
      throw Error(`specified bcuket ${bucketName} does not exist in the config`);
    }

    return currentBucket[0];
  }

  public get buckets(): Array<Bucket> {
    return this.config.buckets.map((config: BucketConfig) => {
      return new Bucket(config);
    });
  }

  public get appName(): string {
    return this.config.appName;
  }

  constructor() {
    this.config = {
      appName: 'S3See',
      buckets: []
    };
    this.defaultBucket = this.buckets[0].bucketName;
  }
}

export class Bucket {
  getCredentials(): object {
    return {
      accessKeyId: this.config.accessKeyId,
      secretAccessKey: this.config.secretAccessKey,
      region: this.config.region
    };
  }

  get bucketName(): string {
    return this.config.bucketName;
  }

  get label(): string {
    return this.config.label;
  }

  constructor(private config: BucketConfig) {}
}

export type BucketConfig = {
  accessKeyId: string;
  secretAccessKey: string;
  region: string;
  bucketName: string;
  label: string;
};

import { Injectable } from '@angular/core';

import * as config from '../../config.json';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private config: any;
  public currentBucket: string;

  public get currentBucketConfig() {
    return this.getBucketConfig(this.currentBucket);
  }

  public getBucketConfig(bucketName: string) {
    let bucketConfig = this.buckets.filter((bucketInfo) => {
      return bucketInfo.bucketName === bucketName;
    })[0];

    return {
      accessKeyId: bucketConfig.accessKeyId,
      secretAccessKey: bucketConfig.secretAccessKey,
      region: bucketConfig.region
    };
  }

  public get buckets() {
    return this.config.buckets;
  }

  public get appName() {
    return this.config.appName;
  }

  constructor() {
    this.config = config['default'];
    this.currentBucket = this.buckets[0].bucketName;
  }
}

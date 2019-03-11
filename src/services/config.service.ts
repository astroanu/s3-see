import { Injectable } from '@angular/core';

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
    this.config = {
      appName: 'S3See',
      buckets: [
        {
          label: 'Nice Name',
          bucketName: 'img-man',
          accessKeyId: 'AKIAIN5S6RL5DVQJ3RLQ',
          secretAccessKey: '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',
          region: 'us-east-1'
        },
        {
          label: 'Private Bucket',
          bucketName: 'astroanu-personal-assets',
          accessKeyId: 'AKIAJ3NTRL3IGBD64GOQ',
          secretAccessKey: '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',
          region: 'us-east-1'
        }
      ]
    };
    this.currentBucket = this.buckets[0].bucketName;
  }
}

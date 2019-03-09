import { Bucket } from './config.service';

export interface ConfigServiceInterface {
  defaultBucket: string;

  getBucketCredentials(bucketName: string): object;

  getBucket(bucketName: string): Bucket;

  buckets: Array<Bucket>;

  appName: string;
}

import { Bucket } from './config.service';

export interface ConfigServiceInterface {
  getBucketCredentials(bucketName: string): object;

  getBucket(bucketName: string): Promise<Bucket>;

  getBuckets(): Promise<Array<Bucket>>;

  appName: string;

  defaultBucket: string;
}

import { Observable } from 'rxjs';

import { Bucket } from './config.service';

export interface ConfigServiceInterface {
  updateBucketConfig(buckets: Array<object>): Observable<void>;

  getBucketCredentials(bucketName: string): object;

  getBucket(bucketName: string): Observable<Bucket>;

  getBuckets(): Observable<Array<Bucket>>;

  appName: string;

  defaultBucket: string;
}

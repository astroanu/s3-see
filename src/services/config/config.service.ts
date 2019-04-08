import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { DbService } from '../db/db.service';
import { ConfigServiceInterface } from './config.service.interface';

@Injectable({
  providedIn: 'root'
})
export class ConfigService implements ConfigServiceInterface {
  public defaultBucket: string;
  private db: DbService;

  public updateBucketConfig(buckets: Array<object>): Observable<void> {
    return this.db.update('buckets', buckets);
  }

  public getBucketCredentials(bucketName: string): Observable<object> {
    return new Observable((observer) => {
      this.getBucket(bucketName).subscribe((bucket) => {
        if (bucket) {
          observer.next(bucket.getCredentials());
        } else {
          observer.error();
        }
      });
    });
  }

  public getBucket(bucketName: string): Observable<Bucket> {
    return new Observable((observer) => {
      this.getBuckets().subscribe((buckets: Array<Bucket>) => {
        const currentBucket = buckets.filter((bucket: Bucket) => {
          return bucket.bucketName === bucketName;
        });

        if (currentBucket.length) {
          observer.next(currentBucket[0]);
        } else {
          observer.error();
        }
      });
    });
  }

  public getBuckets(): Observable<Array<Bucket>> {
    return new Observable((observer) => {
      this.db.get('buckets').subscribe((buckets: Array<object>) => {
        observer.next(
          buckets
            ? buckets.map((config: BucketConfig) => {
                return new Bucket(config);
              })
            : []
        );
      });
    });
  }

  public get appName(): string {
    return 's3 See';
  }

  constructor() {
    this.db = new DbService('config', 'key');

    this.getBuckets().subscribe((buckets) => {
      if (buckets.length) {
        this.defaultBucket = buckets[0].bucketName;
      }
    });
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

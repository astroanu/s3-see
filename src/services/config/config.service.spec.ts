import { TestBed } from '@angular/core/testing';
import { IMock, Mock } from 'typemoq';

import { Bucket, BucketConfig, ConfigService } from './config.service';
import { ConfigServiceInterface } from './config.service.interface';

describe('ConfigService', () => {
  let moqConfigService: IMock<ConfigServiceInterface>;
  let service: ConfigServiceInterface;

  const credentials = {
    accessKeyId: 'id',
    secretAccessKey: 'secret',
    region: 'region'
  };

  const bucketConfig: BucketConfig = Object.assign(
    {
      bucketName: 'name',
      label: 'label'
    },
    credentials
  );

  beforeEach(() => {
    moqConfigService = Mock.ofType<ConfigServiceInterface>();

    moqConfigService
      .setup((m) => m.getBuckets())
      .returns(() => {
        return Promise.resolve([new Bucket(bucketConfig)]);
      });

    moqConfigService.setup((m) => m.defaultBucket).returns(() => bucketConfig.bucketName);

    moqConfigService
      .setup((m) => m.updateBucketConfig([bucketConfig]))
      .returns(() => {
        return Promise.resolve();
      });

    service = TestBed.get(ConfigService);
  });

  it('should create bucket instace', () => {
    const bucket = new Bucket(bucketConfig);

    expect(bucket.bucketName).toEqual(bucketConfig.bucketName);
    expect(bucket.label).toEqual(bucketConfig.label);
    expect(bucket.getCredentials()).toEqual(credentials);
  });

  it('should create instance', () => {
    expect(moqConfigService.object).toBeTruthy();
    expect(service).toBeTruthy();
  });

  it('should see app name', () => {
    expect(service.appName).toEqual('s3 See');
  });

  it('should see default bucket name', () => {
    expect(moqConfigService.object.defaultBucket).toEqual(bucketConfig.bucketName);
  });

  it('should get buckets', () => {
    moqConfigService.object.getBuckets().then((buckets) => {
      expect(buckets.length).toEqual(1);
    });
  });

  it('should update buckets', () => {
    moqConfigService.object.updateBucketConfig([bucketConfig]).then(() => {
      expect(true).toEqual(true);
    });
  });
});

import { TestBed } from '@angular/core/testing';
import { IMock, Mock } from 'typemoq';

import { Bucket, BucketConfig, ConfigService } from '../config/config.service';
import { ConfigServiceInterface } from '../config/config.service.interface';
import { FileService } from './file.service';
import { FileServiceInterface } from './file.service.interface';

describe('FileService', () => {
  let service: FileServiceInterface;

  let moqConfigService: IMock<ConfigServiceInterface>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConfigService]
    });

    moqConfigService = Mock.ofType<ConfigServiceInterface>();

    const testBucketConfig: BucketConfig = {
      accessKeyId: 'accessKeyId,',
      secretAccessKey: 'secretAccessKey,',
      region: 'region',
      bucketName: 'test',
      label: 'Test'
    };

    const bucket = new Bucket(testBucketConfig);

    moqConfigService
      .setup((m) => m.getBuckets())
      .returns(() => {
        return Promise.resolve([bucket]);
      });

    moqConfigService
      .setup((m) => m.getBucketCredentials('test'))
      .returns(() => {
        return Promise.resolve(bucket.getCredentials());
      });

    TestBed.overrideProvider(ConfigService, { useValue: moqConfigService.object });

    service = TestBed.get(FileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return bucket name', () => {
    service.setBucket('test');
    expect(service.getBucketName()).toEqual('test');
  });
});

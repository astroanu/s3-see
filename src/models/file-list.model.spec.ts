import { S3 } from 'aws-sdk';

import { FileService } from '../services/file.service';
import { FileList } from './file-list.model';

describe('FileList', () => {
  let fileService: FileService;

  let sOutput: S3.ListObjectsV2Output;

  let s3Object: S3.Types.Object;

  let fileList: FileList;

  let date: Date;

  beforeEach(() => {
    fileService = new FileService();

    date = new Date();

    s3Object = {
      Key: 'basename/key/filename.ext',
      Size: 10,
      LastModified: date
    };

    sOutput = {
      IsTruncated: false,
      NextContinuationToken: 'continuationToken',
      CommonPrefixes: [
        {
          Prefix: 'test'
        }
      ],
      Contents: [s3Object]
    };

    fileList = new FileList(fileService, sOutput);
  });

  it('should create an instance', () => {
    expect(fileList).toBeTruthy();
  });

  it('should return nextContinuationToken', () => {
    expect(fileList.nextContinuationToken).toEqual(sOutput.NextContinuationToken);
  });

  it('should return hasDirectories', () => {
    expect(fileList.hasDirectories).toBeTruthy(sOutput.CommonPrefixes.length);
  });

  it('should return hasFiles', () => {
    expect(fileList.hasFiles).toBeTruthy(sOutput.Contents.length);
  });

  it('should return directories', () => {
    expect(fileList.directories.length).toEqual(sOutput.CommonPrefixes.length);
  });

  it('should return files', () => {
    expect(fileList.files.length).toEqual(sOutput.Contents.length);
  });
});

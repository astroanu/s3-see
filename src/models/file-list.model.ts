import { S3 } from 'aws-sdk';

import { File } from './file.model';

export class FileList {
  get nextContinuationToken() {
    return this.list.NextContinuationToken;
  }

  get hasFiles(): boolean {
    return this.list.Contents.length > 0;
  }

  get hasMore(): boolean {
    return this.list.IsTruncated;
  }

  get files(): Array<File> {
    return this.list.Contents.map((file) => {
      return new File(this.bucketName, file);
    });
  }

  constructor(private bucketName, private list: S3.Types.ListObjectsV2Output) {}
}

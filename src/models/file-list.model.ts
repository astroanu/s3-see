import { S3 } from 'aws-sdk';
import * as path from 'path';

import { FileService } from '../services/file.service';
import { Directory } from './directory.model';
import { File } from './file.model';

export class FileList {
  get nextContinuationToken() {
    return this.list.NextContinuationToken;
  }

  get hasDirectories(): boolean {
    return this.list.CommonPrefixes.length > 0;
  }

  get hasFiles(): boolean {
    return this.list.Contents.length > 0;
  }

  get hasMore(): boolean {
    return this.list.IsTruncated;
  }

  get directories(): Array<Directory> {
    return this.list.CommonPrefixes.filter((directory: S3.Types.CommonPrefix) => {
      return path.basename(directory.Prefix) !== '_thumbs';
    }).map((directory: S3.Types.CommonPrefix) => {
      return new Directory(this.fileService, directory.Prefix);
    });
  }

  get files(): Array<File> {
    return this.list.Contents.filter((file) => {
      const fileName = path.basename(file.Key);
      const ext = fileName.split('.').pop();

      return ext !== fileName;
    }).map((file) => {
      return new File(this.fileService, file);
    });
  }

  constructor(private fileService: FileService, private list: S3.Types.ListObjectsV2Output) {}
}

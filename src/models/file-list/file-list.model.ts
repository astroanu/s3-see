import { S3 } from 'aws-sdk';
import * as path from 'path';

import { FileService } from '../../services/file/file.service';
import { DirectoryInterface } from '../directory/directory.interface';
import { Directory } from '../directory/directory.model';
import { FileListInterface } from '../file-list/file-list.interface';
import { FileInterface } from '../file/file.interface';
import { S3File } from '../file/s3-file.model';

export class FileList implements FileListInterface {
  get nextContinuationToken(): string {
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

  get directories(): Array<DirectoryInterface> {
    return this.list.CommonPrefixes.filter((directory: S3.Types.CommonPrefix) => {
      return path.basename(directory.Prefix) !== '_thumbs';
    }).map((directory: S3.Types.CommonPrefix) => {
      return new Directory(this.fileService, directory.Prefix);
    });
  }

  get files(): Array<FileInterface> {
    return this.list.Contents.filter((file) => {
      const fileName = path.basename(file.Key);
      const ext = fileName.split('.').pop();

      return ext !== fileName;
    }).map((file) => {
      return new S3File(this.fileService, file);
    });
  }

  constructor(private fileService: FileService, private list: S3.Types.ListObjectsV2Output) {}
}

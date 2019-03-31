import { FileListInterface } from '../../models/file-list/file-list.interface';
import { LocalFile } from '../../models/file/local-file.model';

export interface FileServiceInterface {
  upload(key: string, data: Blob): Promise<object>;

  getBucketName(): string;

  listDirectories(prefix: string, continuationToken: null | string): Promise<FileListInterface>;

  listObjects(prefix: string, continuationToken: null | string): Promise<FileListInterface>;

  setBucket(bucketname: string): void;
}

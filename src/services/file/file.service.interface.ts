import { FileListInterface } from '../../models/file-list/file-list.interface';

export interface FileServiceInterface {
  upload(key: string, data: Blob, progressCallback): Promise<object>;

  getBucketName(): string;

  listDirectories(prefix: string, continuationToken: null | string): Promise<FileListInterface>;

  listObjects(prefix: string, continuationToken: null | string): Promise<FileListInterface>;

  setBucket(bucketname: string): void;
}

import { FileListInterface } from '../../models/file-list/file-list.interface';

export interface FileServiceInterface {
  getBucketName(): string;

  listDirectories(prefix: string, continuationToken: null | string): Promise<FileListInterface>;

  listObjects(prefix: string, continuationToken: null | string): Promise<FileListInterface>;

  setBucket(bucketname: string): void;
}

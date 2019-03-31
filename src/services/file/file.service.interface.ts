import { FileListInterface } from '../../models/file-list/file-list.interface';
import { LocalFile } from '../../models/file/local-file.model';

export interface FileServiceInterface {
  upload(file: LocalFile): Promise<object>;

  getBucketName(): string;

  listDirectories(prefix: string, continuationToken: null | string): Promise<FileListInterface>;

  listObjects(prefix: string, continuationToken: null | string): Promise<FileListInterface>;

  setBucket(bucketname: string): void;
}

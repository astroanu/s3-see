import { FileListInterface } from '../../models/file-list/file-list.interface';
import { Observable } from 'rxjs';

export interface FileServiceInterface {
  upload(key: string, data: Blob, progressCallback): Observable<object>;

  getBucketName(): string;

  listDirectories(prefix: string, continuationToken: string): Observable<FileListInterface>;

  listObjects(prefix: string, continuationToken: string): Observable<FileListInterface>;

  setBucket(bucketname: string): any;
}

import { S3FileInterface } from '../file/s3-file.interface';
import { Observable } from 'rxjs';

export interface DirectoryInterface {
  children: Array<DirectoryInterface>;

  files: Array<S3FileInterface>;

  expanded: boolean;

  loadFiles(): Observable<void>;

  loadSubdirectories(): Observable<void>;

  icon: string;

  leaf: boolean;

  label: string;
}

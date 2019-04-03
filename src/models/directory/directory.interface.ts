import { LocalFileInterface } from '../file/local-file.interface';
import { S3FileInterface } from '../file/s3-file.interface';

export interface DirectoryInterface {
  children: Array<DirectoryInterface>;

  files: Array<S3FileInterface | LocalFileInterface>;

  expanded: boolean;

  loadFiles(): Promise<void>;

  loadSubdirectories(): Promise<void>;

  icon: string;

  leaf: boolean;

  label: string;
}

import { UploadOptions } from './uploader.service';
import { LocalFile } from '../../models/file/local-file.model';

export interface UploaderServiceInterface {
  setUploadDirectory(directorypath: string): void;

  setUploadOptions(options: UploadOptions): void;

  createFileTree(): Promise<Array<LocalFile>>;

  getJob(files: Array<LocalFile>, bucketName: string);
}

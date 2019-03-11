import { DirectoryInterface } from '../directory/directory.interface';
import { FileInterface } from '../file/file.interface';

export interface FileListInterface {
  nextContinuationToken: string;

  hasDirectories: boolean;

  hasFiles: boolean;

  hasMore: boolean;

  directories: Array<DirectoryInterface>;

  files: Array<FileInterface>;
}

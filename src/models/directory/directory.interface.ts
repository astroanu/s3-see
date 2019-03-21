import { FileInterface } from '../file/file.interface';
import { DirectoryInterface } from '../directory/directory.interface';

export interface DirectoryInterface {
  children: Array<DirectoryInterface>;

  files: Array<FileInterface>;

  expanded: boolean;

  loadFiles(): Promise<void>;

  loadSubdirectories(): Promise<void>;

  icon: string;

  leaf: boolean;

  label: string;
}

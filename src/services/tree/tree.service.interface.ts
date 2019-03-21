import { FileListInterface } from '../../models/file-list/file-list.interface';

export interface TreeServiceInterface {
  listDirectories(): Promise<FileListInterface>;
}

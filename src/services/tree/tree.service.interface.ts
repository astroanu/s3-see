import { FileListInterface } from '../../models/file-list/file-list.interface';

export interface TreeServiceInterface {
  listDirectories(prefix: string, continuationToken: string): Promise<FileListInterface>;
}

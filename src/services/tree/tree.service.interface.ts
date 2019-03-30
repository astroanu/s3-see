import { FileListInterface } from '../../models/file-list/file-list.interface';
import { FileServiceInterface } from '../file/file.service.interface';

export interface TreeServiceInterface {
  listDirectories(): Promise<FileListInterface>;

  constructor(fileService: FileServiceInterface);
}

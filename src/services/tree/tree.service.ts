import { Injectable } from '@angular/core';
import { FileListInterface } from '../../models/file-list/file-list.interface';
import { FileService } from '../file/file.service';

@Injectable({
  providedIn: 'root'
})
export class TreeService {
  listDirectories(prefix: string, continuationToken: string | null = null): Promise<FileListInterface> {
    return this.fileService.listDirectories(prefix, continuationToken);
  }

  constructor(public fileService: FileService) {}
}

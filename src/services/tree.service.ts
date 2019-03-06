import { Injectable } from '@angular/core';
import { FileList } from '../models/file-list';
import { FileService } from './file.service';

@Injectable({
  providedIn: 'root'
})
export class TreeService {
  listDirectories(prefix: any, continuationToken = null): Promise<FileList> {
    return this.fileService.listDirectories(prefix, continuationToken);
  }

  constructor(public fileService: FileService) {}
}

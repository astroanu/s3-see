import { Injectable } from '@angular/core';
import { FileListInterface } from '../../models/file-list/file-list.interface';
import { FileService } from '../file/file.service';
import { TreeServiceInterface } from './tree.service.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TreeService implements TreeServiceInterface {
  listDirectories(prefix: string, continuationToken: string = null): Observable<FileListInterface> {
    return this.fileService.listDirectories(prefix, continuationToken);
  }

  constructor(public fileService: FileService) {}
}

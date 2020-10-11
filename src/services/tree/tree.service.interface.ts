import { FileListInterface } from "../../models/file-list/file-list.interface";
import { Observable } from "rxjs";

export interface TreeServiceInterface {
  listDirectories(
    prefix: string,
    continuationToken: string
  ): Observable<FileListInterface>;
}

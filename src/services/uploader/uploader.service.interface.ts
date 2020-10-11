import { Observable } from "rxjs";

import { LocalFile } from "../../models/file/local-file.model";
import { UploadOptions } from "./uploader.service";

export interface UploaderServiceInterface {
  setUploadDirectory(directorypath: string): void;

  setUploadOptions(options: UploadOptions): void;

  createFileTree(): Observable<Array<LocalFile>>;

  getJob(files: Array<LocalFile>, bucketName: string);
}

import { DirectoryInterface } from "../directory/directory.interface";
import { S3FileInterface } from "../file/s3-file.interface";

export interface FileListInterface {
  nextContinuationToken: string;

  hasDirectories: boolean;

  hasFiles: boolean;

  hasMore: boolean;

  directories: Array<DirectoryInterface>;

  files: Array<S3FileInterface>;
}

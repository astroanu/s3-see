import { UploadOptions } from '../../services/uploader/uploader.service';
import { S3FileInterface } from './s3-file.interface';

export interface LocalFileInterface extends S3FileInterface {
  setUploadOptions(uploadOptions: UploadOptions): void;

  destinationKey: string;

  getBinaryData(): Promise<Blob>;

  thumbUrl: string;

  fullUrl: string;

  fullLocalPath: string;

  setUploadOptions(uploadOptions: UploadOptions): void;

  thumbnailKey: string;

  getBinaryData(): Promise<Blob>;
}

import { S3FileInterface } from './s3-file.interface';
import { UploadOptions } from '../../services/uploader/uploader.service';

export interface LocalFileInterface extends S3FileInterface {
  setUploadOptions(uploadOptions: UploadOptions): void;

  destinationKey: string;

  getBinaryData(): Promise<Blob>;

  thumbUrl: string;

  fullUrl: string;

  fullLocalPath: string;
}

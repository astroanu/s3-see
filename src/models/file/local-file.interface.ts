import { UploadOptions } from '../../services/uploader/uploader.service';
import { FileInterface } from './file.interface';

export interface LocalFileInterface extends FileInterface {
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

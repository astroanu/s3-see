import { FileInterface } from './file.interface';

export interface S3FileInterface extends FileInterface {
  generateThumbnail(): void;
}

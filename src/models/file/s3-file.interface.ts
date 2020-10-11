import { FileInterface } from "./file.interface";

export interface S3FileInterface extends FileInterface {
  fullUrl: string;

  needsThumbnail: boolean;

  generateThumbnail(): void;
}

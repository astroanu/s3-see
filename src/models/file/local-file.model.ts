import * as fs from 'fs';
import { DateFormatPipe } from 'ngx-moment';
import { basename } from 'path';

import { PrettySizePipe } from '../../pipes/pretty-size.pipe';
import { UploadOptions } from '../../services/uploader/uploader.service';
import { LocalFileInterface } from './local-file.interface';

export class LocalFile implements LocalFileInterface {
  private stat = null;
  private uploadOptions: UploadOptions = null;

  public setUploadOptions(uploadOptions: UploadOptions): void {
    this.uploadOptions = uploadOptions;
  }

  public get destinationKey(): string {
    let destKey = this.relativePath;
    if (this.uploadOptions) {
      if (this.uploadOptions.flattern) {
        destKey = this.fileName;
      }

      if (this.uploadOptions.prefix) {
        destKey = this.uploadOptions.prefix + destKey;
      }

      if (this.uploadOptions.suffix) {
        destKey = destKey.replace(this.fileName, this.uploadOptions.suffix) + this.fileName;
      }

      if (this.uploadOptions.noSpaces) {
        destKey = destKey.replace(' ', '_');
      }

      if (this.uploadOptions.toLowerCase) {
        destKey = destKey.toLowerCase();
      }
    }
    return destKey;
  }

  public getBinaryData(): Promise<Buffer> {
    const chunks = [];

    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(this.fullLocalPath);
      stream.on('data', (chunk) => chunks.push(chunk));
      stream.on('error', reject);
      stream.on('end', () => resolve(Buffer.concat(chunks)));
    });
  }

  public get thumbUrl(): string {
    return 'data:image/jpeg;base64,' + fs.readFileSync(this.fullLocalPath, 'base64');
  }

  public get fullUrl(): string {
    return this.thumbUrl;
  }

  public get sizePretty(): string {
    const pipe = new PrettySizePipe();

    return pipe.transform(this.size);
  }

  public get size(): number {
    return this.stat.size;
  }

  public get lastModified(): string {
    const pipe = new DateFormatPipe();
    return pipe.transform(this.stat.mtime, 'Do MMM YYYY, h:mm a');
  }

  public get fileName(): string {
    return basename(this.key);
  }

  public get key(): string {
    return this.relativePath;
  }

  public get fullLocalPath(): string {
    return this.filePath.replace('/', '\\');
  }

  constructor(private relativePath: string, private filePath: string) {
    if (this.filePath) {
      this.stat = fs.statSync(this.fullLocalPath);
    }
  }
}

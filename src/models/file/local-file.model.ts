import { readFileSync, statSync } from 'file-system';
import { DateFormatPipe } from 'ngx-moment';
import { basename } from 'path';

import { PrettySizePipe } from '../../pipes/pretty-size.pipe';
import { UploadOptions } from '../../services/uploader/uploader.service';
import { FileInterface } from './file.interface';

export class LocalFile implements FileInterface {
  private stat = null;
  private uploadOptions: UploadOptions = null;

  setUploadOptions(uploadOptions: UploadOptions) {
    this.uploadOptions = uploadOptions;
  }

  get destinationKey() {
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
        destKey = destKey.replace(' ', '');
      }

      if (this.uploadOptions.toLowerCase) {
        destKey = destKey.toLowerCase();
      }
    }
    return destKey;
  }

  get thumbUrl(): string {
    return 'data:image/jpeg;base64,' + readFileSync(this.filePath, 'base64');
  }

  get fullUrl(): string {
    return this.thumbUrl;
  }

  get sizePretty(): string {
    const pipe = new PrettySizePipe();

    return pipe.transform(this.size);
  }

  get size(): number {
    return this.stat.size;
  }

  get lastModified() {
    const pipe = new DateFormatPipe();
    return pipe.transform(this.stat.mtime, 'Do MMM YYYY, h:mm a');
  }

  get fileName(): string {
    return basename(this.key);
  }

  get key(): string {
    return this.relativePath;
  }

  constructor(private relativePath: string, private filePath: string) {
    this.stat = statSync(this.filePath);
  }
}

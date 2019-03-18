import { readFileSync, statSync } from 'file-system';
import { DateFormatPipe } from 'ngx-moment';
import { basename, join } from 'path';

import { PrettySizePipe } from '../../pipes/pretty-size.pipe';
import { FileInterface } from './file.interface';

export class LocalFile implements FileInterface {
  private getStat() {
    return statSync(join(this.basePath, this.filePath));
  }

  get thumbUrl(): string {
    var reader = new FileReader();
    var url = null;

    reader.addEventListener(
      'load',
      function() {
        url = reader.result;
      },
      false
    );

    const buffer = readFileSync(join(this.basePath, this.filePath));

    const blob = new Blob([new Uint8Array(buffer)]);

    reader.readAsDataURL(blob);

    return url;
  }

  get fullUrl(): string {
    return this.thumbUrl;
  }

  get sizePretty(): string {
    const pipe = new PrettySizePipe();

    return pipe.transform(this.size);
  }

  get size(): number {
    return this.getStat().size;
  }

  get lastModified() {
    const pipe = new DateFormatPipe();
    return pipe.transform(this.getStat().mtime, 'Do MMM YYYY, h:mm a');
  }

  get fileName(): string {
    return basename(this.key);
  }

  get key(): string {
    return this.filePath.replace(this.basePath, '');
  }

  constructor(private basePath: string, private filePath: string) {}
}

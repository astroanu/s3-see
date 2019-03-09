import { S3 } from 'aws-sdk';
import { DateFormatPipe } from 'ngx-moment';

import { PrettySizePipe } from '../pipes/pretty-size.pipe';
import { FileService } from '../services/file.service';
import { File } from './file.model';

describe('File', () => {
  let fileService: FileService;

  let s3Object: S3.Types.Object;

  let file: File;

  let date: Date;

  beforeEach(() => {
    fileService = new FileService();

    date = new Date();

    s3Object = {
      Key: 'basename/key/filename.ext',
      Size: 10,
      LastModified: date
    };

    file = new File(fileService, s3Object);
  });

  it('should create an instance', () => {
    expect(file).toBeTruthy();
  });

  it('should return key', () => {
    expect(file.key).toEqual(s3Object.Key);
  });

  it('should return size', () => {
    expect(file.size).toEqual(s3Object.Size);
  });

  it('should return sizePretty', () => {
    const pipe = new PrettySizePipe();

    expect(file.sizePretty).toEqual(pipe.transform(s3Object.Size));
  });

  it('should return lastModified', () => {
    const pipe = new DateFormatPipe();

    expect(file.lastModified).toEqual(pipe.transform(date, 'Do MMM YYYY, h:mm a'));
  });

  it('should return fileName', () => {
    expect(file.fileName).toEqual('filename.ext');
  });
});

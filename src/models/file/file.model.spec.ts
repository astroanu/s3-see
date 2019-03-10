import { S3 } from 'aws-sdk';
import { DateFormatPipe } from 'ngx-moment';
import { TestBed } from '@angular/core/testing';

import { PrettySizePipe } from '../../pipes/pretty-size.pipe';
import { FileService } from '../../services/file/file.service';
import { File } from './file.model';
import { FileInterface } from './file.interface';

describe('File', () => {
  let s3Object: S3.Types.Object;

  let file: FileInterface;

  let date: Date;

  beforeEach(() => {
    const service: FileService = TestBed.get(FileService);

    date = new Date();

    s3Object = {
      Key: 'basename/key/filename.ext',
      Size: 10,
      LastModified: date
    };

    file = new File(service, s3Object);
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

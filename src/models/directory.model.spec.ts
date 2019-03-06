import { Directory } from './directory.model';
import { describe, expect, it } from 'karma-jasmine';

import { FileService } from '../services/file.service';

describe('Directory', () => {
  it('should create an instance', () => {
    expect(new Directory(new FileService(), 'key')).toBeTruthy();
  });
});

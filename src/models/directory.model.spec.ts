import { FileService } from '../services/file.service';
import { Directory } from './directory.model';

describe('Directory', () => {
  it('should create an instance', () => {
    expect(new Directory(new FileService(), 'key')).toBeTruthy();
  });
});

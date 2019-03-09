import { S3 } from 'aws-sdk';

import { FileService } from '../services/file.service';
import { Directory, FOLDER_ICON_EXPANDED, FOLDER_ICON_NORMAL } from './directory.model';

describe('Directory', () => {
  let fileService: FileService;

  let prefix: S3.Types.Prefix;

  let directory: Directory;

  beforeEach(() => {
    fileService = new FileService();

    prefix = 'folder/key';

    directory = new Directory(fileService, prefix);
  });

  it('should create an instance', () => {
    expect(directory).toBeTruthy();
  });

  it('should return normal icon', () => {
    directory.expanded = false;
    expect(directory.icon).toEqual(FOLDER_ICON_NORMAL);
  });

  it('should return expanded icon', () => {
    directory.expanded = true;
    expect(directory.icon).toEqual(FOLDER_ICON_EXPANDED);
  });

  it('should return no leaf', () => {
    directory.children = [];
    expect(directory.leaf).toBeTruthy();
  });

  it('should return has leaf', () => {
    directory.children.push({
      label: 'test'
    });
    expect(directory.leaf).toBeFalsy();
  });

  it('should return label', () => {
    expect(directory.label).toEqual('key');
  });
});

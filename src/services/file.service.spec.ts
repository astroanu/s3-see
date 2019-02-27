import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'karma-jasmine';

import { FileService } from './file.service';

describe('FileService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FileService = TestBed.get(FileService);
    expect(service).toBeTruthy();
  });
});

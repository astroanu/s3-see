import { Directory } from './directory.model';
import { describe, expect, it } from 'karma-jasmine';

describe('Directory', () => {
  it('should create an instance', () => {
    expect(new Directory()).toBeTruthy();
  });
});

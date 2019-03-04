import { describe, expect, it } from 'karma-jasmine';

import { PrettySizePipe } from './pretty-size.pipe';

describe('PrettySizePipe', () => {
  it('create an instance', () => {
    const pipe = new PrettySizePipe();
    expect(pipe).toBeTruthy();
  });
});

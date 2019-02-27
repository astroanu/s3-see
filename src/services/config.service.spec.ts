import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'karma-jasmine';

import { ConfigService } from './config.service';

describe('ConfigService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConfigService = TestBed.get(ConfigService);
    expect(service).toBeTruthy();
  });
});

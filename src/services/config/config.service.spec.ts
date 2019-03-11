import { TestBed } from '@angular/core/testing';
import { ConfigService } from './config.service';
import { ConfigServiceInterface } from './config.service.interface';

describe('ConfigService', () => {
  let service: ConfigServiceInterface;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.get(ConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

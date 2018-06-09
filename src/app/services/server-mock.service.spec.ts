import { TestBed, inject } from '@angular/core/testing';

import { ServerMockService } from './server-mock.service';

describe('ServerMockService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ServerMockService]
    });
  });

  it('should be created', inject([ServerMockService], (service: ServerMockService) => {
    expect(service).toBeTruthy();
  }));
});

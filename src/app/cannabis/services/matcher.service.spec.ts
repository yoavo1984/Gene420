import { TestBed, inject } from '@angular/core/testing';

import { MatcherService } from './matcher.service';

describe('MatcherService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MatcherService]
    });
  });

  it('should be created', inject([MatcherService], (service: MatcherService) => {
    expect(service).toBeTruthy();
  }));
});

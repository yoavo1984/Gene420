import { TestBed, inject } from '@angular/core/testing';

import { StrainDaoService } from './strain-dao.service';

describe('StrainDaoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StrainDaoService]
    });
  });

  it('should be created', inject([StrainDaoService], (service: StrainDaoService) => {
    expect(service).toBeTruthy();
  }));
});

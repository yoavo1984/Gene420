import { TestBed, inject } from '@angular/core/testing';

import { GeneticsDataUploaderService } from './genetics-data-uploader.service';

describe('GeneticsDataUploaderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GeneticsDataUploaderService]
    });
  });

  it('should be created', inject([GeneticsDataUploaderService], (service: GeneticsDataUploaderService) => {
    expect(service).toBeTruthy();
  }));
});

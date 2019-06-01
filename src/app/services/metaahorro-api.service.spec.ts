import { TestBed, inject } from '@angular/core/testing';

import { MetaahorroAPIService } from './metaahorro-api.service';

describe('MetaahorroAPIService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MetaahorroAPIService]
    });
  });

  it('should be created', inject([MetaahorroAPIService], (service: MetaahorroAPIService) => {
    expect(service).toBeTruthy();
  }));
});

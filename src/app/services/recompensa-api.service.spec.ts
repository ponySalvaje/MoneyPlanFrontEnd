import { TestBed, inject } from '@angular/core/testing';

import { RecompensaAPIService } from './recompensa-api.service';

describe('RecompensaAPIService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RecompensaAPIService]
    });
  });

  it('should be created', inject([RecompensaAPIService], (service: RecompensaAPIService) => {
    expect(service).toBeTruthy();
  }));
});

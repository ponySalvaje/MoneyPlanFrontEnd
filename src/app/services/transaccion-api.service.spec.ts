import { TestBed, inject } from '@angular/core/testing';

import { TransaccionAPIService } from './transaccion-api.service';

describe('TransaccionAPIService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TransaccionAPIService]
    });
  });

  it('should be created', inject([TransaccionAPIService], (service: TransaccionAPIService) => {
    expect(service).toBeTruthy();
  }));
});

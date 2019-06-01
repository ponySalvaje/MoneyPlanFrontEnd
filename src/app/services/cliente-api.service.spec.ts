import { TestBed, inject } from '@angular/core/testing';

import { ClienteAPIService } from './cliente-api.service';

describe('ClienteAPIService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ClienteAPIService]
    });
  });

  it('should be created', inject([ClienteAPIService], (service: ClienteAPIService) => {
    expect(service).toBeTruthy();
  }));
});

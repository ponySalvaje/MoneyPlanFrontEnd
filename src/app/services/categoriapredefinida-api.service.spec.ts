import { TestBed, inject } from '@angular/core/testing';

import { CategoriapredefinidaAPIService } from './categoriapredefinida-api.service';

describe('CategoriapredefinidaAPIService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CategoriapredefinidaAPIService]
    });
  });

  it('should be created', inject([CategoriapredefinidaAPIService], (service: CategoriapredefinidaAPIService) => {
    expect(service).toBeTruthy();
  }));
});

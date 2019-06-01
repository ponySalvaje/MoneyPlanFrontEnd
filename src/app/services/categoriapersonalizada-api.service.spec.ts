import { TestBed, inject } from '@angular/core/testing';

import { CategoriapersonalizadaAPIService } from './categoriapersonalizada-api.service';

describe('CategoriapersonalizadaAPIService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CategoriapersonalizadaAPIService]
    });
  });

  it('should be created', inject([CategoriapersonalizadaAPIService], (service: CategoriapersonalizadaAPIService) => {
    expect(service).toBeTruthy();
  }));
});

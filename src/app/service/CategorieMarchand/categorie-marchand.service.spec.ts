import { TestBed } from '@angular/core/testing';

import { CategorieMarchandService } from './categorie-marchand.service';

describe('CategorieMarchandService', () => {
  let service: CategorieMarchandService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategorieMarchandService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

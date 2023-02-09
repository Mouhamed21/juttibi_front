import { TestBed } from '@angular/core/testing';

import { FrequencePaiementService } from './frequence-paiement.service';

describe('FrequencePaiementService', () => {
  let service: FrequencePaiementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FrequencePaiementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

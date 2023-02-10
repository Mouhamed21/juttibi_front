import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrequencePaiementComponent } from './frequence-paiement.component';

describe('FrequencePaiementComponent', () => {
  let component: FrequencePaiementComponent;
  let fixture: ComponentFixture<FrequencePaiementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrequencePaiementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FrequencePaiementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorieMarchandComponent } from './categorie-marchand.component';

describe('CategorieMarchandComponent', () => {
  let component: CategorieMarchandComponent;
  let fixture: ComponentFixture<CategorieMarchandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategorieMarchandComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategorieMarchandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

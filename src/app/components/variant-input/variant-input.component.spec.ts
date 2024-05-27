import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VariantInputComponent } from './variant-input.component';

describe('VariantInputComponent', () => {
  let component: VariantInputComponent;
  let fixture: ComponentFixture<VariantInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VariantInputComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VariantInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

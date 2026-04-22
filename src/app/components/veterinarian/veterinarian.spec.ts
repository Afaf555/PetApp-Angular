import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Veterinarian } from './veterinarian';

describe('Veterinarian', () => {
  let component: Veterinarian;
  let fixture: ComponentFixture<Veterinarian>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Veterinarian],
    }).compileComponents();

    fixture = TestBed.createComponent(Veterinarian);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

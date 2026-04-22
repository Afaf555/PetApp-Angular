import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HaveForAdoption } from './have-for-adoption';

describe('HaveForAdoption', () => {
  let component: HaveForAdoption;
  let fixture: ComponentFixture<HaveForAdoption>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HaveForAdoption],
    }).compileComponents();

    fixture = TestBed.createComponent(HaveForAdoption);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

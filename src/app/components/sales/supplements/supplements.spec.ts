import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Supplements } from './supplements';

describe('Supplements', () => {
  let component: Supplements;
  let fixture: ComponentFixture<Supplements>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Supplements],
    }).compileComponents();

    fixture = TestBed.createComponent(Supplements);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

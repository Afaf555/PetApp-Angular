import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Lost } from './lost';

describe('Lost', () => {
  let component: Lost;
  let fixture: ComponentFixture<Lost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Lost],
    }).compileComponents();

    fixture = TestBed.createComponent(Lost);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

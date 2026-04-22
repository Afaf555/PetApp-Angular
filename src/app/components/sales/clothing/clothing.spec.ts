import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Clothing } from './clothing';

describe('Clothing', () => {
  let component: Clothing;
  let fixture: ComponentFixture<Clothing>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Clothing],
    }).compileComponents();

    fixture = TestBed.createComponent(Clothing);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WantToAdopt } from './want-to-adopt';

describe('WantToAdopt', () => {
  let component: WantToAdopt;
  let fixture: ComponentFixture<WantToAdopt>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WantToAdopt],
    }).compileComponents();

    fixture = TestBed.createComponent(WantToAdopt);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

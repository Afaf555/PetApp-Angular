import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LostAndFound } from './lost-and-found';

describe('LostAndFound', () => {
  let component: LostAndFound;
  let fixture: ComponentFixture<LostAndFound>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LostAndFound],
    }).compileComponents();

    fixture = TestBed.createComponent(LostAndFound);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

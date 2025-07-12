import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Newwine } from './newwine';

describe('Newwine', () => {
  let component: Newwine;
  let fixture: ComponentFixture<Newwine>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Newwine]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Newwine);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

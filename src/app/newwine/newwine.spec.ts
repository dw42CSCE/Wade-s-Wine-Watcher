import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewWine } from './newwine';

describe('Newwine', () => {
  let component: NewWine;
  let fixture: ComponentFixture<NewWine>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewWine]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewWine);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

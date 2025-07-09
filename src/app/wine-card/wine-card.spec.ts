import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WineCard } from './wine-card';

describe('WineCard', () => {
  let component: WineCard;
  let fixture: ComponentFixture<WineCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WineCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WineCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

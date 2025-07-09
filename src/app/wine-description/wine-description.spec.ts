import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WineDescription } from './wine-description';

describe('WineDescription', () => {
  let component: WineDescription;
  let fixture: ComponentFixture<WineDescription>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WineDescription]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WineDescription);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

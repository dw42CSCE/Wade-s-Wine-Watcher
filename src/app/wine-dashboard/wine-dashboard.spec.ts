import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WineDashboard } from './wine-dashboard';

describe('WineDashboard', () => {
  let component: WineDashboard;
  let fixture: ComponentFixture<WineDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WineDashboard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WineDashboard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

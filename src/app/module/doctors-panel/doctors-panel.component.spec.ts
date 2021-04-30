import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorsPanelComponent } from './doctors-panel.component';

describe('DoctorsPanelComponent', () => {
  let component: DoctorsPanelComponent;
  let fixture: ComponentFixture<DoctorsPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorsPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorsPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

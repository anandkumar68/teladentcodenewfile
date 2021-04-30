import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfobytesComponent } from './infobytes.component';

describe('InfobytesComponent', () => {
  let component: InfobytesComponent;
  let fixture: ComponentFixture<InfobytesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfobytesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfobytesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

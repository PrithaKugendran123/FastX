import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusScheduleRegComponent } from './bus-schedule-reg.component';

describe('BusScheduleRegComponent', () => {
  let component: BusScheduleRegComponent;
  let fixture: ComponentFixture<BusScheduleRegComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BusScheduleRegComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BusScheduleRegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

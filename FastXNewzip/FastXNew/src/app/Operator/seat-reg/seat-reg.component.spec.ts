import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeatRegComponent } from './seat-reg.component';

describe('SeatRegComponent', () => {
  let component: SeatRegComponent;
  let fixture: ComponentFixture<SeatRegComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SeatRegComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SeatRegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

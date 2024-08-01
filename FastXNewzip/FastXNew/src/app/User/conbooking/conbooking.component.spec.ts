import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConbookingComponent } from './conbooking.component';

describe('ConbookingComponent', () => {
  let component: ConbookingComponent;
  let fixture: ComponentFixture<ConbookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConbookingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConbookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavOpComponent } from './nav-op.component';

describe('NavOpComponent', () => {
  let component: NavOpComponent;
  let fixture: ComponentFixture<NavOpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavOpComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NavOpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

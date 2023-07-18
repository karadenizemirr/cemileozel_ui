import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BungalovComponent } from './bungalov.component';

describe('BungalovComponent', () => {
  let component: BungalovComponent;
  let fixture: ComponentFixture<BungalovComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BungalovComponent]
    });
    fixture = TestBed.createComponent(BungalovComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

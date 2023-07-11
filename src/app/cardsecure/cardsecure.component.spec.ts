import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardsecureComponent } from './cardsecure.component';

describe('CardsecureComponent', () => {
  let component: CardsecureComponent;
  let fixture: ComponentFixture<CardsecureComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardsecureComponent]
    });
    fixture = TestBed.createComponent(CardsecureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

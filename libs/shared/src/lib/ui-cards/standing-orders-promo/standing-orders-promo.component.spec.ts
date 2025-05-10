import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StandingOrdersPromoComponent } from './standing-orders-promo.component';

describe('StandingOrdersPromoComponent', () => {
  let component: StandingOrdersPromoComponent;
  let fixture: ComponentFixture<StandingOrdersPromoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StandingOrdersPromoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StandingOrdersPromoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

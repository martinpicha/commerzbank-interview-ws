import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DataAccessTransactionsComponent } from './data-access-transactions.component';

describe('DataAccessTransactionsComponent', () => {
  let component: DataAccessTransactionsComponent;
  let fixture: ComponentFixture<DataAccessTransactionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataAccessTransactionsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DataAccessTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { TEST_DATA } from '@services/product.service.spec';
import { AddToCart, ClearCart, MisusCart, RemoveCart } from '@store/actions/product.actions';

import { CartSummaryComponent } from './cart-summary.component';

describe('CartSummaryComponent', () => {
  let component: CartSummaryComponent;
  let fixture: ComponentFixture<CartSummaryComponent>;
  let store: MockStore;

  const mockDialogRef = {
    close: jasmine.createSpy('close')
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartSummaryComponent ],
      imports: [
        MatCardModule,
        MatButtonModule,
        MatDialogModule,
        MatButtonToggleModule,
        MatIconModule,
        MatDividerModule
      ],
      providers: [
        provideMockStore(),
        {
          provide: MatDialogRef,
          useValue: mockDialogRef
        }
      ]
    })
    .compileComponents();
    store = TestBed.inject(MockStore);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch AddToCart', () => {
    const spy = spyOn(store, 'dispatch').and.callThrough();;

    component.plus(TEST_DATA[0]);
    fixture.detectChanges();

    expect(spy).toHaveBeenCalledWith(new AddToCart(TEST_DATA[0]));
  });

  it('should dispatch MisusCart', () => {
    const spy = spyOn(store, 'dispatch').and.callThrough();;

    component.minus(TEST_DATA[0]);
    fixture.detectChanges();

    expect(spy).toHaveBeenCalledWith(new MisusCart(TEST_DATA[0]));
  });

  it('should dispatch RemoveCart', () => {
    const spy = spyOn(store, 'dispatch').and.callThrough();;

    component.remove(TEST_DATA[0]);
    fixture.detectChanges();

    expect(spy).toHaveBeenCalledWith(new RemoveCart(TEST_DATA[0]));
  });

  it('should dispatch RemoveCart', () => {
    const spy = spyOn(store, 'dispatch').and.callThrough();;

    component.clearCart();
    fixture.detectChanges();

    expect(spy).toHaveBeenCalledWith(new ClearCart());
  });
});

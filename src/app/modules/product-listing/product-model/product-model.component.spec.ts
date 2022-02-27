import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { CartSummaryComponent } from '@components/cart-summary/cart-summary.component';
import { TEST_DATA } from '@services/product.service.spec';
import { AddToCart, MisusCart, RemoveCart } from '@store/actions/product.actions';

import { ProductModelComponent } from './product-model.component';

describe('ProductModelComponent', () => {
  let component: ProductModelComponent;
  let fixture: ComponentFixture<ProductModelComponent>;
  let store: MockStore;

  const mockDialogRef = {
    close: jasmine.createSpy('close')
  };
  const dialogRefSpyObj = jasmine.createSpyObj({ afterClosed : of({}), close: 
     null, updatePosition: () => {} });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductModelComponent ],
      imports: [
        MatCardModule,
        MatButtonModule,
        MatDialogModule,
        MatButtonToggleModule,
        MatIconModule
      ],
      providers: [
        provideMockStore(),
        {
          provide: MatDialogRef,
          useValue: mockDialogRef
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {}
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    store = TestBed.inject(MockStore);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch AddToCart', () => {
    const spy = spyOn(store, 'dispatch').and.callThrough();;
    component.product = TEST_DATA[0];

    component.plus();
    fixture.detectChanges();

    expect(spy).toHaveBeenCalledWith(new AddToCart(component.product));
  });

  it('should dispatch MisusCart', () => {
    const spy = spyOn(store, 'dispatch').and.callThrough();;
    component.product = TEST_DATA[0];

    component.minus();
    fixture.detectChanges();

    expect(spy).toHaveBeenCalledWith(new MisusCart(component.product));
  });

  it('should dispatch RemoveCart', () => {
    const spy = spyOn(store, 'dispatch').and.callThrough();;
    component.product = TEST_DATA[0];

    component.remove();
    fixture.detectChanges();

    expect(spy).toHaveBeenCalledWith(new RemoveCart(component.product));
  });

  it('should open CartSummaryComponent dialog', () => {
    const spy = spyOn(TestBed.inject(MatDialog), 'open').and.returnValue(dialogRefSpyObj);

    component.openCart();

    expect(spy).toHaveBeenCalledWith(CartSummaryComponent, { width: '400px', height: '100%' });
  });
});

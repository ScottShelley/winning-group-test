import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { Observable, of, skip, throwError } from 'rxjs';
import { ProductService } from '@services/product.service';
import { TEST_DATA } from '@services/product.service.spec';
import { AddToCart, LoadProductsFailure, LoadProductsLoading, LoadProductsSuccess, ProductActionTypes } from '@store/actions/product.actions';
import { cartList, productList } from '@store/selector/product.selectors';

import { ProductEffects } from '@store/effects/product.effects';

describe('ProductEffects', () => {
  let actions$: Observable<any>;
  let effects: ProductEffects;
  let productServiceSpy: jasmine.SpyObj<ProductService>

  beforeEach(() => {
    const spy = jasmine.createSpyObj('ProductService', ['getProductList']);
    TestBed.configureTestingModule({
      providers: [
        ProductEffects,
        { provide: ProductService, useValue: spy },
        provideMockActions(() => actions$),
        provideMockStore({
          selectors: [
            {
              selector: cartList,
              value: [
                {
                  count: 2,
                  product: TEST_DATA[0]
                },
                {
                  count: 1,
                  product: TEST_DATA[2]
                }
              ]
            },
            {
              selector: productList,
              value: []
            },
          ],
        }),
      ],
      imports: [
        HttpClientTestingModule
      ]
    });

    effects = TestBed.inject(ProductEffects);
    productServiceSpy = TestBed.inject(ProductService) as jasmine.SpyObj<ProductService>;
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  it('should be able to get product list', () => {
    // create an actions stream and immediately dispatch a GET action
    actions$ = of({ type: ProductActionTypes.LoadProducts });

    // mock the service to prevent an HTTP request
    productServiceSpy.getProductList.and.returnValue(of(TEST_DATA));

    // subscribe to the Effect stream and verify it dispatches a SUCCESS action
    effects.loadProductList$.pipe(skip(1)).subscribe(action => {
      expect(action).toEqual(new LoadProductsSuccess(TEST_DATA));
    });
  });

  it('should throw error on get product list', () => {
    // create an actions stream and immediately dispatch a GET action
    actions$ = of({ type: ProductActionTypes.LoadProducts });

    // mock the service to prevent an HTTP request
    productServiceSpy.getProductList.and.returnValue(throwError(() => new Error('Error message')));

    // subscribe to the Effect stream and verify it dispatches a SUCCESS action
    effects.loadProductList$.pipe(skip(1)).subscribe(action => {
      expect(action).toEqual(new LoadProductsFailure());
    });
  });

  it('should be able to save cart to localStorage', () => {
    // create an actions stream and immediately dispatch a GET action
    actions$ = of({ type: ProductActionTypes.AddToCart });

    // subscribe to the Effect stream and verify it dispatches a SUCCESS action
    effects.saveCartToLocalStorage$.subscribe(action => {
      expect(action[1][0].count).toEqual(2);
    });
  });
});

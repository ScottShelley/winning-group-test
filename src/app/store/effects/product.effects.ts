import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, concatMap, debounceTime, map, mergeMap, of, tap, withLatestFrom } from 'rxjs';
import { ProductService } from '@services/product.service';
import { LoadProductsFailure, LoadProductsLoading, LoadProductsSuccess, ProductActionTypes } from '@store/actions/product.actions';
import { cartList } from '@store/selector/product.selectors';

@Injectable()
export class ProductEffects {

  constructor(private actions$: Actions, private productService: ProductService, private store: Store) { }

  loadProductList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActionTypes.LoadProducts),
      tap(() => of(new LoadProductsLoading(true))),
      mergeMap(() => this.productService.getProductList()),
      debounceTime(2000),
      mergeMap(productList => [
        new LoadProductsLoading(false),
        new LoadProductsSuccess(productList)
      ]),
      catchError(error => of(new LoadProductsLoading(false), new LoadProductsFailure()))
    )
  );

  saveCartToLocalStorage$ = createEffect(
    () => this.actions$.pipe(
      ofType(...[
        ProductActionTypes.AddToCart,
        ProductActionTypes.MisusCart,
        ProductActionTypes.RemoveCart,
        ProductActionTypes.ClearCart
      ]),
      // Get latest cart state
      concatMap((action) => of(action).pipe(withLatestFrom(this.store.select(cartList)))),
      tap(([action, cartList]) => localStorage.setItem('cart', JSON.stringify(cartList)))
    ),
    { dispatch: false }
  );
}

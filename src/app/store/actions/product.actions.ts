import { Action } from '@ngrx/store';
import { Product } from '../models/product.model';

export enum ProductActionTypes {
  LoadProducts = '[Product] Load Products',
  LoadProductsSuccess = '[Product] Load Products Success',
  LoadProductsFailure = '[Product] Load Products Failure',
  LoadProductsLoading = '[Product] Load Products Loading',
  AddToCart = '[Cart] Add To Cart',
  MisusCart = '[Cart] Minus Item from Cart',
  RemoveCart = '[Cart] Remove Item from Cart',
  ClearCart = '[Cart] Clear Cart',
}

export class LoadProducts implements Action {
  readonly type = ProductActionTypes.LoadProducts;
}

export class LoadProductsSuccess implements Action {
  readonly type = ProductActionTypes.LoadProductsSuccess;
  constructor(public payload: Product[]) { }
}

export class LoadProductsFailure implements Action {
  readonly type = ProductActionTypes.LoadProductsFailure;
  constructor() { }
}

export class LoadProductsLoading implements Action {
  readonly type = ProductActionTypes.LoadProductsLoading;
  constructor(public payload: boolean) { }
}

export class AddToCart implements Action {
  readonly type = ProductActionTypes.AddToCart;
  constructor(public cart: Product) { }
}

export class MisusCart implements Action {
  readonly type = ProductActionTypes.MisusCart;
  constructor(public cart: Product) { }
}

export class RemoveCart implements Action {
  readonly type = ProductActionTypes.RemoveCart;
  constructor(public cart: Product) { }
}

export class ClearCart implements Action {
  readonly type = ProductActionTypes.ClearCart;
  constructor() { }
}

export type ProductActions = LoadProducts | LoadProductsSuccess | LoadProductsFailure | LoadProductsLoading | AddToCart | MisusCart | RemoveCart | ClearCart;


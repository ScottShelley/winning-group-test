import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Product } from '@store/models/product.model';
import { ProductState } from '@store/reducer/product.reducer';

export const selectProduct = createFeatureSelector<ProductState>("product");

export const productLoading = createSelector(selectProduct, p => p.loading);
export const productList = createSelector(selectProduct, p => p.productList);
export const cartList = createSelector(selectProduct, p => p.cartList);
export const cartCount = (product: Product) => createSelector(selectProduct, p => {
    const cart = p.cartList.find(c => c.product.name === product.name);
    return cart && cart.count ? cart.count : 0;
});
export const cartAllCount = createSelector(selectProduct, p => {
    let count = 0
    p.cartList.forEach(c => count = count + c.count);
    return count;
});
export const totalPrice = createSelector(selectProduct, p => {
    let totalPrice = 0
    p.cartList.forEach(c => totalPrice = totalPrice + (c.product.price * c.count));
    return totalPrice;
});

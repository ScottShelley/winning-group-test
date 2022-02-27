import { TEST_DATA } from '@services/product.service.spec';
import { AddToCart, ClearCart, LoadProducts, LoadProductsLoading, LoadProductsSuccess, MisusCart, RemoveCart } from '@store/actions/product.actions';
import { reducer, initialState, ProductState, getInitalState } from '@store/reducer/product.reducer';

describe('Product Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(undefined, action);

      expect(result).toBe(initialState);
    });
  });

  describe('should get initialState', () => {
    it('should return initialState', () => {
      localStorage.setItem('cart', JSON.stringify([{ count: 2, product: TEST_DATA[5] }]))

      const newState: ProductState = getInitalState();

      expect(newState.cartList[0].count).toBe(2);
      expect(newState.cartList[0].product).toBe(TEST_DATA[5]);
    });

    it('should try catch excute', () => {
      localStorage.setItem('cart', '{ d: "ddd');

      const newState: ProductState = getInitalState();

      expect(newState.cartList).toEqual([]);
    });
  });

  describe('LoadProductsSuccess action', () => {
    it('should retrieve all product and update the state', () => {
      const newState: ProductState = {
        loading: false,
        productList: TEST_DATA,
        cartList: []
      };
      const action = new LoadProductsSuccess(TEST_DATA);
      const state = reducer(initialState, action);
 
      expect(state.productList).toEqual(newState.productList);
    });
  });

  describe('LoadProductsLoading action', () => {
    it('should retrieve all product and update the state', () => {
      const newState: ProductState = {
        loading: true,
        productList: TEST_DATA,
        cartList: []
      };
      const action = new LoadProductsLoading(true);
      const state = reducer(initialState, action);
 
      expect(state.loading).toBe(newState.loading);
    });
  });

  describe('AddToCart action', () => {
    it('should add product to cart and update the state', () => {
      let newState: ProductState = {
        loading: false,
        productList: TEST_DATA,
        cartList: []
      };
      const action = new AddToCart(TEST_DATA[0]);
      let state = reducer(newState, action);

      expect(state.cartList[0].count).toEqual(1);

      newState = {
        loading: false,
        productList: TEST_DATA,
        cartList: [{
          product: TEST_DATA[0],
          count: 1
        }]
      };

      state = reducer(newState, action);
 
      expect(state.cartList[0].count).toEqual(2);
    });
  });

  describe('MisusCart action', () => {
    it('should misus product from cart and update the state', () => {
      const newState: ProductState = {
        loading: false,
        productList: TEST_DATA,
        cartList: [{
          product: TEST_DATA[0],
          count: 2
        }]
      };
      const action = new MisusCart(TEST_DATA[0]);
      let state = reducer(newState, action);

      expect(state.cartList[0].count).toEqual(1);
    });
  });

  describe('RemoveCart action', () => {
    it('should remove product from cart and update the state', () => {
      const newState: ProductState = {
        loading: false,
        productList: TEST_DATA,
        cartList: [{
          product: TEST_DATA[0],
          count: 2
        }]
      };
      const action = new RemoveCart(TEST_DATA[0]);
      let state = reducer(newState, action);

      expect(state.cartList).toEqual([]);
    });
  });

  describe('ClearCart action', () => {
    it('should remove all products from cart and update the state', () => {
      const newState: ProductState = {
        loading: false,
        productList: TEST_DATA,
        cartList: [{
          product: TEST_DATA[0],
          count: 2
        }]
      };
      const action = new ClearCart();
      let state = reducer(newState, action);

      expect(state.cartList).toEqual([]);
    });
  });
});

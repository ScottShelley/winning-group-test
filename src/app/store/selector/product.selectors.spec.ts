import { TEST_DATA } from "@services/product.service.spec";
import { ProductState } from "@store/reducer/product.reducer";
import { cartAllCount, cartCount, cartList, productList, totalPrice } from "@store/selector/product.selectors";


describe('Product Selectors', () => {
  const initialState: ProductState = {
    loading: false,
    productList: TEST_DATA,
    cartList: [
      {
        count: 2,
        product: TEST_DATA[0]
      },
      {
        count: 1,
        product: TEST_DATA[2]
      }
    ]
  };
  
  // it('should select the feature state', () => {
  // });

  it('should select the product list', () => {
    const result = productList.projector(initialState);
    expect(result.length).toEqual(4);
    expect(result[0].name).toEqual("Veal Inside - Provimi");
    // expect(productList.projector(initialState)).toEqual(TEST_DATA);
  });

  it('should select the cart list', () => {
    const result = cartList.projector(initialState);
    expect(result.length).toEqual(2);
    expect(result[0].count).toEqual(2);
  });

  it('should select the cart count', () => {
    const result = cartCount(TEST_DATA[0]).projector(initialState);
    expect(result).toEqual(2);
  });

  it('should select the cart count when is the wrong product item', () => {
    const result = cartCount(TEST_DATA[1]).projector(initialState);
    expect(result).toEqual(0);
  });

  it('should select the cart all count', () => {
    const result = cartAllCount.projector(initialState);
    expect(result).toEqual(3);
  });

  it('should select the total price', () => {
    const result = totalPrice.projector(initialState);
    expect(result).toEqual(463);
  });
});

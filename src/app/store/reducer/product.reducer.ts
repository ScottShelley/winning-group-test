import { ProductActions, ProductActionTypes } from '@store/actions/product.actions';
import { Product } from '@store/models/product.model';


export const productFeatureKey = 'product';

export interface ProductState {
  loading: boolean;
  productList: Product[];
  cartList: {
    product: Product;
    count: number;
  }[];
}

export const initialState: ProductState = getInitalState();

export function getInitalState(): ProductState {
  try {
    const cartList = JSON.parse(localStorage.getItem('cart') as string);
    return {
      loading: true,
      productList: [],
      cartList: cartList
    }
  } catch {
    return {
      loading: true,
      productList: [],
      cartList: []
    }
  }
}


export function reducer(state = initialState, action: ProductActions): ProductState {
  switch (action.type) {
    case ProductActionTypes.LoadProductsSuccess:
      return {
        ...state,
        productList: action.payload
      }
    case ProductActionTypes.LoadProductsLoading:
      return {
        ...state,
        loading: action.payload
      }
    case ProductActionTypes.AddToCart:
    case ProductActionTypes.MisusCart:
      const index = state.cartList.findIndex(c => c.product.name === action.cart.name);
      if (index !== -1) {
        return {
          ...state,
          cartList: state.cartList.map(cart => ({ ...cart })).map((cart, i) => {
            if (i === index) {
              if (action.type === ProductActionTypes.AddToCart) {
                cart.count++;
              } else {
                if (cart.count !== 1) {
                  cart.count--;
                }
              }
            }
            return cart;
          })
        }
      } else {
        return {
          ...state,
          cartList: [...state.cartList, { count: 1, product: action.cart }]
        }
      }
    case ProductActionTypes.RemoveCart:
      const removeCart = [...state.cartList];
      removeCart.splice(state.cartList.findIndex(c => c.product.name === action.cart.name), 1)
      return {
        ...state,
        cartList: removeCart
      }
    case ProductActionTypes.ClearCart:
      return {
        ...state,
        cartList: []
      }
    default:
      return state;
  }
}

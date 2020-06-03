import * as types from "./actionTypes";

const initialState = {
  products: [],
  product: {
    id: '',
    name: '',
    price: 0,
    salePrice: 0,
    weight: 0,
    image: '',
    description: '',
    stock: true,
    type: 1 /* 0: package(length is price and doesn't show oz, 1: only show oz, 2: show both oz, 1/2 oz)*/
  }
};

export default function product(state = initialState, action = {}) {
  switch (action.type) {
    case types.UPDATE_PRODUCT:
      return { ...state, product: action.value };
    case types.UPDATE_PRODUCTS:
      return { ...state, products: action.value };
    default:
      return state;
  }
}

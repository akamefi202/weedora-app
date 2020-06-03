import * as types from "./actionTypes";

const initialState = {
  items: []
  /*
  key: '0',
  product: {
      id: ''
      image: '',
      price: 100,
      name: ''
  },
  quantity: 2,
  ozUnit: 1
  */
};

export default function cart(state = initialState, action = {}) {
  switch (action.type) {
    case types.ADD_PRODUCT:
      var items = state.items;
      var product = action.value.product;
      var ozUnit = action.value.ozUnit;

      var index = items.findIndex((item) => (
        item.product.id == product.id
      ))
      
      if (ozUnit == 0.5)
        product.price = product.weight * 2;

      if (index == -1)
        items.push({ key: items.length.toString(), product: product, quantity: ozUnit, ozUnit: ozUnit });
      //else
      //  items[index].quantity += ;

      return { ...state, items: items };
    case types.UPDATE_CART:
      return { ...state, items: action.value };
    default:
      return state;
  }
}

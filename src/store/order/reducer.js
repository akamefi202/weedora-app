import * as types from "./actionTypes";

const initialState = {
  orders: [],
  order: {
    fullName: '',
    deliveryDetails: '',
    items: [
      {
        key: '',
        product: {
            id: '',
            image: '',
            price: 0,
            name: ''
        },
        quantity: 0
      }
    ],
    totalPrice: 0
  }
};

export default function order(state = initialState, action = {}) {
  switch (action.type) {
    case types.ADD_ORDER:
      var orders = state.orders;
      orders.push(action.value);

      return { ...state, orders: orders };
    case types.REORDER:
      var orders = state.orders;

      return { ...state, orders: orders };
    case types.CLEAR_ORDERS:
      return { ...state, orders: [] };
    case types.UPDATE_ORDER:
      return { ...state, order: action.value };
    default:
      return state;
  }
}

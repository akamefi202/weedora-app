import { combineReducers } from 'redux'

import order from './order';
import product from './product';
import cart from './cart';
import profile from './profile';
import screen from './screen';

export default combineReducers({
    order,
    product,
    cart,
    profile,
    screen
})

import * as types from './actionTypes';

export function addProduct(value) {
    return dispatch => {
        dispatch({ type: types.ADD_PRODUCT, value: value })
    }
}

export function updateCart(value) {
    return dispatch => {
        dispatch({ type: types.UPDATE_CART, value: value })
    }
}
import * as types from './actionTypes';

export function updateProduct(value) {
    return dispatch => {
        dispatch({ type: types.UPDATE_PRODUCT, value: value })
    }
}

export function updateProducts(value) {
    return dispatch => {
        dispatch({ type: types.UPDATE_PRODUCTS, value: value })
    }
}
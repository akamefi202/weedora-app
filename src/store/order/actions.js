import * as types from './actionTypes';

export function addOrder(value) {
    return dispatch => {
        dispatch({ type: types.ADD_ORDER, value: value })
    }
}

export function reorder(value) {
    return dispatch => {
        dispatch({ type: types.REORDER, value: value })
    }
}

export function clearOrders() {
    return dispatch => {
        dispatch({ type: types.CLEAR_ORDERS })
    }
}

export function updateOrder(value) {
    return dispatch => {
        dispatch({ type: types.UPDATE_ORDER, value: value });
    }
}
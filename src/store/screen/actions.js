import * as types from './actionTypes';

export function pushScreen(value) {
    return dispatch => {
        dispatch({ type: types.PUSH_SCREEN, value: value })
    }
}

export function popScreen() {
    return dispatch => {
        dispatch({ type: types.POP_SCREEN })
    }
}
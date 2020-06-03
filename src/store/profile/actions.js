import * as types from './actionTypes';

export function updateProfile(value) {
    return dispatch => {
        dispatch({ type: types.UPDATE_PROFILE, value: value })
    }
}
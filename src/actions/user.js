export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const SET_USER_STATE = "SET_USER_STATE";

export function login(email) {
    return {
        type: LOGIN,
        email
    }
}

export function logout() {
    return {
        type: LOGOUT
    }
}

export function setUserState(newState) {
    return {
        type: SET_USER_STATE,
        newState
    }
}
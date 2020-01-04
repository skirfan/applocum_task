export const ADD_TO_CART = 'ADD_TO_CART';
export const SUB_TO_CART = 'SUB_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';

export const SYNC_CART_FROM_LOCALSTORAGE = 'SYNC_CART_FROM_LOCALSTORAGE';
export const SET_CART_STATE = 'SET_CART_STATE';

export function addToCart(productId) {
    return {
        type: ADD_TO_CART,
        productId
    }
}

export function subToCart(productId) {
    return {
        type: SUB_TO_CART,
        productId
    }
}

export function removeFromCart(productId) {
    return {
        type: REMOVE_FROM_CART,
        productId
    }
}

export function syncCartFromLocalstorage(cart) {
    return {
        type: SYNC_CART_FROM_LOCALSTORAGE,
        cart
    }
}

export function setCartState(newState) {
    return {
        type: SET_CART_STATE,
        newState
    }
}
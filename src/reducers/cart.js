import { Map } from "immutable";
import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  SUB_TO_CART,
  SYNC_CART_FROM_LOCALSTORAGE,
  SET_CART_STATE
} from "../actions/cart";
import productsDS from "../datasource/products.json";
import _ from "lodash";
import { syncCart } from "../helpers/funs";

const initialState = Map({
  totalQty: 0,
  cart: [],
  totalAmount: 0
});

const actions = {
  [ADD_TO_CART]: (state, action) => {
    const { productId } = action;
    const prevCart = state.get("cart");
    const newCart = manageCartByProductId(productId, prevCart);
    const newQty = getCartTotalQty(newCart);
    const newAmt = getCartTotalAmount(newCart);
    syncCart(newCart);
    return state.merge(
      Map({
        cart: newCart,
        totalQty: newQty,
        totalAmount: newAmt
      })
    );
  },
  [SUB_TO_CART]: (state, action) => {
    const { productId } = action;
    const prevCart = state.get("cart");
    const newCart = manageCartByProductIdSubtract(productId, prevCart);
    const newQty = getCartTotalQty(newCart);
    const newAmt = getCartTotalAmount(newCart);
    syncCart(newCart);
    return state.merge(
      Map({
        cart: newCart,
        totalQty: newQty,
        totalAmount: newAmt
      })
    );
  },
  [REMOVE_FROM_CART]: (state, action) => {
    const { productId } = action;
    const prevCart = state.get("cart");
    const newCart = deleteProductFromCart(productId, prevCart);
    const newQty = getCartTotalQty(newCart);
    const newAmt = getCartTotalAmount(newCart);
    syncCart(newCart);
    return state.merge(
      Map({
        cart: newCart,
        totalQty: newQty,
        totalAmount: newAmt
      })
    );
  },
  [SYNC_CART_FROM_LOCALSTORAGE]: (state, action) => {
    const { cart } = action;
    const newQty = getCartTotalQty(cart);
    const newAmt = getCartTotalAmount(cart);
    syncCart(cart);
    return state.merge(
      Map({
        cart: cart,
        totalQty: newQty,
        totalAmount: newAmt
      })
    );
  },
  [SET_CART_STATE]: (state, action) => {
    return state.merge(
      Map({
        ...action.newState
      })
    );
  }
};

function manageCartByProductId(productId, cart) {
  const productInCart = findProductInCartById(productId, cart);
  if (productInCart) {
    const newCart = [];
    cart.map(o => {
      if (o.product_id === productId) {
        o.quantity = o.quantity + 1;
      }
      newCart.push(o);
    });
    return newCart;
  } else {
    const selectedProduct = _.find(productsDS, ["product_id", productId]);
    if (selectedProduct) {
      const unitPrice = selectedProduct.unit_price;
      const productData = {
        product_id: productId,
        product_name: selectedProduct.product_name,
        image: selectedProduct.image,
        quantity: 1,
        price: unitPrice,
        meta: {
          product: selectedProduct
        }
      };
      cart.push(productData);
    }
  }
  return cart;
}

function manageCartByProductIdSubtract(productId, cart) {
  const productInCart = findProductInCartById(productId, cart);
  if (productInCart) {
    const newCart = [];
    cart.map(o => {
      if (o.product_id === productId) {
        o.quantity = o.quantity - 1;
      }
      if (o.quantity > 0) {
        newCart.push(o);
      }
    });
    return newCart;
  }
  return cart;
}

function findProductInCartById(productId, cart) {
  const cartProd = _.find(cart, ["product_id", productId]);
  return cartProd ? cartProd : null;
}

function deleteProductFromCart(productId, cart) {
  const newCart = [];
  cart.map(o => {
    if (o.product_id !== productId) {
      newCart.push(o);
    }
  });
  return newCart;
}

function getCartTotalQty(cart) {
  let qty = 0;
  cart.map(o => {
    qty += o.quantity;
  });
  return qty;
}

function getCartTotalAmount(cart) {
  let amt = 0;
  cart.map(o => {
    amt += o.quantity * o.price;
  });
  return amt;
}

export default function reducer(state = initialState, action) {
  const fn = actions[action.type];
  return fn ? fn(state, action) : state;
}

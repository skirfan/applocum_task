import { Map } from "immutable";
import { LOGIN, LOGOUT, SET_USER_STATE } from "../actions/user";
import { setSession, destroySession, destroyCart } from "../helpers/funs";

const initialState = Map({
  isLoggedIn: false,
  email: ""
});

const actions = {
  [LOGIN]: (state, action) => {
    const { email } = action;
    setSession(email);
    return state.merge(
      Map({
        email,
        isLoggedIn: true
      })
    );
  },
  [LOGOUT]: (state, action) => {
    destroySession();
    destroyCart();
    return state.merge(
      Map({
        email: "",
        isLoggedIn: false
      })
    );
  },
  [SET_USER_STATE]: (state, action) => {
    return state.merge(
      Map({
        ...action.newState
      })
    );
  }
};

export default function reducer(state = initialState, action) {
  const fn = actions[action.type];
  return fn ? fn(state, action) : state;
}

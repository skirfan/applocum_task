import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Navbar, Nav, Badge } from "react-bootstrap";
import { routes } from "../../config/routes";
import { setUserState, logout } from "../../actions/user";
import { syncCartFromLocalstorage, setCartState } from "../../actions/cart";
import { ts } from "../../helpers/funs";

class Header extends Component {
  render() {
    const { isLoggedIn, cartQty } = this.props;
    let _cartQty = "";
    if (cartQty > 0) {
      _cartQty = cartQty;
    }
    return (
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand>Applocum</Navbar.Brand>
        <Nav>
          <Nav.Link
            href={routes.HOME}
            onClick={e => {
              e.preventDefault();
              this.handleNavigation(routes.HOME);
            }}
          >
            Home
          </Nav.Link>
          {!isLoggedIn && (
            <Nav.Link
              href={routes.LOGIN}
              onClick={e => {
                e.preventDefault();
                this.handleNavigation(routes.LOGIN);
              }}
            >
              Login
            </Nav.Link>
          )}
          {isLoggedIn && (
            <Fragment>
              <Nav.Link
                href={routes.CART}
                onClick={e => {
                  e.preventDefault();
                  this.handleNavigation(routes.CART);
                }}
              >
                Cart <Badge variant="light">{_cartQty}</Badge>
              </Nav.Link>
              <Nav.Link href="javascript:void(0)" onClick={this.handleLogout}>
                Logout
              </Nav.Link>
            </Fragment>
          )}
        </Nav>
      </Navbar>
    );
  }

  componentDidMount() {
    const { isLoggedIn, dispatch } = this.props;
    if (!isLoggedIn) {
      const localStorIsLoggedIn = localStorage.getItem("isLoggedIn");
      if (
        typeof localStorIsLoggedIn !== "undefined" &&
        localStorIsLoggedIn === "true"
      ) {
        const localStorEmail = localStorage.getItem("email");
        let localStorCart = localStorage.getItem("cart");
        dispatch(setUserState({ isLoggedIn: true, email: localStorEmail }));
        localStorCart = JSON.parse(localStorCart);
        if (localStorCart) {
          dispatch(syncCartFromLocalstorage(localStorCart));
        }
      }
    }
  }

  handleNavigation = url => {
    this.props.history.push(url);
  };

  handleLogout = e => {
    e.preventDefault();
    const { dispatch, history } = this.props;
    dispatch(logout());
    const cartState = {
      totalQty: 0,
      cart: [],
      totalAmount: 0
    };
    dispatch(setCartState(cartState));
    history.push(routes.LOGIN);
    ts("Logout Success");
  };
}

const mapStateToProps = state => {
  const { userReducer, cartReducer } = state;
  return {
    isLoggedIn: userReducer.get("isLoggedIn"),
    cartQty: cartReducer.get("totalQty")
  };
};

Header = connect(mapStateToProps)(Header);

export default Header;

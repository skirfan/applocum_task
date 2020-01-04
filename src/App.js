import React, { Component } from "react";
import { Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import PublicRoute from "./config/PublicRoute";
import PrivateRouter from "./config/PrivateRouter";
import { routes } from "./config/routes";
import { ToastContainer, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Products from "./views/Products";
import ProductDetails from "./components/product/ProductDetails";
import Login from "./views/Login";
import Cart from "./views/Cart";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <PublicRoute exact path={routes.HOME} component={Products} />
          <PublicRoute path={routes.LOGIN} component={Login} />
          <PublicRoute
            path={`${routes.PRODUCT_DETAILS}/:id`}
            component={ProductDetails}
          />
          <PrivateRouter path={routes.CART} component={Cart} />
        </Switch>
        <ToastContainer
          position="top-right"
          transition={Flip}
          autoClose={3000}
          hideProgressBar
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnVisibilityChange
          draggable
          pauseOnHover
        />
      </div>
    );
  }
}

export default App;

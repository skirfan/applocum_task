import React, { Component, Fragment } from "react";
import { Route } from "react-router-dom";
import Header from "../components/template/Header";
import Footer from "../components/template/Footer";

class PublicRoute extends Component {
  render() {
    const { component: Component, ...rest } = this.props;
    return (
      <Route
        {...rest}
        render={props => {
          return (
            <Fragment>
              <Header {...props} />
              <div className="my-content">
                <Component {...props} />
              </div>
              <Footer {...props} />
            </Fragment>
          );
        }}
      />
    );
  }
}

export default PublicRoute;

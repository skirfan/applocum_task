import React, { Component, Fragment } from 'react';
import { Route, Redirect } from "react-router-dom";
import Header from '../components/template/Header';
import Footer from '../components/template/Footer';
import { routes } from './routes';

class PrivateRouter extends Component {
    render() {
        const { component: Component, ...rest } = this.props;
        return (
            <Route
                {...rest}
                render={(props) => {
                    const localStorIsLoggedIn = localStorage.getItem('isLoggedIn');
                    if (typeof localStorIsLoggedIn !== 'undefined' && localStorIsLoggedIn === 'true') {
                        return (
                            <Fragment>
                                <Header {...props} />
                                <div className="my-content my-auth-content">
                                    <Component {...props} />
                                </div>
                                <Footer {...props} />
                            </Fragment>
                        );
                    }
                    return <Redirect to={routes.LOGIN} />
                }}
            />
        );
    }
}

export default PrivateRouter;
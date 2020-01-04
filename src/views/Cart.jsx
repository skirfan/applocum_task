import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Col, Container, Row, Table, Button } from "react-bootstrap";
import {
  removeFromCart,
  addToCart,
  subToCart,
  setCartState
} from "../actions/cart";
import { ts, destroyCart } from "../helpers/funs";
import { routes } from "../config/routes";

class Cart extends Component {
  render() {
    const { cart, totalAmount } = this.props;
    return (
      <Container>
        <Row>
          <Col lg={12}>
            <h4>Cart</h4>
            <Table responsive>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Amount</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cart && cart.length > 0 ? (
                  <Fragment>
                    {cart.map((o, i) => (
                      <tr key={i}>
                        <td>{i + 1}</td>
                        <td>{o.product_name}</td>
                        <td>
                          <Button
                            type="button"
                            size="sm"
                            variant="success"
                            onClick={() =>
                              this.handleQtyChange(o.product_id, "+")
                            }
                          >
                            +
                          </Button>
                          <span style={{ margin: "0 10px" }}>{o.quantity}</span>
                          <Button
                            type="button"
                            size="sm"
                            variant="danger"
                            onClick={() =>
                              this.handleQtyChange(o.product_id, "-")
                            }
                          >
                            -
                          </Button>
                        </td>
                        <td>{o.price}</td>
                        <td>{o.price * o.quantity}</td>
                        <td>
                          <Button
                            type="button"
                            variant="danger"
                            onClick={() => this.handleRemove(o.product_id)}
                          >
                            Remove
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </Fragment>
                ) : (
                  <tr>
                    <td colSpan={6}>No products found.</td>
                  </tr>
                )}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={6}>Total : {totalAmount}</td>
                </tr>
              </tfoot>
            </Table>
          </Col>
          {cart && cart.length > 0 && (
            <Col lg={12}>
              <Button
                type="button"
                variant="success"
                onClick={this.handleCheckout}
              >
                Checkout
              </Button>
            </Col>
          )}
        </Row>
      </Container>
    );
  }

  handleRemove = productId => {
    const { dispatch } = this.props;
    dispatch(removeFromCart(productId));
    ts("Product removed");
  };

  handleQtyChange = (productId, action) => {
    const { dispatch } = this.props;
    if (action === "+") {
      dispatch(addToCart(productId));
    } else if (action === "-") {
      dispatch(subToCart(productId));
    }
  };

  handleCheckout = () => {
    const { dispatch, history } = this.props;
    const newCart = {
      totalQty: 0,
      cart: [],
      totalAmount: 0
    };
    dispatch(setCartState(newCart));
    destroyCart();
    history.push(routes.HOME);
    ts("Checkout success!");
  };
}

const mapStateToProps = state => {
  const { cartReducer } = state;
  return {
    cart: cartReducer.get("cart"),
    totalAmount: cartReducer.get("totalAmount")
  };
};

Cart = connect(mapStateToProps)(Cart);

export default Cart;

import React, { Component } from "react";
import { connect } from "react-redux";
import { Image, Container, Row, Col, ListGroup, Button } from "react-bootstrap";
import productsDS from "../../datasource/products.json";
import _ from "lodash";
import { addToCart } from "../../actions/cart.js";
import { ts } from "../../helpers/funs.js";

class ProductDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null
    };
  }

  render() {
    const { product } = this.state;
    const { isLoggedIn } = this.props;
    if (!product) {
      return null;
    }
    return (
      <Container>
        <Row>
          <Col md={6}>
            <Image src={product.image} fluid />
          </Col>
          <Col md={6}>
            <Col>
              <h4>{product.product_name}</h4>
            </Col>
            <Col>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
              </p>
            </Col>
            <Col>
              <ListGroup variant="flush">
                <ListGroup.Item>Location : {product.location}</ListGroup.Item>
                <ListGroup.Item>Quantity : {product.quantity}</ListGroup.Item>
                <ListGroup.Item>Amout : {product.unit_price}</ListGroup.Item>
              </ListGroup>
            </Col>
            {isLoggedIn && (
              <Col>
                {product.quantity > 0 ? (
                  <Button
                    variant="primary"
                    type="button"
                    onClick={() => this.handleAddToCart(product.product_id)}
                  >
                    Add To Cart
                  </Button>
                ) : (
                  <button disabled type="button" class="btn btn-danger">
                    Sold Out
                  </button>
                )}
              </Col>
            )}
          </Col>
        </Row>
      </Container>
    );
  }

  componentDidMount() {
    const {
      match: {
        params: { id }
      }
    } = this.props;
    const selectedProduct = _.find(productsDS, ["product_id", id]);
    this.setState({ product: selectedProduct });
  }

  handleAddToCart = productId => {
    const { dispatch } = this.props;
    dispatch(addToCart(productId));
    ts("Product added");
  };
}

const mapStateToProps = state => {
  const { userReducer } = state;
  return {
    isLoggedIn: userReducer.get("isLoggedIn")
  };
};

ProductDetails = connect(mapStateToProps)(ProductDetails);

export default ProductDetails;

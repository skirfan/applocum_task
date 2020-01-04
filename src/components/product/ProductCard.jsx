import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Card, Button, ListGroup } from "react-bootstrap";
import { routes } from "../../config/routes";

class ProductCard extends Component {
  render() {
    const { data, isLoggedIn, handleAddToCart } = this.props;
    return (
      <Card style={{ width: "18rem", marginBottom: 25 }}>
        <Link
          to={`${routes.PRODUCT_DETAILS}/${data.product_id}`}
          className="product-details-link"
        >
          <div className="image-wrapper">
            <Card.Img variant="top" src={data.image} />
          </div>
          <Card.Body>
            <Card.Title>{data.product_name}</Card.Title>
          </Card.Body>
        </Link>
        <ListGroup className="list-group-flush">
          <ListGroup.Item>{data.location}</ListGroup.Item>
          <ListGroup.Item>{data.quantity} - Left</ListGroup.Item>
          <ListGroup.Item>Rs. {data.unit_price}</ListGroup.Item>
        </ListGroup>
        {isLoggedIn && (
          <Card.Body>
            {data.quantity > 0 ? (
              <Button
                type="button"
                variant="primary"
                onClick={() => handleAddToCart(data.product_id)}
              >
                Add To Cart
              </Button>
            ) : (
              <button disabled type="button" class="btn btn-danger">
                Sold Out
              </button>
            )}
          </Card.Body>
        )}
      </Card>
    );
  }
}

const mapStateToProps = state => {
  const { userReducer } = state;
  return {
    isLoggedIn: userReducer.get("isLoggedIn")
  };
};

ProductCard = connect(mapStateToProps)(ProductCard);

export default ProductCard;

import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import ProductCard from "../components/product/ProductCard";
import productsDS from "../datasource/products.json";
import { addToCart } from "../actions/cart";
import { ts } from "../helpers/funs";

class Products extends Component {
  render() {
    return (
      <Fragment>
        <div className="container">
          <h3>Products</h3> <br />
          {productsDS && productsDS.length > 0 && (
            <div className="row">
              {productsDS.map(product => {
                return (
                  <div className="col-sm-4" key={product.product_id}>
                    <ProductCard
                      data={product}
                      handleAddToCart={this.handleAddToCart}
                    />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </Fragment>
    );
  }

  handleAddToCart = productId => {
    const { dispatch } = this.props;
    dispatch(addToCart(productId));
    ts("Product added");
  };
}

const mapStateToProps = state => {
  return {};
};

Products = connect(mapStateToProps)(Products);

export default Products;

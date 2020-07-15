import React from "react";
import { Product } from "../../core/models/Product";
import "./product.css";
import ProductService from "../../core/services/ProductService";
import { Link } from "react-router-dom";
import { ProductItem } from "../productItem/productItem";
import { Manufacturer } from "../../core/models/Manufacturer";

interface IProductProps {
  match: any;
}

interface IProductState {
  Product: Product;
}

export class ProductComponent extends React.Component<IProductProps, IProductState> {
  constructor(props: any) {
    super(props);

    this.state = {
      Product: null,

    };
  }

  async componentDidMount() {
    let prod;
    let man;

    if (this.props.match.params.id) {
      await ProductService.increaseVisitCount(this.props.match.params.id);
      prod = await ProductService.GetProduct(this.props.match.params.id);
    }

    this.setState({
      Product: prod,
    });
  }

  render() {
    if (!this.state.Product) {
      return <div>Ismeretlen termék!</div>;
    }

    const prod = this.state.Product;

    return (
      <div className="Products" >
        <Link to="/Products"><button className="button">Vissza az összes termékhez</button></Link>
        <br />
        <Link to={`/EditProducts/${prod.ID}`}><button className="button">Termék szerkesztése</button></Link>
        <br />
        <ProductItem IsSingleItem={true} Product={prod}/>
      </div>
    );
  }
}

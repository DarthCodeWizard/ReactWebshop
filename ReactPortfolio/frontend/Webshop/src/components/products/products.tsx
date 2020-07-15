import React from "react";
import { Product } from "../../core/models/Product";
import "./products.css";
import ProductService from "../../core/services/ProductService";
import { ProductItem } from "../productItem/productItem";
import { Category } from "../../core/models/Category";
import { Link } from "react-router-dom";

interface IProductsState {
  Products: Product[];
  Categories: Category[];
  SelectedCategoryId: number;
  Order: number; // 0: csökkenő, 1: növekvő
}

export class Products extends React.Component<{}, IProductsState> {
  constructor(props: any) {
    super(props);

    this.state = {
      Products: [],
      Categories: [],
      SelectedCategoryId: null,
      Order: 0,
    };
  }

  async componentDidMount() {
    const categories = await ProductService.GetCategories();

    this.getProducts();

    this.setState({
      Categories: categories,
    });
  }

  getProducts = async () => {
    let product;

    if (this.state.SelectedCategoryId) {
      product = await ProductService.GetProductsByCategoryID(this.state.SelectedCategoryId);
    } else {
      product = await ProductService.GetProducts();
    }

    this.setState({
      Products: product,
    });
  };

  onClickCategory = (categoryId: number) => {
    this.setState(
      {
        SelectedCategoryId: categoryId,
      },
      () => {
        this.getProducts();
      }
    );
  };

  changeOrder = () => {
    this.setState({
      Order: this.state.Order === 0 ? 1 : 0,
    });
  };

  render() {
    return (
      <div className="Products">
        Nézze meg akciós termékeinket:
        <br />
        <div style={{ cursor: "pointer", width: 300 }} onClick={this.changeOrder}>
          Rendezés: {this.state.Order === 0 ? "Ár szerint csökkenő" : "Ár szerint növekvő"}
        </div>
        <div className="filterContainer">
          <div
            className="filter"
            onClick={() => {
              this.onClickCategory(null);
            }}
          >
            Összes
          </div>

          {this.state.Categories.map((cat) => {
            return (
              <div
                className="filter"
                key={cat.Id}
                onClick={() => {
                  this.onClickCategory(cat.Id);
                }}
              >
                {cat.Name}
              </div>
            );
          })}
        </div>
        {this.state.Products.sort((a, b) => {
          return this.state.Order === 0 ? b.Price - a.Price : a.Price - b.Price;
        }).map((product) => {
          
          return  <ProductItem IsSingleItem={false} Product={product} {...product.Color}/> ;
        
        })}
      </div>
    );
  }
}

import React from "react";
import { Product } from "../../core/models/Product";
import ProductService from "../../core/services/ProductService";
import { Link } from "react-router-dom";

interface IProductListState {
  Products: Product[];
}

export class ProductList extends React.Component<{}, IProductListState> {
  constructor(props) {
    super(props);

    this.state = {
      Products: [],
    };
  }

  async componentDidMount() {
    await this.getProduct();
  }

  async getProduct() {
    const products = await ProductService.GetProducts();

    this.setState({
      Products: products,
    });
  }

  async deleteProduct(prodId: number) {
    const confirmed = window.confirm("Biztos ki szeretnéd törölni ezt a terméket?");

    if (confirmed) {
      await ProductService.DeleteProduct(prodId);
      await this.getProduct();
      alert("Termék sikeresen törölve!");
    }
  }

  render() {
    return (
      <div className="editProductContainer">
        <table style={{ width: "100%" }}>
          <thead>
            <tr>
              <th>Id</th>
              <th>Neve</th>
              <th>Kategória</th>
              <th>Ár</th>
              <th>Műveletek</th>
            </tr>
          </thead>

          <tbody>
            {this.state.Products.map((prod) => {
              return (
                <tr>
                  <td>{prod.ID}</td>
                  <td>{prod.Name}</td>
                  <td>
                    {prod.CategoryName} 
                  </td>
                  <td>
                    {prod.Price} {prod.Currency}
                  </td>
                  <td>
                    <a
                      onClick={() => {
                        this.deleteProduct(prod.ID);
                      }}
                      style={{ marginRight: 6 }}
                      href="#"
                    >
                    <button className="button">Törlés</button>  
                    </a>
                    <Link to={`/EditProducts/${prod.ID}`}><button className="button"> Szerkesztés</button></Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

import React from "react";
import { Product } from "../../core/models/Product";
import "./productItem.css";
import { Link } from "react-router-dom";


interface IProductProps {
  Product: Product;
  IsSingleItem: boolean;

 
}


export class ProductItem extends React.Component<IProductProps> {
  constructor(props: any) {
    super(props);
  }

  render() {
    if (!this.props.Product) {
      return <div>Ismeretlen termék!</div>;
    }

    const prod = this.props.Product;

    return (
      <div className="card" >
        <img src={prod.Image} className="Image" />
        <div className="container">
        <div>
          Név: {prod.Name}
        </div>
        <div>
          Leírás: {prod.Description}
        </div>
        <div>
          Kategória: {prod.CategoryName}
        </div>
        <div>
          Megtekintések: {prod.VisitCount}
        </div>
        <div style={{backgroundColor:prod.Color}} className="ColorSquare" > </div>
        <div>
          Gyártó: {prod.ManufacturerName}
        </div>
        <div>
          Ár: {prod.Price} {prod.Currency}
        </div>
        </div>
        {!this.props.IsSingleItem ? <Link to={`/Product/${prod.ID}`}><button className="button">Tovább a termékre</button></Link> : null}
      </div>
    );
  }
}

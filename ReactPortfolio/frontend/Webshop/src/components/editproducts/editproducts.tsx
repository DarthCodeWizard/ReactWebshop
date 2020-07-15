import React from "react";
import { Product } from "../../core/models/Product";
import { Category } from "../../core/models/Category";
import ProductService from "../../core/services/ProductService";
import "./editproducts.css";
import { Link } from "react-router-dom";
import { Manufacturer } from "../../core/models/Manufacturer";

interface IEditProductsProps {
  match: any;
}

interface IEditProductsState {
  Product: Product;
  Categories: Category[];
  Manufacturers: Manufacturer[];
  Errors: string[];
}

export class EditProducts extends React.Component<IEditProductsProps, IEditProductsState> {
  constructor(props: any) {
    super(props);

    this.state = {
      Product: null,
      Categories: [],
      Errors: [],
      Manufacturers:[]
    };

    this.changeHandler = this.changeHandler.bind(this);
  }

  async componentDidMount() {
    let categories = await ProductService.GetCategories();
    let manufacturers = await ProductService.GetManufacturers();
    let prod;

    console.log(prod);

    if (this.props.match.params.id) {
      prod = await ProductService.GetProduct(this.props.match.params.id);
    } else {
      prod = new Product();
    }

    this.setState({
      Categories: categories,
      Manufacturers:manufacturers,
      Product: prod,
    });
  }

  changeHandler(event: any) {
    const name = event.target.name;
    const value = event.target.value;

    let prod = this.state.Product;
    

    prod[name] = value; // prod.Name = value;

    this.setState({
      Product: prod,
    });
  }

  save = async () => {
    let Errors = [];

    if (!this.state.Product.Name) {
      Errors.push("Név kitöltése kötelező!");
    }
    if (this.state.Product.CategoryId.toString() === "0") {
      Errors.push("Kategória kitöltése kötelező!");
    }
    if (this.state.Product.ManufactureId.toString() === "0") {
        Errors.push("Gyártó kitöltése kötelező!");
      }

    this.setState(
      {
        Errors: Errors,
      },
      async () => {
        if (this.state.Errors.length !== 0) {
          alert("Hiba a mentés közben!");
          return;
        }

        await ProductService.Save(this.state.Product);
        alert("Sikeres mentés");
      }
    );
  };

  render() {
    if (!this.state.Product) {
      return <div className="editProductContainer">Ismeretlen termék!</div>;
    }

    return (
      <div className="editProductContainer">
        <Link to="/ProductsList"><button className="button">Ugrás a Terméklistára</button></Link>
        <Link to="/ManufacturerList"><button className="button">Ugrás a Gyártólistára</button></Link>

        <div className="fieldName">Név:</div>
        <div className="fieldValue">
          <input name="Name" type="text" value={this.state.Product.Name} onChange={this.changeHandler} />
        </div>

        <div className="fieldName">Kategória:</div>
        <div className="fieldValue">
          <select name="CategoryId" value={this.state.Product.CategoryId} onChange={this.changeHandler}>
            <option value={0}>Kérlek válassz!</option>

            {this.state.Categories.map((cat) => {
              return <option value={cat.Id}>{cat.Name}</option>;
            })}
          </select>
        </div>


        <div className="fieldName">Gyártó:</div>
        <div className="fieldValue">
          <select name="ManufactureId" value={this.state.Product.ManufactureId} onChange={this.changeHandler}>
            <option value={0}>Kérlek válassz!</option>

            {this.state.Manufacturers.map((man) => {
              return <option value={man.Id}>{man.ManufacturerName}</option>;
            })}
          </select>
          <br/>
          <Link to="/EditManufacturers"><button className="button">Gyártók szerkesztése</button></Link>
         
        </div>
        <br/>
        <br/>
        <div className="fieldName">Ár:</div>
        <div className="fieldValue">
          <input name="Price" type="text" value={this.state.Product.Price} onChange={this.changeHandler} />
        </div>

        <div className="fieldName">Valuta:</div>
        <div className="fieldValue">
          <input name="Currency" type="text" value={this.state.Product.Currency} onChange={this.changeHandler} />
        </div>

        <div className="fieldName">Leírás:</div>
        <div className="fieldValue">
          <input name="Description" type="text" value={this.state.Product.Description} onChange={this.changeHandler} />
        </div>

        <div className="fieldName">Kép:</div>
        <div className="fieldValue">
          <img src={this.state.Product.Image}></img>
          <input name="Image" type="text" value={this.state.Product.Image} onChange={this.changeHandler} />
        </div>

        <div>
          <ul>
            {this.state.Errors.map((error) => {
              return <li>{error}</li>;
            })}
          </ul>
        </div>

        <div className="buttonContainer">
          <input type="button" className="button" value="Mentés" onClick={this.save} />
        </div>
      </div>
    );
  }
}

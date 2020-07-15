import React from "react";
import { Product } from "../../core/models/Product";
import ProductService from "../../core/services/ProductService";
import { Link } from "react-router-dom";
import { Manufacturer } from "../../core/models/Manufacturer";

interface IManufacturerListState {
  Manufacturers: Manufacturer[];
}

export class ManufacturerList extends React.Component<{}, IManufacturerListState> {
  constructor(props) {
    super(props);

    this.state = {
      Manufacturers: [],
    };
  }

  async componentDidMount() {
    await this.getManufacturer();
  }

  async getManufacturer() {
    const manufacturers = await ProductService.GetManufacturers();

    this.setState({
      Manufacturers:manufacturers,
    });
  }

  async deleteManufacturer(manId: number) {
    const confirmed = window.confirm("Biztos ki szeretnéd törölni ezt a terméket?");

    if (confirmed) {
      await ProductService.DeleteManufacturer(manId);
      await this.getManufacturer();
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
              <th>Színe </th>
            </tr>
          </thead>

          <tbody>
            {this.state.Manufacturers.map((man) => {
              return (
                <tr>
                  <td>{man.Id}</td>
                  <td>{man.ManufacturerName}</td>
                  <td style={{backgroundColor:man.ColourCode}}>
                   
                  </td>
                  <td>
                    <a
                      onClick={() => {
                        this.deleteManufacturer(man.Id);
                      }}
                      style={{ marginRight: 6 }}
                      href="#"
                    >
                      <button className="button">Törlés</button>
                    </a>
                    <Link to={`/EditManufacturers/${man.Id}`}><button className="button">Szerkesztés</button></Link>
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

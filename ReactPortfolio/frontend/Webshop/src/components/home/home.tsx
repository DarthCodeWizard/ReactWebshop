import React from "react";
import "./home.css"
import { Product } from "../../core/models/Product";
import  ProductService  from "../../core/services/ProductService";
import { ProductItem } from "../productItem/productItem";

interface IHomeState{
    Products: Product[];
}

export class Home extends React.Component<{}, IHomeState>{
    constructor(props){

        super(props)

        this.state= {
            Products: []
        }

    }
    async componentDidMount(){
        const products = await ProductService. GetTopProducts()
        this.setState({
            Products:products
        })

    }
  
    render() {
        return <div className="homeContainer">
            Üdvözöljük a Super Webshop oldalán!
            <h2>Felkapott termékek</h2>
            <div className="Products">
                {this.state.Products.map(prod=>{
                    return <ProductItem Product={prod} IsSingleItem={false}/>
                })}
            </div>

            
            </div>

    }
}
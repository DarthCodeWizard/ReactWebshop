import React from 'react';
import './App.css';
import { Header } from './components/header/header';
import { Home } from './components/home/home';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Products } from './components/products/products';
import { EditProducts } from './components/editproducts/editproducts';
import { ProductComponent } from './components/product/product';
import { ProductList } from './components/productList/productList';
import { EditManufacturers } from './components/editmanufacturer/editmanufacturer';
import { ManufacturerList } from './components/manufacturerlist/manufacturerlist';


function App() {
  return (<div><Header></Header>
    <div className="menuContainer">
      <Router>
        <Link className="menuItems" to="/">Főoldal</Link>
        <Link className="menuItems" to="/Products">Termékek</Link>
        <Link className="menuItems" to="/EditProducts">Új termék</Link>
        <Link className="menuItems" to="/ProductsList">Terméklista</Link>
        <Link className="menuItems" to="/ManufacturerList">Gyártó lista</Link>
        
        <Route exact path="/" component={() => <Home />} />
        <Route exact path="/Products" component={() => <Products />} />
        <Route exact path="/ProductsList" component={() => <ProductList />} />
        <Route exact path="/ManufacturerList" component={() => <ManufacturerList />} />
        <Route exact path="/Product/:id" render={(props) => <ProductComponent  {...props}/>}/>
        <Route exact path="/EditProducts/" render={(props) => <EditProducts {...props}/>}/>
        <Route exact path="/EditProducts/:id" render={(props) => <EditProducts {...props}/>}/>
        <Route exact path="/EditManufacturers/" render={(props) => <EditManufacturers {...props}/>}/>
        <Route exact path="/EditManufacturers/:id" render={(props) => <EditManufacturers {...props}/>}/>
      </Router>
    </div>
  </div>
  );
}

export default App;

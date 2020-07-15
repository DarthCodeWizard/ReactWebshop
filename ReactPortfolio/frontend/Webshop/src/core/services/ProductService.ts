import { Product } from "../models/Product";
import { Category } from "../models/Category";
import { Manufacturer } from "../models/Manufacturer";

export class ProductService {
    async DeleteManufacturer(id: number) {
        try{
            await fetch(`http://localhost:59645/api/manufacturer/DeleteManufacturer?id=${id}`,{ 
                method: 'POST',
                headers:{
                    Accept: "application/json",
                    "Content-Type":"application/json"
                }
        });
        }
        catch(err){
            return Promise.reject(err);
        }
    }
    
    async Save(Product: Product) {
        try {
           const response =  await fetch(`http://localhost:59645/api/product/saveProduct`,{ 
                method: 'POST',
                body:JSON.stringify(Product),
                headers:{
                    Accept: "application/json",
                    "Content-Type":"application/json"
                }
        });
            
        } catch (err) {
            return Promise.reject(err);
        }
    }

    async EditManufacturers(Manufacturer: Manufacturer) {
        try {
            const response = await fetch(`http://localhost:59645/api/manufacturer/SaveManufacturer`,{ 
                method: 'POST',
                body:JSON.stringify(Manufacturer),
                headers:{
                    Accept: "application/json",
                    "Content-Type":"application/json"
                }
        });
            
        } catch (err) {
            return Promise.reject(err);
        }
    }

    public async GetProducts(): Promise<Product[]> {
        try {
            const response = await fetch(`http://localhost:59645/api/product/GetProducts`);
            const json = await response.json();
            return json;
        } catch (err) {
            return Promise.reject(err);
        }
    }

    public async GetCategories(): Promise<Category[]> {
        try {
            const response = await fetch(`http://localhost:59645/api/category/GetCategories`);
            const json = await response.json();
            return json;
        } catch (err) {
            return Promise.reject(err);
        }
    }
    
    public async GetManufacturers(): Promise<Manufacturer[]> {
        try {
            const response = await fetch(`http://localhost:59645/api/manufacturer/GetManufacturers`);
            const json = await response.json();
            return json;
        } catch (err) {
            return Promise.reject(err);
        }
    }
    

    public async GetProduct(id: number): Promise<Product>{
        try {
            const response = await fetch(`http://localhost:59645/api/product/GetProductByID?id=${id}`);
            const json = await response.json();
            return json;
        } catch (err) {
            return Promise.reject(err);
        }

    }
    public async GetManufacturer(id: number): Promise<Product>{
        try {
            const response = await fetch(`http://localhost:59645/api/manufacturer/GetManufacturerByID?id=${id}`);
            const json = await response.json();
            return json;
        } catch (err) {
            return Promise.reject(err);
        }

    }
    
    public async GetProductsByCategoryID(CategoryId: number): Promise<Product[]> {
        try {
            const response = await fetch(`http://localhost:59645/api/product/GetProductByCategoryId?categoryId=${CategoryId}`);
            const json = await response.json();
            return json;
        } catch (err) {
            return Promise.reject(err);
        }
    }
  
    
    async increaseVisitCount(id:number){
        try{
            await fetch(`http://localhost:59645/api/product/IncreaseVisitCount?id=${id}`,{ 
                method: 'POST',
                headers:{
                    Accept: "application/json",
                    "Content-Type":"application/json"
                }
        });
        }
        catch(err){
            return Promise.reject(err);
        }
    }

    async DeleteProduct(id:number){
        try{
            await fetch(`http://localhost:59645/api/product/DeleteProduct?id=${id}`,{ 
                method: 'POST',
                headers:{
                    Accept: "application/json",
                    "Content-Type":"application/json"
                }
        });
        }
        catch(err){
            return Promise.reject(err);
        }
    }

    public async GetTopProducts(): Promise<Product[]> {
        try {
            const response = await fetch(`http://localhost:59645/api/product/GetTopProducts`);
            const json = await response.json();
            return json;
        } catch (err) {
            return Promise.reject(err);
        }
    }
    
}
export default new ProductService();
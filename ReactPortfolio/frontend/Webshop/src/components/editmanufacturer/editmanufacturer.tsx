
import React from "react";
import ProductService from "../../core/services/ProductService";
import './editmanufacturer.css'
import { Manufacturer } from "../../core/models/Manufacturer";

interface IEditManufacturersProps {
    match: any;
}

interface IEditManufacturersState {
   
    Manufacturer: Manufacturer;
    Errors: string[];
}

export class EditManufacturers extends React.Component<IEditManufacturersProps, IEditManufacturersState>{

    constructor(props: any) {
        super(props);

        this.state = {
            Manufacturer:null,
            Errors:[],
        };
        this.changeHandler = this.changeHandler.bind(this);
      
    }

    async componentDidMount() {
        
       
        let man;
    
        console.log(man);
        if (this.props.match.params.id) {
            man = await ProductService.GetManufacturer(this.props.match.params.id);
          } else{
              man = new Manufacturer();
            }
          
        
    
        this.setState({
        
        Manufacturer:man,
         
        });
      }

    changeHandler(event: any){
        const name = event.target.name;
        const value = event.target.value;

        let man = this.state.Manufacturer;
       
        man[name] = value;
        this.setState(
            {
               Manufacturer: man,
            }
        );
    }
    
    save = async ()=>{
        let Errors =[] ;

        if( this.state.Manufacturer.ManufacturerName===null){
            Errors.push("gyártó neve");

        }
        if( this.state.Manufacturer.ColourCode===null){
            Errors.push("szín");

        }
        this.setState(
            {
                Errors : Errors
            },async ()=>{
                if(this.state.Errors.length!==0)
                {
                   alert("Hibás mentés");
                    return;
                }
                await ProductService.EditManufacturers(this.state.Manufacturer);

                alert(" ERROR! Succes!")
            }

        );
        
    }
    
    
    render() {
        if(!this.state.Manufacturer) 
        return <div className="editProductContainer">Ismeretlen termék</div>
        
        return <div className="editProductContainer">
            <div className="fieldName">Gyártó:</div>

            <div className="fieldValue">
                <input name="ManufacturerName" type='text' value={this.state.Manufacturer.ManufacturerName} 
                    onChange={this.changeHandler} />
            </div>
            
            <div className="fieldName">Szín:</div>

            <div className="fieldValue">
                <div className="ColorSquare" style={{backgroundColor: this.state.Manufacturer.ColourCode}}></div> 
                <input name="ColourCode" type='text' value={this.state.Manufacturer.ColourCode} 
                    onChange={this.changeHandler} />
            </div>

            <div>
                <ul> 
                {this.state.Errors.map(errorok=>{
                    return <li>{errorok}</li>
                }
                )}</ul>
               
            </div>

            <div className="buttonContainer">
                <input type="button" className="button" value="Mentés" onClick={this.save}/>
            </div>

        </div>;
    }
}
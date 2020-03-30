import { Group } from "./group";

class Product {
    // propriedades da classe produto
    id:number;
    name:string;
    unity:string;
    price:number;
    balance:number;
    group:Group;    
    
    constructor(){
    }
}

export { Product };
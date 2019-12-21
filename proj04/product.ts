import { Group } from "./group";

class Product {
    // propriedades da classe produto
    id:number;
    name:string;
    unity:string;
    price:number;
    balance:number;
    group:Group;    
    
    // parametro de entrada do construtor
    constructor(id:number, name: string, unity: string, price: number, balance: number, group: Group){
        this.id = id;
        this.name = name;
        this.unity = unity;
        this.price = price;
        this.balance = balance;
        this.group = group;
    }
}

export { Product };
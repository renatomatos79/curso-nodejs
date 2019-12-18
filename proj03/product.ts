class Product {
    // propriedades da classe produto
    Id:number;
    Name:string;
    Unity:string;
    Price:number;
    
    // parametro de entrada do construtor
    constructor(id:number, name: string, unity: string, price: number){
        this.Id = id;
        this.Name = name;
        this.Unity = unity;
        this.Price = price;
    }
}

export { Product };
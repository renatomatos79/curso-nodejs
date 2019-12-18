class Product {
    Id:number;
    Name:string;
    Unity:string;
    Price:number;
    
    constructor(id:number, name: string, unity: string, price: number){
        this.Id = id;
        this.Name = name;
        this.Unity = unity;
        this.Price = price;
    }
}

export {Product};
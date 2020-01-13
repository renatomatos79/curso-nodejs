import { Product } from "../model/product";
import { GroupService } from "./groupService";

class ProductService {

    constructor(protected groupService: GroupService){}

    products(): Array<Product> {
        const groups = this.groupService.groups();
        
        const products:Array<Product> = new Array<Product>();
        products.push(new Product(1, "Keyboard", "und", 25.32, 100, groups.filter(f=>f.id === 1)[0]));
        products.push(new Product(2, "Mouse Microsoft sem Fio", "und", 34.99, 500, groups.filter(f=>f.id === 1)[0]));
        products.push(new Product(3, "Monitor 22' HP", "und", 750.00, 400, groups.filter(f=>f.id === 1)[0]));

        products.push(new Product(4, "Caixa caneta bic azul 6 unidades", "cx", 6.00, 600, groups.filter(f=>f.id === 2)[0]));
        products.push(new Product(5, "Caixa caneta bic preta 6 unidades", "cx", 6.00, 120, groups.filter(f=>f.id === 2)[0]));
        products.push(new Product(6, "Tesoura papel", "und", 9.75, 50, groups.filter(f=>f.id === 2)[0]));

        products.push(new Product(7, "Lego carro", "und", 55.00, 45, groups.filter(f=>f.id === 3)[0]));
        products.push(new Product(8, "Lego castelo", "und", 88.00, 30, groups.filter(f=>f.id === 3)[0]));
        products.push(new Product(9, "Joystick PC", "und", 35.00, 65, groups.filter(f=>f.id === 3)[0]));

        return products;
    }  
}

export { ProductService }
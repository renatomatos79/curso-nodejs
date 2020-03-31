import { Product } from "../model/product";
import { ProductModel } from "../schemas/product.model";
import { Util } from "../common/util";
import { ErrorCode } from "../model/errorcode.model";
import { HttpStatusCode } from "../enums/HttpStatusCode.enum";

class ProductService {

    constructor(){}

    create(data: Product): Promise<Product> {
        return new Promise(async (resolve, reject) => {
            
            if (data == null) {
                const error = new ErrorCode(HttpStatusCode.BadRequest, "data can not be null");
                reject(error);
            }
            if (data.id <= 0) {
                const error = new ErrorCode(HttpStatusCode.BadRequest, "invalid id");
                reject(error);
            }
            if (Util.isEmpty(data.name)) {
                const error = new ErrorCode(HttpStatusCode.BadRequest, "name can not be null");
                reject(error);
            }
            // await -> espera a Promise terminar e por isso precisa estar dentro de uma Thread com async
            const temp = await ProductModel.find({"id": data.id}).exec();
            if (temp.length > 0) {
                const error = new ErrorCode(HttpStatusCode.Conflict, "Product already exists");
                reject(error);
            }
            
            const row = new ProductModel({
                id: data.id,
                name: data.name
            });
            row.save()
                .then(doc => { 
                    resolve(data); 
                })
                .catch(error => 
                    reject(new ErrorCode(HttpStatusCode.InternalError, error.toString()))
                );
        });
    }

    update(data: Product): Promise<Product> {
        return new Promise((resolve, reject) => {
            ProductModel.findOne({"id": data.id})
                .then(async result => {
                    if (result != null) {
                        await result.update({name: data.name}).exec();
                        resolve(data);
                    } else {
                        reject(new Error("Product not found"));
                    }
                });
        });
    }

    delete(id: number): Promise<Product> {
        return new Promise(async (resolve, reject) => {
            resolve(null);
        });
    }

    find(id: number): Promise<Product> {
        return new Promise(async (resolve, reject) => {
            ProductModel.findOne({"id": id})
                .then(data => { 
                    if (data != null) {
                        const source = data.toObject() as Product;
                        const product = new Product();
                        product.id = source.id;
                        product.name = source.name;
                        resolve(product);
                    } else {
                        resolve(null);
                    }
                })
                .catch(error => reject(error));
        });
    }

    products(): Array<Product> {
        const products:Array<Product> = new Array<Product>();
        // products.push(new Product(1, "Keyboard", "und", 25.32, 100, groups.filter(f=>f.id === 1)[0]));
        // products.push(new Product(2, "Mouse Microsoft sem Fio", "und", 34.99, 500, groups.filter(f=>f.id === 1)[0]));
        // products.push(new Product(3, "Monitor 22' HP", "und", 750.00, 400, groups.filter(f=>f.id === 1)[0]));

        // products.push(new Product(4, "Caixa caneta bic azul 6 unidades", "cx", 6.00, 600, groups.filter(f=>f.id === 2)[0]));
        // products.push(new Product(5, "Caixa caneta bic preta 6 unidades", "cx", 6.00, 120, groups.filter(f=>f.id === 2)[0]));
        // products.push(new Product(6, "Tesoura papel", "und", 9.75, 50, groups.filter(f=>f.id === 2)[0]));

        // products.push(new Product(7, "Lego carro", "und", 55.00, 45, groups.filter(f=>f.id === 3)[0]));
        // products.push(new Product(8, "Lego castelo", "und", 88.00, 30, groups.filter(f=>f.id === 3)[0]));
        // products.push(new Product(9, "Joystick PC", "und", 35.00, 65, groups.filter(f=>f.id === 3)[0]));

        return products;
    }  
}

export { ProductService }
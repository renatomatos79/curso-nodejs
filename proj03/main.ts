import * as restify from 'restify';
import { Product } from './product';

const server = restify.createServer({
    name: "Products API",
    version: "1.0.0"
});

// habilitar uso de parametros
server.use(restify.plugins.queryParser());
// habilitar conversao
server.use(restify.plugins.bodyParser());

const products:Array<Product> = new Array<Product>();
products.push(new Product(1, "Keyboard", "und", 25.32));
products.push(new Product(2, "Arroz", "kg", 9.27));
products.push(new Product(3, "Coca Cola", "und", 2.50));

server.get("/products", (request, response, next) => {
    response.json(products);
    // passar para a proxima callback
    return next();
});

server.get("/products/:id", (request, response, next) => {
    const id = parseInt(request.params.id);
    const product = products.filter(f => f.Id === id);
    if (product.length === 0) {
        const error: any = new Error();
        error.statusCode = 404;
        error.message = "Product not found!";
        return next(error);
    }   
    response.json(product);    
    return next();
});

server.post("/products", (request, response, next) => {
    const newProduct = (request.body as Product);
    const product = products.filter(f => f.Id === newProduct.Id);
    if (product.length > 0) {
        const error: any = new Error();
        error.statusCode = 400;
        error.message = "Product already exists!";
        return next(error);
    }   
    products.push(newProduct);
    response.statusCode = 201;
    response.json(newProduct);
    return next();
});

server.del("/products/:id", (request, response, next) => {
    const id = parseInt(request.params.id);
    const product = products.filter(f => f.Id === id);
    if (product.length === 0) {
        const error: any = new Error();
        error.statusCode = 404;
        error.message = "Product not found!";
        return next(error);
    }   
    response.statusCode = 204;
    response.send();
    return next();
});

server.put("/products/:id", (request, response, next) => {
    const id = parseInt(request.params.id);
    const newProduct = (request.body as Product);
    const result = products.filter(f => f.Id === id);
    if (result.length === 0) {
        const error: any = new Error();
        error.statusCode = 404;
        error.message = "Product not found!";
        return next(error);
    }  
    const item = result[0];
    item.Name = newProduct.Name;
    item.Price = newProduct.Price;
    item.Unity = newProduct.Unity;
    response.statusCode = 200;
    response.json(item);
    return next();
});

server.listen(3000, () => {
    console.log("API is runninn on http://localhost:3000");
});


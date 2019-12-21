// tudo que estiver dentro do pacote restify irei acessar como sendo o objeto restify 
import * as restify from 'restify';
// importando a classe produto
import { Product } from './product';

// inciar o restify
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
products.push(new Product(4, "Cabo de rede 10 m", "pct", 8.50));

// toda requisicao tem 3 parametros
// request: dados do pedido
// response: dados da resposta
// next: proximo item na pilha
server.get("/products", (request, response, next) => {
    // ja vai ser retornado no formato JSON e com staus code correto 200
    response.json(products);
    // passar para a proxima callback
    return next();
});

server.get("/products/:id", (request, response, next) => {
    const id = parseInt(request.params.id);
    // uso igual com === porque comparo o conteudo e tipo de dado
    const items = products.filter(exp => exp.Id === id);
    if (items.length === 0) {
        // cadastra a variavel erro do tipo Any
        const error: any = new Error();
        error.statusCode = 404;
        error.message = "Product not found!";
        return next(error);
    }   
    response.json(items[0]);
    return next();
});

server.post("/products", (request, response, next) => {
    const newProduct = (request.body as Product);
    const items = products.filter(f => f.Id === newProduct.Id);
    if (items.length > 0) {
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
    const items = products.filter(f => f.Id === id);
    if (items.length === 0) {
        const error: any = new Error();
        error.statusCode = 404;
        error.message = "Product not found!";
        return next(error);
    }   
    // aqui seria o codigo para remover da base de dados
    response.statusCode = 204;
    // resposta pronta para ser enviada, mas nao ha conteudo
    response.send();
    return next();
});

server.put("/products/:id", (request, response, next) => {
    const id = parseInt(request.params.id);
    const newProduct = (request.body as Product);
    const items = products.filter(f => f.Id === id);
    if (items.length === 0) {
        const error: any = new Error();
        error.statusCode = 404;
        error.message = "Product not found!";
        return next(error);
    }  
    const item = items[0];
    item.Name = newProduct.Name;
    item.Price = newProduct.Price;
    item.Unity = newProduct.Unity;
    response.json(item);
    return next();
});

server.patch("/products/:id/price", (request, response, next) => {
    const id = parseInt(request.params.id);
    const newProduct = (request.body as Product);
    const items = products.filter(f => f.Id === id);
    if (items.length === 0) {
        const error: any = new Error();
        error.statusCode = 404;
        error.message = "Product not found!";
        return next(error);
    }  
    const item = items[0];
    item.Price = newProduct.Price;
    response.json(item);
    return next();
});

server.listen(3001, () => {
    console.log("Product API is runninn on http://localhost:3001");
});


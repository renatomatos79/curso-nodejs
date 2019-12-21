// tudo que estiver dentro do pacote restify irei acessar como sendo o objeto restify 
import * as restify from 'restify';
// importando a classe produto
import { Product } from './product';
import { Group } from './group';

// inciar o restify
const server = restify.createServer({
    name: "Products API",
    version: "1.0.0"
});

// habilitar uso de parametros
server.use(restify.plugins.queryParser());
// habilitar conversao
server.use(restify.plugins.bodyParser());

const groups:Array<Group> = new Array<Group>();
groups.push(new Group(1, "Informática"));
groups.push(new Group(2, "Papelaria"));
groups.push(new Group(3, "Brinquedos"));

const products:Array<Product> = new Array<Product>();
products.push(new Product(1, "Keyboard", "und", 25.32, 100, groups.filter(f=>f.id === 1)[0]));
products.push(new Product(2, "Mouse Microsoft sem Fio", "und", 34.99, 500, groups.filter(f=>f.id === 1)[0]));
products.push(new Product(3, "Monitor 22' HP", "und", 750.00, 400, groups.filter(f=>f.id === 1)[0]));

products.push(new Product(4, "Caixa caneta bic azul 6 unidades", "cx", 6.00, 600, groups.filter(f=>f.id === 2)[0]));
products.push(new Product(5, "Caixa caneta bic preta 6 unidades", "cx", 6.00, 120, groups.filter(f=>f.id === 2)[0]));
products.push(new Product(6, "Tesoura papel", "und", 9.75, 50, groups.filter(f=>f.id === 2)[0]));

products.push(new Product(7, "Lego carro", "und", 55.00, 45, groups.filter(f=>f.id === 3)[0]));
products.push(new Product(7, "Lego castelo", "und", 88.00, 30, groups.filter(f=>f.id === 3)[0]));
products.push(new Product(7, "Joystick PC", "und", 35.00, 65, groups.filter(f=>f.id === 3)[0]));



// toda requisicao tem 3 parametros
// request: dados do pedido
// response: dados da resposta
// next: proximo item na pilha
server.get("/products", (request, response, next) => {
    let items = products;
    if (request.query.skip) {
        const skip = parseInt(request.query.skip);
        items = items.slice(skip);
    }
    if (request.query.take) {
        const take = parseInt(request.query.take);
        items = items.slice(0, take);
    }
    // ja vai ser retornado no formato JSON e com staus code correto 200
    response.json(items);
    // passar para a proxima callback
    return next();
});

server.get("/products/:id", (request, response, next) => {
    const id = parseInt(request.params.id);
    // uso igual com === porque comparo o conteudo e tipo de dado
    const items = products.filter(exp => exp.id === id);
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

server.get("/products/group/:id", (request, response, next) => {
    const idGroup = parseInt(request.params.id);
    let items = products.filter(f => f.group.id === idGroup);
    response.statusCode = 200;
    response.json(items);
    return next();
});


server.get("/groups/:id/report", (request, response, next) => {
    const idGroup = parseInt(request.params.id);
    const count = products.filter(f => f.group.id === idGroup).length;
    const sumBalance = products.filter(f => f.group.id === idGroup).map(s => s.balance * s.price).reduce((a,b) => a + b, 0);
    const maxBalance = products.filter(f => f.group.id === idGroup).map(s => s.balance * s.price).reduce((a, b) => a > b ? a : b);
    const minBalance = products.filter(f => f.group.id === idGroup).map(s => s.balance * s.price).reduce((a, b) => a > b ? b : a);
    const avgBalance = parseFloat((count === 0 ? 0 : sumBalance / count).toFixed(2));
    response.statusCode = 200;
    response.json({"sum": sumBalance, "max": maxBalance, "min": minBalance, "avg": avgBalance, "count": count});
    return next();
});


server.listen(3001, () => {
    console.log("Product API is runninn on http://localhost:3001");
});


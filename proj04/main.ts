// tudo que estiver dentro do pacote restify irei acessar como sendo o objeto restify 
import * as restify from 'restify';
// importando a classe produto
import { Product } from './product';
import { Group } from './group';
import { Util } from './util';

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
products.push(new Product(8, "Lego castelo", "und", 88.00, 30, groups.filter(f=>f.id === 3)[0]));
products.push(new Product(9, "Joystick PC", "und", 35.00, 65, groups.filter(f=>f.id === 3)[0]));



// toda requisicao tem 3 parametros
// request: dados do pedido
// response: dados da resposta
// next: proximo item na pilha
// temos no request um objeto especial chamado query que so ficara disponivel se eu configurar o node para o queryParser
// opcoes de filtro
// /products
// /products?group=x onde x representa o codigo do grupo
// /products?skip=n onde n representa a quantidade de elementos que irei saltar
// /products?take=n onde n representa a quantidade de elementos que irei retornar
// /products?skip=n&take=m salto n elementos e pego os m primeiros
// slice(x, y) ele salta x elementos e pega y elementos

// quando informar o parametro na rota com : entao voce o ler usando params
// quando os campos forem opcionais, usa-se query

server.get("/products", (request, response, next) => {
    let items = products;
    if (request.query.group) {
        const group = parseInt(request.query.group);
        items = items.filter(w => w.group.id === group);
    }
    if (request.query.name) {
        const name = request.query.name;
        items = items.filter(w => w.group.name.toLocaleLowerCase().includes(name) || w.name.toLocaleLowerCase().includes(name) );
    }
    // util está declarado em Util.ts e contem um metodo estático (class no delphi)
    items = Util.pagination(items, request.query.skip, request.query.take);
    // ja vai ser retornado no formato JSON e com staus code correto 200
    response.json(items);
    // passar para a proxima callback
    return next();
});

// exemplo de map para retornar apenas os nomes
server.get("/products/names", (request, response, next) => {
    /*
    let names = Array<string>();
    products.forEach(p => {
        names.push(p.name);
    });
    */
    const names = products.map(m => m.name);
    response.json(names);
    return next();
});

// usando map para pegar o nome dos grupos
server.get("/products/groups", (request, response, next) => {
    const groups = products.map(m => m.group.name);
    let names = Array<string>();
    groups.forEach(g => {
        if (names.indexOf(g) < 0) {
            names.push(g);
        }
    });    
    response.json(names);
    return next();
});

server.get("/groups/report", (request, response, next) => {
    let filter = groups;
    if (request.query.group) {
        const id = parseInt(request.query.group);
        filter = filter.filter(f => f.id === id);
    }
    let reports = Array<any>();
    filter.forEach(g => {
        const report = Product.report(g.id, products);
        const json = { group: g, summary: report };
        reports.push(json);
    });        
    response.statusCode = 200;
    response.json(reports);
    return next();
});

server.listen(3001, () => {
    console.log("Product API is runninn on http://localhost:3001");
});


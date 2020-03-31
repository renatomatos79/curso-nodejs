import * as restify from 'restify'
import { ProductService } from "../service/productService";
import { Router } from "../common/router";
import { ProductModel } from '../schemas/product.model';
import { Product } from '../model/product';
import { ErrorCode } from '../model/errorcode.model';
import { HttpStatusCode } from '../enums/HttpStatusCode.enum';
// import { authorize } from '../security/authorize.handler';

class ProductController extends Router {

    constructor(protected productService: ProductService){ 
        super();
    }
    
    create = (request, response, next) => {        
        var data = request.body as unknown as Product;        
        this.productService
            .create(data)
            .then(product => {
                response.status(HttpStatusCode.Created);
                response.json(product);
                next();
            })
            .catch(error => {
                const errorCode = error as ErrorCode;
                response.status(errorCode.code); // campo status da api cliente
                response.json(errorCode); // corpo da mensagem de retorno
            });
    }

    update = (request, response, next) => {        
        var data = new Product();
        data.id = request.params.id;
        data.name = request.body.name;
        this.productService
            .update(data)
            .then(product => {
                response.status(200);
                response.json(product);
                next();
            })
            .catch(error => {
                response.status(500);
                response.send(error);
            });
    }

    get = (request, response, next) => {        
        this.productService
            .find(request.params.id)
            .then(product => {
                response.status(product != null ? HttpStatusCode.OK : HttpStatusCode.NotFound);
                response.json(product);
                next();
            })
            .catch(error => {
                const errorCode = error as ErrorCode;
                response.status(errorCode.code); // campo status da api cliente
                response.json(errorCode); // corpo da mensagem de retorno
            });
    }

    // applyRoutes é quem associa a combinação [URL + Verbo (get, post, put, patch, delete)] ao método
    // aqui tambem digo se ha restricao de acesso ao metodo atraves de uma ROLE
    applyRoutes(app: restify.Server) {
        //app.get("/products", [authorize('admin'), this.products]);
        
        app.post("/products", this.create);
        app.put("/products/:id", this.update);
        app.get("/products/:id", this.get);        
        
        // examplos de como usar autenticacao e autorizacao
        //app.get("/products/:id", [authorize('operator'), this.products]);
        //app.get("/products/:id/price", [authorize('operator'), this.price]);
        //app.get("/products/:id/name", this.getName);
    }

}

export { ProductController }
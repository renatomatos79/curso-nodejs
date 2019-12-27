import * as restify from 'restify'
import { ProductService } from "../service/productService";
import { Util } from "../common/util";
import { Router } from "../common/router";

class ProductController extends Router {

    constructor(protected productService: ProductService){ 
        super();
    }
    
    products = (request, response, next) => {        
        let items = this.productService.products();
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
    }

    applyRoutes(app: restify.Server) {
        app.get("products", this.products);
    }

}

export { ProductController }
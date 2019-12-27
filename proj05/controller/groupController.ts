import * as restify from 'restify'
import { Product } from "../model/product";
import { GroupService } from "../service/groupService";
import { ProductService } from "../service/productService";
import { Router } from "../common/router";

class GroupController extends Router {
    
    constructor(protected productService: ProductService, protected groupService: GroupService){
        super();
    }

    report = (request, response, next) => {
        const products = this.productService.products();
        let filter = this.groupService.groups();
        let reports = Array<any>();
        if (request.query.group) {
            const id = parseInt(request.query.group);
            filter = filter.filter(f => f.id === id);
        }        
        filter.forEach(g => {
            const report = Product.report(g.id, products);
            const json = { group: g, summary: report };
            reports.push(json);
        });        
        response.statusCode = 200;
        response.json(reports);
        return next();
    };

    applyRoutes(app: restify.Server) {
        app.get("groups", this.report);
    }

}

export { GroupController }


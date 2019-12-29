import * as restify from 'restify'
import { settings } from '../model/settings';
import { Router } from './router';

class AppServer {

    server: restify.Server;

    constructor(){}

    bootstrap(routers: Router[] = []): Promise<restify.Server> {
        return new Promise((resolver, reject) => {
            this.server = restify.createServer({
                name: settings.name,
                version: settings.version
            });

            // habilitar uso de parametros
            this.server.use(restify.plugins.queryParser());
            // habilitar conversao
            this.server.use(restify.plugins.bodyParser());

            //routes
            for (let router of routers) {
                router.applyRoutes(this.server);
            }

            this.server.listen(settings.port, () => {
                console.log("Product API is runninn on http://localhost");
                resolver(this.server);
            });
            
        });
    }

}

export { AppServer }


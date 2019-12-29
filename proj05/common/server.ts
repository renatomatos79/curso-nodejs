import * as restify from 'restify'
import { settings } from '../model/settings';
import { Router } from './router';
import { tokenParser } from '../security/token.parser';

class AppServer {

    server: restify.Server;

    constructor(){}

    bootstrap(routers: Router[] = []): Promise<restify.Server> {
        return new Promise((resolver, reject) => {
            this.server = restify.createServer({
                name: settings.name,
                version: settings.version
            });

            this.server.use(restify.plugins.queryParser());
            this.server.use(restify.plugins.bodyParser());
            this.server.use(tokenParser);

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


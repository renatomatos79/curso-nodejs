import * as restify from 'restify'
import { Settings } from '../model/settings';
import { Router } from './router';

class AppServer {

    server: restify.Server;

    constructor(public settings: Settings){}

    bootstrap(routers: Router[] = []): Promise<restify.Server> {
        return new Promise((resolver, reject) => {
            console.log("settings: ", this.settings);
            this.server = restify.createServer({
                name: this.settings.name,
                version: this.settings.version
            });

            // habilitar uso de parametros
            this.server.use(restify.plugins.queryParser());
            // habilitar conversao
            this.server.use(restify.plugins.bodyParser());

            //routes
            for (let router of routers) {
                router.applyRoutes(this.server);
            }

            this.server.listen(this.settings.port, () => {
                console.log("Product API is runninn on http://localhost");
                resolver(this.server);
            });
            
        });
    }

}

export { AppServer }


import * as restify from 'restify'
import { settings } from '../model/settings';
import { Router } from './router';
import { tokenParser } from '../security/token.parser';
import * as mongoose from 'mongoose';

class AppServer {

    server: restify.Server;

    constructor(){}

    initDB() {
        console.log("connecting... => ", settings);
        const conn = mongoose.connect(settings.db.url, { useNewUrlParser: true, useUnifiedTopology: true });
        return conn;
    }

    initRoutes(routers: Router[] = []): Promise<restify.Server> {
        return new Promise((resolver, reject) => {
            this.server = restify.createServer({
                name: settings.name,
                version: settings.version
            });

            this.server.use(restify.plugins.queryParser());
            this.server.use(restify.plugins.bodyParser());
            // agora estou obrigando a leitura do token em todas as requisicoes
            this.server.use(tokenParser);

            //routes
            for (let router of routers) {
                router.applyRoutes(this.server);
            }

            this.server.listen(settings.port, () => {
                console.log(`Product API ${settings.version} is runninn on http://localhost/${settings.port}`);
                resolver(this.server);
            });
            
        });
    }

    bootstrap(routers: Router[] = []): Promise<restify.Server> {
        const result = this.initDB().then(() => this.initRoutes(routers).then((server) => server));
        console.log("bootstrap => ", result);
        return result;
    }

}

export { AppServer }


import * as restify from 'restify'
import { settings } from '../model/settings';
import { Router } from './router';
import { tokenParser } from '../security/token.parser';
import * as corsMiddleware from 'restify-cors-middleware';
import * as mongoose from 'mongoose';

class AppServer {

    server: restify.Server;

    constructor(){}

    initDB() {
        const connection = mongoose.connect(settings.db.url, { useNewUrlParser: true, useUnifiedTopology: true });
        const db = mongoose.connection;
        db.on("error", console.error.bind(console, 'MongoDB connection error'));
        return connection;
    }

    initRoutes(routers: Router[] = []): Promise<restify.Server> {
        return new Promise((resolver, reject) => {
            // definindo CORS
            const corsOptions: corsMiddleware.Options = {
                preflightMaxAge: 10,
                origins: ['*'],
                allowHeaders: ['authorization'],                
                exposeHeaders: ['x-custom-header']
            };
            const cors: corsMiddleware.CorsMiddleware = corsMiddleware(corsOptions);
            
            // criando o server
            this.server = restify.createServer({
                name: settings.name,
                version: settings.version
            });

            // inicializando o server
            this.server.use(restify.plugins.queryParser());
            this.server.use(restify.plugins.bodyParser());
            this.server.use(tokenParser);
            this.server.pre(restify.pre.dedupeSlashes());
            this.server.pre(cors.preflight);
            this.server.use(cors.actual);

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
        // chama o metodo initDB que é uma Promise
        // se o metodo funcionar, chama o metodo initRoutes
        return this.initDB().then(()=>this.initRoutes(routers).then((serverInstance) => serverInstance));
    }

}

export { AppServer }


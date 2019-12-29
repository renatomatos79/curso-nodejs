import * as restify from 'restify'
import { NotFoundError  } from 'restify-errors';
import { Router } from "../common/router";
import *  as jwt from 'jsonwebtoken';
import { settings } from '../model/settings';
import { UserService } from '../service/userService';
import { authorize } from '../security/authorize.handler';

class UserController extends Router {

    constructor(protected userService: UserService){ 
        super();
    }
    
    authenticate = (request, response, next) => {        
        console.log("authenticate: ", request.body);
        const email = request.body.email;
        const password = request.body.password;
        const userService =  new UserService();
        const user = userService.users().find(f => f.email === email && f.password === password);
        if (user === null || user === undefined) {
            return next(new NotFoundError());
        } else {
            const token = jwt.sign({sub: user.email, iss: 'curso-nodejs'}, settings.security.jwtSecret);
            response.json({name: user.name, accessToken: token});  
        }
    }

    getAll = (request, response, next) => {        
        const userService =  new UserService();
        const users = userService.users();
        response.json(users);  
    }

    getAll_V2 = (request, response, next) => {        
        const userService =  new UserService();
        const users = userService.users_v2();
        response.json(users);  
    }

    applyRoutes(app: restify.Server) {
        app.post("users/authenticate", this.authenticate);
        app.get({path: "/users", version: "1.0.0"  }, [authorize('operator', 'admin'), this.getAll]);
        app.get({path: "/users", version: "2.0.0" }, [authorize('operator', 'admin'), this.getAll_V2]);
    }

}

export { UserController }
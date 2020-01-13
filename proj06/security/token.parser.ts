import * as restify from "restify";
// instalar um pacote chamado jsonwebtoken usando npm i jsonwebtoken --save
import * as jwt from "jsonwebtoken";
import { settings } from "../model/settings";
import { UserService } from "../service/userService";
import { User } from "../model/user";

// verifica se há um token dentro da requisição do usuário
// se existir eu verifico se está valido e jogo o objeto User associado ao token dentro do campo "authenticated" da requisição
// senao eu deixo a requisição passar, pois talvez a requisicao nao exija token
// e se ela exigir entao o metodo authorize.handler.ts ira verificar se a ROLE exigida para o método há no TOKEN
export const tokenParser: restify.RequestHandler = (req, resp, next) => {
    const token = extractToken(req);
    console.log("extract token: ", token);
    if (token) {
        // agora verifico se o token é válido calculado o hash dele.. para isso preciso saber o saltkey que neste caso
        // estou usando um para todo mundo...
        // uma vez que isso ocorra bem, o token será decriptado e os campos dele serão devolvidos ao método
        // applyToken dentro do parametro "decoded"
        jwt.verify(token, settings.security.jwtSecret, applyToken(req, next));
    } else {
        next();
    }
};

function extractToken(req: restify.Request) {
    const authorization = req.header("authorization");
    if (authorization) {
        const parts: string[] = authorization.split(' ');
        if (parts.length == 2 && parts[0] === 'Bearer') {
            return parts[1];
        }
    }
    return null;
}

function applyToken(req: restify.Request, next: restify.Next): (error, decoded) => void {
    return (error, decoded) => {
        if (decoded) {
            console.log("decoded: ", decoded);
            const userService = new UserService();
            // => representa uma arrow function -> função de seta ou seja um evento de forma simplificada
            // se nao usar arrow function tenho que criar um metodo para receber o resultado do then
            // exemplo:
            // findByEmailResult(user: User) : void { ,.,.... }
            // e então trocar 
            // userService.findByEmail(decoded.sub).then(findByEmailResult)
            userService.findByEmail(decoded.sub).then(user => {
                console.log("decoded findByEmail: ", user);
                // peguei o usuário e o adicionei ao objeto request dentro do campo authenticated
                req.authenticated = user;
                next();
            }).catch(error => next(error));
        } else {
            next();
        }
    }
}
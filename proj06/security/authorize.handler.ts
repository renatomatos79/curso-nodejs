import *  as restify from "restify";
import { ForbiddenError } from "restify-errors";

// uma vez que o token foi validado eu preciso se o token possui pelo menos uma das roles exigida
// ... representa o uso de array como se fossem parametros do tipo string separados por ","
// authorize("operator", "admin")
// se eu não usar o ... entao devo informar assim
// authorize(["operator", "admin"])

export const authorize: (...roles: string[]) => restify.RequestHandler = (...roles) => {
    return (req, resp, next) => {
        // authenticated foi preenchido dentro do metodo token.parser
        if (req.authenticated !== undefined && req.authenticated !== null && req.authenticated.hasAnyRole(...roles)) {
            next();
        } else {
            // acesso negado
            next(new ForbiddenError());
        }
    }
}
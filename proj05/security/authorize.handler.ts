import *  as restify from "restify";
import { ForbiddenError } from "restify-errors";

export const authorize: (...roles: string[]) => restify.RequestHandler = (...roles) => {
    return (req, resp, next) => {
        if (req.authenticated !== undefined && req.authenticated !== null && req.authenticated.hasAnyRole(...roles)) {
            next(); 
        } else {
            next(new ForbiddenError());
        }
    }
}
import * as restify from "restify";
import * as jwt from "jsonwebtoken";
import { settings } from "../model/settings";
import { UserService } from "../service/userService";

export const tokenParser: restify.RequestHandler = (req, resp, next) => {
    const token = extractToken(req);
    console.log("extract token: ", token);
    if (token) {
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

function applyToken(req: restify.Request, next): (error, decoded) => void {
    return (error, decoded) => {
        if (decoded) {
            console.log("decoded: ", decoded);
            const userService = new UserService();
            userService.findByEmail(decoded.sub).then(user => {
                console.log("decoded findByEmail: ", user);
                req.authenticated = user;
                next();
            }).catch(error => next(error));
        } else {
            next();
        }
    }
}
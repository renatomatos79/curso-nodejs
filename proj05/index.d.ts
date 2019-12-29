import { User } from './model/user';

declare module 'restify' {
    export interface Request {
        authenticated: User;
    }
}
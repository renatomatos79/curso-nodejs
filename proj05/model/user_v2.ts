import { User } from "./user"

class User_V2 extends User {
    constructor(email: string, name: string, password: string, roles: string[], public gender: string) {
        super(email, name, password, roles);
     }
}

export { User_V2 }
import { User } from "../model/user"
import { User_V2 } from "../model/user_v2";

class UserService {
    constructor(){}

    users(): Array<User> { 
        const temp = new Array<User>();
        temp.push(new User("renato.matos79@gmail.com", "renato matos", "rcm@1234", ['admin']));
        temp.push(new User("reneuece@ig.com", "rene fernandes", "rf@1234", ['operator']));
        return temp;
    }

    users_v2(): Array<User_V2> { 
        const temp = new Array<User_V2>();
        temp.push(new User_V2("renato.matos79@gmail.com", "renato matos", "rcm@1234", ['admin'], "M"));
        temp.push(new User_V2("reneuece@ig.com", "rene fernandes", "rf@1234", ['operator'], "M"));
        return temp;
    }

    findByEmail(email: string): Promise<User>{
        return new Promise((resolver, reject) => {
            const user = this.users().filter(f => f.email === email);
            if (user !== null && user !== undefined && user.length > 0) {
                resolver(user[0]);
            } else {
                reject(new Error("User not found!"));
            }
        });
    }
}

export {UserService}
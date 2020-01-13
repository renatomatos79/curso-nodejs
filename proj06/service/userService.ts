import { User } from "../model/user"
import { User_V2 } from "../model/user_v2";

class UserService {
    constructor(){}

    // supondo que isso é o meu banco de dados
    users(): Array<User> { 
        const temp = new Array<User>();
        temp.push(new User("renato.matos79@gmail.com", "renato matos", "rcm@1234", ['admin', 'system']));
        temp.push(new User("reneuece@ig.com", "rene fernandes", "rf@1234", ['operator', 'report']));
        return temp;
    }

    users_v2(): Array<User_V2> { 
        const temp = new Array<User_V2>();
        temp.push(new User_V2("renato.matos79@gmail.com", "renato matos", "rcm@1234", ['admin'], "M"));
        temp.push(new User_V2("reneuece@ig.com", "rene fernandes", "rf@1234", ['operator'], "M"));
        return temp;
    }

    // uma forma padrão de se retornar dados em funções... quando da certo chama-se o evento Then e quando dá erro chama-se Catch
    findByEmail(email: string): Promise<User>{
        // resolver representa o then
        // reject representa o catch
        return new Promise((resolver, reject) => {
            const user = this.users().filter(f => f.email === email);
            if (user !== null && user !== undefined && user.length > 0) {
                resolver(user[0]);
            } else {
                reject(new Error("User not found!"));
            }
        });
    }

    // busca sincrona
    findByEmailSync(email: string): User {
        const user = this.users().filter(f => f.email === email);
        if (user !== null && user !== undefined && user.length > 0) {
            return user[0];
        }
        return null;
    }
}

export {UserService}
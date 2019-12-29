class UserService {
    constructor(){}
    users(): Array<User> { 
        return [
            {email:"renato.matos79@gmail.com", name:"renato matos", password:"rcm@1234"},
            {email:"reneuece@ig.com", name:"rene fernandes", password:"rf@1234"},
        ]
    }
}

export {UserService}
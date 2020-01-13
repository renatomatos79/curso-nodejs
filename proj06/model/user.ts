class User {
    constructor(public email: string, public name: string, public password: string, public roles: string[]){ }

    // verifica se o objeto usuário, no campo roles, existe alguma das roles informada por parametro
    hasAnyRole(...profiles: string[]) : boolean {
        /*
        let result = false;
        this.roles.forEach(r => {
            if (profiles.indexOf(r) !== -1) {
                result = true;
            }
        });
        return result;
        */
        
        // some = algum
        return this.roles.some(r => profiles.indexOf(r) !== -1);
    }
}

export { User }
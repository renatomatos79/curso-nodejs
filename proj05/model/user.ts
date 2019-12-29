class User {
    constructor(public email: string, public name: string, public password: string, public roles: string[]){ }

    hasAnyRole(...profiles: string[]) : boolean {
        return this.roles.some(r => profiles.indexOf(r) !== -1);
    }
}

export { User }
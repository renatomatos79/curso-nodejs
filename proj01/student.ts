class Student {
    fullName: string;
	// o escopo public transforma o parametro em propriedade
    constructor(public firstName: string, public middleInitial: string, public lastName: string) {
        this.fullName = firstName + " " + middleInitial + " " + lastName;
    }
}

export { Student }
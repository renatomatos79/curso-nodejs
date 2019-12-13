class Student {
    fullName: string;
	// o escopo public transforma o parametro em propriedade
    constructor(public firstName: string, public middleInitial: string, public lastName: string) {
        this.fullName = firstName + " " + middleInitial + " " + lastName;
    }
}

interface Person {
    firstName: string;
    lastName: string;
}

function greeter(person: Person) {
    return "Hello, " + person.firstName + " " + person.lastName;
}

let user = new Student("Jane", "M.", "User");

console.log("O primeiro nome e " + user.firstName);

let message = greeter(user);


console.log(message);

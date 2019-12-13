import { Student } from './student'
import { Person } from './person'

function greeter(person: Person) {
    return "Hello, " + person.firstName + " " + person.lastName;
}

let user = new Student("Jane", "M.", "User");

console.log("O primeiro nome e " + user.firstName);

let message = greeter(user);


console.log(message);

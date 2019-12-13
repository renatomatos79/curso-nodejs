var Student = /** @class */ (function () {
    // o escopo public transforma o parametro em propriedade
    function Student(firstName, middleInitial, lastName) {
        this.firstName = firstName;
        this.middleInitial = middleInitial;
        this.lastName = lastName;
        this.fullName = firstName + " " + middleInitial + " " + lastName;
    }
    return Student;
}());
function greeter(person) {
    return "Hello, " + person.firstName + " " + person.lastName;
}
var user = new Student("Jane", "M.", "User");
console.log("O primeiro nome e " + user.firstName);
var message = greeter(user);
console.log(message);

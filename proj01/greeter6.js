"use strict";
exports.__esModule = true;
var student_1 = require("./student");
function greeter(person) {
    return "Hello, " + person.firstName + " " + person.lastName;
}
var user = new student_1.Student("Jane", "M.", "User");
console.log("O primeiro nome e " + user.firstName);
var message = greeter(user);
console.log(message);

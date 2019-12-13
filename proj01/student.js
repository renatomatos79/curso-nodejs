"use strict";
exports.__esModule = true;
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
exports.Student = Student;

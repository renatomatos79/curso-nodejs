// na linha de comando tente executar 
// tsc greeter2.ts 
// vera de forma clara o erro de conversao, coisa que nao ocorre com javascript

function greeter(person: string) {
    return "Hello, " + person;
}

let user = [0, 1, 2];
let output = greeter(user);
console.log(output);

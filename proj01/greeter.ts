function greeter(name) {
    return "Ola, " + name;
}

// cria uma variavel de escopo local
let user = "Jane User";
let output = greeter(user);
console.log(output);

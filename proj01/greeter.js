function greeter(name) {
    return "Ola, " + name;
}
// cria uma variavel de escopo local
var user = "Jane User";
var output = greeter(user);
console.log(output);

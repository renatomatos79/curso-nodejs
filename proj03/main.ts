import { ValidaCPF } from './util';
import * as yargs from 'yargs';

// definindo os parametros de entrada
const argv = yargs.options({
    cpf: { type: 'string', demandOption: true, alias: 'c' },
	nome: { type: 'string', demandOption: true, alias: 'n' }
}).argv;

const cpf = argv.cpf;
const nome = argv.nome;
const result = ValidaCPF(cpf);
console.log(`Usuário ${nome} CPF: ${cpf}: `,  result);

// node /main.js --inspect-brk
// chrome://inspect

// para instalar uma versão especifica 
// npm i cpf-check@2.9.9 --save
// npm i cpf-check@2.9.9 --save-dev  (este pacote serve apenas para o ambiente do desenvolvedor)
import { IsCPF } from './util';
import * as yargs from 'yargs';

const argv = yargs.options({
    cpf: { type: 'string', demandOption: true, alias: 'c' }
  }).argv;

const cpf = argv.cpf;
const result = IsCPF(cpf);
console.log(`IsCPF ${cpf}: `,  result);

// node /main.js --inspect-brk
// chrome://inspect
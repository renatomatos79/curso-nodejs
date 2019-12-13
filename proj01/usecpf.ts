import CPF, { validate } from 'cpf-check';
 
const algumCpf = '676.754.677-10';
 
let isValid = CPF.validate(algumCpf);

console.log(algumCpf, ": ",  isValid);


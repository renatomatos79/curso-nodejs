import CPF from 'cpf-check';

const ValidaCPF = (paramCPF) => {
    return CPF.validate(paramCPF);
}

export { ValidaCPF }
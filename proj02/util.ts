import CPF from 'cpf-check';

const IsCPF = (cpf) => {
    return CPF.validate(cpf);
}

export { IsCPF }
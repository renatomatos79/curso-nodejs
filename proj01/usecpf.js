"use strict";
exports.__esModule = true;
var cpf_check_1 = require("cpf-check");
var algumCpf = '676.754.677-10';
var isValid = cpf_check_1["default"].validate(algumCpf);
console.log(algumCpf, ": ", isValid);

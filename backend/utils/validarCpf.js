function validarCpf(cpf) {
  cpf = cpf.replace(/[^\d]/g, ""); // Remove caracteres não numéricos

  if (cpf.length !== 11) return false; // CPF deve ter 11 dígitos
  if (/^(\d)\1+$/.test(cpf)) return false; // Rejeita CPFs com todos os dígitos iguais

  let soma = 0;
  for (let i = 0; i < 9; i++) soma += parseInt(cpf[i]) * (10 - i);
  let resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf[9])) return false;

  soma = 0;
  for (let i = 0; i < 10; i++) soma += parseInt(cpf[i]) * (11 - i);
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf[10])) return false;

  return true;
}

module.exports = validarCpf;

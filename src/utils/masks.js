export const precoMask = (value) => {
  // Remove tudo que não for número ou vírgula
  
  if(value == 'R$') return ''

  value = value.replace(/[^\d.]/g, '');

  // Se começar com vírgula, remove
  if (value.startsWith('.')) {
    value = value.slice(1);
  }

  // Garante que só exista uma vírgula, e apenas após pelo menos um número
  const parts = value.split('.');
  const inteira = parts[0];
  let decimal = parts[1] || '';

  // Se não há parte inteira, não permite adicionar vírgula
  if (inteira === '') {
    return 'R$ ';
  }

  // Limita a parte decimal a 2 dígitos
  if (decimal.length > 2) {
    decimal = decimal.substring(0, 2);
  }

  let resultado = inteira;
  if (value.includes('.') && decimal !== '') {
    resultado += '.' + decimal;
  } else if (value.includes('.')) {
    resultado += '.';
  }

  return `R$ ${resultado}`;
}

export const numberMask = (value) => {
  return value.replace(/[^\d]/g, '')
}
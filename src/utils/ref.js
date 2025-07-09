const ALFABETO = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_";
export const REF = '4UyA78SoKsgwFMVzYc13ZIOj_LarCmDNX6h02uTBipeQlbtEkGv5q9nRHPfJdWx'

export function ref1(texto, param) {
  return texto.split('').map(c => {
    const idx = ALFABETO.indexOf(c);
    return idx !== -1 ? param[idx] : c;
  }).join('');
}

export function ref2(texto, param) {
  return texto.split('').map(c => {
    const idx = param.indexOf(c);
    return idx !== -1 ? ALFABETO[idx] : c;
  }).join('');
}

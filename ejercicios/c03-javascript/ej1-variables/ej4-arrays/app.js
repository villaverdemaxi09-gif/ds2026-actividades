const numeros = [5, 8, 3, 10, 2, 7, 6, 9];
let suma = 0;
let mayor = numeros[0];
let menor = numeros[0];
for (let i = 0; i < numeros.length; i++) {
    suma += numeros[i];

    if (numeros[i] > mayor) {
        mayor = numeros[i];
    }

    if (numeros[i] < menor) {
        menor = numeros[i];
    }
}
let promedio = suma / numeros.length;
console.log("Suma:", suma);
console.log("Promedio:", promedio);
console.log("Mayor:", mayor);
console.log("Menor:", menor);
function generarAsteriscos(n) {
    let resultado = "";

    for (let i = 0; i < n; i++) {
        resultado += "*";
    }

    return resultado;
}
console.log(generarAsteriscos(5));
console.log(generarAsteriscos(10));

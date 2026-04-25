"use strict";
const input = document.getElementById("altura");
const boton = document.getElementById("generar");
const resultado = document.getElementById("resultado");
function generarAsteriscos(n) {
    let arbol = "";
    for (let i = 1; i <= n; i++) {
        arbol += "*".repeat(i) + "\n";
    }
    return arbol;
}
boton.addEventListener("click", function () {
    let altura = Number(input.value);
    if (!altura || altura < 1) {
        resultado.textContent = "Por favor ingresá un número válido mayor a 0";
        return;
    }
    resultado.textContent = generarAsteriscos(altura);
});

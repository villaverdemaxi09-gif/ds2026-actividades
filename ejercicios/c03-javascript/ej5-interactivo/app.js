const input = document.getElementById("altura");
const boton = document.getElementById("generar");
const resultado = document.getElementById("resultado");

boton.addEventListener("click", function () {

    let altura = Number(input.value);

    if (!altura || altura < 1) {
        resultado.textContent = "Por favor ingresá un número válido mayor a 0";
        return;
    }

    let arbol = "";

    for (let i = 1; i <= altura; i++) {
        arbol += "*".repeat(i) + "\n";
    }

    resultado.textContent = arbol;
});

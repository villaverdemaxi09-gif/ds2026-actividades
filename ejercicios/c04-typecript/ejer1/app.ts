const input = document.getElementById("altura") as HTMLInputElement;
const boton = document.getElementById("generar") as HTMLButtonElement;
const resultado = document.getElementById("resultado") as HTMLElement;

function generarAsteriscos(n: string): string {
    let arbol: string = "";

    for (let i: number = 1; i <= n; i++) {
        arbol += "*".repeat(i) + "\n";
    }

    return arbol;
}

boton.addEventListener("click", function () {

    let altura: number = Number(input.value);

    if (!altura || altura < 1) {
        resultado.textContent = "Por favor ingresá un número válido mayor a 0";
        return;
    }

    resultado.textContent = generarAsteriscos(altura);
});

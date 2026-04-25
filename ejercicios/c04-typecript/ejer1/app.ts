const input = document.getElementById("altura") as HTMLInputElement;
const boton = document.getElementById("generar") as HTMLButtonElement;
const resultado = document.getElementById("resultado") as HTMLElement;

// Función tipada correctamente
function generarAsteriscos(n: number): string {
    let arbol: string = "";

    for (let i: number = 1; i <= n; i++) {
        arbol += "*".repeat(i) + "\n";
    }

    return arbol;
}

// Evento del botón
boton.addEventListener("click", () => {
    const altura: number = Number(input.value);

    // Validación correcta
    if (isNaN(altura) || altura < 1) {
        resultado.textContent = "Por favor ingresá un número válido mayor a 0";
        return;
    }

    resultado.textContent = generarAsteriscos(altura);
});

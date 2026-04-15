function calcularPrecioFinal(monto, medioPago) {
    let descuento = 0;

    if (monto < 200) {
        descuento = 0;
    } else if (monto <= 400) {
        if (medioPago === "E") {
            descuento = 0.30;
        } else if (medioPago === "D") {
            descuento = 0.20;
        } else if (medioPago === "C") {
            descuento = 0.10;
        }
    } else {
        descuento = 0.40;
    }

    return monto - (monto * descuento);
}
console.log(`Monto: $150 | Pago: E | Final: $${calcularPrecioFinal(150, "E")}`);
console.log(`Monto: $250 | Pago: E | Final: $${calcularPrecioFinal(250, "E")}`);
console.log(`Monto: $250 | Pago: D | Final: $${calcularPrecioFinal(250, "D")}`);
console.log(`Monto: $250 | Pago: C | Final: $${calcularPrecioFinal(250, "C")}`);
console.log(`Monto: $500 | Pago: C | Final: $${calcularPrecioFinal(500, "C")}`);

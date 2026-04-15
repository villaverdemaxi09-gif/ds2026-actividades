function clasificarNota(nota) {
    if (nota < 4) {
        return "Desaprobado";
    } else if (nota <= 7) {
        return "Aprobado";
    } else {
        return "Promocionado";
    }
}
function diaDeLaSemana(numero) {
    switch (numero) {
        case 1:
            return "Lunes";
        case 2:
            return "Martes";
        case 3:
            return "Miércoles";
        case 4:
            return "Jueves";
        case 5:
            return "Viernes";
        case 6:
            return "Sábado";
        case 7:
            return "Domingo";
        default:
            return "Día inválido";
    }
}
console.log(clasificarNota(3));
console.log(clasificarNota(6));
console.log(clasificarNota(9));

console.log(diaDeLaSemana(1));
console.log(diaDeLaSemana(5));
console.log(diaDeLaSemana(9));

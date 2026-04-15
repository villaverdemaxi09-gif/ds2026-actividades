const input = document.getElementById("producto");
const boton = document.getElementById("agregar");
const lista = document.getElementById("lista");
const contador = document.getElementById("contador");

function actualizarContador() {
    const cantidad = lista.children.length;
    contador.textContent = `${cantidad} productos en la lista`;
}

boton.addEventListener("click", function () {

    let nombre = input.value.trim();

    if (nombre === "") {
        alert("Ingresá un producto válido");
        return;
    }

    let li = document.createElement("li");
    li.textContent = nombre;

    let btnEliminar = document.createElement("button");
    btnEliminar.textContent = "Eliminar";

    btnEliminar.addEventListener("click", function () {
        li.remove();
        actualizarContador();
    });

    li.appendChild(btnEliminar);
    lista.appendChild(li);

    input.value = "";
    actualizarContador();
});

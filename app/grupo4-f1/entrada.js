
let logo = document.getElementById("logo");

logo.addEventListener("mouseover", function() {
    logo.style.transform = "scale(1.2)";
});

logo.addEventListener("mouseout", function() {
    logo.style.transform = "scale(1)";
});


let menuItems = document.querySelectorAll("header nav > ul > li");

menuItems.forEach(function(item) {

    let subMenu = item.querySelector("ul");

    if (subMenu) {

        item.addEventListener("mouseenter", function() {
            subMenu.style.display = "block";
        });

        item.addEventListener("mouseleave", function() {
            subMenu.style.display = "none";
        });

    }

});


let inputs = document.querySelectorAll(
    "#formulario input:not([disabled]):not([type='checkbox']), #formulario select"
);

inputs.forEach(function(input) {

    input.addEventListener("mouseenter", function() {
        input.style.backgroundColor = "pink";
    });

    input.addEventListener("mouseleave", function() {
        if (document.activeElement !== input) {
            input.style.backgroundColor = "";
        }
    });

    input.addEventListener("focus", function() {
        input.style.backgroundColor = "pink";
    });

    input.addEventListener("blur", function() {
        if (!input.matches(":hover")) {
            input.style.backgroundColor = "";
        }
    });

});


let formulario = document.getElementById("formulario");

let tipoEntrada = document.getElementById("tipo-entrada");
let zona = document.getElementById("zona");
let edad = document.getElementById("edad");
let precio = document.getElementById("precio");

let botonCalcular = document.getElementById("calcular-precio");
let botonComprar = document.getElementById("comprar");
let condiciones = document.getElementById("aceptar-condiciones");


function mostrarError(campo, mensaje) {

    let error = document.getElementById("error-" + campo);

    if (error) {
        error.textContent = mensaje;
    }

}


function limpiarErrores() {

    let errores = document.querySelectorAll(".error");

    errores.forEach(function(error) {
        error.textContent = "";
    });

}


function actualizarPrecio() {

    let tipo = tipoEntrada.value;
    let zonaSeleccionada = zona.value;
    let edadTexto = edad.value.trim();
    let edadNumero = Number(edadTexto);

    let precioFinal = 0;

    mostrarError("edad", "");
    mostrarError("precio", "");

    if (edadTexto === "" ||
        !Number.isInteger(edadNumero) ||
        edadNumero <= 0) {

        mostrarError("edad", "Introduce una edad válida.");
        precio.value = "";
        return;
    }

    if (tipo === "infantil" && edadNumero >= 18) {

        mostrarError("edad", "La entrada infantil es para menores de 18 años.");
        precio.value = "";
        return;
    }

    if (tipo === "adulto" && edadNumero < 18) {

        mostrarError("edad", "La entrada de adulto es para mayores de edad.");
        precio.value = "";
        return;
    }

    if (tipo === "adulto") {

        if (zonaSeleccionada === "zona1") {
            precioFinal = 80;
        } else {
            precioFinal = 60;
        }

    } else if (tipo === "infantil") {

        precioFinal = 30;

    }

    precio.value = precioFinal + "€";
}


botonCalcular.addEventListener("click", actualizarPrecio);


tipoEntrada.addEventListener("change", function() {
    precio.value = "";
    mostrarError("precio", "");
});

zona.addEventListener("change", function() {
    precio.value = "";
    mostrarError("precio", "");
});

edad.addEventListener("input", function() {
    precio.value = "";
    mostrarError("edad", "");
    mostrarError("precio", "");
});


botonComprar.disabled = true;

condiciones.addEventListener("change", function() {

    if (condiciones.checked) {
        botonComprar.disabled = false;
        mostrarError("condiciones", "");
    } else {
        botonComprar.disabled = true;
    }

});


function validar(evento) {

    evento.preventDefault();

    limpiarErrores();

    let dni = document.getElementById("dni").value.trim();
    let nombre = document.getElementById("nombre").value.trim();
    let apellidos = document.getElementById("apellidos").value.trim();
    let email = document.getElementById("email").value.trim();

    let edadTexto = edad.value.trim();
    let edadNumero = Number(edadTexto);

    let correcto = true;


    let dniRegex = /^[0-9]{8}[A-Z]$/;

    if (!dniRegex.test(dni)) {

        mostrarError("dni", "El DNI debe tener 8 números y una letra mayúscula.");
        correcto = false;

    }


    if (nombre === "") {

        mostrarError("nombre", "Debes introducir tu nombre.");
        correcto = false;

    }


    if (apellidos === "") {

        mostrarError("apellidos", "Debes introducir tus apellidos.");
        correcto = false;

    }


    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {

        mostrarError("email", "Introduce un correo electrónico válido.");
        correcto = false;

    }


    if (edadTexto === "" ||
        !Number.isInteger(edadNumero) ||
        edadNumero <= 0) {

        mostrarError("edad", "Introduce una edad válida.");
        correcto = false;

    } else {

        if (tipoEntrada.value === "infantil" && edadNumero >= 18) {

            mostrarError("edad", "La entrada infantil es para menores de 18 años.");
            correcto = false;

        }

        if (tipoEntrada.value === "adulto" && edadNumero < 18) {

            mostrarError("edad", "La entrada de adulto es para mayores de edad.");
            correcto = false;

        }

    }


    if (precio.value === "") {

        mostrarError("precio", "Debes calcular el precio de la entrada.");
        correcto = false;

    }


    if (!condiciones.checked) {

        mostrarError("condiciones", "Debes aceptar las condiciones.");
        correcto = false;

    }


    if (correcto) {

        alert("Todos los datos son correctos");

        formulario.submit();

    }

}


formulario.addEventListener("submit", validar);

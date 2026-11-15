
document.addEventListener("DOMContentLoaded", function() {

    let logo = document.getElementById("logo");

    if (logo) {
        logo.addEventListener("mouseover", function() {
            logo.style.transform = "scale(1.05)";
            logo.style.boxShadow = "0 0 10px #E10600";
        });

        logo.addEventListener("mouseout", function() {
            logo.style.transform = "scale(1)";
            logo.style.boxShadow = "none";
        });
    }

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

    let formulario = document.getElementById("formulario");
    let usuario = document.getElementById("usuario");
    let contrasena = document.getElementById("contrasena");
    let imagenOjo = document.getElementById("imagen");
    let botonOjo = document.getElementById("mostrar-contrasena");

    let errorUsuario = document.getElementById("error-usuario");
    let errorContrasena = document.getElementById("error-contrasena");
    let inputImagen = document.getElementById("inputimagen");

    botonOjo.addEventListener("click", function() {

        if (contrasena.type === "password") {

            contrasena.type = "text";
            imagenOjo.src = "images/ojo/novercontra.jpg";
            imagenOjo.alt = "Ocultar contraseña";
            botonOjo.setAttribute("aria-label", "Ocultar contraseña");
            botonOjo.setAttribute("aria-pressed", "true");

        } else {

            contrasena.type = "password";
            imagenOjo.src = "images/ojo/vercontra.jpg";
            imagenOjo.alt = "Mostrar contraseña";
            botonOjo.setAttribute("aria-label", "Mostrar contraseña");
            botonOjo.setAttribute("aria-pressed", "false");

        }

    });

    usuario.addEventListener("input", function() {
        errorUsuario.textContent = "";
        usuario.classList.remove("campo-error");
    });

    contrasena.addEventListener("input", function() {
        errorContrasena.textContent = "";
        inputImagen.classList.remove("campo-error");
    });

    formulario.addEventListener("submit", validar);

    function validar(evento) {

        evento.preventDefault();

        let valorUsuario = usuario.value.trim();
        let valorContrasena = contrasena.value;

        let correcto = true;

        errorUsuario.textContent = "";
        errorContrasena.textContent = "";

        usuario.classList.remove("campo-error");
        inputImagen.classList.remove("campo-error");

        if (valorUsuario === "") {

            errorUsuario.textContent = "Debes introducir tu usuario.";
            usuario.classList.add("campo-error");
            correcto = false;

        }

        if (valorContrasena.trim() === "") {

            errorContrasena.textContent = "Debes introducir tu contraseña.";
            inputImagen.classList.add("campo-error");
            correcto = false;

        }

        if (correcto === false) {
            return;
        }

        if (valorUsuario === "alumno" && valorContrasena === "sanluis") {

            alert("Acceso concedido. Credenciales correctas.");

            window.location.href = "tratarDatos.php";

        } else {

            errorContrasena.textContent = "Usuario o contraseña incorrectos.";
            inputImagen.classList.add("campo-error");

        }

    }

});

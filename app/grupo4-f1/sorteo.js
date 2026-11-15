
document.addEventListener("DOMContentLoaded", function() {

    let logo = document.getElementById("logo");

    if (logo) {
        logo.addEventListener("mouseover", function() {
            logo.style.transform = "scale(1.2)";
        });

        logo.addEventListener("mouseout", function() {
            logo.style.transform = "scale(1)";
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

    let fotos = [
        "./images/sorteo/charles-leclerc.png",
        "./images/sorteo/fernando-alonso.png",
        "./images/sorteo/george-russell.png",
        "./images/sorteo/lewis-hamilton.png",
        "./images/sorteo/max-verstappen.png",
        "./images/sorteo/carlos-sainz.png",
        "./images/sorteo/esteban-ocon.png",
        "./images/sorteo/lando-norris.png",
        "./images/sorteo/oscar-piastri.png",
        "./images/sorteo/yuki-tsunoda.png"
    ];

    let titulos = [
        "Charles Leclerc",
        "Fernando Alonso",
        "George Russell",
        "Lewis Hamilton",
        "Max Verstappen",
        "Carlos Sainz",
        "Esteban Ocon",
        "Lando Norris",
        "Oscar Piastri",
        "Yuki Tsunoda"
    ];

    let formulario = document.getElementById("formulario");

    let piloto1 = document.getElementById("piloto1");
    let piloto2 = document.getElementById("piloto2");
    let piloto3 = document.getElementById("piloto3");

    let imagenes = document.getElementById("imagen");
    let imagenes2 = document.getElementById("imagen2");
    let imagenes3 = document.getElementById("imagen3");

    let nombres = document.getElementById("titulo");
    let nombres2 = document.getElementById("titulo2");
    let nombres3 = document.getElementById("titulo3");

    let premio = document.getElementById("premio");
    let premio2 = document.getElementById("premio2");
    let premio3 = document.getElementById("premio3");

    let ultimo = document.getElementById("ultimo");

    let resultadoDiv1 = document.querySelector("#resultado .piloto-resultado:nth-child(1)");
    let resultadoDiv2 = document.querySelector("#resultado .piloto-resultado:nth-child(2)");
    let resultadoDiv3 = document.querySelector("#resultado .piloto-resultado:nth-child(3)");

    piloto1.addEventListener("change", function() {
        limpiarError(piloto1);
    });

    piloto2.addEventListener("change", function() {
        limpiarError(piloto2);
    });

    piloto3.addEventListener("change", function() {
        limpiarError(piloto3);
    });

    formulario.addEventListener("submit", realizarSorteo);

    function mostrarError(campo, mensaje) {
        document.getElementById("error-" + campo.id).textContent = mensaje;
        campo.classList.add("campo-error");
    }

    function limpiarError(campo) {
        document.getElementById("error-" + campo.id).textContent = "";
        campo.classList.remove("campo-error");
    }

    function ocultarResultados() {

        resultadoDiv1.classList.remove("mostrar");
        resultadoDiv2.classList.remove("mostrar");
        resultadoDiv3.classList.remove("mostrar");

        premio.classList.remove("acierto");
        premio2.classList.remove("acierto");
        premio3.classList.remove("acierto");

        imagenes.removeAttribute("src");
        imagenes2.removeAttribute("src");
        imagenes3.removeAttribute("src");

        nombres.textContent = "";
        nombres2.textContent = "";
        nombres3.textContent = "";

        premio.textContent = "";
        premio2.textContent = "";
        premio3.textContent = "";

        ultimo.textContent = "";
    }

    function realizarSorteo(evento) {

        evento.preventDefault();

        ocultarResultados();

        limpiarError(piloto1);
        limpiarError(piloto2);
        limpiarError(piloto3);

        let correcto = true;

        if (piloto1.value === "") {
            mostrarError(piloto1, "Selecciona un piloto.");
            correcto = false;
        }

        if (piloto2.value === "") {
            mostrarError(piloto2, "Selecciona un piloto.");
            correcto = false;
        }

        if (piloto3.value === "") {
            mostrarError(piloto3, "Selecciona un piloto.");
            correcto = false;
        }

        if (!correcto) {
            alert("Debes seleccionar los tres pilotos.");
            return;
        }

        if (piloto1.value === piloto2.value) {
            mostrarError(piloto2, "Este piloto ya está seleccionado.");
            correcto = false;
        }

        if (piloto1.value === piloto3.value ||
            piloto2.value === piloto3.value) {
            mostrarError(piloto3, "Este piloto ya está seleccionado.");
            correcto = false;
        }

        if (!correcto) {
            return;
        }

        let aleatorio = [];

        while (aleatorio.length < 3) {

            let numero = Math.floor(Math.random() * titulos.length);

            if (!aleatorio.includes(numero)) {
                aleatorio.push(numero);
            }

        }

        imagenes.src = fotos[aleatorio[0]];
        nombres.textContent = titulos[aleatorio[0]];

        if (piloto1.value === titulos[aleatorio[0]]) {
            premio.textContent = "¡Felicidades! Has acertado el primer puesto. Premio: 300 €";
            premio.classList.add("acierto");
        } else {
            premio.textContent = "No acertaste el primer puesto.";
        }

        resultadoDiv1.classList.add("mostrar");

        imagenes2.src = fotos[aleatorio[1]];
        nombres2.textContent = titulos[aleatorio[1]];

        if (piloto2.value === titulos[aleatorio[1]]) {
            premio2.textContent = "¡Felicidades! Has acertado el segundo puesto. Premio: 200 €";
            premio2.classList.add("acierto");
        } else {
            premio2.textContent = "No acertaste el segundo puesto.";
        }

        resultadoDiv2.classList.add("mostrar");

        imagenes3.src = fotos[aleatorio[2]];
        nombres3.textContent = titulos[aleatorio[2]];

        if (piloto3.value === titulos[aleatorio[2]]) {
            premio3.textContent = "¡Felicidades! Has acertado el tercer puesto. Premio: 100 €";
            premio3.classList.add("acierto");
        } else {
            premio3.textContent = "No acertaste el tercer puesto.";
        }

        resultadoDiv3.classList.add("mostrar");

        ultimo.textContent = "Sorteo realizado. ¡Gracias por participar!";

    }

});

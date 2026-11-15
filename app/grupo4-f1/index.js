
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


let fotos = [
    "./images/carrusel/1.png",
    "./images/carrusel/2.png",
    "./images/carrusel/3.png",
    "./images/carrusel/4.png",
    "./images/carrusel/5.png",
    "./images/carrusel/6.png",
    "./images/carrusel/7.png",
    "./images/carrusel/8.png",
    "./images/carrusel/9.png",
    "./images/carrusel/10.png"
];

let titulos = [
    "Guggenheim",
    "Parrilla de salida",
    "Celebración en el podio",
    "Parada en boxes",
    "Brasil 2025",
    "F1 en Bilbao",
    "Gastronomía",
    "Bilbao",
    "Coche de Russell",
    "Pupi y Guggenheim"
];

let imagenesDisponibles = [0,1,2,3,4,5,6,7,8,9];
let ultimaImagen = 0;

imagenesDisponibles.splice(0, 1);

function cambiarFoto() {

    if (imagenesDisponibles.length == 0) {
        imagenesDisponibles = [0,1,2,3,4,5,6,7,8,9];
    }

    let numeroAleatorio = Math.floor(Math.random() * imagenesDisponibles.length);

    if (imagenesDisponibles.length == 10) {
        while (imagenesDisponibles[numeroAleatorio] == ultimaImagen) {
            numeroAleatorio = Math.floor(Math.random() * imagenesDisponibles.length);
        }
    }

    let numero = imagenesDisponibles[numeroAleatorio];

    let texto = document.getElementById("titulo");
    let imagen = document.getElementById("imagen");

    texto.innerHTML = titulos[numero];
    imagen.src = fotos[numero];

    ultimaImagen = numero;

    imagenesDisponibles.splice(numeroAleatorio, 1);
}

setInterval(cambiarFoto, 3000);


let fechaCarrera = new Date("2026-12-06T14:00:00");

function actualizarContador() {

    let ahora = new Date();
    let diferencia = fechaCarrera - ahora;

    if (diferencia <= 0) {
        document.getElementById("tiempo").innerHTML = "¡La carrera ha comenzado!";
        return;
    }

    let dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
    let horas = Math.floor((diferencia / (1000 * 60 * 60)) % 24);
    let minutos = Math.floor((diferencia / (1000 * 60)) % 60);
    let segundos = Math.floor((diferencia / 1000) % 60);

    document.getElementById("tiempo").innerHTML =
        dias + " días, " +
        horas + " horas, " +
        minutos + " minutos y " +
        segundos + " segundos";
}

actualizarContador();

setInterval(actualizarContador, 1000);

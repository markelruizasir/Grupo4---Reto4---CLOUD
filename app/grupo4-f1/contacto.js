
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

});

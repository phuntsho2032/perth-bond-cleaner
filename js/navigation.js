document.addEventListener("DOMContentLoaded", function () {

    const servicesDropdown = document.getElementById("servicesDropdown");

    if (!servicesDropdown) return;

    if (window.innerWidth <= 991) {

        servicesDropdown.addEventListener("click", function (e) {

            const menu = this.nextElementSibling;

            if (menu) {
                e.preventDefault();
                menu.classList.toggle("show");
            }
        });
    }
});
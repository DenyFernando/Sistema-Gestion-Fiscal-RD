// =======================================
// Dashboard - Sistema de Gestión Fiscal RD
// Versión 3.2 Profesional
// =======================================

// Verificar sesión
document.addEventListener("DOMContentLoaded", () => {

    const usuario = localStorage.getItem("usuarioActivo");

    if (!usuario) {
        alert("Debe iniciar sesión.");
        window.location.href = "login.html";
        return;
    }

    // Restaurar modo oscuro
    if (localStorage.getItem("modo") === "true") {
        document.body.classList.add("dark");
    }

    actualizarEstadisticas();

});

// ================================
// Mostrar módulos
// ================================

function ocultarModulos() {

    document.querySelectorAll(".modulo").forEach(modulo => {
        modulo.style.display = "none";
    });

}

function mostrarModulo(modulo) {

    ocultarModulos();

    switch (modulo) {

        case "itbis":
            document.getElementById("modulo-itbis").style.display = "block";
            break;

        case "isr":
            document.getElementById("modulo-isr").style.display = "block";
            break;

        case "ahorro":
            document.getElementById("modulo-ahorro").style.display = "block";
            break;

        case "historial":
            document.getElementById("modulo-historial").style.display = "block";

            if (typeof mostrarHistorial === "function") {
                mostrarHistorial();
            }

            break;

    }

}

// ================================
// Modo oscuro
// ================================

function cambiarModo() {

    document.body.classList.toggle("dark");

    localStorage.setItem(
        "modo",
        document.body.classList.contains("dark")
    );

}

// ================================
// Estadísticas
// ================================

function actualizarEstadisticas() {

    const historial = JSON.parse(
        localStorage.getItem("historialFiscalRD") || "[]"
    );

    const operaciones = document.getElementById("totalOperaciones");
    const itbis = document.getElementById("totalITBIS");
    const isr = document.getElementById("totalISR");
    const ahorro = document.getElementById("totalAhorro");

    if (operaciones)
        operaciones.textContent = historial.length;

    if (itbis)
        itbis.textContent =
            historial.filter(item => item.tipo === "ITBIS").length;

    if (isr)
        isr.textContent =
            historial.filter(item => item.tipo === "ISR").length;

    if (ahorro)
        ahorro.textContent =
            historial.filter(item => item.tipo === "AHORRO").length;

}

// ================================
// Cerrar sesión
// ================================

function cerrarSesion() {

    if (confirm("¿Desea cerrar sesión?")) {

        localStorage.removeItem("usuarioActivo");

        window.location.href = "login.html";

    }

}

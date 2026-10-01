// ======================================
// dashboard.js
// Sistema de Gestión Fiscal RD v4.1
// ======================================

document.addEventListener("DOMContentLoaded", () => {

    // Verificar si hay un usuario activo
    const usuario = JSON.parse(
        localStorage.getItem("usuarioActivo")
    );

    if (!usuario) {
        alert("Debe iniciar sesión.");
        window.location.href = "login.html";
        return;
    }

    // Mostrar nombre y correo del usuario
    const saludo = document.getElementById("saludoUsuario");
    const correo = document.getElementById("correoUsuario");

    if (saludo) {
        saludo.textContent = `👋 Bienvenido, ${usuario.nombre}`;
    }

    if (correo) {
        correo.textContent = usuario.correo;
    }

    // Botón modo oscuro
    const btnModo = document.getElementById("btnModoOscuro");

    if (btnModo) {
        btnModo.addEventListener("click", cambiarModo);
    }

    // Botón cerrar sesión
    const btnCerrar = document.getElementById("btnCerrarSesion");

    if (btnCerrar) {
        btnCerrar.addEventListener("click", cerrarSesion);
    }

    // Restaurar modo oscuro
    if (localStorage.getItem("modoOscuro") === "true") {
        document.body.classList.add("dark");
    }

    actualizarEstadisticas();

});

// =========================
// Mostrar módulos
// =========================

function mostrarModulo(nombre) {

    document.querySelectorAll(".modulo").forEach(modulo => {
        modulo.hidden = true;
    });

    const modulo = document.getElementById("modulo-" + nombre);

    if (modulo) {
        modulo.hidden = false;
    }

}

// =========================
// Modo oscuro
// =========================

function cambiarModo() {

    document.body.classList.toggle("dark");

    localStorage.setItem(
        "modoOscuro",
        document.body.classList.contains("dark")
    );

}

// =========================
// Cerrar sesión
// =========================

function cerrarSesion() {

    if (confirm("¿Desea cerrar sesión?")) {

        localStorage.removeItem("usuarioActivo");

        window.location.href = "login.html";

    }

}

// =========================
// Estadísticas
// =========================

function actualizarEstadisticas() {

    const historial = JSON.parse(
        localStorage.getItem("historialFiscalRD") || "[]"
    );

    const totalOperaciones = document.getElementById("totalOperaciones");
    const totalITBIS = document.getElementById("totalITBIS");
    const totalISR = document.getElementById("totalISR");
    const totalAhorro = document.getElementById("totalAhorro");

    if (totalOperaciones) totalOperaciones.textContent = historial.length;

    if (totalITBIS)
        totalITBIS.textContent = historial.filter(
            item => item.tipo === "ITBIS"
        ).length;

    if (totalISR)
        totalISR.textContent = historial.filter(
            item => item.tipo === "ISR"
        ).length;

    if (totalAhorro)
        totalAhorro.textContent = historial.filter(
            item => item.tipo === "AHORRO"
        ).length;

}

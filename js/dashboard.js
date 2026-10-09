// ======================================
// dashboard.js
// Sistema de Gestión Fiscal RD v4.2
// ======================================

document.addEventListener("DOMContentLoaded", () => {

    verificarSesion();

    mostrarDatosUsuario();

    actualizarEstadisticas();

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

});

// ==============================
// Verificar sesión
// ==============================
function verificarSesion() {

    const correo = localStorage.getItem("usuarioActivo");

    if (!correo) {

        alert("Debe iniciar sesión.");

        window.location.href = "login.html";

    }

}

// ==============================
// Mostrar usuario conectado
// ==============================
function mostrarDatosUsuario() {

    const correoActivo = localStorage.getItem("usuarioActivo");

    if (!correoActivo) return;

    const usuarios = JSON.parse(
        localStorage.getItem("usuariosFiscalRD") || "[]"
    );

    const usuario = usuarios.find(
        u => u.correo === correoActivo
    );

    if (!usuario) return;

    const nombre = document.getElementById("nombreUsuario");
    const correo = document.getElementById("correoUsuario");

    if (nombre) {
        nombre.textContent = usuario.nombre;
    }

    if (correo) {
        correo.textContent = usuario.correo;
    }

}

// ==============================
// Mostrar módulos
// ==============================
function mostrarModulo(nombre) {

    document.querySelectorAll(".modulo").forEach(modulo => {
        modulo.hidden = true;
    });

    const modulo = document.getElementById("modulo-" + nombre);

    if (modulo) {
        modulo.hidden = false;
    }

}

// ==============================
// Modo oscuro
// ==============================
function cambiarModo() {

    document.body.classList.toggle("dark");

    localStorage.setItem(
        "modoOscuro",
        document.body.classList.contains("dark")
    );

}

// ==============================
// Cerrar sesión
// ==============================
function cerrarSesion() {

    if (!confirm("¿Desea cerrar sesión?")) return;

    localStorage.removeItem("usuarioActivo");

    window.location.href = "login.html";

}

// ==============================
// Estadísticas
// ==============================
function actualizarEstadisticas() {

    if (typeof obtenerHistorial !== "function") return;

    const historial = obtenerHistorial();

    document.getElementById("totalOperaciones").textContent = historial.length;

    document.getElementById("totalITBIS").textContent =
        historial.filter(item => item.tipo === "ITBIS").length;

    document.getElementById("totalISR").textContent =
        historial.filter(item => item.tipo === "ISR").length;

    document.getElementById("totalAhorro").textContent =
        historial.filter(item => item.tipo === "AHORRO").length;

}

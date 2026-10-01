// ======================================
// historial.js
// Sistema de Gestión Fiscal RD v4.1
// ======================================

// Obtener usuario actual
function obtenerUsuarioActual() {
    const usuario = JSON.parse(localStorage.getItem("usuarioActivo"));

    if (!usuario) {
        return null;
    }

    return usuario.correo;
}

// Obtener la clave del historial
function obtenerClaveHistorial() {
    const correo = obtenerUsuarioActual();

    if (!correo) {
        return "historial_invitado";
    }

    return "historial_" + correo;
}

// Guardar operación
function guardarHistorial(tipo, datos) {

    const clave = obtenerClaveHistorial();

    const historial = JSON.parse(
        localStorage.getItem(clave) || "[]"
    );

    historial.push({
        tipo: tipo,
        datos: datos,
        fecha: new Date().toLocaleString()
    });

    localStorage.setItem(
        clave,
        JSON.stringify(historial)
    );

}

// Mostrar historial
function mostrarHistorial() {

    const contenedor = document.getElementById("resultadoHistorial");

    if (!contenedor) return;

    const clave = obtenerClaveHistorial();

    const historial = JSON.parse(
        localStorage.getItem(clave) || "[]"
    );

    if (historial.length === 0) {

        contenedor.innerHTML =
        "<p>No hay operaciones registradas.</p>";

        return;

    }

    let html = "";

    historial.forEach((item, index) => {

        html += `
        <div class="registro">
            <h4>${item.tipo}</h4>
            <p>${item.datos}</p>
            <small>${item.fecha}</small>
        </div>
        <hr>
        `;

    });

    contenedor.innerHTML = html;

}

// Limpiar historial
function limpiarHistorial() {

    if (!confirm("¿Eliminar el historial del usuario actual?")) {
        return;
    }

    localStorage.removeItem(
        obtenerClaveHistorial()
    );

    mostrarHistorial();

    if (typeof actualizarEstadisticas === "function") {
        actualizarEstadisticas();
    }

}

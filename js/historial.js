// ======================================
// historial.js
// Sistema de Gestión Fiscal RD v4.1
// ======================================

// Obtener usuario activo
function obtenerUsuarioActual() {
    return localStorage.getItem("usuarioActivo");
}

// Obtener la clave del historial del usuario
function obtenerClaveHistorial() {
    const usuario = obtenerUsuarioActual();

    if (!usuario) {
        return "historial_invitado";
    }

    return "historial_" + usuario;
}

// Guardar operación
function guardarHistorial(tipo, descripcion) {

    const clave = obtenerClaveHistorial();

    const historial = JSON.parse(
        localStorage.getItem(clave) || "[]"
    );

    historial.push({
        tipo: tipo,
        descripcion: descripcion,
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

    const historial = JSON.parse(
        localStorage.getItem(obtenerClaveHistorial()) || "[]"
    );

    if (historial.length === 0) {

        contenedor.innerHTML = `
            <p>No hay operaciones registradas.</p>
        `;

        return;
    }

    let html = "";

    historial.forEach((item, index) => {

        html += `
        <div class="registro">
            <h3>${index + 1}. ${item.tipo}</h3>

            <p>${item.descripcion}</p>

            <small>${item.fecha}</small>

            <hr>
        </div>
        `;

    });

    contenedor.innerHTML = html;

}

// Limpiar historial
function limpiarHistorial() {

    if (!confirm("¿Desea eliminar todo el historial?")) {
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

// Obtener historial (para exportaciones)
function obtenerHistorial() {

    return JSON.parse(
        localStorage.getItem(obtenerClaveHistorial()) || "[]"
    );

}

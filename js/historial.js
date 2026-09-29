// ======================================
// Sistema de Gestión Fiscal RD
// Módulo Historial - Versión 3.1
// ======================================

const CLAVE_HISTORIAL = "historialFiscalRD";

/**
 * Obtener historial
 */
function obtenerHistorial() {

    const datos = localStorage.getItem(CLAVE_HISTORIAL);

    return datos ? JSON.parse(datos) : [];

}

/**
 * Guardar una operación
 */
function guardarHistorial(registro) {

    let historial = obtenerHistorial();

    historial.unshift(registro);

    // Mantener solo los últimos 50 registros
    if (historial.length > 50) {
        historial = historial.slice(0, 50);
    }

    localStorage.setItem(
        CLAVE_HISTORIAL,
        JSON.stringify(historial)
    );

}

/**
 * Mostrar historial
 */
function mostrarHistorial() {

    const contenedor = document.getElementById("resultadoHistorial");

    if (!contenedor) return;

    const historial = obtenerHistorial();

    if (historial.length === 0) {

        contenedor.innerHTML = `
            <p>No hay operaciones registradas.</p>
        `;

        return;

    }

    let html = `
        <h3>Historial de Operaciones</h3>
        <table style="width:100%;border-collapse:collapse;">
            <thead>
                <tr>
                    <th style="border:1px solid #ccc;padding:8px;">Fecha</th>
                    <th style="border:1px solid #ccc;padding:8px;">Tipo</th>
                    <th style="border:1px solid #ccc;padding:8px;">Detalle</th>
                </tr>
            </thead>
            <tbody>
    `;

    historial.forEach(item => {

        html += `
            <tr>
                <td style="border:1px solid #ccc;padding:8px;">
                    ${item.fecha || "-"}
                </td>

                <td style="border:1px solid #ccc;padding:8px;">
                    ${item.tipo || "-"}
                </td>

                <td style="border:1px solid #ccc;padding:8px;">
                    ${JSON.stringify(item)}
                </td>
            </tr>
        `;

    });

    html += `
            </tbody>
        </table>

        <br>

        <button onclick="limpiarHistorial()">
            🗑 Limpiar Historial
        </button>
    `;

    contenedor.innerHTML = html;

}

/**
 * Limpiar historial
 */
function limpiarHistorial() {

    if (confirm("¿Desea eliminar todo el historial?")) {

        localStorage.removeItem(CLAVE_HISTORIAL);

        mostrarHistorial();

    }

}

/**
 * Descargar historial en formato JSON
 */
function descargarHistorial() {

    const historial = obtenerHistorial();

    const archivo = new Blob(
        [JSON.stringify(historial, null, 2)],
        { type: "application/json" }
    );

    const enlace = document.createElement("a");

    enlace.href = URL.createObjectURL(archivo);

    enlace.download = "historial-fiscal.json";

    enlace.click();

}

/**
 * Mostrar historial automáticamente
 */
document.addEventListener("DOMContentLoaded", () => {

    if (document.getElementById("resultadoHistorial")) {

        mostrarHistorial();

    }

});

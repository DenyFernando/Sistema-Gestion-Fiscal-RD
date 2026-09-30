// ======================================
// historial.js
// Sistema de Gestión Fiscal RD v4.0
// ======================================

// Mostrar historial
function mostrarHistorial() {

    const contenedor = document.getElementById("resultadoHistorial");

    if (!contenedor) return;

    const historial = JSON.parse(
        localStorage.getItem("historialFiscalRD") || "[]"
    );

    if (historial.length === 0) {

        contenedor.innerHTML = `
            <p>No hay operaciones registradas.</p>
        `;

        return;
    }

    let html = `
        <table style="width:100%;border-collapse:collapse;">
            <thead>
                <tr>
                    <th>Tipo</th>
                    <th>Fecha</th>
                    <th>Detalle</th>
                </tr>
            </thead>
            <tbody>
    `;

    historial.forEach(item => {

        let detalle = "";

        switch (item.tipo) {

            case "ITBIS":
                detalle = `Monto: RD$ ${item.monto.toFixed(2)} | Total: RD$ ${item.total.toFixed(2)}`;
                break;

            case "ISR":
                detalle = `Salario: RD$ ${item.salario.toFixed(2)} | ISR: RD$ ${item.impuesto.toFixed(2)}`;
                break;

            case "AHORRO":
                detalle = `Ingreso: RD$ ${item.ingreso.toFixed(2)} | Ahorro: RD$ ${item.ahorro.toFixed(2)}`;
                break;

            default:
                detalle = "Sin información";
        }

        html += `
            <tr>
                <td>${item.tipo}</td>
                <td>${item.fecha}</td>
                <td>${detalle}</td>
            </tr>
        `;

    });

    html += `
            </tbody>
        </table>
    `;

    contenedor.innerHTML = html;

}

// Limpiar historial
function limpiarHistorial() {

    const confirmar = confirm(
        "¿Desea eliminar todo el historial?"
    );

    if (!confirmar) return;

    localStorage.removeItem("historialFiscalRD");

    mostrarHistorial();

    if (typeof actualizarEstadisticas === "function") {
        actualizarEstadisticas();
    }

}

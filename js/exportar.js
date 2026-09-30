// ======================================
// exportar.js
// Sistema de Gestión Fiscal RD v4.0
// ======================================

// Obtener historial
function obtenerHistorial() {
    return JSON.parse(
        localStorage.getItem("historialFiscalRD") || "[]"
    );
}

// ==============================
// Exportar JSON
// ==============================

function exportarJSON() {

    const historial = obtenerHistorial();

    if (historial.length === 0) {
        alert("No hay datos para exportar.");
        return;
    }

    const blob = new Blob(
        [JSON.stringify(historial, null, 2)],
        { type: "application/json" }
    );

    descargarArchivo(blob, "historialFiscalRD.json");

}

// ==============================
// Exportar CSV
// ==============================

function exportarCSV() {

    const historial = obtenerHistorial();

    if (historial.length === 0) {
        alert("No hay datos para exportar.");
        return;
    }

    let csv = "Tipo,Fecha,Detalle\n";

    historial.forEach(item => {

        let detalle = "";

        switch (item.tipo) {

            case "ITBIS":
                detalle = `Monto: ${item.monto} Total: ${item.total}`;
                break;

            case "ISR":
                detalle = `Salario: ${item.salario} ISR: ${item.impuesto}`;
                break;

            case "AHORRO":
                detalle = `Ingreso: ${item.ingreso} Ahorro: ${item.ahorro}`;
                break;

            default:
                detalle = "";
        }

        csv += `${item.tipo},"${item.fecha}","${detalle}"\n`;

    });

    const blob = new Blob(
        [csv],
        { type: "text/csv;charset=utf-8;" }
    );

    descargarArchivo(blob, "historialFiscalRD.csv");

}

// ==============================
// Exportar PDF (temporal)
// ==============================

function exportarPDF() {

    const historial = obtenerHistorial();

    if (historial.length === 0) {
        alert("No hay datos para exportar.");
        return;
    }

    let contenido =
`SISTEMA DE GESTIÓN FISCAL RD

HISTORIAL

`;

    historial.forEach(item => {

        contenido += `
Tipo: ${item.tipo}
Fecha: ${item.fecha}

-------------------------------------

`;

    });

    const blob = new Blob(
        [contenido],
        { type: "application/pdf" }
    );

    descargarArchivo(blob, "historialFiscalRD.pdf");

}

// ==============================
// Descargar archivo
// ==============================

function descargarArchivo(blob, nombre) {

    const url = URL.createObjectURL(blob);

    const enlace = document.createElement("a");

    enlace.href = url;

    enlace.download = nombre;

    document.body.appendChild(enlace);

    enlace.click();

    document.body.removeChild(enlace);

    URL.revokeObjectURL(url);

}

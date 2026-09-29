// ======================================
// Sistema de Gestión Fiscal RD
// Módulo Exportar - Versión 3.1
// ======================================

/**
 * Obtener historial
 */
function obtenerDatosExportacion() {

    const datos = localStorage.getItem("historialFiscalRD");

    return datos ? JSON.parse(datos) : [];

}

/**
 * Exportar historial a JSON
 */
function exportarJSON() {

    const historial = obtenerDatosExportacion();

    if (historial.length === 0) {
        alert("No hay datos para exportar.");
        return;
    }

    const blob = new Blob(
        [JSON.stringify(historial, null, 2)],
        { type: "application/json" }
    );

    const enlace = document.createElement("a");

    enlace.href = URL.createObjectURL(blob);
    enlace.download = "historialFiscalRD.json";

    document.body.appendChild(enlace);
    enlace.click();
    document.body.removeChild(enlace);

}

/**
 * Exportar historial a CSV
 */
function exportarCSV() {

    const historial = obtenerDatosExportacion();

    if (historial.length === 0) {
        alert("No hay datos para exportar.");
        return;
    }

    let csv = "Fecha,Tipo,Datos\n";

    historial.forEach(item => {

        csv += `"${item.fecha}","${item.tipo}","${JSON.stringify(item).replace(/"/g,'""')}"\n`;

    });

    const blob = new Blob(
        [csv],
        { type: "text/csv;charset=utf-8;" }
    );

    const enlace = document.createElement("a");

    enlace.href = URL.createObjectURL(blob);
    enlace.download = "historialFiscalRD.csv";

    document.body.appendChild(enlace);
    enlace.click();
    document.body.removeChild(enlace);

}

/**
 * Imprimir historial (puede guardarse como PDF desde el navegador)
 */
function exportarPDF() {

    const historial = obtenerDatosExportacion();

    if (historial.length === 0) {
        alert("No hay datos para exportar.");
        return;
    }

    let ventana = window.open("", "_blank");

    ventana.document.write(`
        <html>
        <head>
            <title>Historial Fiscal</title>
            <style>
                body{
                    font-family:Arial,sans-serif;
                    padding:20px;
                }
                table{
                    width:100%;
                    border-collapse:collapse;
                }
                th,td{
                    border:1px solid #000;
                    padding:8px;
                    text-align:left;
                }
                th{
                    background:#0d6efd;
                    color:#fff;
                }
            </style>
        </head>
        <body>

        <h2>Historial del Sistema de Gestión Fiscal RD</h2>

        <table>

        <tr>

        <th>Fecha</th>

        <th>Tipo</th>

        <th>Información</th>

        </tr>
    `);

    historial.forEach(item => {

        ventana.document.write(`
            <tr>
                <td>${item.fecha}</td>
                <td>${item.tipo}</td>
                <td>${JSON.stringify(item)}</td>
            </tr>
        `);

    });

    ventana.document.write(`
        </table>
        </body>
        </html>
    `);

    ventana.document.close();
    ventana.print();

}

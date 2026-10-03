// ======================================
// exportar.js
// Sistema de Gestión Fiscal RD v4.1
// ======================================

// Obtener historial del usuario actual
function obtenerDatosExportar() {

    if (typeof obtenerHistorial === "function") {
        return obtenerHistorial();
    }

    return [];

}

// ===============================
// Exportar JSON
// ===============================
function exportarJSON() {

    const historial = obtenerDatosExportar();

    if (historial.length === 0) {
        alert("No hay datos para exportar.");
        return;
    }

    const archivo = new Blob(
        [JSON.stringify(historial, null, 2)],
        { type: "application/json" }
    );

    const enlace = document.createElement("a");

    enlace.href = URL.createObjectURL(archivo);
    enlace.download = "historial.json";
    enlace.click();

}

// ===============================
// Exportar CSV
// ===============================
function exportarCSV() {

    const historial = obtenerDatosExportar();

    if (historial.length === 0) {
        alert("No hay datos para exportar.");
        return;
    }

    let csv = "Tipo,Descripción,Fecha\n";

    historial.forEach(item => {

        csv += `"${item.tipo}","${item.descripcion}","${item.fecha}"\n`;

    });

    const archivo = new Blob(
        [csv],
        { type: "text/csv;charset=utf-8;" }
    );

    const enlace = document.createElement("a");

    enlace.href = URL.createObjectURL(archivo);
    enlace.download = "historial.csv";
    enlace.click();

}

// ===============================
// Exportar PDF
// ===============================
function exportarPDF() {

    const historial = obtenerDatosExportar();

    if (historial.length === 0) {
        alert("No hay datos para exportar.");
        return;
    }

    const ventana = window.open("", "_blank");

    let contenido = `
    <html>
    <head>
        <title>Historial Fiscal</title>
        <style>
            body{
                font-family:Arial,sans-serif;
                padding:20px;
            }
            h1{
                text-align:center;
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
                color:white;
            }
        </style>
    </head>
    <body>

    <h1>Historial Fiscal</h1>

    <table>

    <tr>
        <th>Tipo</th>
        <th>Descripción</th>
        <th>Fecha</th>
    </tr>
    `;

    historial.forEach(item => {

        contenido += `
        <tr>
            <td>${item.tipo}</td>
            <td>${item.descripcion}</td>
            <td>${item.fecha}</td>
        </tr>
        `;

    });

    contenido += `
    </table>

    </body>
    </html>
    `;

    ventana.document.write(contenido);
    ventana.document.close();
    ventana.print();

}

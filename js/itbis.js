// ======================================
// ITBIS.js
// Sistema de Gestión Fiscal RD v4.0
// ======================================

const PORCENTAJE_ITBIS = 0.18;

// ==============================
// Calcular ITBIS
// ==============================

function ejecutarITBIS() {

    const input = document.getElementById("montoITBIS");
    const resultado = document.getElementById("resultadoITBIS");

    const monto = parseFloat(input.value);

    if (isNaN(monto) || monto <= 0) {

        resultado.innerHTML = `
            <p style="color:red;">
                Ingrese un monto válido.
            </p>
        `;

        return;
    }

    const itbis = monto * PORCENTAJE_ITBIS;
    const total = monto + itbis;

    resultado.innerHTML = `
        <h3>Resultado</h3>

        <p><strong>Monto:</strong> RD$ ${monto.toFixed(2)}</p>

        <p><strong>ITBIS (18%):</strong> RD$ ${itbis.toFixed(2)}</p>

        <p><strong>Total:</strong> RD$ ${total.toFixed(2)}</p>
    `;

    guardarOperacionITBIS({
        tipo: "ITBIS",
        monto: monto,
        itbis: itbis,
        total: total,
        fecha: new Date().toLocaleString()
    });

}

// ==============================
// Limpiar
// ==============================

function limpiarITBIS() {

    document.getElementById("montoITBIS").value = "";

    document.getElementById("resultadoITBIS").innerHTML = "";

}

// ==============================
// Guardar historial
// ==============================

function guardarOperacionITBIS(datos) {

    let historial = JSON.parse(
        localStorage.getItem("historialFiscalRD") || "[]"
    );

    historial.push(datos);

    localStorage.setItem(
        "historialFiscalRD",
        JSON.stringify(historial)
    );

    if (typeof actualizarEstadisticas === "function") {
        actualizarEstadisticas();
    }

}

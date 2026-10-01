// ======================================
// itbis.js
// Sistema de Gestión Fiscal RD v4.1
// ======================================

// Calcular ITBIS
function ejecutarITBIS() {

    const input = document.getElementById("montoITBIS");
    const resultado = document.getElementById("resultadoITBIS");

    const monto = parseFloat(input.value);

    if (isNaN(monto) || monto <= 0) {

        resultado.innerHTML = `
            <div class="error">
                Ingrese un monto válido.
            </div>
        `;

        return;
    }

    const itbis = monto * 0.18;
    const total = monto + itbis;

    resultado.innerHTML = `
        <div class="resultado-card">
            <h3>Resultado</h3>

            <p><strong>Monto:</strong> RD$ ${monto.toFixed(2)}</p>

            <p><strong>ITBIS (18%):</strong> RD$ ${itbis.toFixed(2)}</p>

            <p><strong>Total:</strong> RD$ ${total.toFixed(2)}</p>
        </div>
    `;

    // Guardar una sola vez en el historial
    if (typeof guardarHistorial === "function") {

        guardarHistorial(
            "ITBIS",
            `Monto: RD$ ${monto.toFixed(2)} | ITBIS: RD$ ${itbis.toFixed(2)} | Total: RD$ ${total.toFixed(2)}`
        );

    }

    // Actualizar estadísticas
    if (typeof actualizarEstadisticas === "function") {
        actualizarEstadisticas();
    }

}

// Limpiar formulario
function limpiarITBIS() {

    document.getElementById("montoITBIS").value = "";

    document.getElementById("resultadoITBIS").innerHTML = "";

}

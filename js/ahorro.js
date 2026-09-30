// ======================================
// ahorro.js
// Sistema de Gestión Fiscal RD v4.0
// ======================================

// Calcular ahorro 50/30/20
function calcularAhorro() {

    const input = document.getElementById("ingresoAhorro");
    const resultado = document.getElementById("resultadoAhorro");

    const ingreso = parseFloat(input.value);

    if (isNaN(ingreso) || ingreso <= 0) {

        resultado.innerHTML = `
            <p style="color:red;">
                Ingrese un monto válido.
            </p>
        `;
        return;

    }

    const necesidades = ingreso * 0.50;
    const deseos = ingreso * 0.30;
    const ahorro = ingreso * 0.20;

    resultado.innerHTML = `
        <h3>Plan de Ahorro 50/30/20</h3>

        <p><strong>Ingreso:</strong> RD$ ${ingreso.toFixed(2)}</p>

        <hr>

        <p>🏠 Necesidades (50%): <strong>RD$ ${necesidades.toFixed(2)}</strong></p>

        <p>🎉 Deseos (30%): <strong>RD$ ${deseos.toFixed(2)}</strong></p>

        <p>💰 Ahorro (20%): <strong>RD$ ${ahorro.toFixed(2)}</strong></p>
    `;

    guardarOperacionAhorro({
        tipo: "AHORRO",
        ingreso: ingreso,
        necesidades: necesidades,
        deseos: deseos,
        ahorro: ahorro,
        fecha: new Date().toLocaleString()
    });

}

// Limpiar formulario
function limpiarAhorro() {

    document.getElementById("ingresoAhorro").value = "";
    document.getElementById("resultadoAhorro").innerHTML = "";

}

// Guardar historial
function guardarOperacionAhorro(datos) {

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

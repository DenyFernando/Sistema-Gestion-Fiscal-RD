// ======================================
// ahorro.js
// Sistema de Gestión Fiscal RD v4.1
// ======================================

// Calcular plan de ahorro
function calcularAhorro() {

    const input = document.getElementById("ingresoAhorro");
    const resultado = document.getElementById("resultadoAhorro");

    const ingreso = parseFloat(input.value);

    if (isNaN(ingreso) || ingreso <= 0) {

        resultado.innerHTML = `
            <div class="error">
                Ingrese un ingreso válido.
            </div>
        `;

        return;
    }

    const necesidades = ingreso * 0.50;
    const deseos = ingreso * 0.30;
    const ahorro = ingreso * 0.20;

    resultado.innerHTML = `
        <div class="resultado-card">
            <h3>Plan de Ahorro 50 / 30 / 20</h3>

            <p><strong>Ingreso:</strong> RD$ ${ingreso.toFixed(2)}</p>

            <p><strong>50% Necesidades:</strong> RD$ ${necesidades.toFixed(2)}</p>

            <p><strong>30% Deseos:</strong> RD$ ${deseos.toFixed(2)}</p>

            <p><strong>20% Ahorro:</strong> RD$ ${ahorro.toFixed(2)}</p>
        </div>
    `;

    // Guardar en el historial
    if (typeof guardarHistorial === "function") {

        guardarHistorial(
            "AHORRO",
            `Ingreso: RD$ ${ingreso.toFixed(2)} | Necesidades: RD$ ${necesidades.toFixed(2)} | Deseos: RD$ ${deseos.toFixed(2)} | Ahorro: RD$ ${ahorro.toFixed(2)}`
        );

    }

    // Actualizar estadísticas
    if (typeof actualizarEstadisticas === "function") {
        actualizarEstadisticas();
    }

}

// Limpiar formulario
function limpiarAhorro() {

    document.getElementById("ingresoAhorro").value = "";

    document.getElementById("resultadoAhorro").innerHTML = "";

}

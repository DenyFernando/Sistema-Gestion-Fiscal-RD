// ======================================
// isr.js
// Sistema de Gestión Fiscal RD v4.1
// ======================================

// Calcular ISR
function calcularISR() {

    const input = document.getElementById("salarioISR");
    const resultado = document.getElementById("resultadoISR");

    const salarioMensual = parseFloat(input.value);

    if (isNaN(salarioMensual) || salarioMensual <= 0) {

        resultado.innerHTML = `
            <div class="error">
                Ingrese un salario válido.
            </div>
        `;

        return;
    }

    const salarioAnual = salarioMensual * 12;
    let isr = 0;

    // Escala simplificada (puedes actualizarla con las tablas oficiales)
    if (salarioAnual <= 416220) {
        isr = 0;
    } else if (salarioAnual <= 624329) {
        isr = (salarioAnual - 416220) * 0.15;
    } else if (salarioAnual <= 867123) {
        isr = 31216 + ((salarioAnual - 624329) * 0.20);
    } else {
        isr = 79776 + ((salarioAnual - 867123) * 0.25);
    }

    const isrMensual = isr / 12;

    resultado.innerHTML = `
        <div class="resultado-card">
            <h3>Resultado del ISR</h3>

            <p><strong>Salario mensual:</strong> RD$ ${salarioMensual.toFixed(2)}</p>

            <p><strong>Salario anual:</strong> RD$ ${salarioAnual.toFixed(2)}</p>

            <p><strong>ISR anual:</strong> RD$ ${isr.toFixed(2)}</p>

            <p><strong>ISR mensual:</strong> RD$ ${isrMensual.toFixed(2)}</p>
        </div>
    `;

    // Guardar en historial
    if (typeof guardarHistorial === "function") {

        guardarHistorial(
            "ISR",
            `Salario: RD$ ${salarioMensual.toFixed(2)} | ISR Mensual: RD$ ${isrMensual.toFixed(2)} | ISR Anual: RD$ ${isr.toFixed(2)}`
        );

    }

    // Actualizar estadísticas
    if (typeof actualizarEstadisticas === "function") {
        actualizarEstadisticas();
    }

}

// Limpiar formulario
function limpiarISR() {

    document.getElementById("salarioISR").value = "";

    document.getElementById("resultadoISR").innerHTML = "";

}

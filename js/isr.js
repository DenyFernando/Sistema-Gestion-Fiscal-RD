// ======================================
// ISR.js
// Sistema de Gestión Fiscal RD v4.0
// ======================================

// Calcular ISR
function calcularISR() {

    const input = document.getElementById("salarioISR");
    const resultado = document.getElementById("resultadoISR");

    const salario = parseFloat(input.value);

    if (isNaN(salario) || salario <= 0) {

        resultado.innerHTML = `
            <p style="color:red;">
                Ingrese un salario válido.
            </p>
        `;
        return;
    }

    let isr = 0;

    // Cálculo simplificado (puedes actualizar las tablas luego)
    if (salario <= 34685) {
        isr = 0;
    } else if (salario <= 52027) {
        isr = (salario - 34685) * 0.15;
    } else if (salario <= 72260) {
        isr = 2601 + ((salario - 52027) * 0.20);
    } else {
        isr = 6647.60 + ((salario - 72260) * 0.25);
    }

    resultado.innerHTML = `
        <h3>Resultado</h3>

        <p><strong>Salario:</strong> RD$ ${salario.toFixed(2)}</p>

        <p><strong>ISR:</strong> RD$ ${isr.toFixed(2)}</p>

        <p><strong>Salario Neto:</strong> RD$ ${(salario - isr).toFixed(2)}</p>
    `;

    guardarOperacionISR({
        tipo: "ISR",
        salario: salario,
        impuesto: isr,
        neto: salario - isr,
        fecha: new Date().toLocaleString()
    });

}

// Limpiar formulario
function limpiarISR() {

    document.getElementById("salarioISR").value = "";
    document.getElementById("resultadoISR").innerHTML = "";

}

// Guardar en historial
function guardarOperacionISR(datos) {

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

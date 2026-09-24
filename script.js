// =======================================
// Sistema de Gestión Fiscal RD
// script.js
// Parte 1
// =======================================

// ---------- Variables ----------
let historial = JSON.parse(localStorage.getItem("historial")) || [];

let dashboard = {
    operaciones: 0,
    itbis: 0,
    isr: 0,
    ahorro: 0
};

// ---------- Formato RD$ ----------
function formatoRD(valor) {
    return "RD$ " + Number(valor).toLocaleString("es-DO", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

// ---------- Dashboard ----------
function actualizarDashboard() {

    dashboard.operaciones = historial.length;

    dashboard.itbis = 0;
    dashboard.isr = 0;
    dashboard.ahorro = 0;

    historial.forEach(item => {

        if (item.tipo === "ITBIS") {
            dashboard.itbis += item.valor;
        }

        if (item.tipo === "ISR") {
            dashboard.isr += item.valor;
        }

        if (item.tipo === "AHORRO") {
            dashboard.ahorro += item.valor;
        }

    });

    document.getElementById("totalOperaciones").textContent =
        dashboard.operaciones;

    document.getElementById("totalITBIS").textContent =
        formatoRD(dashboard.itbis);

    document.getElementById("totalISR").textContent =
        formatoRD(dashboard.isr);

    document.getElementById("totalAhorro").textContent =
        formatoRD(dashboard.ahorro);

}

// ---------- Guardar historial ----------
function guardarHistorial() {

    localStorage.setItem(
        "historial",
        JSON.stringify(historial)
    );

}

// ---------- Agregar operación ----------
function agregarHistorial(tipo, texto, valor) {

    historial.unshift({
        tipo,
        texto,
        valor,
        fecha: new Date().toLocaleString()
    });

    if (historial.length > 50) {
        historial.pop();
    }

    guardarHistorial();
    mostrarHistorial();
    actualizarDashboard();

}

// ---------- Mostrar historial ----------
function mostrarHistorial() {

    const lista = document.getElementById("historialLista");

    if (historial.length === 0) {

        lista.innerHTML =
            "<p>No hay operaciones registradas.</p>";

        return;
    }

    lista.innerHTML = "";

    historial.forEach(item => {

        lista.innerHTML += `
        <div class="historial-item">

            <strong>${item.tipo}</strong><br>

            ${item.texto}<br>

            <small>${item.fecha}</small>

        </div>
        `;

    });

}

// ---------- ITBIS ----------
function calcular() {

    let monto =
        Number(document.getElementById("monto").value);

    if (!monto) {

        alert("Ingrese un monto.");

        return;

    }

    let itbis = monto * 0.18;

    let total = monto + itbis;

    document.getElementById("resultado").innerHTML = `

<p>Monto sin ITBIS: ${formatoRD(monto)}</p>

<p>ITBIS (18%): ${formatoRD(itbis)}</p>

<p>Total: ${formatoRD(total)}</p>

`;

    agregarHistorial(
        "ITBIS",
        `ITBIS calculado: ${formatoRD(total)}`,
        itbis
    );

}

function limpiar() {

    document.getElementById("monto").value = "";

    document.getElementById("resultado").innerHTML = `

<p>Monto sin ITBIS: RD$ 0.00</p>

<p>ITBIS (18%): RD$ 0.00</p>

<p>Total: RD$ 0.00</p>

`;

}
// ---------- ISR ----------
function calcularISR() {

    let salario =
        Number(document.getElementById("salario").value);

    if (!salario) {

        alert("Ingrese un salario.");

        return;

    }

    let isr = 0;

    // Cálculo simplificado (se puede actualizar con las tablas oficiales)
    if (salario > 86750) {
        isr = (salario - 86750) * 0.25;
    } else if (salario > 62400) {
        isr = (salario - 62400) * 0.20;
    } else if (salario > 34685) {
        isr = (salario - 34685) * 0.15;
    }

    let neto = salario - isr;

    document.getElementById("resultadoISR").innerHTML = `
        <p>Salario Mensual: ${formatoRD(salario)}</p>
        <p>ISR Mensual: ${formatoRD(isr)}</p>
        <p>Ingreso Neto: ${formatoRD(neto)}</p>
    `;

    agregarHistorial(
        "ISR",
        `ISR calculado: ${formatoRD(isr)}`,
        isr
    );

}

// ---------- Ahorro ----------
function calcularAhorro() {

    let ingreso =
        Number(document.getElementById("ingresoAhorro").value);

    if (!ingreso) {

        alert("Ingrese un ingreso.");

        return;

    }

    let ahorro = ingreso * 0.20;
    let necesidades = ingreso * 0.50;
    let deseos = ingreso * 0.30;

    document.getElementById("resultadoAhorro").innerHTML = `
        <p>Ahorro (20%): ${formatoRD(ahorro)}</p>
        <p>Necesidades (50%): ${formatoRD(necesidades)}</p>
        <p>Deseos (30%): ${formatoRD(deseos)}</p>
    `;

    agregarHistorial(
        "AHORRO",
        `Plan de ahorro generado`,
        ahorro
    );

}

// ---------- Limpiar historial ----------
function limpiarHistorial() {

    if (!confirm("¿Desea eliminar todo el historial?")) {
        return;
    }

    historial = [];

    guardarHistorial();

    mostrarHistorial();

    actualizarDashboard();

}

// ---------- Modo oscuro ----------
function cambiarModo() {

    document.body.classList.toggle("dark-mode");

    localStorage.setItem(
        "modoOscuro",
        document.body.classList.contains("dark-mode")
    );

}

// ---------- Cargar configuración ----------
function iniciarSistema() {

    mostrarHistorial();

    actualizarDashboard();

    const modoGuardado =
        localStorage.getItem("modoOscuro");

    if (modoGuardado === "true") {

        document.body.classList.add("dark-mode");

    }

}

// ---------- Iniciar ----------
window.onload = iniciarSistema;

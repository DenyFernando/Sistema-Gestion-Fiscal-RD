// ==========================================
// Sistema de Gestión Fiscal RD v2.0
// script.js - PARTE 1 (3A)
// ==========================================

// ---------- Historial ----------
let historial = JSON.parse(localStorage.getItem("historial")) || [];

// ---------- Formato RD$ ----------
function formatoRD(valor) {
    return "RD$ " + Number(valor).toLocaleString("es-DO", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

// ---------- Guardar ----------
function guardarHistorial() {
    localStorage.setItem("historial", JSON.stringify(historial));
}

// ---------- Dashboard ----------
function actualizarDashboard() {

    let totalITBIS = 0;
    let totalISR = 0;
    let totalAhorro = 0;

    historial.forEach(item => {

        if (item.tipo === "ITBIS") {
            totalITBIS += item.valor;
        }

        if (item.tipo === "ISR") {
            totalISR += item.valor;
        }

        if (item.tipo === "AHORRO") {
            totalAhorro += item.valor;
        }

    });

    document.getElementById("totalOperaciones").textContent =
        historial.length;

    document.getElementById("totalITBIS").textContent =
        formatoRD(totalITBIS);

    document.getElementById("totalISR").textContent =
        formatoRD(totalISR);

    document.getElementById("totalAhorro").textContent =
        formatoRD(totalAhorro);

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

<strong>${item.tipo}</strong>

<br>

${item.descripcion}

<br>

<small>${item.fecha}</small>

</div>

`;

    });

}

// ---------- Agregar historial ----------
function agregarHistorial(tipo, descripcion, valor) {

    historial.unshift({

        tipo,
        descripcion,
        valor,
        fecha: new Date().toLocaleString()

    });

    if (historial.length > 100) {

        historial.pop();

    }

    guardarHistorial();

    mostrarHistorial();

    actualizarDashboard();

}

// ==========================================
// CALCULADORA ITBIS
// ==========================================

function calcular() {

    let monto =
        Number(document.getElementById("monto").value);

    if (monto <= 0) {

        alert("Ingrese un monto válido.");

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

        `Monto: ${formatoRD(monto)} | Total: ${formatoRD(total)}`,

        itbis

    );

}

function limpiar() {

    document.getElementById("monto").value = "";

    document.getElementById("resultado").innerHTML = `

<p>Monto sin ITBIS: RD$ 0.00</p>

<p>ITBIS: RD$ 0.00</p>

<p>Total: RD$ 0.00</p>

`;

}
// ==========================================
// Sistema de Gestión Fiscal RD v2.0
// script.js - PARTE 2 (3B)
// ==========================================

// ==========================================
// CALCULADORA ISR
// ==========================================

function calcularISR() {

    const salario = Number(document.getElementById("salario").value);

    if (salario <= 0) {
        alert("Ingrese un salario válido.");
        return;
    }

    let isr = 0;

    // Cálculo simplificado (puede actualizarse con tablas oficiales)
    if (salario > 86750) {
        isr = (salario - 86750) * 0.25;
    } else if (salario > 62400) {
        isr = (salario - 62400) * 0.20;
    } else if (salario > 34685) {
        isr = (salario - 34685) * 0.15;
    }

    const neto = salario - isr;

    document.getElementById("resultadoISR").innerHTML = `
        <p>Salario: ${formatoRD(salario)}</p>
        <p>ISR: ${formatoRD(isr)}</p>
        <p>Ingreso Neto: ${formatoRD(neto)}</p>
    `;

    agregarHistorial(
        "ISR",
        `Salario: ${formatoRD(salario)} | ISR: ${formatoRD(isr)}`,
        isr
    );

}

// ==========================================
// PLAN DE AHORRO
// ==========================================

function calcularAhorro() {

    const ingreso = Number(document.getElementById("ingresoAhorro").value);

    if (ingreso <= 0) {
        alert("Ingrese un ingreso válido.");
        return;
    }

    const ahorro = ingreso * 0.20;
    const necesidades = ingreso * 0.50;
    const deseos = ingreso * 0.30;

    document.getElementById("resultadoAhorro").innerHTML = `
        <p>Ahorro (20%): ${formatoRD(ahorro)}</p>
        <p>Necesidades (50%): ${formatoRD(necesidades)}</p>
        <p>Deseos (30%): ${formatoRD(deseos)}</p>
    `;

    agregarHistorial(
        "AHORRO",
        `Plan generado sobre ${formatoRD(ingreso)}`,
        ahorro
    );

}

// ==========================================
// LIMPIAR HISTORIAL
// ==========================================

function limpiarHistorial() {

    if (!confirm("¿Desea eliminar todo el historial?")) {
        return;
    }

    historial = [];

    guardarHistorial();

    mostrarHistorial();

    actualizarDashboard();

}

// ==========================================
// MODO OSCURO
// ==========================================

function cambiarModo() {

    document.body.classList.toggle("dark-mode");

    localStorage.setItem(
        "modoOscuro",
        document.body.classList.contains("dark-mode")
    );

}

// ==========================================
// CARGAR CONFIGURACIÓN
// ==========================================

function iniciarSistema() {

    mostrarHistorial();

    actualizarDashboard();

    const modo = localStorage.getItem("modoOscuro");

    if (modo === "true") {
        document.body.classList.add("dark-mode");
    }

}

// ==========================================
// INICIO
// ==========================================

window.onload = iniciarSistema;

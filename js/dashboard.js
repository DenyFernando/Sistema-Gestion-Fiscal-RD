// =======================================
// Dashboard - Sistema de Gestión Fiscal RD
// Versión 4.0
// =======================================

// Verificar sesión
document.addEventListener("DOMContentLoaded", () => {

    const usuario = localStorage.getItem("usuarioActivo");

    if (!usuario) {
        alert("Debe iniciar sesión.");
        window.location.href = "login.html";
        return;
    }

    iniciarDashboard();

});

// ================================
// Inicializar Dashboard
// ================================

function iniciarDashboard() {

    // Botón modo oscuro
    document
        .getElementById("btnModoOscuro")
        .addEventListener("click", cambiarModo);

    // Botón cerrar sesión
    document
        .getElementById("btnCerrarSesion")
        .addEventListener("click", cerrarSesion);

    // Restaurar modo oscuro
    if (localStorage.getItem("modoOscuro") === "true") {
        document.body.classList.add("dark");
    }

    // Eventos de los botones de módulos
    document.querySelectorAll("[data-modulo]").forEach(boton => {

        boton.addEventListener("click", () => {

            mostrarModulo(boton.dataset.modulo);

        });

    });

    actualizarEstadisticas();

}

// ================================
// Mostrar módulos
// ================================

function ocultarModulos() {

    document.querySelectorAll(".modulo").forEach(modulo => {

        modulo.hidden = true;

    });

}

function mostrarModulo(nombre) {

    ocultarModulos();

    const modulo = document.getElementById("modulo-" + nombre);

    if (modulo) {

        modulo.hidden = false;

    }

    switch (nombre) {

        case "itbis":

            modulo.innerHTML = `
                <h2>💰 Calculadora ITBIS</h2>

                <div class="formulario">

                    <label>Monto</label>

                    <input
                        type="number"
                        id="montoITBIS"
                        placeholder="Ingrese el monto">

                    <div class="botones">

                        <button onclick="ejecutarITBIS()">
                            Calcular
                        </button>

                        <button onclick="limpiarITBIS()">
                            Limpiar
                        </button>

                    </div>

                    <div id="resultadoITBIS" class="resultado"></div>

                </div>
            `;

            break;

        case "isr":

            modulo.innerHTML = `
                <h2>📈 Calculadora ISR</h2>

                <div class="formulario">

                    <label>Salario mensual</label>

                    <input
                        type="number"
                        id="salarioISR"
                        placeholder="Ingrese el salario">

                    <div class="botones">

                        <button onclick="calcularISR()">
                            Calcular
                        </button>

                        <button onclick="limpiarISR()">
                            Limpiar
                        </button>

                    </div>

                    <div id="resultadoISR" class="resultado"></div>

                </div>
            `;

            break;

        case "ahorro":

            modulo.innerHTML = `
                <h2>💵 Plan de Ahorro</h2>

                <div class="formulario">

                    <label>Ingreso mensual</label>

                    <input
                        type="number"
                        id="ingresoAhorro"
                        placeholder="Ingrese el ingreso">

                    <div class="botones">

                        <button onclick="calcularAhorro()">
                            Calcular
                        </button>

                        <button onclick="limpiarAhorro()">
                            Limpiar
                        </button>

                    </div>

                    <div id="resultadoAhorro" class="resultado"></div>

                </div>
            `;

            break;

        case "historial":

            modulo.innerHTML = `
                <h2>📜 Historial</h2>

                <div id="resultadoHistorial"></div>

                <div class="botones">

                    <button onclick="mostrarHistorial()">
                        Actualizar
                    </button>

                    <button onclick="exportarJSON()">
                        JSON
                    </button>

                    <button onclick="exportarCSV()">
                        CSV
                    </button>

                    <button onclick="exportarPDF()">
                        PDF
                    </button>

                </div>
            `;

            if (typeof mostrarHistorial === "function") {
                mostrarHistorial();
            }

            break;

    }

}

// ================================
// Estadísticas
// ================================

function actualizarEstadisticas() {

    const historial = JSON.parse(
        localStorage.getItem("historialFiscalRD") || "[]"
    );

    document.getElementById("totalOperaciones").textContent =
        historial.length;

    document.getElementById("totalITBIS").textContent =
        historial.filter(x => x.tipo === "ITBIS").length;

    document.getElementById("totalISR").textContent =
        historial.filter(x => x.tipo === "ISR").length;

    document.getElementById("totalAhorro").textContent =
        historial.filter(x => x.tipo === "AHORRO").length;

}

// ================================
// Modo oscuro
// ================================

function cambiarModo() {

    document.body.classList.toggle("dark");

    localStorage.setItem(
        "modoOscuro",
        document.body.classList.contains("dark")
    );

}

// ================================
// Cerrar sesión
// ================================

function cerrarSesion() {

    if (confirm("¿Desea cerrar sesión?")) {

        localStorage.removeItem("usuarioActivo");

        window.location.href = "login.html";

    }

}

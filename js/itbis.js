// ======================================
// Sistema de Gestión Fiscal RD
// Módulo ITBIS - Versión 3.1
// ======================================

const ITBIS = 0.18;

/**
 * Calcula el ITBIS de un monto.
 * @param {number} monto
 * @returns {object}
 */
function calcularITBIS(monto){

    monto = Number(monto);

    if(isNaN(monto) || monto <= 0){

        return {
            error:true,
            mensaje:"Ingrese un monto válido."
        };

    }

    const impuesto = monto * ITBIS;

    const total = monto + impuesto;

    return{

        error:false,

        monto,

        impuesto,

        total

    };

}

/**
 * Formato de moneda RD$
 */
function formatoRD(valor){

    return Number(valor).toLocaleString("es-DO",{

        style:"currency",

        currency:"DOP",

        minimumFractionDigits:2

    });

}

/**
 * Mostrar resultado en pantalla
 */
function ejecutarITBIS(){

    const entrada = document.getElementById("montoITBIS");

    const salida = document.getElementById("resultadoITBIS");

    if(!entrada || !salida){

        alert("No se encontró el formulario del ITBIS.");

        return;

    }

    const resultado = calcularITBIS(entrada.value);

    if(resultado.error){

        salida.innerHTML = `
            <p style="color:red;">
                ${resultado.mensaje}
            </p>
        `;

        return;

    }

    salida.innerHTML = `

        <h3>Resultado</h3>

        <p><strong>Monto:</strong> ${formatoRD(resultado.monto)}</p>

        <p><strong>ITBIS (18%):</strong> ${formatoRD(resultado.impuesto)}</p>

        <p><strong>Total:</strong> ${formatoRD(resultado.total)}</p>

    `;

    // Guardar historial si existe el módulo
    if(typeof guardarHistorial === "function"){

        guardarHistorial({
            tipo:"ITBIS",
            fecha:new Date().toLocaleString(),
            monto:resultado.monto,
            impuesto:resultado.impuesto,
            total:resultado.total
        });

    }

}

/**
 * Limpiar formulario
 */
function limpiarITBIS(){

    const entrada = document.getElementById("montoITBIS");

    const salida = document.getElementById("resultadoITBIS");

    if(entrada){

        entrada.value = "";

    }

    if(salida){

        salida.innerHTML = "";

    }

}

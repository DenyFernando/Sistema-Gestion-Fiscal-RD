// ======================================
// Sistema de Gestión Fiscal RD
// Módulo ISR - Versión 3.1
// ======================================

/**
 * Formato de moneda RD$
 */

function formatoMoneda(valor){

    return Number(valor).toLocaleString("es-DO",{

        style:"currency",

        currency:"DOP",

        minimumFractionDigits:2

    });

}

/**
 * Calculadora ISR
 */

function calcularISR(){

    const salarioInput=document.getElementById("salarioISR");
    const resultado=document.getElementById("resultadoISR");

    if(!salarioInput || !resultado){

        alert("No se encontró el formulario ISR.");
        return;

    }

    let salarioMensual=parseFloat(salarioInput.value);

    if(isNaN(salarioMensual) || salarioMensual<=0){

        resultado.innerHTML=`
        <p style="color:red;">
        Ingrese un salario válido.
        </p>
        `;

        return;

    }

    let salarioAnual=salarioMensual*12;

    let impuestoAnual=0;
    let tramo="Exento";

    // Tramos de ejemplo (puedes actualizarlos cuando cambien)

    if(salarioAnual<=416220){

        impuestoAnual=0;
        tramo="Exento";

    }

    else if(salarioAnual<=624329){

        impuestoAnual=(salarioAnual-416220)*0.15;
        tramo="15%";

    }

    else if(salarioAnual<=867123){

        impuestoAnual=31216+(salarioAnual-624329)*0.20;
        tramo="20%";

    }

    else{

        impuestoAnual=79776+(salarioAnual-867123)*0.25;
        tramo="25%";

    }

    const impuestoMensual=impuestoAnual/12;

    const salarioNeto=salarioMensual-impuestoMensual;

    resultado.innerHTML=`

    <h3>Resultado</h3>

    <p><strong>Salario mensual:</strong>
    ${formatoMoneda(salarioMensual)}
    </p>

    <p><strong>Salario anual:</strong>
    ${formatoMoneda(salarioAnual)}
    </p>

    <p><strong>Tramo:</strong>
    ${tramo}
    </p>

    <p><strong>ISR mensual:</strong>
    ${formatoMoneda(impuestoMensual)}
    </p>

    <p><strong>ISR anual:</strong>
    ${formatoMoneda(impuestoAnual)}
    </p>

    <p><strong>Salario neto:</strong>
    ${formatoMoneda(salarioNeto)}
    </p>

    `;

    // Guardar en historial si existe

    if(typeof guardarHistorial==="function"){

        guardarHistorial({

            tipo:"ISR",

            fecha:new Date().toLocaleString(),

            salarioMensual,

            salarioAnual,

            impuestoMensual,

            impuestoAnual,

            salarioNeto

        });

    }

}

/**
 * Limpiar formulario
 */

function limpiarISR(){

    const salario=document.getElementById("salarioISR");
    const resultado=document.getElementById("resultadoISR");

    if(salario){

        salario.value="";

    }

    if(resultado){

        resultado.innerHTML="";

    }

}

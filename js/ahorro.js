// ======================================
// Sistema de Gestión Fiscal RD
// Módulo Ahorro - Versión 3.1
// ======================================

/**
 * Formato de moneda RD$
 */
function formatoAhorro(valor){

    return Number(valor).toLocaleString("es-DO",{
        style:"currency",
        currency:"DOP",
        minimumFractionDigits:2
    });

}

/**
 * Calculadora de ahorro 50/30/20
 */
function calcularAhorro(){

    const ingresoInput=document.getElementById("ingresoAhorro");
    const resultado=document.getElementById("resultadoAhorro");

    if(!ingresoInput || !resultado){

        alert("No se encontró el formulario de ahorro.");
        return;

    }

    const ingreso=parseFloat(ingresoInput.value);

    if(isNaN(ingreso) || ingreso<=0){

        resultado.innerHTML=`
            <p style="color:red;">
                Ingrese un monto válido.
            </p>
        `;

        return;

    }

    const necesidades=ingreso*0.50;
    const deseos=ingreso*0.30;
    const ahorro=ingreso*0.20;

    resultado.innerHTML=`

        <h3>Distribución del ingreso</h3>

        <p>
            <strong>Ingreso:</strong>
            ${formatoAhorro(ingreso)}
        </p>

        <hr>

        <p>
            🏠 <strong>50% Necesidades:</strong><br>
            ${formatoAhorro(necesidades)}
        </p>

        <p>
            🎉 <strong>30% Gustos:</strong><br>
            ${formatoAhorro(deseos)}
        </p>

        <p>
            💰 <strong>20% Ahorro:</strong><br>
            ${formatoAhorro(ahorro)}
        </p>

    `;

    // Guardar historial
    if(typeof guardarHistorial==="function"){

        guardarHistorial({

            tipo:"AHORRO",

            fecha:new Date().toLocaleString(),

            ingreso,

            necesidades,

            deseos,

            ahorro

        });

    }

}

/**
 * Limpiar formulario
 */
function limpiarAhorro(){

    const ingreso=document.getElementById("ingresoAhorro");
    const resultado=document.getElementById("resultadoAhorro");

    if(ingreso){
        ingreso.value="";
    }

    if(resultado){
        resultado.innerHTML="";
    }

}

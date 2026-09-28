// =======================================
// Dashboard - Sistema de Gestión Fiscal RD
// Versión 3.0
// =======================================

// Verificar si el usuario inició sesión
document.addEventListener("DOMContentLoaded",()=>{

    const usuario=localStorage.getItem("usuarioActivo");

    if(!usuario){

        alert("Debe iniciar sesión.");

        window.location.href="login.html";

        return;

    }

    document.getElementById("contenido").innerHTML=`

        <h2>👋 Bienvenido</h2>

        <p>

        Has iniciado sesión correctamente.

        Selecciona uno de los módulos para comenzar.

        </p>

    `;

});

// Mostrar módulos
function mostrarModulo(modulo){

    const contenido=document.getElementById("contenido");

    if(modulo==="itbis"){

        contenido.innerHTML=`

            <h2>💰 Calculadora ITBIS</h2>

            <p>

            En la versión 3.1 aquí estará integrada la calculadora completa de ITBIS.

            </p>

        `;

    }

    else if(modulo==="isr"){

        contenido.innerHTML=`

            <h2>📈 Calculadora ISR</h2>

            <p>

            Aquí se mostrará el cálculo del ISR utilizando las tablas correspondientes.

            </p>

        `;

    }

    else if(modulo==="ahorro"){

        contenido.innerHTML=`

            <h2>💵 Plan de Ahorro</h2>

            <p>

            Organiza tus ingresos utilizando la regla 50 / 30 / 20.

            </p>

        `;

    }

    else if(modulo==="historial"){

        contenido.innerHTML=`

            <h2>📜 Historial</h2>

            <p>

            Aquí aparecerán todas las operaciones realizadas por el usuario.

            </p>

        `;

    }

}

// Cerrar sesión
function cerrarSesion(){

    if(confirm("¿Desea cerrar sesión?")){

        localStorage.removeItem("usuarioActivo");

        window.location.href="login.html";

    }

}

// =========================================
// Sistema de Gestión Fiscal RD
// login.js - Versión 3.0
// =========================================

// Usuario de demostración
const usuarioDemo = {
    correo: "admin@gestionfiscalrd.com",
    password: "123456"
};

// Esperar que cargue la página
document.addEventListener("DOMContentLoaded", () => {

    const formulario = document.getElementById("loginForm");

    formulario.addEventListener("submit", iniciarSesion);

});

// Función de inicio de sesión
function iniciarSesion(event){

    event.preventDefault();

    const correo = document.getElementById("correo").value.trim();

    const password = document.getElementById("password").value.trim();

    const mensaje = document.getElementById("mensaje");

    if(correo === "" || password === ""){

        mensaje.style.color = "#dc3545";
        mensaje.textContent = "Complete todos los campos.";

        return;

    }

    if(
        correo === usuarioDemo.correo &&
        password === usuarioDemo.password
    ){

        mensaje.style.color = "#198754";
        mensaje.textContent = "Inicio de sesión correcto.";

        localStorage.setItem("usuarioActivo", correo);

        setTimeout(() => {

            window.location.href = "dashboard.html";

        },1000);

    }else{

        mensaje.style.color = "#dc3545";
        mensaje.textContent = "Correo o contraseña incorrectos.";

    }

}

// Crear cuenta (próximamente)
function crearCuenta(){

    alert(
`La creación de cuentas estará disponible en la Versión 3.1.

Usuario de prueba:

Correo:
admin@gestionfiscalrd.com

Contraseña:
123456`
    );

}

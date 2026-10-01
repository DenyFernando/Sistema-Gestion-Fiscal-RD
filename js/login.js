// ======================================
// login.js
// Sistema de Gestión Fiscal RD v4.1
// ======================================

// Crear usuario administrador si no existe
if (!localStorage.getItem("usuariosFiscalRD")) {

    const usuarios = [
        {
            nombre: "Administrador",
            correo: "admin@gestionfiscalrd.com",
            password: "123456"
        }
    ];

    localStorage.setItem(
        "usuariosFiscalRD",
        JSON.stringify(usuarios)
    );
}

// Esperar que cargue la página
document.addEventListener("DOMContentLoaded", () => {

    document
        .getElementById("loginForm")
        .addEventListener("submit", iniciarSesion);

});

// ================================
// Iniciar sesión
// ================================

function iniciarSesion(e) {

    e.preventDefault();

    const correo = document
        .getElementById("correo")
        .value
        .trim();

    const password = document
        .getElementById("password")
        .value
        .trim();

    const mensaje = document.getElementById("mensaje");

    const usuarios = JSON.parse(
        localStorage.getItem("usuariosFiscalRD") || "[]"
    );

    const usuario = usuarios.find(u =>
        u.correo === correo &&
        u.password === password
    );

    if (!usuario) {

        mensaje.style.color = "red";
        mensaje.textContent =
            "Correo o contraseña incorrectos.";

        return;

    }

    localStorage.setItem(
        "usuarioActivo",
        JSON.stringify(usuario)
    );

    mensaje.style.color = "green";
    mensaje.textContent =
        "Inicio de sesión correcto.";

    setTimeout(() => {

        window.location.href = "dashboard.html";

    }, 1000);

}

// ================================
// Crear cuenta
// ================================

function crearCuenta() {

    const nombre = prompt("Nombre completo:");

    if (!nombre) return;

    const correo = prompt("Correo electrónico:");

    if (!correo) return;

    const password = prompt("Contraseña:");

    if (!password) return;

    let usuarios = JSON.parse(
        localStorage.getItem("usuariosFiscalRD") || "[]"
    );

    const existe = usuarios.find(
        u => u.correo === correo
    );

    if (existe) {

        alert("Ese correo ya está registrado.");

        return;

    }

    usuarios.push({

        nombre,
        correo,
        password

    });

    localStorage.setItem(
        "usuariosFiscalRD",
        JSON.stringify(usuarios)
    );

    alert(
        "Cuenta creada correctamente.\n\nYa puedes iniciar sesión."
    );

}

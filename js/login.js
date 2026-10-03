// ======================================
// login.js
// Sistema de Gestión Fiscal RD v4.1
// ======================================

document.addEventListener("DOMContentLoaded", () => {

    const formulario = document.getElementById("loginForm");

    if (formulario) {
        formulario.addEventListener("submit", iniciarSesion);
    }

});

// ===============================
// Iniciar sesión
// ===============================
function iniciarSesion(e) {

    e.preventDefault();

    const correo = document.getElementById("correo").value.trim().toLowerCase();
    const password = document.getElementById("password").value.trim();
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
        mensaje.textContent = "Correo o contraseña incorrectos.";

        return;
    }

    localStorage.setItem(
        "usuarioActivo",
        usuario.correo
    );

    mensaje.style.color = "green";
    mensaje.textContent = "Inicio de sesión correcto.";

    setTimeout(() => {
        window.location.href = "dashboard.html";
    }, 1000);

}

// ===============================
// Crear cuenta
// ===============================
function crearCuenta() {

    const nombre = prompt("Nombre completo:");

    if (!nombre) return;

    const correo = prompt("Correo electrónico:");

    if (!correo) return;

    const password = prompt("Contraseña:");

    if (!password) return;

    const usuarios = JSON.parse(
        localStorage.getItem("usuariosFiscalRD") || "[]"
    );

    const existe = usuarios.some(
        u => u.correo.toLowerCase() === correo.toLowerCase()
    );

    if (existe) {

        alert("Ese correo ya está registrado.");

        return;

    }

    usuarios.push({

        nombre: nombre,
        correo: correo.toLowerCase(),
        password: password

    });

    localStorage.setItem(
        "usuariosFiscalRD",
        JSON.stringify(usuarios)
    );

    alert("Cuenta creada correctamente.");

}

// ===============================
// Crear usuario administrador
// ===============================
(function () {

    const usuarios = JSON.parse(
        localStorage.getItem("usuariosFiscalRD") || "[]"
    );

    const existe = usuarios.some(
        u => u.correo === "admin@gestionfiscalrd.com"
    );

    if (!existe) {

        usuarios.push({

            nombre: "Administrador",
            correo: "admin@gestionfiscalrd.com",
            password: "123456"

        });

        localStorage.setItem(
            "usuariosFiscalRD",
            JSON.stringify(usuarios)
        );

    }

})();

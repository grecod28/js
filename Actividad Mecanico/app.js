// app.js

import { VehiculoController } from "./JS/Vehiculo/Vehiculo.controller.js";

// Instanciacion del controlador
const controller = new VehiculoController();

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("vehiculo-form");
  const feedbackDiv = document.getElementById("mensaje-feedback");
  const listaVehiculos = document.getElementById("vehiculos-list");
  const filtroMatricula = document.getElementById("filtroMatricula");
  const filtroEstado = document.getElementById("filtroEstado");

  const dialogoDatosVehiculo = document.getElementById("vehiculoDialog");
  const dialogoReparaciones = document.getElementById("reparacionesDialog");
  const formularioReparaciones = document.getElementById("reparacion-form");
  const selectMecanico = document.getElementById("mecanico-select");

  const botonesCerrarDialogo = document.querySelectorAll(".close-btn");

  let vehiculos = controller.listarVehiculos();

  botonesCerrarDialogo.forEach((button) => {
    button.addEventListener("click", () => {
      const parentElement = button.closest("dialog");
      parentElement.close();
    });
  });

  controller.listarMecanicos().forEach((mecanico) => {
    selectMecanico.innerHTML += `<option value="${mecanico}">${mecanico}</option>`;
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault(); // detiene el reinicio

    // Limpieza del feedback anterior
    feedbackDiv.classList.add("hidden");
    feedbackDiv.classList.remove("success", "error");
    feedbackDiv.textContent = "";

    // Recoge los datos del formulario
    const formData = {
      matricula: document.getElementById("matricula").value.trim(),
      marca: document.getElementById("marca").value.trim(),
      modelo: document.getElementById("modelo").value.trim(),
      year: document.getElementById("year").value, // Los números se envían como string, lo cual es normal
      nombreCliente: document.getElementById("nombreCliente").value.trim(),
      telefonoCliente: document.getElementById("telefonoCliente").value,
      descripcionProblemaCliente: document
        .getElementById("descripcionProblemaCliente")
        .value.trim(),
    };

    try {
      // Llama al método del controlador
      // La validación y el manejo de errores (alert) ocurren DENTRO del controlador,
      controller.registrarVehiculo(
        formData.matricula,
        formData.marca,
        formData.modelo,
        formData.year,
        formData.nombreCliente,
        formData.telefonoCliente,
        formData.descripcionProblemaCliente
      );

      feedbackDiv.classList.remove("hidden");
      feedbackDiv.classList.add("success");
      feedbackDiv.textContent = "✅ ¡Vehículo registrado con éxito!";
    } catch (error) {
      feedbackDiv.classList.remove("hidden");
      feedbackDiv.classList.add("error");
      feedbackDiv.textContent = `❌ Error en la aplicación: ${error.message}`;
    } finally {
      cargarVehiculos();
    }
  });

  formularioReparaciones.addEventListener("submit", (e) => {
    e.preventDefault();

    try {
      const mecanico = selectMecanico.value;
      const descripcion = document.getElementById("descripcion-real").value;
      const precio = document.getElementById("precio-reparacion").value;

      // Recuperar la matricula guardada
      const matriculaVehiculo = dialogoReparaciones.dataset.matricula;

      controller.marcarComoReparado(
        matriculaVehiculo,
        mecanico,
        descripcion,
        precio
      );
      vehiculos = controller.listarVehiculos();
      cargarVehiculos();

      dialogoReparaciones.close();
      formularioReparaciones.reset();
    } catch (err) {
      alert(err);
    }
  });

  cargarVehiculos();

  function cargarVehiculos(vh) {
    listaVehiculos.innerHTML = ``;
    filtroMatricula.innerHTML = `<option value="">-- Todas las Matriculas --</option>`;
    const lista = vh ?? vehiculos;

    lista.forEach((v) => {
      const li = document.createElement("li");
      li.innerHTML = `
            <div class="vehiculo-header">
                <span class="matricula">Matricula: ${v.matricula}</span>
                <span class="estado ${v.estado}">Esdado: ${v.estado}</span>
            </div>
            <p class="problema">${v.descripcionProblemaCliente}</p>
        `;

      filtroMatricula.innerHTML += `<option value="${v.matricula}">${v.matricula}</option>`;

      const botonVer = document.createElement("button");
      botonVer.textContent = "👁️";

      botonVer.addEventListener("click", () => {
        document.getElementById("matricula-data").textContent = v.matricula;
        document.getElementById("marca-data").textContent = v.marca;
        document.getElementById("modelo-data").textContent = v.modelo;
        document.getElementById("year-data").textContent = v.year;
        document.getElementById("nombreCliente-data").textContent =
          v.nombreCliente;
        document.getElementById("telefonoCliente-data").textContent =
          v.telefonoCliente;
        document.getElementById("descripcion-data").textContent =
          v.descripcionProblemaCliente;
        document.getElementById("estado-data").textContent =
          controller.getEstadoKey(v.estado);

        dialogoDatosVehiculo.showModal();
      });
      li.appendChild(botonVer);

      const botonEmpezarReparacion = document.createElement("button");
      botonEmpezarReparacion.textContent = "🔧";
      botonEmpezarReparacion.addEventListener("click", () => {
        try {
          controller.marcarComoEnReparacion(v.matricula);
          vehiculos = controller.listarVehiculos();
          cargarVehiculos();
        } catch (err) {
          alert(err);
        }
      });
      li.appendChild(botonEmpezarReparacion);

      const botonReparar = document.createElement("button");
      botonReparar.textContent = "🛠️";
      botonReparar.addEventListener("click", () => {
        try {
          dialogoReparaciones.showModal();
          dialogoReparaciones.dataset.matricula = v.matricula;
        } catch (err) {
          alert(err);
        }
      });
      li.appendChild(botonReparar);

      const botonEntregar = document.createElement("button");
      botonEntregar.textContent = "🚚";
      botonEntregar.addEventListener("click", () => {
        try {
          controller.marcarComoRecogido(v.matricula);
          vehiculos = controller.listarVehiculos();
          cargarVehiculos();
        } catch (err) {
          alert(err);
        }
      });

      li.appendChild(botonEntregar);

      listaVehiculos.appendChild(li);
    });
  }

  // Filtrar al cambiar el select
  filtroMatricula.addEventListener("change", () => {
    const valor = filtroMatricula.value;

    if (valor === "") {
      cargarVehiculos(); // mostrar todos
    } else {
      const filtrados = vehiculos.filter((v) => v.matricula === valor);
      cargarVehiculos(filtrados);
    }

    // Forzar que siempre haya un "cambio" detectado
    filtroMatricula.value = "default";
  });

  filtroEstado.addEventListener("change", () => {
    const valor = filtroEstado.value;

    if (valor === "") {
      cargarVehiculos(); // mostrar todos
    } else {
      const filtrados = vehiculos.filter((v) => v.estado === valor);
      cargarVehiculos(filtrados);
    }

    // Forzar que siempre haya un "cambio" detectado
    filtroEstado.value = "default";
  });
});

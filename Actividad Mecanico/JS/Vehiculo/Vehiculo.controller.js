import { Reparacion } from "./Reparacion/Reparacion.js";
import { Vehiculo } from "./Vehiculo.js";
import { VehiculoModel } from "./Vehiculo.model.js";

// Interactua con cliente, sirve de intermediario
export class VehiculoController {
  constructor() {
    this.model = new VehiculoModel();
  }

  registrarVehiculo(
    matricula,
    marca,
    modelo,
    year,
    nombreCliente,
    telefonoCliente,
    descripcionProblemaCliente
  ) {
    Vehiculo.validateSchema(
      matricula,
      marca,
      modelo,
      year,
      nombreCliente,
      telefonoCliente,
      descripcionProblemaCliente
    );

    const nuevoVehiculo = new Vehiculo(
      matricula,
      marca,
      modelo,
      year,
      nombreCliente,
      telefonoCliente,
      descripcionProblemaCliente
    );

    this.model.guardarVehiculo(nuevoVehiculo);
  }

  listarVehiculos() {
    return this.model.obtenerVehiculos();
  }

  listarMecanicos() {
    return Reparacion.posiblesMecanicos;
  }

  marcarComoRecogido(matricula) {
    return this.model.recogerVehiculo(matricula);
  }

  marcarComoEnReparacion(matricula) {
    return this.model.empezarReparacion(matricula);
  }

  marcarComoReparado(matriculaVehiculo, mecanico, descripcion, precio) {
    Reparacion.validateSchema(descripcion, mecanico, precio);
    return this.model.repararVehiculo(matriculaVehiculo);
  }

  getEstadoKey(estado) {
    return Object.keys(Vehiculo.estadosPosibles).find(
      (key) => Vehiculo.estadosPosibles[key] === estado
    );
  }
}

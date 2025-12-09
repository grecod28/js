import { Reparacion } from "./Reparacion/Reparacion.js";
import { Vehiculo } from "./Vehiculo.js";

export class VehiculoModel {
  key = "array_vehiculos";
  listaVehiculos = [];

  constructor() {
    this.cargarLista();
  }

  guardarVehiculo(vehiculo) {
    if (this.listaVehiculos.some((vh) => vh.matricula === vehiculo.matricula))
      throw new Error("No se pueden repetir matriculas");

    this.listaVehiculos.push(vehiculo);
    this.guardarLista();
  }

  obtenerVehiculos() {
    return this.listaVehiculos;
  }

  obtenerDatosVehiculo(matricula) {
    return this.listaVehiculos.find(
      (vehiculo) => vehiculo.matricula === matricula
    );
  }

  recogerVehiculo(matricula) {
    let nuevoArray = this.listaVehiculos.map((vehiculo) => {
      // Si el ID es 1, devuelve un nuevo objeto con el precio actualizado

      if (vehiculo.matricula === matricula) {
        if (vehiculo.estado !== Vehiculo.estadosPosibles.arreglado)
          throw new Error("No se puede entregar un vehiculo sin arreglar");

        return { ...vehiculo, estado: Vehiculo.estadosPosibles.recogido }; // Sobreescritura del objeto
      }

      // Si no, devuelve el objeto original
      return vehiculo;
    });

    this.listaVehiculos = nuevoArray;
  }

  repararVehiculo(matricula, descripcion, nombreMecanico, precio) {
    let nuevoArray = this.listaVehiculos.map((vehiculo) => {
      // Si el ID es 1, devuelve un nuevo objeto con el precio actualizado

      if (vehiculo.matricula === matricula) {
        if (vehiculo.estado !== Vehiculo.estadosPosibles.paraArreglar)
          throw new Error(
            "No se puede reparar un vehiculo que no esté para reparar"
          );

        const nuevaReparacion = new Reparacion(
          descripcion,
          nombreMecanico,
          precio
        );

        return {
          ...vehiculo,
          reparaciones: [...vehiculo.reparaciones, nuevaReparacion],
          estado: Vehiculo.estadosPosibles.recogido,
        }; // Sobreescritura del objeto
      }

      // Si no, devuelve el objeto original
      return vehiculo;
    });

    this.listaVehiculos = nuevoArray;
  }

  guardarLista() {
    localStorage.setItem(this.key, JSON.stringify(this.listaVehiculos));
  }
  cargarLista() {
    this.listaVehiculos = JSON.parse(localStorage.getItem(this.key)) ?? [];
  }
}

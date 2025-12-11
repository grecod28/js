export class Reparacion {
  static posiblesMecanicos = ["Santiago", "Andres", "Adrian", "Johan"];

  constructor(descripcionReal, nombreMecanico, precio) {
    this.descripcionReal = descripcionReal;
    this.nombreMecanico = nombreMecanico;
    this.precio = precio;
  }

  static validateSchema(descripcionReal, nombreMecanico, precio) {
    if (
      typeof descripcionReal !== "string" &&
      !(descripcionReal instanceof String) &&
      matricula.trim().length === 0
    )
      throw new Error("Matricula invalida");

    if (
      typeof nombreMecanico !== "string" &&
      !(nombreMecanico instanceof String)
    )
      throw new Error("Nombre mecanico debe ser un string");

    if (
      !Reparacion.posiblesMecanicos.some(
        (nombre) => nombre.toLowerCase() === nombreMecanico.toLowerCase()
      )
    )
      throw new Error("Nombre mecanico debe estar en la lista");

    if (isNaN(parseFloat(precio)) || parseFloat(precio) < 0)
      throw new Error("Precio invalido");
  }
}

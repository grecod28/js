export class Vehiculo {
  static estadosPosibles = {
    paraArreglar: "P",
    arreglado: "A",
    recogido: "R",
  };

  constructor(
    matricula,
    marca,
    modelo,
    year,
    nombreCliente,
    telefonoCliente,
    descripcionProblemaCliente
  ) {
    this.matricula = matricula;
    this.marca = marca;
    this.modelo = modelo;
    this.year = year;
    this.nombreCliente = nombreCliente;
    this.telefonoCliente = telefonoCliente;
    this.descripcionProblemaCliente = descripcionProblemaCliente;
    this.estado = Vehiculo.estadosPosibles.paraArreglar;
    this.reparacions = [];
  }

  // Valida la estructura de la matricula
  static validateSchema(
    matricula,
    marca,
    modelo,
    year,
    nombreCliente,
    telefonoCliente,
    descripcionProblemaCliente
  ) {
    if (
      typeof matricula !== "string" &&
      !(matricula instanceof String) &&
      matricula.trim().length === 0
    )
      throw new Error("Matricula invalida");

    if (typeof marca !== "string" && !(marca instanceof String))
      throw new Error("Marca invalida");

    if (typeof modelo !== "string" && !(modelo instanceof String))
      throw new Error("Modelo invalido");

    if (isNaN(parseInt(year)) || parseInt(year) < 0)
      throw new Error("Año invalido");

    if (typeof nombreCliente !== "string" && !(nombreCliente instanceof String))
      throw new Error("Cliente invalido");

    if (isNaN(parseInt(telefonoCliente))) throw new Error("telefono invalido");

    if (
      typeof descripcionProblemaCliente !== "string" &&
      !(descripcionProblemaCliente instanceof String)
    )
      throw new Error("Descripcion invalida");
  }

  // Valida la estructura de la matricula
  static validateOptionalSchema(
    marca,
    modelo,
    year,
    nombreCliente,
    telefonoCliente,
    descripcionProblemaCliente
  ) {
    if (marca !== undefined) {
      if (typeof marca !== "string")
        throw new Error("Marca invalida (debe ser un string)");
    }

    if (modelo !== undefined) {
      if (typeof modelo !== "string")
        throw new Error("Modelo invalido (debe ser un string)");
    }

    if (year !== undefined) {
      if (
        isNaN(parseInt(year)) ||
        (typeof year === "string" && year.trim() === "")
      ) {
        throw new Error("Año invalido (debe ser un número)");
      }
    }

    if (nombreCliente !== undefined) {
      if (typeof nombreCliente !== "string")
        throw new Error("Nombre de Cliente invalido (debe ser un string)");
    }

    if (telefonoCliente !== undefined) {
      if (
        isNaN(parseInt(telefonoCliente)) ||
        (typeof telefonoCliente === "string" && telefonoCliente.trim() === "")
      ) {
        throw new Error("Teléfono invalido (debe ser un número)");
      }
    }

    if (descripcionProblemaCliente !== undefined) {
      if (typeof descripcionProblemaCliente !== "string")
        throw new Error("Descripcion invalida (debe ser un string)");
    }
  }
}

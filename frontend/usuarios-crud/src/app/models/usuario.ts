
export class Usuario {
  id?: number;
  nombre: string;
  correo: string;
  edad: number;


  constructor(nombre: string, correo: string, edad: number) {
    this.nombre = nombre;
    this.correo = correo;
    this.edad = edad;
  }
}

import { NgModel } from "@angular/forms";

export class Usuario {
  _id?: number;
  nombre: string;
  correo: string;
  edad: number;


  constructor(nombre: string, correo: string, edad: number) {
    this.nombre = nombre;
    this.correo = correo;
    this.edad = edad;
  }
}

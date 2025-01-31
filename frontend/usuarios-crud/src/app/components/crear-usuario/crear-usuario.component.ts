import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-crear-usuario',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule],
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css']
})
export class CrearUsuarioComponent {

  usuarioForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private http: HttpClient) {
    this.usuarioForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      correo: ['', [Validators.required, Validators.email]],
      edad: ['', [Validators.required, Validators.min(18), Validators.pattern(/^\d+$/)]]
    });
  }

  navigateToListarUsuario() {
    this.router.navigate(['']);
  }

  guardarUsuario() {
    if (this.usuarioForm.valid) {
      const usuarioData = this.usuarioForm.value;

      // Realizamos la solicitud POST al backend
      this.http.post('http://localhost:3000/api/data', usuarioData)
        .subscribe(
          (response) => {
            
            Swal.fire({
              title: '¡Usuario creado!',
              text: 'El usuario se ha creado correctamente.',
              icon: 'success',
              confirmButtonText: 'Aceptar'
            }).then(() => {

              this.navigateToListarUsuario();
            });
          },
          (error) => {

            Swal.fire({
              title: 'Error',
              text: 'Hubo un error al guardar el usuario.',
              icon: 'error',
              confirmButtonText: 'Aceptar'
            });
            console.error('Error al guardar el usuario:', error);
          }
        );
    } else {
      console.log('Formulario no válido');
      this.usuarioForm.markAllAsTouched();
    }
  }
}

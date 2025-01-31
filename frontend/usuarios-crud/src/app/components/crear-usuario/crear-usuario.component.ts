import { Component, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-crear-usuario',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css']
})
export class CrearUsuarioComponent {

  usuarioForm: FormGroup;
  titulo = 'Crear usuario';
  id: string | null;
  usuario: any;

  constructor(private fb: FormBuilder, private router: Router, private http: HttpClient, private aRouter: ActivatedRoute,  private _usuarioService: UsuarioService) {
    this.usuarioForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      correo: ['', [Validators.required, Validators.email]],
      edad: ['', [Validators.required, Validators.min(18), Validators.pattern(/^\d+$/)]]
    });

    this.id = this.aRouter.snapshot.paramMap.get('id')
  }

  ngOnInit(): void {
    this.esEditar()
  }

  navigateToListarUsuario() {
    this.router.navigate(['']);
  }

  guardarUsuario() {
    if (this.usuarioForm.valid) {
      const usuarioData = this.usuarioForm.value;

      if (this.id === null) {

        this.http.post('http://localhost:3000/api/data', usuarioData).subscribe(
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
          
            console.error('Error al crear usuario:', error);
            Swal.fire({
              title: 'Error',
              text: 'Hubo un error al crear el usuario.',
              icon: 'error',
              confirmButtonText: 'Aceptar'
            });
          }
        );
      } else {

        this.http.put(`http://localhost:3000/api/data/${this.id}`, usuarioData).subscribe(
          (response) => {
            Swal.fire({
              title: '¡Usuario actualizado!',
              text: 'El usuario se ha actualizado correctamente.',
              icon: 'success',
              confirmButtonText: 'Aceptar'
            }).then(() => {
              this.navigateToListarUsuario();
            });
          },
          (error) => {

            console.error('Error al actualizar usuario:', error);
            Swal.fire({
              title: 'Error',
              text: 'Hubo un error al actualizar el usuario.',
              icon: 'error',
              confirmButtonText: 'Aceptar'
            });
          }
        );
      }
    } else {
      console.log('Formulario no válido');
      this.usuarioForm.markAllAsTouched();
    }
  }

  esEditar() {
    if (this.id !== null) {
      this.titulo = 'Editar usuario';
      this._usuarioService.obtenerUsuario(this.id).subscribe(
        (data: any) => {
          console.log(data)
          this.usuario = data
          this.usuarioForm.patchValue({
            nombre: data.nombre,
            correo: data.correo,
            edad: data.edad
          });
        },
        (error) => {
          console.error("Error al obtener usuario:", error);

        }
      );
    }
  }
}

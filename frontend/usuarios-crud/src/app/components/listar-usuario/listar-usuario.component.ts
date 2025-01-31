import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';  // Para la navegación
import { RouterModule } from '@angular/router';
import { CommonModule,  } from '@angular/common';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario';  
import Swal from 'sweetalert2';


@Component({
  selector: 'app-listar-usuario',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './listar-usuario.component.html',
  styleUrls: ['./listar-usuario.component.css']
})
export class ListarUsuarioComponent implements OnInit {

  usuarios: Usuario[] = [];

  constructor(private router: Router, private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.obtenerUsuarios();
  }

  // Función para navegar a la página de creación de usuario
  navigateToCrearUsuario(): void {
    this.router.navigate(['/crear-usuario']);
  }

  // Función para obtener usuarios desde el servicio
  obtenerUsuarios(): void {
    this.usuarioService.obtenerUsuarios().subscribe(
      (data: Usuario[]) => {
        this.usuarios = data;
        console.log(data);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  eliminarUsuario(id: string): void {
    Swal.fire({
      title: '¿Estás seguro de eliminar este usuario?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.eliminarUsuario(id).subscribe({
          next: (data) => {
            Swal.fire(
              '¡Eliminado!',
              'El usuario ha sido eliminado.',
              'success'
            );

            this.obtenerUsuarios();
          },
          error: (error) => {
            console.error('Error al eliminar usuario:', error);
            Swal.fire(
              'Error',
              'No se pudo eliminar el usuario.',
              'error'
            );
          }
        });
      }
    });
  }

}



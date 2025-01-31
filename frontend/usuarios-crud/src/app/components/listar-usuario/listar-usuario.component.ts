import { Component } from '@angular/core';
import { Router } from '@angular/router';  // Asegúrate de importar Router

@Component({
  selector: 'app-listar-usuario',
  templateUrl: './listar-usuario.component.html',
  styleUrls: ['./listar-usuario.component.css']
})
export class ListarUsuarioComponent {

  constructor(private router: Router) {}

  // Función para navegar a la página de creación de usuario
  navigateToCrearUsuario(): void {
    this.router.navigate(['/crear-usuario']);  // Esto redirige a la ruta de crear-usuario
  }

}

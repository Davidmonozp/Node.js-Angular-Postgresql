import { Routes } from '@angular/router';
import { ListarUsuarioComponent } from './components/listar-usuario/listar-usuario.component';
import { CrearUsuarioComponent } from './components/crear-usuario/crear-usuario.component';


export const routes: Routes = [
   { path: '', component: ListarUsuarioComponent },
    { path: 'crear-usuario', component: CrearUsuarioComponent },
    { path: 'editar-usuario/:id', component: CrearUsuarioComponent },
    { path: '**', redirectTo: '', pathMatch: 'full'}
];



import { Routes } from '@angular/router';
import { WelcomeComponent } from './features/welcome/welcome.component';

export const routes: Routes = [
  {
    path: '',
    component: WelcomeComponent,
    title: 'Bienvenido - WoW Armory'
  },
  {
    path: 'search',
    loadComponent: () => 
      import('./features/search/search.component').then(m => m.SearchComponent),
    title: 'Buscar Personaje - WoW Armory'
  },
  // {
  //   path: 'character/:realm/:name',
  //   loadComponent: () => 
  //     import('./features/character/character.component').then(m => m.CharacterComponent),
  //   title: 'Detalles del Personaje - WoW Armory'
  // },
  {
    path: '**',
    redirectTo: ''
  }
];

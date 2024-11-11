import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  {
    path: 'vehicles',
    loadComponent: () => 
      import('./vehicles/vehicle-shell/vehicle-shell.component').then(c => c.VehicleShellComponent)
  },
  {
    path: 'cart',
    loadComponent: () => 
      import('./cart/cart-shell/cart-shell.component').then(c => c.CartShellComponent)
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

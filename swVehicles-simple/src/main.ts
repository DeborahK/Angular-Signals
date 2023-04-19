import 'zone.js/dist/zone';
import { Component, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { VehicleShellComponent } from './app/vehicles/vehicle-shell.component';
import {  provideHttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'sw-app',
  standalone: true,
  imports: [CommonModule, VehicleShellComponent],
  template: `
    <h1>{{ pageTitle }}</h1>
    <div class="container">
      <sw-vehicle-shell></sw-vehicle-shell>
    </div>
  `
})
export class App {
  pageTitle = 'Star Wars Vehicle Sales';
}

bootstrapApplication(App, {
  providers: [provideHttpClient(),  importProvidersFrom(FormsModule)]
})
  .catch(err => console.error(err));


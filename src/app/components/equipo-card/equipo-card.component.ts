import { Component, Input } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Equipo } from '../../models/equipo.model';

@Component({
  selector: 'app-equipo-card',
  template: `
    <!-- Tarjeta de Ionic para mostrar los datos clave -->
    <ion-card>
      <ion-card-header>
        <ion-card-title>{{ equipo.nombre }}</ion-card-title>
        <ion-card-subtitle>{{ equipo.marca }} - {{ equipo.modelo }}</ion-card-subtitle>
      </ion-card-header>
      <ion-card-content>
        <p><strong>N/S:</strong> {{ equipo.numeroSerie }}</p>
        
        <div class="actions">
          <!-- Botón que navega al detalle usando el ID del equipo -->
          <ion-button fill="clear" [routerLink]="['/equipo-detalle', equipo.id]">
            Ver Detalles
          </ion-button>
        </div>
      </ion-card-content>
    </ion-card>
  `,
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule]
})
export class EquipoCardComponent {
  // Recibe la información del equipo desde la página padre
  @Input({ required: true }) equipo!: Equipo; 
}
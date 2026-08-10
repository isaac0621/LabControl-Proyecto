import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, 
  IonButton, IonIcon, IonBadge, IonItem, IonLabel
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { createOutline, trashOutline } from 'ionicons/icons';
import { Equipo } from '../../models/equipo.model';

@Component({
  selector: 'app-equipo-card',
  templateUrl: './equipo-card.component.html',
  styleUrls: ['./equipo-card.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, 
    IonButton, IonIcon, IonBadge, IonItem, IonLabel
  ]
})
export class EquipoCardComponent {
  @Input({ required: true }) equipo!: Equipo;
  @Output() editar = new EventEmitter<number>();
  @Output() eliminar = new EventEmitter<number>();

  constructor() {
    addIcons({ createOutline, trashOutline });
  }

  onEditar() {
    if (this.equipo.idEquipo) {
      this.editar.emit(this.equipo.idEquipo);
    }
  }

  onEliminar() {
    if (this.equipo.idEquipo) {
      this.eliminar.emit(this.equipo.idEquipo);
    }
  }

  getColorEstado(estado: string | undefined): string {
    if (!estado) return 'medium';
    const est = estado.toLowerCase();
    if (est.includes('disponible')) return 'success';
    if (est.includes('prestado') || est.includes('préstamo')) return 'warning';
    if (est.includes('mantenimiento') || est.includes('revisión')) return 'danger';
    return 'primary';
  }
}

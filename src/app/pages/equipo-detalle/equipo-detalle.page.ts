import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton,
  IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent,
  IonBadge, IonSpinner, IonIcon, IonItem, IonLabel, IonList
} from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';
import { EquipoService } from '../../services/equipo.service';
import { Equipo } from '../../models/equipo.model';
import { addIcons } from 'ionicons';
import { alertCircleOutline } from 'ionicons/icons';

@Component({
  selector: 'app-equipo-detalle',
  templateUrl: './equipo-detalle.page.html',
  styleUrls: ['./equipo-detalle.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,
    IonButtons, IonBackButton, IonCard, IonCardHeader, IonCardTitle, 
    IonCardSubtitle, IonCardContent, IonBadge, IonSpinner, IonIcon,
    IonItem, IonLabel, IonList
  ]
})
export class EquipoDetallePage implements OnInit {
  private route = inject(ActivatedRoute);
  private equipoService = inject(EquipoService);

  equipo: Equipo | null = null;
  isLoading = true;
  hasError = false;

  constructor() {
    addIcons({ alertCircleOutline });
  }

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      const id = parseInt(idParam, 10);
      this.cargarEquipo(id);
    } else {
      this.isLoading = false;
      this.hasError = true;
    }
  }

  cargarEquipo(id: number) {
    this.isLoading = true;
    this.hasError = false;
    this.equipoService.getEquipo(id).subscribe({
      next: (data) => {
        this.equipo = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error al cargar equipo:', err);
        this.hasError = true;
        this.isLoading = false;
      }
    });
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

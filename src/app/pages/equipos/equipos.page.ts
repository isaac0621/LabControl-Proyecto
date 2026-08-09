import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent, IonHeader, IonTitle, IonToolbar, IonSearchbar,
  IonRefresher, IonRefresherContent, IonCard, IonCardHeader,
  IonCardTitle, IonCardSubtitle, IonCardContent, IonButton,
  IonIcon, IonSpinner, IonBadge, IonFab, IonFabButton,
  AlertController, ToastController
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { add, createOutline, trashOutline, eyeOutline, alertCircleOutline } from 'ionicons/icons';
import { EquipoService } from '../../services/equipo.service';
import { Equipo } from '../../models/equipo.model';
import { finalize } from 'rxjs/operators';
// If routing is needed
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-equipos',
  templateUrl: './equipos.page.html',
  styleUrls: ['./equipos.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,
    IonSearchbar, IonRefresher, IonRefresherContent, IonCard, IonCardHeader,
    IonCardTitle, IonCardSubtitle, IonCardContent, IonButton, IonIcon,
    IonSpinner, IonBadge, IonFab, IonFabButton,
    RouterModule
  ]
})
export class EquiposPage implements OnInit {
  private equipoService = inject(EquipoService);
  private alertController = inject(AlertController);
  private toastController = inject(ToastController);
  private router = inject(Router);

  equipos: Equipo[] = [];
  filteredEquipos: Equipo[] = [];
  
  isLoading = false;
  hasError = false;
  searchTerm = '';

  constructor() {
    addIcons({ add, createOutline, trashOutline, eyeOutline, alertCircleOutline });
  }

  ngOnInit() {
    this.loadEquipos();
  }

  loadEquipos(event?: any) {
    if (!event) {
      this.isLoading = true;
    }
    this.hasError = false;

    this.equipoService.getEquipos()
      .pipe(
        finalize(() => {
          this.isLoading = false;
          if (event) {
            event.target.complete();
          }
        })
      )
      .subscribe({
        next: (data) => {
          this.equipos = data;
          this.filterEquipos();
        },
        error: (err) => {
          console.error('Error al cargar equipos', err);
          this.hasError = true;
          this.showToast('Error de conexión al cargar los equipos. Intente nuevamente.', 'danger');
        }
      });
  }

  handleRefresh(event: any) {
    this.loadEquipos(event);
  }

  onSearchChange(event: any) {
    this.searchTerm = event.detail.value || '';
    this.filterEquipos();
  }

  filterEquipos() {
    if (!this.searchTerm.trim()) {
      this.filteredEquipos = [...this.equipos];
      return;
    }
    const term = this.searchTerm.toLowerCase();
    this.filteredEquipos = this.equipos.filter(
      eq => eq.nombreEquipo.toLowerCase().includes(term) || eq.codigo.toLowerCase().includes(term)
    );
  }

  verDetalle(equipo: Equipo) {
    // Asumiendo que la ruta de detalle es /tabs/equipo-detalle/:id o similar
    // this.router.navigate(['/tabs/equipo-detalle', equipo.idEquipo]);
    console.log('Ver detalle:', equipo.idEquipo);
  }

  editarEquipo(equipo: Equipo) {
    // Asumiendo que la ruta de edición es /tabs/equipo-form/:id
    // this.router.navigate(['/tabs/equipo-form', equipo.idEquipo]);
    console.log('Editar equipo:', equipo.idEquipo);
  }

  async confirmarEliminar(equipo: Equipo) {
    const alert = await this.alertController.create({
      header: 'Confirmar Eliminación',
      message: `¿Estás seguro que deseas eliminar el equipo <strong>${equipo.codigo}</strong>?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: () => {
            this.eliminarEquipo(equipo);
          }
        }
      ]
    });

    await alert.present();
  }

  private eliminarEquipo(equipo: Equipo) {
    if (!equipo.idEquipo) return;
    
    this.isLoading = true;
    this.equipoService.deleteEquipo(equipo.idEquipo)
      .pipe(
        finalize(() => this.isLoading = false)
      )
      .subscribe({
        next: () => {
          this.showToast('Equipo eliminado exitosamente', 'success');
          this.loadEquipos();
        },
        error: (err) => {
          console.error('Error al eliminar', err);
          // Manejo de errores por dependencias (ej. 409 Conflict o 400 Bad Request)
          let mensaje = 'No se pudo eliminar el equipo. ';
          if (err.status === 409 || err.status === 400) {
            mensaje += 'Es posible que tenga dependencias o préstamos asociados.';
          } else {
            mensaje += 'Ocurrió un error en el servidor.';
          }
          this.showToast(mensaje, 'danger');
        }
      });
  }

  async showToast(message: string, color: 'success' | 'danger' | 'warning') {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      color,
      position: 'bottom'
    });
    await toast.present();
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

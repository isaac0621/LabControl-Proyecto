import { Component, inject, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { 
  IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, 
  IonContent, IonList, IonListHeader, IonLabel, IonItem, 
  IonInput, IonTextarea, IonSelect, IonSelectOption, IonToggle, 
  IonButton, IonIcon, ToastController, NavController 
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { saveOutline } from 'ionicons/icons';

// Modelos
import { Equipo } from '../../models/equipo.model';

// Servicios
import { EquipoService } from '../../services/equipo.service';

@Component({
  selector: 'app-equipo-form',
  templateUrl: './equipo-form.page.html',
  styleUrls: ['./equipo-form.page.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, 
    IonContent, IonList, IonListHeader, IonLabel, IonItem, 
    IonInput, IonTextarea, IonSelect, IonSelectOption, IonToggle, 
    IonButton, IonIcon
  ]
})
export class EquipoFormPage {
  @ViewChild('equipoForm', { static: false }) equipoForm!: NgForm;

  // Inyección de dependencias usando la función inject()
  private equipoService = inject(EquipoService);
  private toastCtrl = inject(ToastController);
  private navCtrl = inject(NavController);

  categorias = [
    { idCategoria: 1, nombreCategoria: 'Laptop' },
    { idCategoria: 2, nombreCategoria: 'Monitor' },
    { idCategoria: 3, nombreCategoria: 'Mouse' },
    { idCategoria: 4, nombreCategoria: 'Proyector' }
  ];

  ubicaciones = [
    { idUbicacion: 1, nombreUbicacion: 'Laboratorio 1' },
    { idUbicacion: 2, nombreUbicacion: 'Laboratorio 2' },
    { idUbicacion: 3, nombreUbicacion: 'Bodega' }
  ];

  estadosEquipo = [
    { idEstadoEquipo: 1, nombreEstado: 'Disponible' },
    { idEstadoEquipo: 2, nombreEstado: 'En Uso' },
    { idEstadoEquipo: 3, nombreEstado: 'En Reparación' }
  ];

  // Objeto del formulario
  equipo: Equipo = this.getInitialEquipo();

  constructor() {
    addIcons({ saveOutline });
  }

  // Inicializa un equipo vacío
  getInitialEquipo(): Equipo {
    return {
      codigo: '',
      nombreEquipo: '',
      descripcion: '',
      marca: '',
      modelo: '',
      serie: '',
      numeroActivo: '',
      fechaCompra: null,
      valorEstimado: null,
      fotoUrl: '',
      observaciones: '',
      activo: true,
      idCategoria: 0,
      idUbicacion: 0,
      idEstadoEquipo: 0
    };
  }

  // Guardar el equipo mediante POST
  guardarEquipo() {
    // Validación básica: campos requeridos y que no estén solo con espacios
    if (
      this.equipoForm?.invalid ||
      !this.equipo.codigo?.trim() ||
      !this.equipo.nombreEquipo?.trim() ||
      !this.equipo.idCategoria ||
      !this.equipo.idUbicacion ||
      !this.equipo.idEstadoEquipo
    ) {
      this.mostrarToast('Por favor, completa todos los campos obligatorios.', 'warning');
      return;
    }

    // Enviar el DTO a la API
    this.equipoService.createEquipo(this.equipo).subscribe({
      next: () => {
        this.mostrarToast('Equipo guardado exitosamente', 'success');
        this.equipoForm.resetForm(this.getInitialEquipo());
        // Regresar a la página anterior
        this.navCtrl.back();
      },
      error: (err) => {
        console.error('Error guardando equipo:', err);
        this.mostrarToast('Error al guardar el equipo. Inténtalo de nuevo.', 'danger');
      }
    });
  }

  // Método utilitario para mostrar mensajes Toast
  async mostrarToast(mensaje: string, color: 'success' | 'warning' | 'danger') {
    const toast = await this.toastCtrl.create({
      message: mensaje,
      duration: 3000,
      color: color,
      position: 'bottom',
      buttons: [{ text: 'OK', role: 'cancel' }]
    });
    await toast.present();
  }
}

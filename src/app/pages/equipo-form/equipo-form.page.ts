import { Component, OnInit, inject, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { IonicModule, ToastController, NavController } from '@ionic/angular';

// Modelos
import { Equipo } from '../../models/equipo.model';
import { Categoria } from '../../models/categoria.model';
import { Ubicacion } from '../../models/ubicacion.model';
import { EstadoEquipo } from '../../models/estado-equipo.model';

// Servicios
import { EquipoService } from '../../services/equipo.service';
import { CategoriaService } from '../../services/categoria.service';
import { UbicacionService } from '../../services/ubicacion.service';
import { EstadoEquipoService } from '../../services/estado-equipo.service';

@Component({
  selector: 'app-equipo-form',
  templateUrl: './equipo-form.page.html',
  styleUrls: ['./equipo-form.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})
export class EquipoFormPage implements OnInit {
  @ViewChild('equipoForm', { static: false }) equipoForm!: NgForm;

  // Inyección de dependencias
  private equipoService = inject(EquipoService);
  private categoriaService = inject(CategoriaService);
  private ubicacionService = inject(UbicacionService);
  private estadoEquipoService = inject(EstadoEquipoService);
  private toastCtrl = inject(ToastController);
  private navCtrl = inject(NavController);

  // Señales para los catálogos
  categorias = signal<Categoria[]>([]);
  ubicaciones = signal<Ubicacion[]>([]);
  estadosEquipo = signal<EstadoEquipo[]>([]);

  // Objeto del formulario
  equipo: Equipo = this.getInitialEquipo();

  ngOnInit() {
    this.cargarCatalogos();
  }

  // Método para cargar los catálogos en los selects
  cargarCatalogos() {
    this.categoriaService.getCategorias().subscribe({
      next: (data) => this.categorias.set(data),
      error: () => this.mostrarToast('Error al cargar categorías', 'danger')
    });

    this.ubicacionService.getUbicaciones().subscribe({
      next: (data) => this.ubicaciones.set(data),
      error: () => this.mostrarToast('Error al cargar ubicaciones', 'danger')
    });

    this.estadoEquipoService.getEstadosEquipo().subscribe({
      next: (data) => this.estadosEquipo.set(data),
      error: () => this.mostrarToast('Error al cargar estados', 'danger')
    });
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

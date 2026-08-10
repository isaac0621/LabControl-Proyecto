import { Component, OnInit, inject, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { IonicModule, LoadingController, ToastController, AlertController, NavController } from '@ionic/angular';

import { EquipoService } from '../services/equipo.service';
import { CategoriaService } from '../services/categoria.service';
import { UbicacionService } from '../services/ubicacion.service';
import { EstadoEquipoService } from '../services/estado-equipo.service';

import { Equipo } from '../models/equipo.model';
import { Categoria } from '../models/categoria.model';
import { Ubicacion } from '../models/ubicacion.model';
import { EstadoEquipo } from '../models/estado-equipo.model';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule] 
})
export class Tab2Page implements OnInit {
  @ViewChild('equipoForm', { static: false }) equipoForm!: NgForm;

  private equipoService = inject(EquipoService);
  private categoriaService = inject(CategoriaService);
  private ubicacionService = inject(UbicacionService);
  private estadoEquipoService = inject(EstadoEquipoService);
  
  private loadingCtrl = inject(LoadingController);
  private toastCtrl = inject(ToastController);
  private alertCtrl = inject(AlertController);
  private navCtrl = inject(NavController);

  categorias = signal<Categoria[]>([]);
  ubicaciones = signal<Ubicacion[]>([]);
  estadosEquipo = signal<EstadoEquipo[]>([]);

  // Modelo inicial vacío para el formulario
  equipo: Equipo = this.getInitialEquipo();

  ngOnInit() {
    this.cargarDatosDesplegables();
  }

  cargarDatosDesplegables() {
    this.categoriaService.getCategorias().subscribe({
      next: (data) => this.categorias.set(data),
      error: (err) => this.mostrarError('Error cargando categorías', err.message)
    });

    this.ubicacionService.getUbicaciones().subscribe({
      next: (data) => this.ubicaciones.set(data),
      error: (err) => this.mostrarError('Error cargando ubicaciones', err.message)
    });

    this.estadoEquipoService.getEstadosEquipo().subscribe({
      next: (data) => this.estadosEquipo.set(data),
      error: (err) => this.mostrarError('Error cargando estados', err.message)
    });
  }

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
      observaciones: '',
      activo: true,
      idCategoria: 0,
      idUbicacion: 0,
      idEstadoEquipo: 0
    };
  }

  async guardarEquipo() {
    if (this.equipoForm.invalid) {
      this.equipoForm.form.markAllAsTouched();
      return;
    }

    // Validar espacios en blanco en código y nombre
    if (!this.equipo.codigo.trim() || !this.equipo.nombreEquipo.trim()) {
      this.mostrarError('Campos inválidos', 'El código y el nombre no pueden estar vacíos.');
      return;
    }

    const loading = await this.loadingCtrl.create({
      message: 'Guardando equipo...',
      spinner: 'circles'
    });
    await loading.present();

    this.equipoService.createEquipo(this.equipo).subscribe({
      next: async () => {
        await loading.dismiss();
        this.mostrarToast('Equipo registrado exitosamente', 'success');
        this.equipoForm.resetForm(this.getInitialEquipo());
        // Navegar al tab 1 (lista de equipos)
        this.navCtrl.navigateRoot('/tabs/tab1');
      },
      error: async (err) => {
        await loading.dismiss();
        let mensaje = 'Ocurrió un error al intentar guardar el equipo.';
        if (err.status === 400) {
          mensaje = 'Datos inválidos. Verifica la información enviada.';
        } else if (err.status === 500) {
          mensaje = 'Error en el servidor. Inténtalo más tarde.';
        }
        this.mostrarError('Error al guardar', mensaje);
      }
    });
  }

  async mostrarToast(mensaje: string, color: 'success' | 'danger') {
    const toast = await this.toastCtrl.create({
      message: mensaje,
      duration: 3000,
      color: color,
      position: 'bottom',
      icon: color === 'success' ? 'checkmark-circle' : 'alert-circle'
    });
    await toast.present();
  }

  async mostrarError(header: string, message: string) {
    const alert = await this.alertCtrl.create({
      header,
      message,
      buttons: ['Aceptar'],
      cssClass: 'custom-alert'
    });
    await alert.present();
  }
}

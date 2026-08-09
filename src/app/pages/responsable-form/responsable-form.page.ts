import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule, ToastController } from '@ionic/angular';
import { ResponsableService } from '../../services/responsable.service';
import { Responsable } from '../../models/responsable.model';

@Component({
  selector: 'app-responsable-form',
  templateUrl: './responsable-form.page.html',
  styleUrls: ['./responsable-form.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ]
})
export class ResponsableFormPage {
  nuevoResponsable: Responsable = {
    identificacion: '',
    nombre: '',
    primerApellido: '',
    segundoApellido: '',
    telefono: '',
    correo: '',
    tipoResponsable: 'estudiante',
    estadoActivo: true
  };

  constructor(
    private responsableService: ResponsableService,
    private toastController: ToastController,
    private router: Router
  ) {}

  guardarResponsable() {
    if (!this.nuevoResponsable.identificacion || !this.nuevoResponsable.nombre || !this.nuevoResponsable.primerApellido) {
      this.mostrarToast('Por favor, completa los campos obligatorios.', 'warning');
      return;
    }

    this.responsableService.crearResponsable(this.nuevoResponsable).subscribe({
      next: () => {
        this.mostrarToast('Responsable registrado con éxito.', 'success');
        this.router.navigate(['/responsables']);
      },
      error: () => {
        this.mostrarToast('Ocurrió un error al guardar. Revisa tu conexión.', 'danger');
      }
    });
  }

  async mostrarToast(mensaje: string, color: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2500,
      color: color,
      position: 'bottom'
    });
    await toast.present();
  }
}
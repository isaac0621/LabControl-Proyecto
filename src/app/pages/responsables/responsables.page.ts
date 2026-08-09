import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { IonicModule, AlertController, ToastController } from '@ionic/angular';
import { ResponsableService } from '../../services/responsable.service';
import { Responsable } from '../../models/responsable.model';

@Component({
  selector: 'app-responsables',
  templateUrl: './responsables.page.html',
  styleUrls: ['./responsables.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    RouterLink
  ]
})
export class ResponsablesPage implements OnInit {
  responsables: Responsable[] = [];
  cargando: boolean = false;

  constructor(
    private responsableService: ResponsableService,
    private alertController: AlertController,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    this.cargarResponsables();
  }

  ionViewWillEnter() {
    this.cargarResponsables();
  }

  cargarResponsables() {
    this.cargando = true;
    this.responsableService.obtenerResponsables().subscribe({
      next: (data) => {
        this.responsables = data;
        this.cargando = false;
      },
      error: async (err) => {
        this.cargando = false;
        const alert = await this.alertController.create({
          header: 'Error de conexión',
          message: 'No se pudieron cargar los responsables. Verifica que la API esté encendida.',
          buttons: ['OK']
        });
        await alert.present();
      }
    });
  }
}
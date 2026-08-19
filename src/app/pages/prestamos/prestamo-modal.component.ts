import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonButtons, IonButton, IonItem,
  IonInput, IonSelect, IonSelectOption, ModalController
} from '@ionic/angular/standalone';
import { EquipoService } from '../../services/equipo.service';
import { ResponsableService } from '../../services/responsable.service';
import { Equipo } from '../../models/equipo.model';
import { Responsable } from '../../models/responsable.model';

@Component({
  selector: 'app-prestamo-modal',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonButtons, IonButton, IonItem,
    IonInput, IonSelect, IonSelectOption
  ],
  template: `
    <ion-header>
      <ion-toolbar color="danger">
        <ion-title>Nuevo Préstamo</ion-title>
        <ion-buttons slot="end">
          <ion-button (click)="dismiss()">Cerrar</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-item>
        <ion-input
          label="Nombre de Préstamo"
          label-placement="stacked"
          [value]="prestamo.nombre"
          readonly
          placeholder="Se generará automáticamente">
        </ion-input>
      </ion-item>

      <ion-item>
        <ion-select
          label="Equipo"
          label-placement="stacked"
          placeholder="Seleccione un equipo"
          [(ngModel)]="prestamo.idEquipo"
          (ionChange)="generarNombrePrestamo()">
          <ion-select-option *ngFor="let equipo of equipos" [value]="obtenerId(equipo)">
            {{ obtenerNombre(equipo) }} (ID: {{ obtenerId(equipo) }})
          </ion-select-option>
        </ion-select>
      </ion-item>

      <ion-item>
        <ion-select
          label="Responsable"
          label-placement="stacked"
          placeholder="Seleccione un responsable"
          [(ngModel)]="prestamo.idResponsable"
          (ionChange)="generarNombrePrestamo()">
          <ion-select-option *ngFor="let responsable of responsables" [value]="obtenerId(responsable)">
            {{ obtenerNombre(responsable) }} (ID: {{ obtenerId(responsable) }})
          </ion-select-option>
        </ion-select>
      </ion-item>

      <ion-button
        expand="block"
        color="danger"
        class="ion-margin-top"
        (click)="guardar()"
        [disabled]="!prestamo.idEquipo || !prestamo.idResponsable">
        Confirmar Préstamo
      </ion-button>
    </ion-content>
  `
})
export class PrestamoModalComponent implements OnInit {
  private modalCtrl = inject(ModalController);
  private equipoService = inject(EquipoService);
  private responsableService = inject(ResponsableService);

  equipos: Equipo[] = [];
  responsables: Responsable[] = [];

  prestamo = {
    nombre: '',
    idEquipo: null as number | null,
    idResponsable: null as number | null
  };

  ngOnInit() {
    this.cargarDatos();
  }

  cargarDatos() {
    this.equipoService.getEquipos().subscribe({
      next: (data) => this.equipos = data,
      error: (err) => console.error('Error al cargar equipos:', err)
    });

    this.responsableService.obtenerResponsables().subscribe({
      next: (data) => this.responsables = data,
      error: (err) => console.error('Error al cargar responsables:', err)
    });
  }

  generarNombrePrestamo() {
    if (!this.prestamo.idEquipo || !this.prestamo.idResponsable) return;

    const hoyStr = new Date().toISOString().split('T')[0].replace(/-/g, '');
    this.prestamo.nombre = `PRES-${hoyStr}-EQ${this.prestamo.idEquipo}-RES${this.prestamo.idResponsable}`;
  }

  obtenerId(objeto: any): any {
    return objeto?.id ?? objeto?.idEquipo ?? objeto?.idResponsable ?? objeto?.ID;
  }

  obtenerNombre(objeto: any): string {
    return objeto?.nombre ?? objeto?.nombreEquipo ?? objeto?.nombreResponsable ?? objeto?.nombreCompleto ?? objeto?.Nombre ?? 'Sin Nombre';
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

  guardar() {
    this.modalCtrl.dismiss(this.prestamo, 'confirm');
  }
}
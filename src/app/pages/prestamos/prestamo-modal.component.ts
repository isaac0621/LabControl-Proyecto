import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalController, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonContent, IonItem, IonLabel, IonInput, IonTextarea } from '@ionic/angular/standalone';
import { Prestamo } from '../../models/prestamo.model';

@Component({
  selector: 'app-prestamo-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonContent, IonItem, IonLabel, IonInput, IonTextarea],
  template: `
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>Nuevo Préstamo</ion-title>
        <ion-buttons slot="end">
          <ion-button (click)="cerrar()">Cancelar</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <form (ngSubmit)="guardar()">
        <ion-item>
          <ion-label position="stacked">ID Equipo</ion-label>
          <ion-input type="number" [(ngModel)]="prestamo.idEquipo" name="idEquipo" required></ion-input>
        </ion-item>

        <ion-item>
          <ion-label position="stacked">ID Responsable</ion-label>
          <ion-input type="number" [(ngModel)]="prestamo.idResponsable" name="idResponsable" required></ion-input>
        </ion-item>

        <ion-item>
          <ion-label position="stacked">Fecha Esperada Devolución</ion-label>
          <ion-input type="date" [(ngModel)]="prestamo.fechaEsperadaDevolucion" name="fechaEsperada" required></ion-input>
        </ion-item>
        
        <ion-item>
          <ion-label position="stacked">Usuario Registra</ion-label>
          <ion-input type="number" [(ngModel)]="prestamo.usuarioRegistra" name="usuarioRegistra" required></ion-input>
        </ion-item>

        <ion-item>
          <ion-label position="stacked">Observaciones</ion-label>
          <ion-textarea [(ngModel)]="prestamo.observaciones" name="observaciones"></ion-textarea>
        </ion-item>

        <ion-button expand="block" type="submit" color="primary" class="ion-margin-top" 
          [disabled]="!prestamo.idEquipo || !prestamo.idResponsable || !prestamo.usuarioRegistra || !prestamo.fechaEsperadaDevolucion">
          Guardar Préstamo
        </ion-button>
      </form>
    </ion-content>
  `
})
export class PrestamoModalComponent {
  private modalCtrl = inject(ModalController);

prestamo: Prestamo = {
    idEquipo: 0,
    idResponsable: 0,
    fechaEsperadaDevolucion: new Date().toISOString().split('T')[0],
    usuarioRegistra: 1 // Número entero, no texto
  };

  cerrar() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  guardar() {
    this.modalCtrl.dismiss(this.prestamo, 'confirm');
  }
}
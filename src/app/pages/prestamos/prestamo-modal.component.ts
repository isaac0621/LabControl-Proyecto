import { Component } from '@angular/core';
import { 
  IonHeader, IonToolbar, IonTitle, IonContent, 
  IonButtons, IonButton, IonItem, IonLabel, 
  IonInput, ModalController 
} from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-prestamo-modal',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule,
    IonHeader, IonToolbar, IonTitle, IonContent, 
    IonButtons, IonButton, IonItem, IonLabel, 
    IonInput
  ],
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>Nuevo Préstamo</ion-title>
        <ion-buttons slot="end">
          <ion-button (click)="dismiss()">Cerrar</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-item>
        <ion-label position="stacked">ID Equipo</ion-label>
        <ion-input type="number" [(ngModel)]="prestamo.idEquipo"></ion-input>
      </ion-item>
      <ion-item>
        <ion-label position="stacked">ID Responsable</ion-label>
        <ion-input type="number" [(ngModel)]="prestamo.idResponsable"></ion-input>
      </ion-item>
      <ion-button expand="block" class="ion-margin-top" (click)="guardar()">
        Confirmar Préstamo
      </ion-button>
    </ion-content>
  `
})
export class PrestamoModalComponent {
  prestamo = { idEquipo: null, idResponsable: null };

  constructor(private modalCtrl: ModalController) {}

  dismiss() {
    this.modalCtrl.dismiss();
  }

  guardar() {
    this.modalCtrl.dismiss(this.prestamo, 'confirm');
  }
}
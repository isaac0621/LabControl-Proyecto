import { Injectable, inject } from '@angular/core';
import { ToastController, AlertController } from '@ionic/angular/standalone';

@Injectable({
  providedIn: 'root'
})
export class UiService {
  private toastCtrl = inject(ToastController);
  private alertCtrl = inject(AlertController);

  /**
   * Muestra un mensaje Toast en la parte inferior
   */
  async showToast(message: string, color: 'success' | 'warning' | 'danger' | 'primary' = 'success', duration: number = 3000) {
    const toast = await this.toastCtrl.create({
      message,
      color,
      duration,
      position: 'bottom',
      buttons: [{ text: 'OK', role: 'cancel' }]
    });
    await toast.present();
  }

  /**
   * Muestra una alerta de confirmación
   */
  async showConfirmAlert(header: string, message: string, confirmHandler: () => void) {
    const alert = await this.alertCtrl.create({
      header,
      message,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Confirmar',
          role: 'confirm',
          handler: confirmHandler
        }
      ]
    });
    await alert.present();
  }

  /**
   * Muestra una alerta para errores críticos (400, 500, conexión)
   */
  async showErrorAlert(header: string, message: string) {
    const alert = await this.alertCtrl.create({
      header,
      message,
      buttons: ['Entendido'],
      cssClass: 'error-alert'
    });
    await alert.present();
  }
}

import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  IonHeader, IonToolbar, IonTitle, IonContent, 
  IonList, IonItem, IonLabel, IonBadge, 
  IonFab, IonFabButton, IonIcon, IonSpinner, IonText,
  ModalController 
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { add } from 'ionicons/icons';
import { PrestamoService } from '../services/prestamo.service';
import { Prestamo } from '../models/prestamo.model';
import { PrestamoModalComponent } from '../pages/prestamos/prestamo-modal.component';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonList, IonItem, IonLabel, IonBadge,
    IonFab, IonFabButton, IonIcon, IonSpinner, IonText
  ],
})
export class Tab3Page implements OnInit {
  private prestamoService = inject(PrestamoService);
  private modalCtrl = inject(ModalController);
  
  prestamos: Prestamo[] = [];
  cargando: boolean = true;

  constructor() {
    addIcons({ add }); 
  }

  ngOnInit() {
    this.cargarPrestamos();
  }

  ionViewWillEnter() {
    this.cargarPrestamos();
  }

  cargarPrestamos() {
    this.cargando = true;
    this.prestamoService.getPrestamos().subscribe({
      next: (data) => {
        this.prestamos = data;
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al cargar los préstamos', err);
        this.cargando = false;
      }
    });
  }

  async abrirModalPrestamo() {
    const modal = await this.modalCtrl.create({
      component: PrestamoModalComponent,
    });
    await modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm' && data) {
      // Llamamos al servicio para guardar en el backend
      this.prestamoService.createPrestamo(data).subscribe({
        next: () => {
          this.cargarPrestamos(); // Recargamos la lista
        },
        error: (err) => {
          console.error('Error al registrar el préstamo', err);
        }
      });
    }
  }
}
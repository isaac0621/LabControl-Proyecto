import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-equipo-detalle',
  templateUrl: './equipo-detalle.page.html',
  styleUrls: ['./equipo-detalle.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class EquipoDetallePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

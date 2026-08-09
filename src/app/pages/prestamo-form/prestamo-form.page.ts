import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-prestamo-form',
  templateUrl: './prestamo-form.page.html',
  styleUrls: ['./prestamo-form.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class PrestamoFormPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

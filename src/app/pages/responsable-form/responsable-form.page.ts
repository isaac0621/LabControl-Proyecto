import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-responsable-form',
  templateUrl: './responsable-form.page.html',
  styleUrls: ['./responsable-form.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class ResponsableFormPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

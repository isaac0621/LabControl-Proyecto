import { Component, inject } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  private themeService = inject(ThemeService);

  constructor() {
    // Inicializar el servicio de tema
    // Esto aplicará el tema guardado o el tema por defecto
    this.themeService.getCurrentTheme();
  }
}

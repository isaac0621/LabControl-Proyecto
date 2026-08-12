import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonToggle, IonLabel, IonItem, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { moon, sunny } from 'ionicons/icons';
import { ThemeService, Theme } from '../../services/theme.service';

@Component({
  selector: 'app-theme-toggle',
  templateUrl: './theme-toggle.component.html',
  styleUrls: ['./theme-toggle.component.scss'],
  standalone: true,
  imports: [CommonModule, IonToggle, IonLabel, IonItem, IonIcon]
})
export class ThemeToggleComponent {
  private themeService = inject(ThemeService);

  isDarkMode$ = this.themeService.theme$.pipe(
    // map(theme => theme === 'dark')
  );

  isDarkMode = false;
  currentTheme: Theme = 'light';

  constructor() {
    addIcons({ moon, sunny });
    this.initializeTheme();
  }

  private initializeTheme(): void {
    this.currentTheme = this.themeService.getCurrentTheme();
    this.isDarkMode = this.currentTheme === 'dark';

    // Suscribirse a cambios de tema
    this.themeService.theme$.subscribe((theme) => {
      this.currentTheme = theme;
      this.isDarkMode = theme === 'dark';
    });
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}

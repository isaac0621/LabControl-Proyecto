import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export type Theme = 'light' | 'dark';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly THEME_STORAGE_KEY = 'app-theme';
  private currentTheme = new BehaviorSubject<Theme>(this.getInitialTheme());

  public theme$: Observable<Theme> = this.currentTheme.asObservable();

  constructor() {
    this.initializeTheme();
  }

  /**
   * Obtiene el tema inicial (almacenado o por defecto 'light')
   */
  private getInitialTheme(): Theme {
    const savedTheme = localStorage.getItem(this.THEME_STORAGE_KEY) as Theme | null;
    if (savedTheme && ['light', 'dark'].includes(savedTheme)) {
      return savedTheme;
    }
    return 'light'; // Tema por defecto
  }

  /**
   * Inicializa el tema al cargar la aplicación
   */
  private initializeTheme(): void {
    const theme = this.currentTheme.value;
    this.applyTheme(theme);
  }

  /**
   * Obtiene el tema actual
   */
  getCurrentTheme(): Theme {
    return this.currentTheme.value;
  }

  /**
   * Alterna entre tema claro y oscuro
   */
  toggleTheme(): void {
    const newTheme: Theme = this.currentTheme.value === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
  }

  /**
   * Establece un tema específico
   */
  setTheme(theme: Theme): void {
    this.currentTheme.next(theme);
    this.applyTheme(theme);
    this.persistTheme(theme);
  }

  /**
   * Aplica el tema al documento HTML
   */
  private applyTheme(theme: Theme): void {
    const htmlElement = document.documentElement;
    
    if (theme === 'dark') {
      htmlElement.classList.add('dark-theme');
      htmlElement.classList.remove('light-theme');
    } else {
      htmlElement.classList.add('light-theme');
      htmlElement.classList.remove('dark-theme');
    }
  }

  /**
   * Persiste el tema en localStorage
   */
  private persistTheme(theme: Theme): void {
    localStorage.setItem(this.THEME_STORAGE_KEY, theme);
  }

  /**
   * Obtiene el color primario según el tema
   */
  getPrimaryColor(): string {
    const theme = this.currentTheme.value;
    return theme === 'light' ? '#FF0000' : '#1E3A5F';
  }

  /**
   * Obtiene el color de fondo según el tema
   */
  getBackgroundColor(): string {
    const theme = this.currentTheme.value;
    return theme === 'light' ? '#FFFFFF' : '#0A1428';
  }

  /**
   * Obtiene el color de texto según el tema
   */
  getTextColor(): string {
    const theme = this.currentTheme.value;
    return theme === 'light' ? '#000000' : '#F5E6D3';
  }

  /**
   * Obtiene el color de acentos según el tema
   */
  getAccentColor(): string {
    const theme = this.currentTheme.value;
    return theme === 'light' ? '#808080' : '#C0C0C0';
  }
}

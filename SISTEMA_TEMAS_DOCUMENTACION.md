# 🎨 SISTEMA DE TEMAS DINÁMICO - DOCUMENTACIÓN COMPLETA

## 📌 RESUMEN EJECUTIVO

Se ha implementado un sistema de temas dinámico completo para la aplicación LabControl con:
- ✅ Tema Claro (Rojo, Blanco, Negro, Gris)
- ✅ Tema Oscuro (Azul Oscuro, Beige, Plateado)
- ✅ Toggle de tema con persistencia en localStorage
- ✅ Transiciones suaves entre temas
- ✅ Página de Configuración dedicada
- ✅ Componente reutilizable para toggle

---

## 📂 ESTRUCTURA DE ARCHIVOS CREADOS/MODIFICADOS

```
src/
├── app/
│   ├── components/
│   │   └── theme-toggle/
│   │       ├── theme-toggle.component.ts    [CREADO]
│   │       ├── theme-toggle.component.html  [CREADO]
│   │       └── theme-toggle.component.scss  [CREADO]
│   ├── pages/
│   │   └── settings/
│   │       ├── settings.page.ts             [CREADO]
│   │       ├── settings.page.html           [CREADO]
│   │       └── settings.page.scss           [CREADO]
│   ├── services/
│   │   └── theme.service.ts                 [CREADO]
│   ├── app.component.ts                     [MODIFICADO]
│   ├── app.routes.ts                        [MODIFICADO]
│   └── tabs/
│       ├── tabs.page.ts                     [MODIFICADO]
│       └── tabs.page.html                   [MODIFICADO]
├── theme/
│   └── variables.scss                       [MODIFICADO]
└── global.scss                              [MODIFICADO]
```

---

## 1️⃣ CÓDIGO SCSS - PALETA DE COLORES

**Ubicación:** `src/theme/variables.scss`

```scss
// PALETA DE COLORES - TEMA CLARO (Por defecto)
:root,
.light-theme {
  // Rojo como color primario
  --ion-color-primary: #FF0000;
  --ion-color-primary-contrast: #FFFFFF;
  --ion-color-primary-shade: #CC0000;
  --ion-color-primary-tint: #FF3333;

  // Gris como secundario
  --ion-color-secondary: #808080;
  --ion-color-secondary-contrast: #FFFFFF;
  --ion-color-secondary-shade: #707070;

  // Blanco y Negro
  --ion-color-light: #FFFFFF;
  --ion-color-dark: #000000;
  
  // Fondos
  --ion-background-color: #FFFFFF;
  --ion-text-color: #000000;
  --ion-border-color: #D3D3D3;
  --ion-item-background: #FFFFFF;
  --ion-toolbar-background: #F5F5F5;
  
  // Custom
  --card-background: #FFFFFF;
  --input-background: #F5F5F5;
  --input-border: #D3D3D3;
}

// PALETA DE COLORES - TEMA OSCURO
.dark-theme {
  // Azul oscuro como primario
  --ion-color-primary: #1E3A5F;
  --ion-color-primary-contrast: #F5E6D3;
  --ion-color-primary-shade: #1A2E4A;
  --ion-color-primary-tint: #2E4A75;

  // Plateado como secundario
  --ion-color-secondary: #C0C0C0;
  --ion-color-secondary-contrast: #000000;

  // Beige y Azul muy oscuro
  --ion-color-light: #F5E6D3;
  --ion-color-dark: #0A1428;
  
  // Fondos
  --ion-background-color: #0A1428;
  --ion-text-color: #F5E6D3;
  --ion-border-color: #3A4A6A;
  --ion-item-background: #1A2A42;
  --ion-toolbar-background: #0F1E35;
  
  // Custom
  --card-background: #1A2A42;
  --input-background: #0F1E35;
  --input-border: #3A4A6A;
}
```

---

## 2️⃣ SERVICIO DE TEMA - LÓGICA TYPESCRIPT

**Ubicación:** `src/app/services/theme.service.ts`

```typescript
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

  private getInitialTheme(): Theme {
    const savedTheme = localStorage.getItem(this.THEME_STORAGE_KEY) as Theme | null;
    return (savedTheme && ['light', 'dark'].includes(savedTheme)) ? savedTheme : 'light';
  }

  private initializeTheme(): void {
    const theme = this.currentTheme.value;
    this.applyTheme(theme);
  }

  getCurrentTheme(): Theme {
    return this.currentTheme.value;
  }

  toggleTheme(): void {
    const newTheme: Theme = this.currentTheme.value === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
  }

  setTheme(theme: Theme): void {
    this.currentTheme.next(theme);
    this.applyTheme(theme);
    this.persistTheme(theme);
  }

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

  private persistTheme(theme: Theme): void {
    localStorage.setItem(this.THEME_STORAGE_KEY, theme);
  }
}
```

**Métodos Disponibles:**
- `getCurrentTheme()` - Obtiene el tema actual
- `toggleTheme()` - Alterna entre claro y oscuro
- `setTheme(theme)` - Establece un tema específico
- `theme$` - Observable para reactividad

**Persistencia:** El tema se guarda en `localStorage` con clave `app-theme`

---

## 3️⃣ COMPONENTE HTML - TOGGLE DE TEMA

**Ubicación:** `src/app/components/theme-toggle/theme-toggle.component.html`

```html
<ion-item>
  <ion-label>
    <ion-icon [name]="isDarkMode ? 'moon' : 'sunny'" slot="start"></ion-icon>
    {{ isDarkMode ? 'Tema Oscuro' : 'Tema Claro' }}
  </ion-label>
  <ion-toggle 
    slot="end" 
    [checked]="isDarkMode"
    (ionChange)="toggleTheme()"
    color="primary">
  </ion-toggle>
</ion-item>
```

**Ubicación del Toggle Recomendada:**

### Opción A: En la Página de Configuración (Recomendado)
- **Ruta:** `/settings`
- **Acceso:** Botón ⚙️ en el header de tabs
- **Ventaja:** Integrado con otras configuraciones futuras

**Página completa ubicada en:** `src/app/pages/settings/settings.page.html`

```html
<ion-header [translucent]="true">
  <ion-toolbar color="primary">
    <ion-buttons slot="start">
      <ion-back-button defaultHref="/tabs/equipos"></ion-back-button>
    </ion-buttons>
    <ion-title>Configuración</ion-title>
  </ion-toolbar>
</ion-header>

<ion-content [fullscreen]="true">
  <ion-header collapse="condense">
    <ion-toolbar>
      <ion-title size="large">Configuración</ion-title>
    </ion-toolbar>
  </ion-header>

  <ion-list>
    <ion-list-header>
      <ion-title>Apariencia</ion-title>
    </ion-list-header>
    
    <app-theme-toggle></app-theme-toggle>
  </ion-list>
</ion-content>
```

### Opción B: En un Modal rápido (Alternativa)
Si deseas un toggle sin entrar a una página:

```html
<!-- En cualquier toolbar -->
<ion-buttons slot="end">
  <ion-button (click)="themeService.toggleTheme()">
    <ion-icon 
      [name]="(themeService.theme$ | async) === 'dark' ? 'sunny' : 'moon'"
      slot="icon-only">
    </ion-icon>
  </ion-button>
</ion-buttons>
```

---

## 4️⃣ INTEGRACIÓN EN LA APLICACIÓN

### Paso A: Inicializar en App Component

**Archivo:** `src/app/app.component.ts`

```typescript
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
    this.themeService.getCurrentTheme();
  }
}
```

### Paso B: Agregar Header con Botón de Configuración

**Archivo:** `src/app/tabs/tabs.page.html`

```html
<ion-header [translucent]="true">
  <ion-toolbar color="primary">
    <ion-title>LabControl</ion-title>
    <ion-buttons slot="end">
      <ion-button (click)="navigateToSettings()">
        <ion-icon slot="icon-only" name="settings-outline"></ion-icon>
      </ion-button>
    </ion-buttons>
  </ion-toolbar>
</ion-header>

<ion-tabs>
  <!-- Contenido de tabs -->
</ion-tabs>
```

### Paso C: Actualizar Rutas

**Archivo:** `src/app/app.routes.ts`

```typescript
{
  path: 'settings',
  loadComponent: () => import('./pages/settings/settings.page')
    .then( m => m.SettingsPage)
}
```

---

## 🎯 CÓMO USAR EL SISTEMA DE TEMAS

### En Componentes:
```typescript
import { ThemeService } from '../../services/theme.service';

export class MiComponente {
  themeService = inject(ThemeService);

  ngOnInit() {
    // Obtener tema actual
    const tema = this.themeService.getCurrentTheme();
    
    // Suscribirse a cambios
    this.themeService.theme$.subscribe(newTheme => {
      console.log('Tema cambiado a:', newTheme);
    });
  }

  cambiarTema() {
    this.themeService.toggleTheme();
  }
}
```

### En Templates:
```html
<div [ngClass]="(themeService.theme$ | async) === 'dark' ? 'dark-mode' : 'light-mode'">
  Contenido que reacciona al cambio de tema
</div>
```

---

## 🎨 PERSONALIZACIÓN DE COLORES

Para modificar los colores, edita `src/theme/variables.scss`:

```scss
:root, .light-theme {
  --ion-color-primary: #NUEVO_COLOR;
}

.dark-theme {
  --ion-color-primary: #NUEVO_COLOR_OSCURO;
}
```

---

## ✨ TRANSICIONES SUAVES

Las transiciones entre temas se configuran en `global.scss`:

```scss
html {
  transition: background-color 0.3s ease, color 0.3s ease;
}

ion-app, ion-content, ion-card, ion-toolbar {
  transition: background-color 0.3s ease, color 0.3s ease;
}
```

Para cambiar la duración o tipo de transición, modifica el valor `0.3s ease`.

---

## 💾 PERSISTENCIA DEL TEMA

- El tema se guarda automáticamente en `localStorage`
- Clave: `app-theme`
- Al recargar la app, se restaura el último tema seleccionado

---

## 🔍 VARIABLES CSS DISPONIBLES

```css
--ion-color-primary          /* Color principal (Rojo/Azul) */
--ion-color-secondary        /* Color secundario (Gris/Plateado) */
--ion-background-color       /* Fondo principal */
--ion-text-color            /* Color de texto */
--ion-border-color          /* Color de bordes */
--ion-item-background       /* Fondo de items */
--ion-toolbar-background    /* Fondo de toolbars */
--card-background           /* Fondo de cards */
--input-background          /* Fondo de inputs */
--input-border              /* Borde de inputs */
```

---

## 📱 VERIFICACIÓN EN NAVEGADOR

Abre DevTools y ejecuta:

```javascript
// Ver tema actual
localStorage.getItem('app-theme');

// Cambiar tema manualmente
localStorage.setItem('app-theme', 'dark');
location.reload();

// Ver clases aplicadas
document.documentElement.classList;
```

---

## 🚀 PRÓXIMOS PASOS RECOMENDADOS

1. **Testing:** Verifica todos los componentes en ambos temas
2. **Iconografía:** Considera iconos adaptables por tema
3. **Imágenes:** Optimiza imágenes para modo oscuro
4. **Preferencias:** Agrega más opciones en settings (fuente, contraste, etc.)
5. **Sincronización:** Considera guardar preferencias en backend si es necesario


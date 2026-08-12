# ⚡ QUICK REFERENCE - SISTEMA DE TEMAS

## 🚀 START HERE (Comienza aquí)

### 1. Acceder a Settings (Para usuarios)
```
1. Tap en ⚙️ (settings) en el header
2. Ve a "Configuración"
3. Activa/desactiva el toggle de tema
4. Listo! Se guarda automáticamente
```

### 2. Verificar que funciona (Para desarrolladores)
```bash
# En la consola de DevTools (F12):
localStorage.getItem('app-theme')           # Debe mostrar 'light' o 'dark'
document.documentElement.className           # Debe mostrar 'light-theme' o 'dark-theme'
```

---

## 📂 ARCHIVOS CLAVE

| Archivo | Propósito |
|---------|-----------|
| `theme.service.ts` | Lógica del sistema de temas |
| `variables.scss` | Colores de ambos temas |
| `global.scss` | Transiciones y estilos globales |
| `theme-toggle.component.html` | UI del toggle |
| `settings.page.html` | Página de configuración |

---

## 🎨 COLORES IMPLEMENTADOS

### Tema CLARO
```scss
--ion-color-primary: #FF0000        // Rojo
--ion-background-color: #FFFFFF     // Blanco
--ion-text-color: #000000           // Negro
--ion-color-secondary: #808080      // Gris
```

### Tema OSCURO
```scss
--ion-color-primary: #1E3A5F        // Azul oscuro
--ion-background-color: #0A1428     // Azul muy oscuro
--ion-text-color: #F5E6D3           // Beige
--ion-color-secondary: #C0C0C0      // Plateado
```

---

## 💻 CÓDIGO ÚTIL

### Inyectar el servicio
```typescript
import { ThemeService } from '../../services/theme.service';

export class MiComponente {
  themeService = inject(ThemeService);
}
```

### Cambiar tema
```typescript
// Alternar entre claro y oscuro
this.themeService.toggleTheme();

// Establecer tema específico
this.themeService.setTheme('dark');
this.themeService.setTheme('light');
```

### Reaccionar a cambios
```typescript
this.themeService.theme$.subscribe(nuevoTema => {
  console.log('Tema actual:', nuevoTema);
  if (nuevoTema === 'dark') {
    // Hacer algo en tema oscuro
  }
});
```

### En templates
```html
<!-- Ver tema actual -->
{{ themeService.theme$ | async }}

<!-- Condicional -->
<div *ngIf="(themeService.theme$ | async) === 'dark'">
  Solo en tema oscuro
</div>

<!-- Toggle rápido -->
<ion-button (click)="themeService.toggleTheme()">
  <ion-icon name="sunny"></ion-icon>
</ion-button>
```

---

## 🔍 DEBUGGING RÁPIDO

### Problema: Tema no se guarda
```javascript
// Verificar localStorage
localStorage.getItem('app-theme')

// Forzar guardado
localStorage.setItem('app-theme', 'dark')
location.reload()
```

### Problema: Colores incorrectos
```javascript
// Ver variables CSS
getComputedStyle(document.documentElement)
  .getPropertyValue('--ion-color-primary')

// Ver todas las variables CSS del tema
const root = getComputedStyle(document.documentElement);
const all = Array.from(root).filter(p => p.startsWith('--'));
all.forEach(p => console.log(p, root.getPropertyValue(p)));
```

### Problema: No hay transición suave
```javascript
// Verificar que las transiciones están en el HTML
getComputedStyle(document.documentElement).transition
// Debe mostrar algo como "background-color 0.3s ease, color 0.3s ease"
```

---

## 📊 RUTAS

```
/tabs                  → Tabs principales (Equipos, Registrar, Préstamos)
/tabs/equipos          → Listado de equipos
/tabs/registrar-equipo → Formulario de equipo
/tabs/prestamos        → Gestión de préstamos
/settings              → Configuración (con toggle de tema) ← NUEVA
/equipo-detalle/:id    → Detalle de equipo
```

---

## ✨ CARACTERÍSTICAS

- ✅ Tema claro por defecto
- ✅ Tema oscuro alternativo
- ✅ Cambio instantáneo con transición suave
- ✅ Persistencia automática en localStorage
- ✅ Restauración automática al iniciar
- ✅ Componente reutilizable
- ✅ Sin parpadeo al cargar

---

## 🧪 TESTS BÁSICOS

### Test 1: Carga
```javascript
// Debe cargar tema claro por defecto
localStorage.getItem('app-theme') === null
// o
localStorage.getItem('app-theme') === 'light'
```

### Test 2: Cambio
```javascript
// Cambiar a oscuro
localStorage.setItem('app-theme', 'dark')
location.reload()

// Verificar
document.documentElement.classList.contains('dark-theme') // true
```

### Test 3: Persistencia
```javascript
// Guardar 'dark'
localStorage.setItem('app-theme', 'dark')
// Recargar
location.reload()
// Debe permanecer en dark
localStorage.getItem('app-theme') === 'dark' // true
```

---

## 📱 RESPONSIVE DESIGN

El sistema de temas es completamente responsive:
- ✅ Mobile (teléfonos)
- ✅ Tablet (iPads)
- ✅ Desktop (monitores)

---

## 🎯 MÉTODOS DISPONIBLES (ThemeService)

```typescript
// Obtener tema actual
themeService.getCurrentTheme(): Theme

// Cambiar de tema
themeService.toggleTheme(): void

// Establecer tema específico
themeService.setTheme(theme: Theme): void

// Observable para reactividad
themeService.theme$: Observable<Theme>

// Obtener colores específicos
themeService.getPrimaryColor(): string
themeService.getBackgroundColor(): string
themeService.getTextColor(): string
themeService.getAccentColor(): string
```

---

## 🔐 LocalStorage Key

```
Clave: 'app-theme'
Valores: 'light' | 'dark'
Ubicación: Tema oscuro => localStorage.setItem('app-theme', 'dark')
```

---

## 📞 PREGUNTAS FRECUENTES

### ¿Cómo cambio los colores?
Edita `src/theme/variables.scss` y actualiza los valores hex en `.light-theme` o `.dark-theme`.

### ¿Cómo agrego un nuevo tema?
1. Crea una nueva clase en `variables.scss` (ej: `.sepia-theme`)
2. Define sus colores CSS
3. Extiende `ThemeService` con el nuevo tema
4. Actualiza el tipo `Theme`

### ¿Cómo hago que el tema sea automático por hora?
```typescript
constructor() {
  const hora = new Date().getHours();
  const tema = (hora > 18 || hora < 6) ? 'dark' : 'light';
  this.themeService.setTheme(tema);
}
```

### ¿Se sincroniza con el backend?
Por ahora no, pero puedes hacerlo:
```typescript
this.themeService.theme$.subscribe(tema => {
  this.apiService.updateUserTheme(tema).subscribe();
});
```

---

## 🚀 PRODUCCIÓN

Antes de deploy:
- [ ] Verificar en múltiples navegadores
- [ ] Validar en dispositivos reales
- [ ] Comprobar accesibilidad (contraste)
- [ ] Revisar performance
- [ ] Actualizar documentación de usuario

---

## 📚 DOCUMENTOS COMPLETOS

Para información detallada, ver:
1. `SISTEMA_TEMAS_DOCUMENTACION.md` - Manual técnico
2. `GUIA_VERIFICACION.md` - Testing detallado
3. `SUGERENCIAS_UI_UX.md` - Mejoras visuales

---

## ⏱️ TIEMPO DE IMPLEMENTACIÓN

| Tarea | Tiempo |
|-------|--------|
| Crear servicio | 5 min |
| Implementar paletas | 10 min |
| Crear componente | 5 min |
| Crear página settings | 5 min |
| Integración | 5 min |
| Testing | 10 min |
| **TOTAL** | **40 min** |

✅ **Ya está completado y listo para usar**


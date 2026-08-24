<div align="center">
  <img src="https://i.imgur.com/Rp2wCMZ.png" alt="LabControl Logo" width="180"/>
  
  # LabControl Mobile
  **Especialidad: Desarrollo de Aplicaciones Móviles**

  [![Landing Page](https://img.shields.io/badge/Landing%20Page-Netlify-blue?style=flat-square&logo=netlify)](https://labcontrolproject.netlify.app)
  [![App Web](https://img.shields.io/badge/App%20Client-Somee-success?style=flat-square&logo=angular)](http://labcontrolwebsac.somee.com)
  [![API Swagger](https://img.shields.io/badge/Backend%20API-Swagger-orange?style=flat-square&logo=dotnet)](http://apiweb-sac.somee.com/swagger/index.html)
  [![Documento](https://img.shields.io/badge/Google%20Docs-Entregable-yellow?style=flat-square&logo=googledocs)](https://docs.google.com/document/d/15DGVlt5uO-JxUEs6_x29_1YClM9FA1B3sVO6XUtVhNQ/edit?usp=sharing)
</div>

---

## 📋 Tabla de Contenidos
1. [Introducción](#-introducción)
2. [Objetivos del Proyecto](#-objetivos-del-proyecto)
3. [Desarrollo y Requisitos](#-desarrollo-y-requisitos)
4. [Implementación en Ionic](#-implementación-en-ionic)
5. [Distribución del Trabajo](#-distribución-del-trabajo)
6. [Conclusiones](#-conclusiones)
7. [Bitácora de Avances](#-bitácora-de-avances)

---

## 📖 1. Introducción
El presente repositorio detalla la implementación de **LabControl Mobile**, una aplicación móvil híbrida desarrollada con **Ionic y Angular**. El propósito principal es administrar el inventario de equipos tecnológicos y la gestión de préstamos del Colegio Técnico Profesional de Alajuelita. La aplicación actúa como un cliente móvil que consume de forma dinámica una API REST existente.

---

## 🎯 2. Objetivos

### 🌐 Objetivo General
Construir una aplicación móvil en Ionic y Angular que consuma la API REST de LabControl para consultar, registrar, editar y gestionar equipos, responsables y préstamos de equipo tecnológico.

### 📌 Objetivos Específicos
* Crear y configurar un proyecto Ionic con Angular.
* Reconocer la estructura de carpetas y archivos de una aplicación Ionic.
* Crear interfaces y modelos en TypeScript para representar datos recibidos en formato JSON.
* Implementar servicios Angular para consumir una API REST mediante métodos HTTP (`GET`, `POST`, `PUT`, `DELETE`).
* Implementar navegación mediante tabs y rutas, validando datos antes de enviarlos y mostrando alertas o notificaciones interactivas.

---

## ⚙️ 3. Desarrollo del Proyecto (Análisis de Requisitos)
* **Requerimientos Previos (API y Base de datos):** Se asume que la API REST (ASP.NET Core) y SQL Server ya están configurados en el backend, incluyendo categorías, ubicaciones, estados y políticas CORS habilitadas.
* **Estructura y Arquitectura:** Organización estricta basada en carpetas para modelos, servicios, componentes y páginas por medio de pestañas (*Tabs*).

---

## 📱 4. Descripción de la Implementación en Ionic
La interfaz se encuentra distribuida en tres Tabs principales:
* **Tab 1 (Equipos):** Listado general, filtrado por búsqueda y opciones directas de edición y eliminación.
* **Tab 2 (Registrar Equipo):** Formulario robusto con validaciones para dar de alta nuevos activos cargando catálogos directamente de la API.
* **Tab 3 (Préstamos):** Módulo encargado de gestionar asignaciones activas, selección de responsables y control de devoluciones.

### Ejemplo de Estructura de Servicios HTTP:
```typescript
@Injectable({ providedIn: 'root' })
export class EquipoService {
  private readonly apiUrl = '[http://apiweb-sac.somee.com/api/Equipos](http://apiweb-sac.somee.com/api/Equipos)';
  constructor(private http: HttpClient) {}
  // Métodos GET, POST, PUT, DELETE integrados
}

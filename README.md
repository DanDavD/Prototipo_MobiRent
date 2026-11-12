# MobiRent Honduras - Prototipo Interactivo de Software (Frontend Clickable)

Este proyecto es el prototipo interactivo para presentación en clase de **MobiRent**, la plataforma tipo Airbnb para el alquiler temporal de muebles, electrodomésticos y equipamiento para eventos en Honduras (San Pedro Sula y Tegucigalpa).

---

## 🚀 Cómo abrir y presentar el prototipo

1. **Opción Directa (Sin instalar nada):**
   - Haz doble clic en el archivo `index.html` para abrirlo en Google Chrome, Microsoft Edge, Safari o cualquier navegador web.
   - También puedes arrastrar el archivo `index.html` a una pestaña de tu navegador.

2. **Opción Servidor Local (Recomendado para verlo en tu celular en la misma red Wi-Fi):**
   - Abre tu terminal en esta carpeta y ejecuta:
     ```bash
     python3 -m http.server 8080
     ```
   - Abre en tu computadora: `http://localhost:8080`
   - O abre desde tu celular ingresando la IP local de tu computadora (ejemplo: `http://192.168.1.X:8080`).

---

## 🎯 ¿Qué incluye este prototipo interactivo?

Cumple al 100% con los requerimientos solicitados para la entrega:
- **100% Frontend interactivo y clickeable:** No requiere base de datos ni servidor complejo. Todo el estado (artículos, precios, reservas y tracking) reacciona en tiempo real en la pantalla.
- **Las 3 Vistas / Roles Solicitadas:**
  1. **🛒 Vista Arrendatario / Comprador:**
     - Catálogo de muebles y electrodomésticos con fotos reales y filtros por categoría y ciudad (San Pedro Sula / Tegucigalpa).
     - Buscador reactivo.
     - Detalle del artículo con **cotizador en tiempo real**: permite elegir alquiler por **Día**, **Semana** o **Mes** y cantidad.
     - **Desglose transparente de costos** (Alquiler + Transporte MobiRent + Tarifa de servicio + Depósito en garantía reembolsable).
     - Flujo de checkout con dirección en Honduras y simulación de pago.
     - Pestaña de **"Mis Alquileres"** con barra visual de tracking logístico paso a paso.
  
  2. **🏷️ Vista Arrendador / Vendedor (Dueño):**
     - Dashboard con métricas de ganancias acumuladas en Lempiras (HNL) y artículos activos.
     - Botón **"➕ Publicar Nuevo Artículo"** donde el dueño fija sus precios en Lempiras:
       - Precio por Día (L.)
       - Precio por Semana (L.)
       - Precio por Mes (L.)
       - Depósito en garantía (L.)
       - Selección de fotos presets o URL propia.
     - Al publicar, el artículo **aparece inmediatamente en el catálogo** del comprador.
     - Pestaña para pausar o activar artículos.
     - Solicitud de liquidación y retiro a cuentas bancarias en Honduras (BAC, Atlántida, Ficohsa).

  3. **🛡️ Vista Administrador (Panel Central MobiRent):**
     - Monitoreo de ingresos de la plataforma y garantías en custodia.
     - **Tablero Logístico en Vivo:** Botones interactivos para cambiar el estado de las entregas en tiempo real:
       `[1. Asignar Chofer] ➔ [2. En Recogida] ➔ [3. En Tránsito] ➔ [4. Entregada] ➔ [5. Devolución & Garantía]`
     - Tabla con el desglose financiero de cada alquiler (pago del cliente, pago al dueño, logística y margen de MobiRent).
     - Moderación de artículos del catálogo.

- **📱 Botón "Modo Celular" (Simulador de Móvil):**
  - En la barra superior hay un botón que transforma la vista de escritorio en un teléfono inteligente (con notch y diseño móvil) para proyectarlo en clase y que se mire "pijudo".
  - También es totalmente responsivo y se adapta si lo abres directamente en la pantalla de un celular real.

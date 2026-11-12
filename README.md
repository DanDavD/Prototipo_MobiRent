# MobiRent Honduras - Prototipo Interactivo de Software

Plataforma digital para el alquiler temporal de muebles, electrodomésticos y equipamiento comercial y de eventos en Honduras (San Pedro Sula y Tegucigalpa).

---

## 🏗️ Arquitectura Modular del Proyecto

El código ha sido dividido y estructurado de forma modular y profesional, separando vistas, estado, datos y estilos para facilitar su lectura y mantenimiento:

```text
Prototipo_MobiRent/
├── index.html                  # Punto de entrada HTML limpio y semántico (~95 líneas)
├── css/
│   └── styles.css              # Estilos personalizados, scrollbars y simulador smartphone
├── js/
│   ├── data.js                 # Catálogo inicial de muebles, categorías y presets
│   ├── store.js                # Gestor central de estado reactivo y reglas de negocio (Vue Store)
│   ├── app.js                  # Inicialización y montaje de la aplicación
│   └── components/
│       ├── Navbar.js           # Barra superior, switch de roles y simulador móvil
│       ├── RenterView.js       # Vista del Arrendatario (Catálogo, filtros, búsqueda)
│       ├── OwnerView.js        # Vista del Arrendador (Panel de dueño, ganancias, inventario)
│       ├── AdminView.js        # Panel Administrativo (Tablero logístico en vivo, auditoría)
│       └── Modals.js           # Modales (Cotizador en vivo, checkout, tracking de entrega)
├── serve.sh                    # Script para iniciar el servidor local rápidamente
└── README.md                   # Documentación técnica
```

---

## 🚀 Cómo ejecutar el proyecto

1. **Directamente en tu navegador:**
   - Haz doble clic en `index.html` para abrirlo en Chrome, Safari o Edge.
   
2. **Con el servidor local (Recomendado para verlo en tu celular):**
   ```bash
   ./serve.sh
   ```
   - En tu computadora abre: `http://localhost:8888`
   - En tu celular (misma red Wi-Fi): `http://<TU_IP_LOCAL>:8888`

---

## 🎯 Vistas y Funcionalidades Principales

1. **🛒 Comprador / Arrendatario:**
   - Exploración de catálogo con filtros de ciudad (*San Pedro Sula / Tegucigalpa*) y categorías (*Hogar, Electrodomésticos, Eventos, Oficina, Catering*).
   - **Cotizador en tiempo real:** cálculo por día, semana o mes con desglose transparente (Alquiler + Flete MobiRent + Tarifa de Servicio + Depósito reembolsable).
   - Simulación de pago y dirección de entrega.
   - Pestaña *"Mis Alquileres"* con barra visual de tracking logístico.

2. **🏷️ Vendedor / Arrendador (Dueño):**
   - Dashboard con ganancias acumuladas y saldo listo para liquidar a cuenta bancaria.
   - Publicación de muebles fijando precios por día, semana y mes, y depósito en garantía.
   - Activación / pausa de artículos e historial de solicitudes.

3. **🛡️ Administrador (MobiRent Operations):**
   - Margen de ganancias de la plataforma y custodia de garantías.
   - **Tablero logístico interactivo en vivo:** avanza el estado del transporte paso a paso:
     $$\text{[Asignar Chofer]} \longrightarrow \text{[En Recogida]} \longrightarrow \text{[En Tránsito]} \longrightarrow \text{[Entregada]} \longrightarrow \text{[Devuelta \& Garantía]}$$
   - Auditoría financiera y moderación de catálogo.

4. **📱 Simulador de Smartphone:**
   - Botón en la barra superior que enmarca la interfaz en un teléfono móvil para presentaciones en clase y proyector.

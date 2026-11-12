/**
 * ==============================================================
 * MobiRent Honduras - Aplicación Principal (js/app.js)
 * ==============================================================
 * Registra los componentes modulares y monta la aplicación Vue 3.
 */

const { createApp } = Vue;

const app = createApp({
  setup() {
    return {
      store: window.MobiRentStore
    };
  }
});

// Registro de componentes modulares
app.component('navbar-component', window.NavbarComponent);
app.component('renter-view', window.RenterViewComponent);
app.component('owner-view', window.OwnerViewComponent);
app.component('admin-view', window.AdminViewComponent);
app.component('modals-component', window.ModalsComponent);

// Montaje de la aplicación
app.mount('#app');

// File: js/app.js
const { createApp } = Vue;

const app = createApp({
  setup() {
    // Expose the global store to all components
    return {
      store: window.MobiRentStore
    };
  }
});

// Register modular components globally
app.component('login-view', window.LoginViewComponent);
app.component('navbar-component', window.NavbarComponent);
app.component('renter-view', window.RenterViewComponent);
app.component('owner-view', window.OwnerViewComponent);
app.component('admin-view', window.AdminViewComponent);
app.component('modals-component', window.ModalsComponent);

// Mount the application to the DOM
app.mount('#app');

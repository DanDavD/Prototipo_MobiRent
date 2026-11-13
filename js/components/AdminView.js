/**
 * ==============================================================
 * Componente: AdminView (js/components/AdminView.js)
 * ==============================================================
 * Sección de Operaciones: vista sutil y sobria que indica
 * que el módulo logístico se encuentra en desarrollo.
 */

window.AdminViewComponent = {
  template: `
    <div class="flex flex-col items-center justify-center min-h-[55vh] px-6 text-center pb-24 sm:pb-12">
      <div class="w-11 h-11 rounded-full bg-surface-subtle border border-surface-border flex items-center justify-center text-charcoal-muted mb-3">
        <svg class="w-5 h-5 text-charcoal-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"/>
        </svg>
      </div>
      <h2 class="text-sm font-bold text-charcoal">Módulo en desarrollo</h2>
      <p class="text-xs text-charcoal-muted mt-1 max-w-xs leading-relaxed">
        El centro de operaciones y despacho logístico estará disponible próximamente.
      </p>
    </div>
  `,
  setup() {
    return { store: window.MobiRentStore };
  }
};

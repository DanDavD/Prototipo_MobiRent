/**
 * ==============================================================
 * Componente: Navbar (js/components/Navbar.js)
 * ==============================================================
 * Barra de navegación inspirada en el lenguaje de diseño de Airbnb:
 * fondo blanco nítido, micro-interacciones sutiles, control
 * segmentado de roles e iconografía lineal sin emojis.
 */

window.NavbarComponent = {
  template: `
    <header class="bg-white border-b border-surface-border sticky top-0 z-40">
      <div class="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4">
        
        <!-- Logotipo / Identidad de Marca -->
        <div 
          class="flex items-center space-x-2.5 cursor-pointer select-none" 
          @click="store.activeRole = 'renter'">
          <div class="w-8 h-8 rounded-lg bg-forest flex items-center justify-center text-white transition-transform duration-200 active:scale-95">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
            </svg>
          </div>
          <div>
            <div class="flex items-center space-x-1.5">
              <span class="font-bold text-base tracking-tight text-charcoal">mobirent</span>
              <span class="text-[10px] uppercase font-semibold tracking-wider text-charcoal-muted border border-surface-border px-1.5 py-0.5 rounded">Honduras</span>
            </div>
          </div>
        </div>

        <!-- Selector de Perspectiva (Segmented Pill) -->
        <nav class="flex items-center bg-surface-subtle p-1 rounded-full border border-surface-border">
          <button 
            @click="store.activeRole = 'renter'" 
            :class="store.activeRole === 'renter' ? 'bg-white text-charcoal shadow-sm' : 'text-charcoal-muted hover:text-charcoal'"
            class="px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-150">
            Arrendatario
          </button>

          <button 
            @click="store.activeRole = 'owner'" 
            :class="store.activeRole === 'owner' ? 'bg-white text-charcoal shadow-sm' : 'text-charcoal-muted hover:text-charcoal'"
            class="px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-150">
            Propietario
          </button>

          <button 
            @click="store.activeRole = 'admin'" 
            :class="store.activeRole === 'admin' ? 'bg-white text-charcoal shadow-sm' : 'text-charcoal-muted hover:text-charcoal'"
            class="px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-150">
            Operaciones
          </button>
        </nav>

        <!-- Utilidades: Simulador Móvil y Restablecimiento -->
        <div class="flex items-center space-x-2">
          <button 
            @click="store.toggleDeviceMode()"
            class="flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-charcoal border border-surface-border hover:border-charcoal transition-colors">
            <svg class="w-3.5 h-3.5 text-charcoal-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"/>
            </svg>
            <span class="hidden sm:inline">{{ store.isMobileView ? 'Pantalla completa' : 'Vista móvil' }}</span>
          </button>

          <button 
            @click="store.resetData()" 
            title="Restablecer datos de prueba"
            class="p-2 rounded-full text-charcoal-muted hover:text-charcoal hover:bg-surface-subtle transition-colors">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
            </svg>
          </button>
        </div>

      </div>
    </header>
  `,
  setup() {
    return { store: window.MobiRentStore };
  }
};

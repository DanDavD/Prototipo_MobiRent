/**
 * ==============================================================
 * Componente: Navbar (js/components/Navbar.js)
 * ==============================================================
 * Barra de navegación sobria y minimalista:
 * - Logotipo tipográfico puro sin íconos artificiales.
 * - Píldora segmentada central para alternar entre perfiles.
 * - Barra inferior ergonómica en móviles para navegación fluida.
 */

window.NavbarComponent = {
  template: `
    <div>
      
      <!-- CABECERA SUPERIOR -->
      <header class="bg-white border-b border-surface-border sticky top-0 z-30">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-3.5 flex items-center justify-between gap-4">
          
          <!-- Marca / Logotipo Tipográfico Limpio -->
          <div 
            class="flex items-center space-x-2 cursor-pointer select-none active:opacity-75 transition-opacity" 
            @click="store.activeRole = 'renter'">
            <span class="font-bold text-lg tracking-tight text-charcoal">mobirent</span>
            <span class="text-[10px] uppercase font-bold tracking-wider text-charcoal-muted bg-surface-subtle border border-surface-border px-1.5 py-0.5 rounded">Honduras</span>
          </div>

          <!-- Selector de Vista Central (Escritorio / Tablet) -->
          <nav class="hidden sm:flex items-center bg-surface-subtle p-1 rounded-full border border-surface-border">
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

          <!-- Acción Superior Derecha (Estilo Airbnb: Publicar Artículo) -->
          <div class="flex items-center space-x-2">
            <button 
              @click="store.showPublishModal = true"
              class="hidden sm:inline-flex text-xs font-semibold text-charcoal hover:bg-surface-subtle px-3.5 py-1.5 rounded-full border border-surface-border transition-colors">
              Publicar artículo
            </button>
          </div>

        </div>
      </header>

      <!-- BARRA DE NAVEGACIÓN INFERIOR PARA MÓVILES -->
      <nav class="sm:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-surface-border shadow-bottom-nav safe-bottom">
        <div class="grid grid-cols-4 h-14">
          
          <button 
            @click="store.activeRole = 'renter'" 
            class="flex flex-col items-center justify-center space-y-1 transition-colors"
            :class="store.activeRole === 'renter' ? 'text-forest font-bold' : 'text-charcoal-muted hover:text-charcoal'">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
            <span class="text-[10px] tracking-tight">Explorar</span>
          </button>

          <button 
            @click="store.activeRole = 'owner'" 
            class="flex flex-col items-center justify-center space-y-1 transition-colors"
            :class="store.activeRole === 'owner' ? 'text-forest font-bold' : 'text-charcoal-muted hover:text-charcoal'">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
            </svg>
            <span class="text-[10px] tracking-tight">Anfitrión</span>
          </button>

          <button 
            @click="store.activeRole = 'admin'" 
            class="flex flex-col items-center justify-center space-y-1 transition-colors"
            :class="store.activeRole === 'admin' ? 'text-forest font-bold' : 'text-charcoal-muted hover:text-charcoal'">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"/>
            </svg>
            <span class="text-[10px] tracking-tight">Operaciones</span>
          </button>

          <button 
            @click="store.showMyRentalsModal = true" 
            class="flex flex-col items-center justify-center space-y-1 transition-colors relative"
            :class="store.showMyRentalsModal ? 'text-forest font-bold' : 'text-charcoal-muted hover:text-charcoal'">
            <div class="relative">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
              </svg>
              <span v-if="store.myRentalsCount > 0" class="absolute -top-1 -right-2 w-4 h-4 bg-forest text-white rounded-full text-[9px] flex items-center justify-center font-bold">
                {{ store.myRentalsCount }}
              </span>
            </div>
            <span class="text-[10px] tracking-tight">Alquileres</span>
          </button>

        </div>
      </nav>

    </div>
  `,
  setup() {
    return { store: window.MobiRentStore };
  }
};

/**
 * ==============================================================
 * Componente: Navbar (js/components/Navbar.js)
 * ==============================================================
 * Navegación optimizada para móvil y escritorio:
 * - Escritorio/Tablet: Píldora segmentada superior estilo Airbnb.
 * - Móvil: Cabecera limpia y Barra de Navegación Inferior (Bottom Bar)
 *   ergonómica para uso con una sola mano y botones táctiles amplios.
 */

window.NavbarComponent = {
  template: `
    <div>
      
      <!-- CABECERA SUPERIOR (Sticky) -->
      <header class="bg-white border-b border-surface-border sticky top-0 z-30">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-3.5 flex items-center justify-between gap-3">
          
          <!-- Marca / Logotipo -->
          <div 
            class="flex items-center space-x-2.5 cursor-pointer select-none active:opacity-75 transition-opacity" 
            @click="store.activeRole = 'renter'">
            <div class="w-8 h-8 rounded-xl bg-forest flex items-center justify-center text-white shrink-0 shadow-sm">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
              </svg>
            </div>
            <div>
              <div class="flex items-center space-x-1.5">
                <span class="font-bold text-base tracking-tight text-charcoal">mobirent</span>
                <span class="text-[10px] uppercase font-bold tracking-wider text-charcoal-muted bg-surface-subtle border border-surface-border px-1.5 py-0.5 rounded">Honduras</span>
              </div>
            </div>
          </div>

          <!-- Selector de Rol en Escritorio / Tablet (Pantallas Medianas y Grandes) -->
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

          <!-- Controles de Utilidad (Modo móvil en escritorio y Reset) -->
          <div class="flex items-center space-x-2">
            
            <!-- Botón de Simulación Móvil (Solo visible en pantallas de computadora) -->
            <button 
              @click="store.toggleDeviceMode()"
              class="hidden md:flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-charcoal border border-surface-border hover:border-charcoal transition-colors">
              <svg class="w-3.5 h-3.5 text-charcoal-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"/>
              </svg>
              <span>{{ store.isMobileView ? 'Pantalla completa' : 'Marco móvil' }}</span>
            </button>

            <!-- Botón Restablecer Datos -->
            <button 
              @click="store.resetData()" 
              title="Restablecer datos de prueba"
              class="p-2 rounded-full text-charcoal-muted hover:text-charcoal hover:bg-surface-subtle transition-colors">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
              </svg>
            </button>

          </div>

        </div>
      </header>

      <!-- BARRA DE NAVEGACIÓN INFERIOR PARA MÓVILES (Bottom Bar estilo App nativa) -->
      <!-- Ocupa la parte inferior de la pantalla en dispositivos móviles para acceso ergonómico con el pulgar -->
      <nav class="sm:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-surface-border shadow-bottom-nav safe-bottom">
        <div class="grid grid-cols-4 h-14">
          
          <!-- Botón 1: Explorar / Catálogo -->
          <button 
            @click="store.activeRole = 'renter'" 
            class="flex flex-col items-center justify-center space-y-1 transition-colors"
            :class="store.activeRole === 'renter' ? 'text-forest font-bold' : 'text-charcoal-muted hover:text-charcoal'">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
            <span class="text-[10px] tracking-tight">Explorar</span>
          </button>

          <!-- Botón 2: Anfitrión / Propietario -->
          <button 
            @click="store.activeRole = 'owner'" 
            class="flex flex-col items-center justify-center space-y-1 transition-colors"
            :class="store.activeRole === 'owner' ? 'text-forest font-bold' : 'text-charcoal-muted hover:text-charcoal'">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
            </svg>
            <span class="text-[10px] tracking-tight">Anfitrión</span>
          </button>

          <!-- Botón 3: Operaciones / Logística -->
          <button 
            @click="store.activeRole = 'admin'" 
            class="flex flex-col items-center justify-center space-y-1 transition-colors"
            :class="store.activeRole === 'admin' ? 'text-forest font-bold' : 'text-charcoal-muted hover:text-charcoal'">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"/>
            </svg>
            <span class="text-[10px] tracking-tight">Operaciones</span>
          </button>

          <!-- Botón 4: Mis Alquileres (Directo) -->
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

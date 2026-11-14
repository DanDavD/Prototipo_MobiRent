/**
 * ==============================================================
 * Componente: Navbar (js/components/Navbar.js)
 * ==============================================================
 * Barra de navegación con control estricto de roles:
 * - Rol 'client' (cliente@gmail.com): Explorar, Anfitrión, Alquileres, Salir.
 * - Rol 'admin' (admin@gmail.com): Logística, Financiero, Catálogo, Salir.
 * - Sin botones de cambio libre de rol entre cliente y administrador.
 * - Sin simulador de vista móvil ni elementos temporales de desarrollo.
 */

window.NavbarComponent = {
  template: `
    <div>
      
      <!-- ============================================================== -->
      <!-- 1. CABECERA SUPERIOR PARA CLIENTE                              -->
      <!-- ============================================================== -->
      <header v-if="isClient" class="bg-white border-b border-surface-border sticky top-0 z-30">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-3.5 flex items-center justify-between gap-4">
          
          <!-- Marca / Logotipo Tipográfico Limpio -->
          <div 
            class="flex items-center space-x-2 cursor-pointer select-none active:opacity-75 transition-opacity" 
            @click="store.activeRole = 'renter'">
            <span class="font-bold text-lg tracking-tight text-charcoal">mobirent</span>
            <span class="text-[10px] uppercase font-bold tracking-wider text-charcoal-muted bg-surface-subtle border border-surface-border px-1.5 py-0.5 rounded">Honduras</span>
          </div>

          <!-- Selector de Modo Cliente (Solo Escritorio / Tablet) -->
          <nav class="hidden sm:flex items-center bg-surface-subtle p-1 rounded-full border border-surface-border">
            <button 
              @click="store.activeRole = 'renter'" 
              :class="store.activeRole === 'renter' ? 'bg-white text-charcoal shadow-sm' : 'text-charcoal-muted hover:text-charcoal'"
              class="px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-150">
              Explorar catálogo
            </button>

            <button 
              @click="store.activeRole = 'owner'" 
              :class="store.activeRole === 'owner' ? 'bg-white text-charcoal shadow-sm' : 'text-charcoal-muted hover:text-charcoal'"
              class="px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-150">
              Modo Anfitrión
            </button>
          </nav>

          <!-- Acciones de Usuario Cliente -->
          <div class="flex items-center space-x-2 shrink-0">
            
            <!-- Botón Publicar Artículo -->
            <button 
              @click="store.showPublishModal = true"
              class="hidden sm:inline-flex items-center space-x-1 text-xs font-semibold text-charcoal hover:bg-surface-subtle px-3 py-1.5 rounded-full border border-surface-border transition-colors">
              <svg class="w-3.5 h-3.5 text-forest" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
              </svg>
              <span>Publicar</span>
            </button>

            <!-- Píldora de Perfil Cliente -->
            <div class="flex items-center space-x-1.5 bg-surface-subtle border border-surface-border px-2.5 py-1 rounded-full text-xs">
              <div class="w-5 h-5 rounded-full bg-forest text-white text-[10px] font-bold flex items-center justify-center">
                C
              </div>
              <span class="font-medium text-charcoal hidden sm:inline text-xs">cliente@gmail.com</span>
            </div>

            <!-- Botón Cerrar Sesión -->
            <button 
              @click="store.logout()"
              title="Cerrar sesión"
              class="text-xs font-medium text-charcoal-muted hover:text-red-700 bg-white hover:bg-red-50 border border-surface-border hover:border-red-200 px-2.5 py-1.5 rounded-full transition-colors flex items-center space-x-1">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
              </svg>
              <span class="hidden xs:inline text-[11px]">Salir</span>
            </button>

          </div>

        </div>
      </header>

      <!-- ============================================================== -->
      <!-- 2. CABECERA SUPERIOR PARA ADMINISTRADOR                        -->
      <!-- ============================================================== -->
      <header v-else-if="isAdmin" class="bg-white border-b border-surface-border sticky top-0 z-30">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-3.5 flex items-center justify-between gap-4">
          
          <!-- Marca / Logotipo -->
          <div class="flex items-center space-x-2 select-none">
            <span class="font-bold text-lg tracking-tight text-charcoal">mobirent</span>
            <span class="text-[10px] uppercase font-bold tracking-wider text-forest bg-forest-light border border-forest-border px-1.5 py-0.5 rounded">Operaciones</span>
          </div>

          <!-- Título Central en Desktop -->
          <div class="hidden sm:flex items-center space-x-1 text-xs text-charcoal font-semibold bg-surface-subtle border border-surface-border px-3.5 py-1.5 rounded-full">
            <svg class="w-3.5 h-3.5 text-forest" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
            </svg>
            <span>Consola de Administración Central</span>
          </div>

          <!-- Acciones de Administrador -->
          <div class="flex items-center space-x-2 shrink-0">
            <div class="flex items-center space-x-1.5 bg-forest-light border border-forest-border px-2.5 py-1 rounded-full text-xs">
              <span class="w-2 h-2 rounded-full bg-forest animate-pulse"></span>
              <span class="font-bold text-forest text-xs">admin@gmail.com</span>
            </div>

            <!-- Botón Cerrar Sesión -->
            <button 
              @click="store.logout()"
              title="Cerrar sesión"
              class="text-xs font-medium text-charcoal-muted hover:text-red-700 bg-white hover:bg-red-50 border border-surface-border hover:border-red-200 px-2.5 py-1.5 rounded-full transition-colors flex items-center space-x-1">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
              </svg>
              <span class="hidden xs:inline text-[11px]">Salir</span>
            </button>
          </div>

        </div>
      </header>

      <!-- ============================================================== -->
      <!-- 3. BARRA INFERIOR MÓVIL PARA CLIENTE                           -->
      <!-- ============================================================== -->
      <nav v-if="isClient" class="sm:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-surface-border shadow-bottom-nav safe-bottom">
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

          <button 
            @click="store.logout()" 
            class="flex flex-col items-center justify-center space-y-1 transition-colors text-charcoal-muted hover:text-red-700">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
            </svg>
            <span class="text-[10px] tracking-tight">Salir</span>
          </button>

        </div>
      </nav>

      <!-- ============================================================== -->
      <!-- 4. BARRA INFERIOR MÓVIL PARA ADMINISTRADOR                     -->
      <!-- ============================================================== -->
      <nav v-else-if="isAdmin" class="sm:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-surface-border shadow-bottom-nav safe-bottom">
        <div class="grid grid-cols-4 h-14">
          
          <button 
            @click="store.adminTab = 'logistics'" 
            class="flex flex-col items-center justify-center space-y-1 transition-colors"
            :class="store.adminTab === 'logistics' ? 'text-forest font-bold' : 'text-charcoal-muted hover:text-charcoal'">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"/>
            </svg>
            <span class="text-[10px] tracking-tight">Logística</span>
          </button>

          <button 
            @click="store.adminTab = 'orders'" 
            class="flex flex-col items-center justify-center space-y-1 transition-colors"
            :class="store.adminTab === 'orders' ? 'text-forest font-bold' : 'text-charcoal-muted hover:text-charcoal'">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <span class="text-[10px] tracking-tight">Finanzas</span>
          </button>

          <button 
            @click="store.adminTab = 'catalog'" 
            class="flex flex-col items-center justify-center space-y-1 transition-colors"
            :class="store.adminTab === 'catalog' ? 'text-forest font-bold' : 'text-charcoal-muted hover:text-charcoal'">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"/>
            </svg>
            <span class="text-[10px] tracking-tight">Catálogo</span>
          </button>

          <button 
            @click="store.logout()" 
            class="flex flex-col items-center justify-center space-y-1 transition-colors text-charcoal-muted hover:text-red-700">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
            </svg>
            <span class="text-[10px] tracking-tight">Salir</span>
          </button>

        </div>
      </nav>

    </div>
  `,
  setup() {
    const { computed } = Vue;
    const store = window.MobiRentStore;

    const isClient = computed(() => store.currentUser && store.currentUser.role === 'client');
    const isAdmin = computed(() => store.currentUser && store.currentUser.role === 'admin');

    return {
      store,
      isClient,
      isAdmin
    };
  }
};

/**
 * ==============================================================
 * Componente: Navbar (js/components/Navbar.js)
 * ==============================================================
 * Barra de navegación principal: control de roles, selector de
 * pantalla (móvil/escritorio) y restablecimiento de datos.
 */

window.NavbarComponent = {
  template: `
    <header class="bg-slate-900 text-white sticky top-0 z-50 shadow-md border-b border-slate-800">
      <div class="max-w-7xl mx-auto px-4 py-2.5 flex flex-wrap items-center justify-between gap-3">
        
        <!-- Logo y Badges -->
        <div class="flex items-center space-x-3 cursor-pointer" @click="store.activeRole = 'renter'">
          <div class="w-9 h-9 bg-gradient-to-tr from-emerald-500 to-teal-400 rounded-xl flex items-center justify-center font-black text-xl text-white shadow-lg shadow-emerald-500/20">
            M
          </div>
          <div>
            <div class="flex items-center space-x-2">
              <span class="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white via-slate-100 to-emerald-300 bg-clip-text text-transparent">MobiRent</span>
              <span class="text-[10px] uppercase font-bold tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full">Honduras</span>
            </div>
            <p class="text-[11px] text-slate-400 hidden sm:block">Prototipo Interactivo • San Pedro Sula & Tegucigalpa</p>
          </div>
        </div>

        <!-- Selector de Rol (Comprador / Vendedor / Admin) -->
        <div class="flex items-center bg-slate-800 p-1 rounded-xl border border-slate-700/80 shadow-inner">
          <button 
            @click="store.activeRole = 'renter'" 
            :class="store.activeRole === 'renter' ? 'bg-emerald-500 text-white shadow-md' : 'text-slate-300 hover:text-white'"
            class="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all">
            <span>🛒</span>
            <span class="hidden sm:inline">Comprador</span>
            <span class="sm:hidden">Alquilar</span>
          </button>

          <button 
            @click="store.activeRole = 'owner'" 
            :class="store.activeRole === 'owner' ? 'bg-emerald-500 text-white shadow-md' : 'text-slate-300 hover:text-white'"
            class="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all">
            <span>🏷️</span>
            <span class="hidden sm:inline">Vendedor / Dueño</span>
            <span class="sm:hidden">Publicar</span>
          </button>

          <button 
            @click="store.activeRole = 'admin'" 
            :class="store.activeRole === 'admin' ? 'bg-emerald-500 text-white shadow-md' : 'text-slate-300 hover:text-white'"
            class="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all">
            <span>🛡️</span>
            <span>Admin</span>
          </button>
        </div>

        <!-- Simulador de Dispositivo (Modo Celular vs Pantalla Completa) -->
        <div class="flex items-center space-x-2">
          <button 
            @click="store.toggleDeviceMode()"
            :title="store.isMobileView ? 'Cambiar a Pantalla Completa' : 'Simular Pantalla de Celular'"
            class="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition">
            <span v-if="!store.isMobileView">📱 Modo Celular</span>
            <span v-else>💻 Pantalla Completa</span>
          </button>

          <!-- Botón Reiniciar Datos -->
          <button 
            @click="store.resetData()" 
            title="Reiniciar datos de prueba"
            class="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition text-xs">
            🔄
          </button>
        </div>

      </div>
    </header>
  `,
  setup() {
    return { store: window.MobiRentStore };
  }
};

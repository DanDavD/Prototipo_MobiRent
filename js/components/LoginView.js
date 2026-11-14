/**
 * ==============================================================
 * Componente: LoginView (js/components/LoginView.js)
 * ==============================================================
 * Pantalla de inicio de sesión con estética minimalista Airbnb:
 * - Autenticación estricta para:
 *   1. cliente@gmail.com (contra123) -> Dirige a sección de cliente
 *   2. admin@gmail.com (contra123)   -> Dirige a sección de administrador
 * - Accesos rápidos en un toque para testing en móviles.
 * - Sin emojis, íconos vectoriales sobrios y fondos blancos limpios.
 */

window.LoginViewComponent = {
  template: `
    <div class="min-h-screen bg-white flex flex-col justify-between px-4 py-8 sm:py-12">
      
      <!-- CABECERA SUPERIOR -->
      <header class="max-w-md mx-auto w-full flex items-center justify-between pb-6 border-b border-surface-border">
        <div class="flex items-center space-x-2">
          <span class="font-bold text-xl tracking-tight text-charcoal">mobirent</span>
          <span class="text-[10px] uppercase font-bold tracking-wider text-charcoal-muted bg-surface-subtle border border-surface-border px-1.5 py-0.5 rounded">Honduras</span>
        </div>
        <span class="text-xs text-charcoal-muted font-medium">Acceso Seguro</span>
      </header>

      <!-- TARJETA PRINCIPAL DE LOGIN -->
      <main class="max-w-md mx-auto w-full my-auto py-6">
        
        <div class="mb-6">
          <h1 class="text-2xl font-bold tracking-tight text-charcoal">Bienvenido a MobiRent</h1>
          <p class="text-xs text-charcoal-muted mt-1 leading-relaxed">
            Plataforma de alquiler de mobiliario y equipo en San Pedro Sula y Tegucigalpa.
          </p>
        </div>

        <!-- Alerta de Error de Credenciales -->
        <div 
          v-if="store.loginForm.error" 
          class="mb-4 p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-start space-x-2.5">
          <svg class="w-4 h-4 text-red-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
          </svg>
          <span class="leading-snug">{{ store.loginForm.error }}</span>
        </div>

        <!-- Formulario de Inicio de Sesión -->
        <form @submit.prevent="handleSubmit" class="space-y-4">
          
          <!-- Campo: Correo Electrónico -->
          <div>
            <label class="block text-xs font-bold text-charcoal uppercase tracking-wider mb-1.5">
              Correo electrónico
            </label>
            <div class="relative">
              <input 
                type="email" 
                v-model="store.loginForm.email"
                placeholder="ejemplo@gmail.com" 
                required
                class="w-full text-sm px-3.5 py-3 rounded-xl border border-surface-border bg-white text-charcoal placeholder-charcoal-light focus:outline-none focus:ring-2 focus:ring-forest/20 focus:border-forest transition-colors">
            </div>
          </div>

          <!-- Campo: Contraseña -->
          <div>
            <div class="flex items-center justify-between mb-1.5">
              <label class="block text-xs font-bold text-charcoal uppercase tracking-wider">
                Contraseña
              </label>
            </div>
            <div class="relative">
              <input 
                :type="showPassword ? 'text' : 'password'" 
                v-model="store.loginForm.password"
                placeholder="••••••••" 
                required
                class="w-full text-sm px-3.5 py-3 pr-10 rounded-xl border border-surface-border bg-white text-charcoal placeholder-charcoal-light focus:outline-none focus:ring-2 focus:ring-forest/20 focus:border-forest transition-colors">
              <button 
                type="button" 
                @click="showPassword = !showPassword"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-charcoal-muted hover:text-charcoal p-1">
                <svg v-if="!showPassword" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                </svg>
                <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18"/>
                </svg>
              </button>
            </div>
          </div>

          <!-- Botón de Envío -->
          <button 
            type="submit"
            class="w-full bg-forest hover:bg-forest-hover active:scale-[0.99] text-white text-sm font-bold py-3.5 rounded-xl shadow-sm transition-all duration-150 flex items-center justify-center space-x-2">
            <span>Iniciar sesión</span>
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
            </svg>
          </button>
        </form>

        <!-- SEPARADOR CONTEXTUAL -->
        <div class="relative my-7">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-surface-border"></div>
          </div>
          <div class="relative flex justify-center text-[11px] uppercase tracking-wider">
            <span class="bg-white px-3 text-charcoal-muted font-bold">Cuentas autorizadas de prueba</span>
          </div>
        </div>

        <!-- ACCESOS RÁPIDOS EN UN TOQUE (Ideal para demostración en móvil) -->
        <div class="space-y-2.5">
          
          <!-- Botón Cuenta 1: Cliente -->
          <div 
            @click="quickLogin('cliente@gmail.com', 'contra123')"
            class="p-3.5 rounded-2xl border border-surface-border hover:border-forest/40 bg-white hover:bg-surface-subtle cursor-pointer transition-all active:scale-[0.99] shadow-sm flex items-center justify-between group">
            <div class="flex items-center space-x-3">
              <div class="w-9 h-9 rounded-full bg-surface-subtle border border-surface-border flex items-center justify-center text-charcoal group-hover:bg-forest group-hover:text-white transition-colors">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                </svg>
              </div>
              <div>
                <div class="flex items-center space-x-1.5">
                  <span class="text-xs font-bold text-charcoal">Cuenta Cliente</span>
                  <span class="text-[9px] uppercase font-bold text-forest bg-forest-light border border-forest-border px-1.5 py-0.2 rounded">Arrendatario</span>
                </div>
                <p class="text-[11px] text-charcoal-muted mt-0.5 font-mono">cliente@gmail.com · contra123</p>
              </div>
            </div>
            <span class="text-xs font-bold text-forest group-hover:translate-x-0.5 transition-transform">Ingresar →</span>
          </div>

          <!-- Botón Cuenta 2: Administrador -->
          <div 
            @click="quickLogin('admin@gmail.com', 'contra123')"
            class="p-3.5 rounded-2xl border border-surface-border hover:border-forest/40 bg-white hover:bg-surface-subtle cursor-pointer transition-all active:scale-[0.99] shadow-sm flex items-center justify-between group">
            <div class="flex items-center space-x-3">
              <div class="w-9 h-9 rounded-full bg-surface-subtle border border-surface-border flex items-center justify-center text-charcoal group-hover:bg-forest group-hover:text-white transition-colors">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                </svg>
              </div>
              <div>
                <div class="flex items-center space-x-1.5">
                  <span class="text-xs font-bold text-charcoal">Cuenta Administrador</span>
                  <span class="text-[9px] uppercase font-bold text-charcoal-muted bg-surface-subtle border border-surface-border px-1.5 py-0.2 rounded">Operaciones</span>
                </div>
                <p class="text-[11px] text-charcoal-muted mt-0.5 font-mono">admin@gmail.com · contra123</p>
              </div>
            </div>
            <span class="text-xs font-bold text-forest group-hover:translate-x-0.5 transition-transform">Ingresar →</span>
          </div>

        </div>

      </main>

      <!-- PIE DE PÁGINA SOBRIO -->
      <footer class="max-w-md mx-auto w-full pt-6 border-t border-surface-border text-center">
        <p class="text-[11px] text-charcoal-muted">
          MobiRent Honduras · Alquiler protegido con custodia de garantías y logística verificada.
        </p>
      </footer>

    </div>
  `,
  setup() {
    const { ref } = Vue;
    const store = window.MobiRentStore;
    const showPassword = ref(false);

    const handleSubmit = () => {
      store.login(store.loginForm.email, store.loginForm.password);
    };

    const quickLogin = (email, password) => {
      store.fillAndLogin(email, password);
    };

    return {
      store,
      showPassword,
      handleSubmit,
      quickLogin
    };
  }
};

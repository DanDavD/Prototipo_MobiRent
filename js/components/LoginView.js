/**
 * ==============================================================
 * Componente: LoginView (js/components/LoginView.js)
 * ==============================================================
 * Pantalla de inicio de sesión de producción (Estética Airbnb):
 * - Autenticación real según credenciales ingresadas:
 *   1. cliente@gmail.com / contra123 -> Sección Cliente
 *   2. admin@gmail.com / contra123   -> Sección Administrador
 * - Sin tips, pistas ni tarjetas de demostración.
 * - Tipografía Plus Jakarta Sans, diseño limpio en blanco y verde bosque.
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
      <main class="max-w-md mx-auto w-full my-auto py-8">
        
        <div class="mb-7">
          <h1 class="text-2xl font-bold tracking-tight text-charcoal">Iniciar sesión</h1>
          <p class="text-xs text-charcoal-muted mt-1 leading-relaxed">
            Ingrese sus credenciales para acceder a la plataforma de MobiRent.
          </p>
        </div>

        <!-- Alerta de Error de Credenciales -->
        <div 
          v-if="store.loginForm.error" 
          class="mb-5 p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-start space-x-2.5">
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
                placeholder="ejemplo@correo.com" 
                required
                autocomplete="email"
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
                autocomplete="current-password"
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
            class="w-full bg-forest hover:bg-forest-hover active:scale-[0.99] text-white text-sm font-bold py-3.5 rounded-xl shadow-sm transition-all duration-150 flex items-center justify-center space-x-2 mt-2">
            <span>Iniciar sesión</span>
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
            </svg>
          </button>
        </form>

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

    return {
      store,
      showPassword,
      handleSubmit
    };
  }
};

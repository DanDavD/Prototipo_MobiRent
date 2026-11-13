/**
 * ==============================================================
 * Componente: OwnerView (js/components/OwnerView.js)
 * ==============================================================
 * Panel del Propietario optimizado para pantallas táctiles y móviles:
 * - KPIs visuales en cuadrícula cómoda y no comprimida.
 * - Tarjetas de artículos con botones táctiles generosos.
 * - Formularios y pestañas adaptables a pantallas pequeñas y tablet.
 */

window.OwnerViewComponent = {
  template: `
    <div class="flex flex-col min-h-full bg-white pb-24 sm:pb-12">
      
      <!-- Encabezado de Anfitrión -->
      <header class="border-b border-surface-border bg-white px-4 sm:px-6 md:px-8 py-5">
        <div class="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div class="flex items-center space-x-2">
              <h1 class="text-xl font-bold tracking-tight text-charcoal">Panel de Anfitrión</h1>
              <span class="text-[10px] font-bold text-forest bg-forest-light border border-forest-border px-2 py-0.5 rounded-full">
                Verificado
              </span>
            </div>
            <p class="text-xs text-charcoal-muted mt-1">Monetice sus pertenencias en desuso con logística centralizada.</p>
          </div>

          <!-- Acciones de Anfitrión: Publicar y Modo Administrador -->
          <div class="flex items-center gap-2 w-full sm:w-auto">
            <button 
              @click="store.showPublishModal = true"
              class="flex-1 sm:flex-initial bg-forest hover:bg-forest-hover text-white text-xs font-bold py-2.5 sm:py-2 px-4 rounded-xl sm:rounded-full shadow-sm transition-all duration-150 flex items-center justify-center space-x-1.5 active:scale-95">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
              </svg>
              <span>Publicar artículo</span>
            </button>

            <button 
              @click="store.activeRole = 'admin'; store.showFullAdmin = true"
              class="sm:flex-initial bg-white hover:bg-surface-subtle text-charcoal text-xs font-semibold py-2.5 sm:py-2 px-3.5 rounded-xl sm:rounded-full border border-surface-border shadow-sm transition-all duration-150 flex items-center justify-center space-x-1.5 active:scale-95">
              <svg class="w-4 h-4 text-forest" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
              </svg>
              <span>Modo Admin</span>
            </button>
          </div>
        </div>

        <!-- Tarjetas de Métricas (2x2 en móvil, 4x1 en tablet/desktop) -->
        <div class="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mt-5">
          <div class="p-3.5 sm:p-4 rounded-2xl border border-surface-border bg-white shadow-airbnb">
            <span class="text-[10px] font-bold text-charcoal-muted uppercase tracking-wider block">Saldo acumulado</span>
            <div class="text-xl sm:text-2xl font-bold text-forest mt-1">L {{ store.ownerStats.totalEarnings }}</div>
            <span class="text-[10px] text-charcoal-muted block mt-0.5">Listo para retiro</span>
          </div>

          <div class="p-3.5 sm:p-4 rounded-2xl border border-surface-border bg-white shadow-airbnb">
            <span class="text-[10px] font-bold text-charcoal-muted uppercase tracking-wider block">Artículos activos</span>
            <div class="text-xl sm:text-2xl font-bold text-charcoal mt-1">{{ store.ownerArticles.length }}</div>
            <span class="text-[10px] text-charcoal-muted block mt-0.5">En catálogo</span>
          </div>

          <div class="p-3.5 sm:p-4 rounded-2xl border border-surface-border bg-white shadow-airbnb">
            <span class="text-[10px] font-bold text-charcoal-muted uppercase tracking-wider block">Alquileres activos</span>
            <div class="text-xl sm:text-2xl font-bold text-charcoal mt-1">{{ store.ownerStats.activeRentals }}</div>
            <span class="text-[10px] text-charcoal-muted block mt-0.5">Generando renta</span>
          </div>

          <div class="p-3.5 sm:p-4 rounded-2xl border border-surface-border bg-white shadow-airbnb">
            <span class="text-[10px] font-bold text-charcoal-muted uppercase tracking-wider block">Valoración</span>
            <div class="text-xl sm:text-2xl font-bold text-charcoal mt-1 flex items-baseline space-x-1">
              <span>★ 4.9</span>
              <span class="text-xs font-normal text-charcoal-muted">(18)</span>
            </div>
            <span class="text-[10px] text-charcoal-muted block mt-0.5">Excelente estado</span>
          </div>
        </div>
      </header>

      <!-- Navegación por Pestañas del Anfitrión -->
      <section class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-5 w-full flex-1">
        
        <div class="flex items-center space-x-4 sm:space-x-6 border-b border-surface-border mb-5 overflow-x-auto no-scrollbar">
          <button 
            @click="store.ownerTab = 'items'" 
            :class="store.ownerTab === 'items' ? 'border-forest text-forest font-bold' : 'border-transparent text-charcoal-muted hover:text-charcoal font-medium'"
            class="pb-3 border-b-2 text-xs whitespace-nowrap transition-colors">
            Mis muebles ({{ store.ownerArticles.length }})
          </button>

          <button 
            @click="store.ownerTab = 'requests'" 
            :class="store.ownerTab === 'requests' ? 'border-forest text-forest font-bold' : 'border-transparent text-charcoal-muted hover:text-charcoal font-medium'"
            class="pb-3 border-b-2 text-xs whitespace-nowrap transition-colors flex items-center space-x-1.5">
            <span>Solicitudes</span>
            <span v-if="store.pendingRequestsCount > 0" class="w-4 h-4 bg-forest text-white rounded-full text-[10px] flex items-center justify-center font-bold">
              {{ store.pendingRequestsCount }}
            </span>
          </button>

          <button 
            @click="store.ownerTab = 'payouts'" 
            :class="store.ownerTab === 'payouts' ? 'border-forest text-forest font-bold' : 'border-transparent text-charcoal-muted hover:text-charcoal font-medium'"
            class="pb-3 border-b-2 text-xs whitespace-nowrap transition-colors">
            Liquidaciones
          </button>
        </div>

        <!-- TAB 1: Lista de Artículos del Anfitrión -->
        <div v-if="store.ownerTab === 'items'" class="space-y-4">
          
          <div 
            v-for="item in store.ownerArticles" 
            :key="item.id"
            class="p-4 rounded-2xl border border-surface-border bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-airbnb">
            
            <div class="flex items-start space-x-3.5">
              <img :src="item.image" :alt="item.title" class="w-20 h-20 rounded-xl object-cover border border-surface-border shrink-0">
              <div class="flex-1">
                <div class="flex items-center space-x-2">
                  <h3 class="font-bold text-charcoal text-sm leading-snug">{{ item.title }}</h3>
                  <span 
                    :class="item.status === 'activo' ? 'bg-forest-light text-forest border-forest-border' : 'bg-neutral-100 text-charcoal-muted border-neutral-200'"
                    class="text-[10px] font-bold px-2 py-0.5 rounded border capitalize shrink-0">
                    {{ item.status }}
                  </span>
                </div>
                <p class="text-xs text-charcoal-muted mt-1">{{ item.category }} · {{ item.city }}</p>
                
                <div class="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2 text-xs text-charcoal">
                  <span>Día: <strong>L {{ item.priceDay }}</strong></span>
                  <span>Sem: <strong>L {{ item.priceWeek }}</strong></span>
                  <span>Mes: <strong>L {{ item.priceMonth }}</strong></span>
                  <span class="text-charcoal-muted">Garantía: L {{ item.deposit }}</span>
                </div>
              </div>
            </div>

            <!-- Botones de Acción (Grandes y Cómodos para el Dedo) -->
            <div class="flex items-center space-x-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-surface-border justify-end">
              <button 
                @click="store.toggleItemStatus(item)" 
                class="flex-1 sm:flex-initial text-xs px-4 py-2.5 sm:py-1.5 rounded-xl sm:rounded-full border border-surface-border text-charcoal font-semibold hover:bg-surface-subtle transition-colors text-center">
                {{ item.status === 'activo' ? 'Pausar' : 'Activar' }}
              </button>
              <button 
                @click="store.deleteItem(item.id)" 
                title="Retirar artículo"
                class="p-2.5 sm:p-2 rounded-xl sm:rounded-full border border-surface-border text-charcoal-muted hover:text-red-700 hover:border-red-200 hover:bg-red-50 transition-colors">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                </svg>
              </button>
            </div>

          </div>

          <div v-if="store.ownerArticles.length === 0" class="text-center py-12 border border-dashed border-surface-border rounded-2xl">
            <p class="text-xs font-semibold text-charcoal">No tiene artículos publicados en este momento</p>
            <button 
              @click="store.showPublishModal = true"
              class="mt-3 text-xs bg-forest text-white px-5 py-2.5 rounded-full font-bold hover:bg-forest-hover transition-colors">
              Publicar artículo
            </button>
          </div>

        </div>

        <!-- TAB 2: Solicitudes de Alquiler -->
        <div v-if="store.ownerTab === 'requests'" class="space-y-4">
          
          <div 
            v-for="rental in store.ownerRentals" 
            :key="rental.id"
            class="p-4 rounded-2xl border border-surface-border bg-white space-y-3 shadow-airbnb">
            
            <div class="flex items-center justify-between pb-2 border-b border-surface-border">
              <div>
                <span class="text-[10px] text-charcoal-muted uppercase font-mono font-bold tracking-wider">Orden #{{ rental.id }}</span>
                <h4 class="font-bold text-sm text-charcoal mt-0.5">{{ rental.itemTitle }}</h4>
              </div>
              <span 
                :class="store.getRentalBadgeClass(rental.status)"
                class="text-[11px] font-bold px-2.5 py-1 rounded-full">
                {{ rental.status }}
              </span>
            </div>

            <div class="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs text-charcoal">
              <div><span class="text-charcoal-muted block">Cliente:</span> <strong>{{ rental.renterName }}</strong></div>
              <div><span class="text-charcoal-muted block">Duración:</span> <strong>{{ rental.duration }}</strong></div>
              <div><span class="text-charcoal-muted block">Su ganancia:</span> <strong class="text-forest font-bold">L {{ rental.ownerPayout }}</strong></div>
            </div>

            <div class="p-3 rounded-xl bg-surface-subtle text-xs text-charcoal-muted">
              Recogida programada: <strong class="text-charcoal">{{ rental.pickupAddress }}</strong>
            </div>

            <div v-if="rental.status === 'Pendiente de aprobación'" class="flex space-x-2 pt-1">
              <button 
                @click="store.approveRentalByOwner(rental.id)"
                class="flex-1 bg-forest hover:bg-forest-hover text-white text-xs font-bold py-2.5 rounded-xl transition-colors">
                Aceptar solicitud
              </button>
              <button 
                @click="store.rejectRentalByOwner(rental.id)"
                class="flex-1 border border-surface-border text-charcoal hover:bg-surface-subtle text-xs font-bold py-2.5 rounded-xl transition-colors">
                Declinar
              </button>
            </div>

          </div>

        </div>

        <!-- TAB 3: Liquidaciones Bancarias -->
        <div v-if="store.ownerTab === 'payouts'" class="p-5 sm:p-6 rounded-2xl border border-surface-border bg-white shadow-airbnb">
          <h3 class="font-bold text-sm text-charcoal">Transferencias a su cuenta bancaria</h3>
          <p class="text-xs text-charcoal-muted mt-1">MobiRent transfiere sus ganancias a su cuenta bancaria nacional al confirmarse la entrega física al cliente.</p>

          <div class="mt-4 p-4 sm:p-5 rounded-2xl border border-forest-border bg-forest-light flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span class="text-xs font-bold text-forest block">Saldo disponible para retiro</span>
              <div class="text-2xl font-bold text-forest mt-0.5">L {{ store.ownerStats.totalEarnings }}</div>
              <span class="text-[11px] text-charcoal-muted block mt-1">BAC Credomatic · Cuenta HNL terminada en 4912</span>
            </div>
            <button 
              @click="store.requestPayout()"
              class="w-full sm:w-auto bg-forest hover:bg-forest-hover text-white text-xs font-bold py-3 px-6 rounded-xl sm:rounded-full shadow-sm transition-colors text-center">
              Solicitar transferencia
            </button>
          </div>

          <h4 class="font-bold text-xs text-charcoal mt-6 mb-3 uppercase tracking-wider">Historial de depósitos</h4>
          <div class="divide-y divide-surface-border border border-surface-border rounded-xl overflow-hidden text-xs">
            <div class="p-3.5 flex justify-between items-center bg-white">
              <div>
                <p class="font-semibold text-charcoal">Sala seccional gris (1 mes)</p>
                <p class="text-[11px] text-charcoal-muted mt-0.5">BAC-98214 · Transferido</p>
              </div>
              <span class="font-bold text-forest">L 1,800.00</span>
            </div>
            <div class="p-3.5 flex justify-between items-center bg-white">
              <div>
                <p class="font-semibold text-charcoal">Sillas Tiffany (Evento fin de semana)</p>
                <p class="text-[11px] text-charcoal-muted mt-0.5">BAC-96301 · Transferido</p>
              </div>
              <span class="font-bold text-forest">L 1,650.00</span>
            </div>
          </div>

        </div>

      </section>

    </div>
  `,
  setup() {
    return { store: window.MobiRentStore };
  }
};

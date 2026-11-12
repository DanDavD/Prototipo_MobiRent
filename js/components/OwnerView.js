/**
 * ==============================================================
 * Componente: OwnerView (js/components/OwnerView.js)
 * ==============================================================
 * Panel del Propietario / Arrendador con estética de anfitrión:
 * métricas nítidas, publicación de artículos con fijación de precios,
 * gestión de solicitudes e información de liquidaciones.
 */

window.OwnerViewComponent = {
  template: `
    <div class="flex flex-col min-h-full bg-white">
      
      <!-- Encabezado del Panel de Anfitrión -->
      <header class="border-b border-surface-border bg-white px-4 sm:px-8 py-6">
        <div class="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div class="flex items-center space-x-2.5">
              <h1 class="text-xl font-bold tracking-tight text-charcoal">Panel de Anfitrión</h1>
              <span class="text-[11px] font-semibold text-forest bg-forest-light border border-forest-border px-2.5 py-0.5 rounded-full">
                Cuenta verificada
              </span>
            </div>
            <p class="text-xs text-charcoal-muted mt-1">Gestión de inventario propio, tarifas de alquiler e ingresos acumulados en Honduras.</p>
          </div>

          <button 
            @click="store.showPublishModal = true"
            class="bg-forest hover:bg-forest-hover text-white text-xs font-semibold px-4 py-2.5 rounded-full shadow-sm transition-all duration-150 flex items-center justify-center space-x-2 self-start md:self-auto">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
            </svg>
            <span>Publicar artículo</span>
          </button>
        </div>

        <!-- Métricas Clave (KPIs Sobrios) -->
        <div class="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div class="p-4 rounded-xl border border-surface-border bg-white">
            <span class="text-[11px] font-medium text-charcoal-muted uppercase tracking-wider block">Saldo acumulado</span>
            <div class="text-2xl font-bold text-forest mt-1">L {{ store.ownerStats.totalEarnings }}</div>
            <span class="text-[11px] text-charcoal-muted block mt-0.5">Liquidación bancaria disponible</span>
          </div>

          <div class="p-4 rounded-xl border border-surface-border bg-white">
            <span class="text-[11px] font-medium text-charcoal-muted uppercase tracking-wider block">Artículos activos</span>
            <div class="text-2xl font-bold text-charcoal mt-1">{{ store.ownerArticles.length }}</div>
            <span class="text-[11px] text-charcoal-muted block mt-0.5">Visibles en catálogo público</span>
          </div>

          <div class="p-4 rounded-xl border border-surface-border bg-white">
            <span class="text-[11px] font-medium text-charcoal-muted uppercase tracking-wider block">Alquileres en curso</span>
            <div class="text-2xl font-bold text-charcoal mt-1">{{ store.ownerStats.activeRentals }}</div>
            <span class="text-[11px] text-charcoal-muted block mt-0.5">Generando renta activa</span>
          </div>

          <div class="p-4 rounded-xl border border-surface-border bg-white">
            <span class="text-[11px] font-medium text-charcoal-muted uppercase tracking-wider block">Valoración de anfitrión</span>
            <div class="text-2xl font-bold text-charcoal mt-1 flex items-baseline space-x-1.5">
              <span>4.9</span>
              <span class="text-xs font-normal text-charcoal-muted">(18 reseñas)</span>
            </div>
            <span class="text-[11px] text-charcoal-muted block mt-0.5">Cumplimiento y puntualidad</span>
          </div>
        </div>
      </header>

      <!-- Navegación por Pestañas -->
      <section class="max-w-7xl mx-auto px-4 sm:px-8 py-6 w-full flex-1">
        
        <div class="flex items-center space-x-6 border-b border-surface-border mb-6">
          <button 
            @click="store.ownerTab = 'items'" 
            :class="store.ownerTab === 'items' ? 'border-forest text-forest font-semibold' : 'border-transparent text-charcoal-muted hover:text-charcoal font-medium'"
            class="pb-3 border-b-2 text-xs transition-colors">
            Mis artículos ({{ store.ownerArticles.length }})
          </button>

          <button 
            @click="store.ownerTab = 'requests'" 
            :class="store.ownerTab === 'requests' ? 'border-forest text-forest font-semibold' : 'border-transparent text-charcoal-muted hover:text-charcoal font-medium'"
            class="pb-3 border-b-2 text-xs transition-colors flex items-center space-x-1.5">
            <span>Solicitudes de alquiler</span>
            <span v-if="store.pendingRequestsCount > 0" class="w-4 h-4 bg-forest text-white rounded-full text-[10px] flex items-center justify-center font-bold">
              {{ store.pendingRequestsCount }}
            </span>
          </button>

          <button 
            @click="store.ownerTab = 'payouts'" 
            :class="store.ownerTab === 'payouts' ? 'border-forest text-forest font-semibold' : 'border-transparent text-charcoal-muted hover:text-charcoal font-medium'"
            class="pb-3 border-b-2 text-xs transition-colors">
            Liquidaciones y transferencias
          </button>
        </div>

        <!-- TAB 1: Lista de Artículos -->
        <div v-if="store.ownerTab === 'items'" class="space-y-3">
          
          <div 
            v-for="item in store.ownerArticles" 
            :key="item.id"
            class="p-4 rounded-xl border border-surface-border bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-neutral-300 transition-colors">
            
            <div class="flex items-center space-x-4">
              <img :src="item.image" :alt="item.title" class="w-16 h-16 rounded-xl object-cover border border-surface-border shrink-0">
              <div>
                <div class="flex items-center space-x-2">
                  <h3 class="font-semibold text-charcoal text-sm">{{ item.title }}</h3>
                  <span 
                    :class="item.status === 'activo' ? 'bg-forest-light text-forest border-forest-border' : 'bg-neutral-100 text-charcoal-muted border-neutral-200'"
                    class="text-[10px] font-semibold px-2 py-0.5 rounded border capitalize">
                    {{ item.status }}
                  </span>
                </div>
                <p class="text-xs text-charcoal-muted mt-0.5">{{ item.category }} · {{ item.city }}</p>
                
                <div class="flex items-center space-x-2 mt-1.5 text-xs text-charcoal">
                  <span>Día: <strong>L {{ item.priceDay }}</strong></span>
                  <span class="text-neutral-300">·</span>
                  <span>Semana: <strong>L {{ item.priceWeek }}</strong></span>
                  <span class="text-neutral-300">·</span>
                  <span>Mes: <strong>L {{ item.priceMonth }}</strong></span>
                  <span class="text-neutral-300">·</span>
                  <span class="text-charcoal-muted">Garantía: L {{ item.deposit }}</span>
                </div>
              </div>
            </div>

            <!-- Acciones -->
            <div class="flex items-center space-x-2 justify-end self-end sm:self-center">
              <button 
                @click="store.toggleItemStatus(item)" 
                class="text-xs px-3.5 py-1.5 rounded-full border border-surface-border text-charcoal font-medium hover:bg-surface-subtle transition-colors">
                {{ item.status === 'activo' ? 'Pausar' : 'Activar' }}
              </button>
              <button 
                @click="store.deleteItem(item.id)" 
                title="Retirar artículo"
                class="p-2 rounded-full border border-surface-border text-charcoal-muted hover:text-red-700 hover:border-red-200 hover:bg-red-50 transition-colors">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                </svg>
              </button>
            </div>

          </div>

          <div v-if="store.ownerArticles.length === 0" class="text-center py-12 border border-dashed border-surface-border rounded-2xl">
            <p class="text-xs font-semibold text-charcoal">No tiene artículos publicados en este momento</p>
            <button 
              @click="store.showPublishModal = true"
              class="mt-3 text-xs bg-forest text-white px-4 py-2 rounded-full font-semibold hover:bg-forest-hover transition-colors">
              Publicar artículo
            </button>
          </div>

        </div>

        <!-- TAB 2: Solicitudes de Alquiler -->
        <div v-if="store.ownerTab === 'requests'" class="space-y-3">
          
          <div 
            v-for="rental in store.ownerRentals" 
            :key="rental.id"
            class="p-4 rounded-xl border border-surface-border bg-white space-y-3">
            
            <div class="flex items-center justify-between pb-2 border-b border-surface-border">
              <div>
                <span class="text-[10px] text-charcoal-muted uppercase font-bold tracking-wider">Orden #{{ rental.id }}</span>
                <h4 class="font-semibold text-sm text-charcoal mt-0.5">{{ rental.itemTitle }}</h4>
              </div>
              <span 
                :class="store.getRentalBadgeClass(rental.status)"
                class="text-[11px] font-semibold px-2.5 py-1 rounded-full">
                {{ rental.status }}
              </span>
            </div>

            <div class="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-charcoal">
              <div><span class="text-charcoal-muted block">Arrendatario</span> <strong>{{ rental.renterName }}</strong></div>
              <div><span class="text-charcoal-muted block">Período</span> <strong>{{ rental.duration }}</strong></div>
              <div><span class="text-charcoal-muted block">Liquidación para usted</span> <strong class="text-forest font-bold">L {{ rental.ownerPayout }}</strong></div>
            </div>

            <div class="p-3 rounded-lg bg-surface-subtle text-xs text-charcoal-muted flex items-center justify-between">
              <span>Recogida coordinada por MobiRent en: <strong class="text-charcoal">{{ rental.pickupAddress }}</strong></span>
            </div>

            <div v-if="rental.status === 'Pendiente de aprobación'" class="flex justify-end space-x-2 pt-1">
              <button 
                @click="store.approveRentalByOwner(rental.id)"
                class="bg-forest hover:bg-forest-hover text-white text-xs font-semibold px-4 py-1.5 rounded-full transition-colors">
                Aceptar solicitud
              </button>
              <button 
                @click="store.rejectRentalByOwner(rental.id)"
                class="border border-surface-border text-charcoal hover:bg-surface-subtle text-xs font-semibold px-4 py-1.5 rounded-full transition-colors">
                Declinar
              </button>
            </div>

          </div>

        </div>

        <!-- TAB 3: Liquidaciones y Pagos Bancarios -->
        <div v-if="store.ownerTab === 'payouts'" class="p-6 rounded-2xl border border-surface-border bg-white">
          <h3 class="font-bold text-sm text-charcoal">Liquidaciones de MobiRent</h3>
          <p class="text-xs text-charcoal-muted mt-1">Los fondos correspondientes al arrendador son transferidos por MobiRent directamente a la cuenta bancaria registrada, tras la confirmación física de la entrega al cliente.</p>

          <div class="mt-5 p-5 rounded-xl border border-forest-border bg-forest-light flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span class="text-xs font-medium text-forest block">Saldo acumulado disponible</span>
              <div class="text-2xl font-bold text-forest mt-0.5">L {{ store.ownerStats.totalEarnings }}</div>
              <span class="text-[11px] text-charcoal-muted block mt-1">Cuenta configurada: BAC Credomatic Honduras · Terminación 4912</span>
            </div>
            <button 
              @click="store.requestPayout()"
              class="bg-forest hover:bg-forest-hover text-white text-xs font-semibold px-5 py-2.5 rounded-full shadow-sm transition-colors">
              Solicitar transferencia
            </button>
          </div>

          <h4 class="font-semibold text-xs text-charcoal mt-8 mb-3 uppercase tracking-wider">Historial de transferencias</h4>
          <div class="divide-y divide-surface-border border border-surface-border rounded-xl overflow-hidden text-xs">
            <div class="p-3.5 flex justify-between items-center bg-white">
              <div>
                <p class="font-semibold text-charcoal">Alquiler de sala seccional gris (1 mes)</p>
                <p class="text-[11px] text-charcoal-muted mt-0.5">Referencia bancaria BAC-98214 · Transferido</p>
              </div>
              <span class="font-bold text-forest">L 1,800.00</span>
            </div>
            <div class="p-3.5 flex justify-between items-center bg-white">
              <div>
                <p class="font-semibold text-charcoal">Lote de sillas Tiffany (Evento de fin de semana)</p>
                <p class="text-[11px] text-charcoal-muted mt-0.5">Referencia bancaria BAC-96301 · Transferido</p>
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

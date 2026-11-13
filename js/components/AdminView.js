/**
 * ==============================================================
 * Componente: AdminView (js/components/AdminView.js)
 * ==============================================================
 * Centro de Operaciones y Logística:
 * - Vista de cliente (2/3 completado): sutil aviso de "Módulo en desarrollo".
 * - Consola Administrativa Completa: monitoreo logístico, comisiones y catálogo.
 * - Totalmente optimizado para pantallas móviles, iPad y computadora.
 */

window.AdminViewComponent = {
  template: `
    <div class="flex flex-col min-h-full bg-white pb-24 sm:pb-12">
      
      <!-- ============================================================== -->
      <!-- CASO 1: PANTALLA SUTIL DE "EN DESARROLLO" (VISTA CLIENTE)       -->
      <!-- ============================================================== -->
      <section v-if="!store.showFullAdmin" class="flex flex-col items-center justify-center min-h-[55vh] px-6 text-center">
        <div class="w-12 h-12 rounded-full bg-surface-subtle border border-surface-border flex items-center justify-center text-charcoal-muted mb-3 shadow-sm">
          <svg class="w-5 h-5 text-charcoal-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"/>
          </svg>
        </div>
        <h2 class="text-sm font-bold text-charcoal">Módulo en desarrollo</h2>
        <p class="text-xs text-charcoal-muted mt-1 max-w-xs leading-relaxed">
          El centro de operaciones y despacho logístico estará disponible próximamente.
        </p>
        
        <!-- Acceso directo para alternar a la consola completa -->
        <button 
          @click="store.showFullAdmin = true" 
          class="mt-5 text-xs font-semibold text-forest hover:text-forest-hover bg-forest-light border border-forest-border px-3.5 py-1.5 rounded-full transition-colors flex items-center space-x-1.5 shadow-sm">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
          </svg>
          <span>Abrir consola operativa completa</span>
        </button>
      </section>

      <!-- ============================================================== -->
      <!-- CASO 2: CONSOLA ADMINISTRATIVA COMPLETA (MODO OPERACIONES)     -->
      <!-- ============================================================== -->
      <div v-else class="flex flex-col flex-1">
        
        <!-- ENCABEZADO DE OPERACIONES -->
        <header class="border-b border-surface-border bg-white px-4 sm:px-6 md:px-8 py-5">
          <div class="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div class="flex items-center space-x-2">
                <h1 class="text-xl font-bold tracking-tight text-charcoal">Centro de Operaciones</h1>
                <span class="text-[10px] font-bold text-forest bg-forest-light border border-forest-border px-2 py-0.5 rounded-full">
                  Administrador
                </span>
              </div>
              <p class="text-xs text-charcoal-muted mt-1">Supervisión logística, comisiones y custodia de garantías en Honduras.</p>
            </div>

            <!-- Botón para volver a vista sutil de cliente -->
            <div class="flex items-center space-x-2 self-start sm:self-auto">
              <button 
                @click="store.showFullAdmin = false"
                class="text-xs font-medium text-charcoal-muted hover:text-charcoal bg-surface-subtle border border-surface-border px-3 py-1.5 rounded-full transition-colors flex items-center space-x-1 shadow-sm">
                <span>Ocultar para cliente</span>
              </button>
            </div>
          </div>

          <!-- TARJETAS DE MÉTRICAS (2x2 en móvil, 4x1 en escritorio) -->
          <div class="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4 mt-5">
            <div class="p-3.5 rounded-2xl border border-surface-border bg-white shadow-airbnb">
              <span class="text-[10px] font-bold text-charcoal-muted uppercase tracking-wider block">Margen MobiRent</span>
              <div class="text-lg sm:text-2xl font-bold text-forest mt-1">L {{ store.adminMetrics.totalRevenue }}</div>
              <span class="text-[10px] text-charcoal-muted block mt-0.5">Comisiones cobradas</span>
            </div>

            <div class="p-3.5 rounded-2xl border border-surface-border bg-white shadow-airbnb">
              <span class="text-[10px] font-bold text-charcoal-muted uppercase tracking-wider block">Garantías en custodia</span>
              <div class="text-lg sm:text-2xl font-bold text-charcoal mt-1">L {{ store.adminMetrics.escrowDeposits }}</div>
              <span class="text-[10px] text-charcoal-muted block mt-0.5">Depósitos en fideicomiso</span>
            </div>

            <div class="p-3.5 rounded-2xl border border-surface-border bg-white shadow-airbnb">
              <span class="text-[10px] font-bold text-charcoal-muted uppercase tracking-wider block">Alquileres activos</span>
              <div class="text-lg sm:text-2xl font-bold text-charcoal mt-1">{{ store.rentals.length }}</div>
              <span class="text-[10px] text-charcoal-muted block mt-0.5">En seguimiento</span>
            </div>

            <div class="p-3.5 rounded-2xl border border-surface-border bg-white shadow-airbnb">
              <span class="text-[10px] font-bold text-charcoal-muted uppercase tracking-wider block">Fletes en ruta</span>
              <div class="text-lg sm:text-2xl font-bold text-charcoal mt-1">{{ store.pendingDeliveriesCount }}</div>
              <span class="text-[10px] text-charcoal-muted block mt-0.5">En proceso logístico</span>
            </div>
          </div>
        </header>

        <!-- SELECCIÓN DE PESTAÑAS SECUNDARIAS (Airbnb pills) -->
        <section class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-4 w-full">
          <div class="flex space-x-1.5 p-1 bg-surface-subtle border border-surface-border rounded-xl sm:rounded-full w-full sm:w-max">
            <button 
              @click="store.adminTab = 'logistics'"
              class="flex-1 sm:flex-initial text-xs font-semibold px-3 sm:px-4 py-2 rounded-lg sm:rounded-full transition-all text-center"
              :class="store.adminTab === 'logistics' ? 'bg-white text-charcoal shadow-sm' : 'text-charcoal-muted hover:text-charcoal'">
              Trazabilidad Logística
            </button>
            <button 
              @click="store.adminTab = 'orders'"
              class="flex-1 sm:flex-initial text-xs font-semibold px-3 sm:px-4 py-2 rounded-lg sm:rounded-full transition-all text-center"
              :class="store.adminTab === 'orders' ? 'bg-white text-charcoal shadow-sm' : 'text-charcoal-muted hover:text-charcoal'">
              Registro Financiero
            </button>
            <button 
              @click="store.adminTab = 'catalog'"
              class="flex-1 sm:flex-initial text-xs font-semibold px-3 sm:px-4 py-2 rounded-lg sm:rounded-full transition-all text-center"
              :class="store.adminTab === 'catalog' ? 'bg-white text-charcoal shadow-sm' : 'text-charcoal-muted hover:text-charcoal'">
              Catálogo
            </button>
          </div>
        </section>

        <!-- CONTENIDO DE LAS PESTAÑAS -->
        <section class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 pb-10 w-full space-y-4">
          
          <!-- PESTAÑA 1: Trazabilidad Logística de Órdenes -->
          <div v-if="store.adminTab === 'logistics'" class="space-y-3">
            <div 
              v-for="rental in store.rentals" 
              :key="rental.id"
              class="p-4 sm:p-5 rounded-2xl border border-surface-border bg-white shadow-airbnb space-y-3">
              
              <!-- Fila superior: ID de Orden, Artículo y Estado -->
              <div class="flex items-start justify-between gap-2">
                <div>
                  <div class="flex items-center space-x-2">
                    <span class="font-mono text-xs font-bold text-forest">#{{ rental.id }}</span>
                    <span class="text-xs font-bold text-charcoal">{{ rental.itemTitle }}</span>
                  </div>
                  <p class="text-[11px] text-charcoal-muted mt-0.5">
                    Cliente: <strong class="text-charcoal">{{ rental.renterName }}</strong> · Destino: {{ rental.deliveryAddress }}
                  </p>
                  <p class="text-[11px] text-charcoal-muted mt-0.5">
                    Duración: {{ rental.startDate }} al {{ rental.endDate }} · Total: <strong class="text-charcoal">L {{ rental.totalPaid }}</strong>
                  </p>
                </div>

                <span 
                  class="text-[10px] font-bold px-2.5 py-1 rounded-full shrink-0"
                  :class="store.getAdminBadgeClass(rental.status)">
                  {{ rental.status }}
                </span>
              </div>

              <!-- Botonera de Transición de Estados Logísticos (Optimizada para tocar en móvil) -->
              <div class="pt-2 border-t border-surface-border">
                <span class="text-[10px] font-bold text-charcoal-muted uppercase tracking-wider block mb-2">Avanzar estado del envío:</span>
                <div class="grid grid-cols-2 sm:grid-cols-5 gap-1.5 sm:gap-2">
                  <button 
                    @click="store.setRentalStatus(rental.id, 'Asignado')"
                    :disabled="rental.status === 'Asignado'"
                    class="text-[11px] py-2 px-2 rounded-xl border border-surface-border text-charcoal font-medium hover:bg-surface-subtle disabled:opacity-40 transition-colors text-center">
                    1. Chofer asignado
                  </button>
                  <button 
                    @click="store.setRentalStatus(rental.id, 'En recogida')"
                    :disabled="rental.status === 'En recogida'"
                    class="text-[11px] py-2 px-2 rounded-xl bg-forest-light text-forest font-bold hover:bg-forest/10 disabled:opacity-40 transition-colors text-center border border-forest-border">
                    2. En recogida
                  </button>
                  <button 
                    @click="store.setRentalStatus(rental.id, 'En tránsito')"
                    :disabled="rental.status === 'En tránsito'"
                    class="text-[11px] py-2 px-2 rounded-xl bg-forest text-white font-bold hover:bg-forest-hover disabled:opacity-40 transition-colors text-center">
                    3. En tránsito
                  </button>
                  <button 
                    @click="store.setRentalStatus(rental.id, 'Entregado')"
                    :disabled="rental.status === 'Entregado'"
                    class="text-[11px] py-2 px-2 rounded-xl bg-neutral-900 text-white font-bold hover:bg-neutral-800 disabled:opacity-40 transition-colors text-center">
                    4. Entregado ✓
                  </button>
                  <button 
                    @click="store.setRentalStatus(rental.id, 'Devuelto')"
                    :disabled="rental.status === 'Devuelto'"
                    class="col-span-2 sm:col-span-1 text-[11px] py-2 px-2 rounded-xl border border-neutral-300 text-charcoal font-medium hover:bg-surface-subtle disabled:opacity-40 transition-colors text-center">
                    5. Devolución & Reembolso
                  </button>
                </div>
              </div>

            </div>
          </div>

          <!-- PESTAÑA 2: Registro Financiero Transaccional -->
          <div v-if="store.adminTab === 'orders'" class="space-y-3">
            
            <!-- Vista de tarjetas para pantallas móviles -->
            <div class="sm:hidden space-y-2.5">
              <div 
                v-for="r in store.rentals" 
                :key="r.id" 
                class="p-4 rounded-2xl border border-surface-border bg-white shadow-airbnb space-y-2">
                <div class="flex items-center justify-between border-b border-surface-border pb-2">
                  <span class="font-mono text-xs font-bold text-forest">#{{ r.id }}</span>
                  <span class="text-xs font-bold text-charcoal">L {{ r.totalPaid }}</span>
                </div>
                <div class="text-xs space-y-1">
                  <div class="flex justify-between">
                    <span class="text-charcoal-muted">Artículo:</span>
                    <span class="font-semibold text-charcoal">{{ r.itemTitle }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-charcoal-muted">Cliente:</span>
                    <span class="text-charcoal">{{ r.renterName }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-charcoal-muted">Pago a dueño:</span>
                    <span class="text-charcoal">L {{ r.ownerPayout }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-charcoal-muted">Flete de transporte:</span>
                    <span class="text-charcoal">L {{ r.transportFee }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-charcoal-muted">Comisión MobiRent:</span>
                    <span class="font-bold text-forest">L {{ r.serviceFee }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-charcoal-muted">Garantía en custodia:</span>
                    <span class="font-bold text-charcoal">L {{ r.deposit }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Vista de tabla para escritorio / tablet -->
            <div class="hidden sm:block p-4 sm:p-6 rounded-2xl border border-surface-border bg-white shadow-airbnb">
              <h3 class="text-sm font-bold text-charcoal mb-3">Registro Transaccional</h3>
              <div class="overflow-x-auto">
                <table class="w-full text-left text-xs whitespace-nowrap">
                  <thead class="bg-surface-subtle text-charcoal-muted uppercase text-[10px] font-bold border-y border-surface-border">
                    <tr>
                      <th class="p-3">Orden</th>
                      <th class="p-3">Cliente</th>
                      <th class="p-3">Total pagado</th>
                      <th class="p-3">Dueño</th>
                      <th class="p-3">Flete</th>
                      <th class="p-3">MobiRent</th>
                      <th class="p-3">Garantía</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-surface-border">
                    <tr v-for="r in store.rentals" :key="r.id">
                      <td class="p-3 font-medium">
                        <span class="font-mono text-forest font-bold block">#{{ r.id }}</span>
                        <span class="text-charcoal">{{ r.itemTitle }}</span>
                      </td>
                      <td class="p-3 text-charcoal">{{ r.renterName }}</td>
                      <td class="p-3 font-bold text-charcoal">L {{ r.totalPaid }}</td>
                      <td class="p-3 text-charcoal-muted">L {{ r.ownerPayout }}</td>
                      <td class="p-3 text-charcoal-muted">L {{ r.transportFee }}</td>
                      <td class="p-3 font-bold text-forest">L {{ r.serviceFee }}</td>
                      <td class="p-3 font-bold text-charcoal">L {{ r.deposit }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

          </div>

          <!-- PESTAÑA 3: Moderación del Catálogo de Artículos -->
          <div v-if="store.adminTab === 'catalog'" class="space-y-3">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              <div 
                v-for="item in store.items" 
                :key="item.id"
                class="p-4 rounded-2xl border border-surface-border bg-white flex items-center justify-between gap-3 shadow-airbnb">
                <div class="flex items-center space-x-3.5">
                  <img :src="item.image" :alt="item.title" class="w-16 h-16 rounded-xl object-cover border border-surface-border shrink-0">
                  <div>
                    <h4 class="text-xs font-bold text-charcoal line-clamp-1">{{ item.title }}</h4>
                    <p class="text-[11px] text-charcoal-muted mt-0.5">{{ item.category }} · {{ item.city }}</p>
                    <p class="text-xs font-bold text-forest mt-1">L {{ item.priceDay }} / día</p>
                  </div>
                </div>
                <button 
                  @click="store.deleteItem(item.id)"
                  class="text-xs text-charcoal-muted hover:text-red-700 px-3 py-2 rounded-xl border border-surface-border hover:border-red-200 hover:bg-red-50 transition-colors shrink-0">
                  Retirar
                </button>
              </div>
            </div>
          </div>

        </section>

      </div>

    </div>
  `,
  setup() {
    return { store: window.MobiRentStore };
  }
};

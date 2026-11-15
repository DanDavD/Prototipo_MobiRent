// File: js/components/AdminView.js
/**
 * ==============================================================
 * Componente: AdminView (js/components/AdminView.js)
 * ==============================================================
 * Centro de Operaciones y Logística Central:
 * - Rediseñado para máxima intuición y claridad UI/UX.
 * - Línea de tiempo visual (Stepper) de 4 etapas claras:
 *   1. Asignado -> 2. En ruta -> 3. Entregado -> 4. Devuelto.
 * - Un solo botón de acción principal para avanzar cada pedido.
 * - Selector desplegable para ajuste manual directo.
 * - Cero saturación de botones multicolores confusos.
 */

window.AdminViewComponent = {
  template: `
    <div class="flex flex-col min-h-full bg-white pb-24 sm:pb-12">
      
      <!-- ENCABEZADO DE OPERACIONES -->
      <header class="border-b border-surface-border bg-white px-4 sm:px-6 md:px-8 py-5">
        <div class="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div class="flex items-center space-x-2">
              <h1 class="text-xl sm:text-2xl font-bold tracking-tight text-charcoal">Centro de Operaciones</h1>
              <span class="text-[10px] font-bold text-forest bg-forest-light border border-forest-border px-2.5 py-0.5 rounded-full">
                admin@gmail.com
              </span>
            </div>
            <p class="text-xs text-charcoal-muted mt-1">
              Supervisión de entregas, transportistas y custodia de garantías en Honduras.
            </p>
          </div>

          <div class="flex items-center space-x-2 self-start sm:self-auto">
            <span class="text-xs font-semibold text-charcoal-muted bg-surface-subtle border border-surface-border px-3 py-1.5 rounded-full">
              San Pedro Sula & Tegucigalpa
            </span>
          </div>
        </div>

        <!-- TARJETAS DE MÉTRICAS (2x2 en móvil, 4x1 en escritorio) -->
        <div class="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4 mt-5">
          <div class="p-3.5 sm:p-4 rounded-2xl border border-surface-border bg-white shadow-airbnb">
            <span class="text-[10px] font-bold text-charcoal-muted uppercase tracking-wider block">Comisión MobiRent</span>
            <div class="text-lg sm:text-2xl font-bold text-forest mt-1">L {{ store.adminMetrics.totalRevenue }}</div>
            <span class="text-[10px] text-charcoal-muted block mt-0.5">Comisiones retenidas</span>
          </div>

          <div class="p-3.5 sm:p-4 rounded-2xl border border-surface-border bg-white shadow-airbnb">
            <span class="text-[10px] font-bold text-charcoal-muted uppercase tracking-wider block">Garantías en custodia</span>
            <div class="text-lg sm:text-2xl font-bold text-charcoal mt-1">L {{ store.adminMetrics.escrowDeposits }}</div>
            <span class="text-[10px] text-charcoal-muted block mt-0.5">Fideicomiso reembolsable</span>
          </div>

          <div class="p-3.5 sm:p-4 rounded-2xl border border-surface-border bg-white shadow-airbnb">
            <span class="text-[10px] font-bold text-charcoal-muted uppercase tracking-wider block">Pedidos activos</span>
            <div class="text-lg sm:text-2xl font-bold text-charcoal mt-1">{{ store.rentals.length }}</div>
            <span class="text-[10px] text-charcoal-muted block mt-0.5">En seguimiento</span>
          </div>

          <div class="p-3.5 sm:p-4 rounded-2xl border border-surface-border bg-white shadow-airbnb">
            <span class="text-[10px] font-bold text-charcoal-muted uppercase tracking-wider block">Envíos en ruta</span>
            <div class="text-lg sm:text-2xl font-bold text-charcoal mt-1">{{ store.pendingDeliveriesCount }}</div>
            <span class="text-[10px] text-charcoal-muted block mt-0.5">Choferes en tránsito</span>
          </div>
        </div>
      </header>

      <!-- SELECCIÓN DE PESTAÑAS (Estilo Airbnb Pill) -->
      <section class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-4 w-full">
        <div class="flex space-x-1.5 p-1 bg-surface-subtle border border-surface-border rounded-xl sm:rounded-full w-full sm:w-max">
          <button 
            @click="store.adminTab = 'logistics'"
            class="flex-1 sm:flex-initial text-xs font-semibold px-3 sm:px-4 py-2 rounded-lg sm:rounded-full transition-all text-center flex items-center justify-center space-x-1.5"
            :class="store.adminTab === 'logistics' ? 'bg-white text-charcoal shadow-sm' : 'text-charcoal-muted hover:text-charcoal'">
            <span>Trazabilidad Logística</span>
            <span class="text-[10px] px-1.5 py-0.2 rounded-full font-bold" :class="store.adminTab === 'logistics' ? 'bg-forest text-white' : 'bg-neutral-200 text-charcoal-muted'">{{ store.rentals.length }}</span>
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
        
        <!-- ============================================================== -->
        <!-- PESTAÑA 1: TRAZABILIDAD LOGÍSTICA INTUITIVA (Línea de Vida)    -->
        <!-- ============================================================== -->
        <div v-if="store.adminTab === 'logistics'" class="space-y-4">
          
          <div 
            v-for="rental in store.rentals" 
            :key="rental.id"
            class="p-4 sm:p-6 rounded-2xl border border-surface-border bg-white shadow-airbnb space-y-4">
            
            <!-- Encabezado de la Tarjeta del Pedido -->
            <div class="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-surface-border pb-3">
              <div class="flex items-start space-x-3">
                <div class="w-10 h-10 rounded-xl bg-surface-subtle border border-surface-border flex items-center justify-center shrink-0">
                  <svg class="w-5 h-5 text-forest" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
                  </svg>
                </div>
                <div>
                  <div class="flex items-center space-x-2">
                    <span class="font-mono text-xs font-bold text-forest">Orden #{{ rental.id }}</span>
                    <span class="text-xs font-bold text-charcoal">{{ rental.itemTitle }}</span>
                  </div>
                  <div class="text-[11px] text-charcoal-muted mt-1 space-y-0.5">
                    <p class="flex items-center space-x-1">
                      <svg class="w-3.5 h-3.5 text-charcoal-muted shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
                      <span>Cliente: <strong class="text-charcoal">{{ rental.renterName }}</strong> ({{ rental.renterPhone }})</span>
                    </p>
                    <p class="flex items-center space-x-1">
                      <svg class="w-3.5 h-3.5 text-charcoal-muted shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                      <span>Entrega: <strong class="text-charcoal">{{ rental.deliveryAddress }}</strong></span>
                    </p>
                  </div>
                </div>
              </div>

              <!-- Estado Actual Destacado -->
              <div class="flex items-center sm:flex-col sm:items-end justify-between gap-1.5 shrink-0">
                <span 
                  class="text-[11px] font-bold px-3 py-1 rounded-full shadow-sm"
                  :class="store.getAdminBadgeClass(rental.status)">
                  {{ rental.status }}
                </span>
                <span class="text-xs font-bold text-charcoal">
                  Total: L {{ rental.totalPaid }}
                </span>
              </div>
            </div>

            <!-- STEPPER VISUAL DE PROGRESO (Línea de tiempo de 4 pasos) -->
            <div class="py-3 px-3 sm:px-5 rounded-xl bg-surface-subtle border border-surface-border">
              <div class="flex items-center justify-between text-[11px] font-bold text-charcoal-muted mb-3">
                <span class="uppercase tracking-wider">Línea de Trazabilidad:</span>
                <span class="text-charcoal">Etapa {{ store.getStageIndex(rental.status) + 1 }} de 4</span>
              </div>

              <!-- Pistas de Progreso -->
              <div class="relative flex items-center justify-between px-2 sm:px-4">
                
                <!-- Línea de fondo -->
                <div class="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-1 bg-neutral-200 rounded-full z-0"></div>
                
                <!-- Línea de progreso activa verde -->
                <div 
                  class="absolute left-6 top-1/2 -translate-y-1/2 h-1 bg-forest rounded-full z-0 transition-all duration-300"
                  :style="{ width: (store.getStageIndex(rental.status) / 3 * 88) + '%' }"></div>

                <!-- 1. Asignado -->
                <div class="relative z-10 flex flex-col items-center">
                  <div 
                    class="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold border-2 transition-all shadow-sm"
                    :class="store.getStageIndex(rental.status) >= 0 ? 'bg-forest border-forest text-white' : 'bg-white border-neutral-300 text-charcoal-muted'">
                    <svg v-if="store.getStageIndex(rental.status) > 0" class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.8" d="M5 13l4 4L19 7"/></svg>
                    <span v-else>1</span>
                  </div>
                  <span class="text-[10px] font-medium mt-1 text-center" :class="store.getStageIndex(rental.status) >= 0 ? 'text-charcoal font-bold' : 'text-charcoal-muted'">Asignado</span>
                </div>

                <!-- 2. En ruta -->
                <div class="relative z-10 flex flex-col items-center">
                  <div 
                    class="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold border-2 transition-all shadow-sm"
                    :class="store.getStageIndex(rental.status) >= 1 ? 'bg-forest border-forest text-white' : 'bg-white border-neutral-300 text-charcoal-muted'">
                    <svg v-if="store.getStageIndex(rental.status) > 1" class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.8" d="M5 13l4 4L19 7"/></svg>
                    <span v-else>2</span>
                  </div>
                  <span class="text-[10px] font-medium mt-1 text-center" :class="store.getStageIndex(rental.status) >= 1 ? 'text-charcoal font-bold' : 'text-charcoal-muted'">En ruta</span>
                </div>

                <!-- 3. Entregado -->
                <div class="relative z-10 flex flex-col items-center">
                  <div 
                    class="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold border-2 transition-all shadow-sm"
                    :class="store.getStageIndex(rental.status) >= 2 ? 'bg-forest border-forest text-white' : 'bg-white border-neutral-300 text-charcoal-muted'">
                    <svg v-if="store.getStageIndex(rental.status) > 2" class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.8" d="M5 13l4 4L19 7"/></svg>
                    <span v-else>3</span>
                  </div>
                  <span class="text-[10px] font-medium mt-1 text-center" :class="store.getStageIndex(rental.status) >= 2 ? 'text-charcoal font-bold' : 'text-charcoal-muted'">Entregado</span>
                </div>

                <!-- 4. Devuelto -->
                <div class="relative z-10 flex flex-col items-center">
                  <div 
                    class="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold border-2 transition-all shadow-sm"
                    :class="store.getStageIndex(rental.status) === 3 ? 'bg-forest border-forest text-white' : 'bg-white border-neutral-300 text-charcoal-muted'">
                    <svg v-if="store.getStageIndex(rental.status) === 3" class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.8" d="M5 13l4 4L19 7"/></svg>
                    <span v-else>4</span>
                  </div>
                  <span class="text-[10px] font-medium mt-1 text-center" :class="store.getStageIndex(rental.status) === 3 ? 'text-charcoal font-bold' : 'text-charcoal-muted'">Devuelto</span>
                </div>

              </div>
            </div>

            <!-- PANEL DE CONTROL DE ACCIÓN INTUITIVA (1 Solo Botón Claro + Selector Manual) -->
            <div class="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              
              <!-- Botón Principal: Avanzar al siguiente paso -->
              <div class="flex-1">
                <button 
                  v-if="rental.status !== 'Devuelto'"
                  @click="store.advanceRentalStatus(rental.id)"
                  class="w-full sm:w-auto bg-forest hover:bg-forest-hover active:scale-[0.99] text-white text-xs font-bold py-2.5 px-4 rounded-xl shadow-sm transition-all flex items-center justify-center space-x-2">
                  <span>{{ store.getNextActionTitle(rental.status) }}</span>
                </button>

                <!-- Estado Finalizado -->
                <div 
                  v-else 
                  class="inline-flex items-center space-x-2 text-xs font-semibold text-forest bg-forest-light border border-forest-border px-3 py-2 rounded-xl">
                  <svg class="w-4 h-4 text-forest" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/>
                  </svg>
                  <span>Servicio finalizado · Garantía liberada</span>
                </div>
              </div>

              <!-- Selector Manual de Estado para correcciones directas -->
              <div class="flex items-center space-x-2 self-end sm:self-auto shrink-0">
                <label class="text-[11px] text-charcoal-muted font-medium whitespace-nowrap">Cambiar estado:</label>
                <select 
                  :value="rental.status" 
                  @change="store.setRentalStatus(rental.id, $event.target.value)"
                  class="text-xs font-semibold text-charcoal bg-white border border-surface-border rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-forest cursor-pointer shadow-sm">
                  <option value="Asignado">1. Asignado</option>
                  <option value="En tránsito">2. En tránsito</option>
                  <option value="Entregado">3. Entregado</option>
                  <option value="Devuelto">4. Devuelto</option>
                </select>
              </div>

            </div>

          </div>
        </div>

        <!-- ============================================================== -->
        <!-- PESTAÑA 2: REGISTRO FINANCIERO TRANSACCIONAL                   -->
        <!-- ============================================================== -->
        <div v-if="store.adminTab === 'orders'" class="space-y-3">
          
          <!-- Vista móvil: Tarjetas tipo recibo -->
          <div class="sm:hidden space-y-2.5">
            <div 
              v-for="r in store.rentals" 
              :key="r.id" 
              class="p-4 rounded-2xl border border-surface-border bg-white shadow-airbnb space-y-2.5">
              <div class="flex items-center justify-between border-b border-surface-border pb-2">
                <span class="font-mono text-xs font-bold text-forest">Orden #{{ r.id }}</span>
                <span class="text-xs font-bold text-charcoal">L {{ r.totalPaid }}</span>
              </div>
              <div class="text-xs space-y-1.5">
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
                  <span class="text-charcoal-muted">Flete de chofer:</span>
                  <span class="text-charcoal">L {{ r.transportFee }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-charcoal-muted">Comisión MobiRent:</span>
                  <span class="font-bold text-forest">L {{ r.serviceFee }}</span>
                </div>
                <div class="flex justify-between pt-1 border-t border-surface-border">
                  <span class="text-charcoal-muted">Garantía reembolsable:</span>
                  <span class="font-bold text-charcoal">L {{ r.deposit }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Vista escritorio/tablet: Tabla formal de control -->
          <div class="hidden sm:block p-4 sm:p-6 rounded-2xl border border-surface-border bg-white shadow-airbnb">
            <h3 class="text-sm font-bold text-charcoal mb-3">Auditoría Financiera y Comisiones</h3>
            <div class="overflow-x-auto">
              <table class="w-full text-left text-xs whitespace-nowrap">
                <thead class="bg-surface-subtle text-charcoal-muted uppercase text-[10px] font-bold border-y border-surface-border">
                  <tr>
                    <th class="p-3">Orden</th>
                    <th class="p-3">Cliente</th>
                    <th class="p-3">Total pagado</th>
                    <th class="p-3">Dueño</th>
                    <th class="p-3">Flete</th>
                    <th class="p-3">Comisión MobiRent</th>
                    <th class="p-3">Garantía</th>
                    <th class="p-3">Estado</th>
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
                    <td class="p-3">
                      <span class="text-[10px] font-bold px-2 py-0.5 rounded-full" :class="store.getAdminBadgeClass(r.status)">
                        {{ r.status }}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>

        <!-- ============================================================== -->
        <!-- PESTAÑA 3: MODERACIÓN DE CATÁLOGO                              -->
        <!-- ============================================================== -->
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
  `,
  setup() {
    return { store: window.MobiRentStore };
  }
};

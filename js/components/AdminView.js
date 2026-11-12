/**
 * ==============================================================
 * Componente: AdminView (js/components/AdminView.js)
 * ==============================================================
 * Centro de Operaciones de MobiRent: diseño limpio, sobrio y profesional.
 * Supervisión de ingresos de plataforma, depósitos de garantía en custodia,
 * trazabilidad logística en tiempo real y moderación de catálogo.
 */

window.AdminViewComponent = {
  template: `
    <div class="flex flex-col min-h-full bg-white">
      
      <!-- Encabezado de Operaciones -->
      <header class="border-b border-surface-border bg-white px-4 sm:px-8 py-6">
        <div class="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div class="flex items-center space-x-2.5">
              <h1 class="text-xl font-bold tracking-tight text-charcoal">Centro de Operaciones MobiRent</h1>
              <span class="text-[11px] font-semibold text-charcoal-muted bg-surface-subtle border border-surface-border px-2 py-0.5 rounded">
                Versión 1.2
              </span>
            </div>
            <p class="text-xs text-charcoal-muted mt-1">Supervisión logística, intermediación financiera y custodia de garantías en Honduras.</p>
          </div>

          <div class="flex items-center space-x-2">
            <span class="text-xs text-charcoal-muted font-medium">Cobertura:</span>
            <select class="text-xs font-semibold text-charcoal bg-white border border-surface-border rounded-lg px-3 py-1.5 focus:outline-none">
              <option>Nacional (San Pedro Sula & Tegucigalpa)</option>
              <option>San Pedro Sula</option>
              <option>Tegucigalpa</option>
            </select>
          </div>
        </div>

        <!-- Métricas del Negocio (Sobrias, sin gradientes) -->
        <div class="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div class="p-4 rounded-xl border border-surface-border bg-white">
            <span class="text-[11px] font-medium text-charcoal-muted uppercase tracking-wider block">Margen MobiRent</span>
            <div class="text-2xl font-bold text-forest mt-1">L {{ store.adminMetrics.totalRevenue }}</div>
            <span class="text-[11px] text-charcoal-muted block mt-0.5">Comisiones netas por servicio</span>
          </div>

          <div class="p-4 rounded-xl border border-surface-border bg-white">
            <span class="text-[11px] font-medium text-charcoal-muted uppercase tracking-wider block">Garantías en custodia</span>
            <div class="text-2xl font-bold text-charcoal mt-1">L {{ store.adminMetrics.escrowDeposits }}</div>
            <span class="text-[11px] text-charcoal-muted block mt-0.5">Depósitos reembolsables retenidos</span>
          </div>

          <div class="p-4 rounded-xl border border-surface-border bg-white">
            <span class="text-[11px] font-medium text-charcoal-muted uppercase tracking-wider block">Alquileres activos</span>
            <div class="text-2xl font-bold text-charcoal mt-1">{{ store.rentals.length }}</div>
            <span class="text-[11px] text-charcoal-muted block mt-0.5">Transacciones gestionadas</span>
          </div>

          <div class="p-4 rounded-xl border border-surface-border bg-white">
            <span class="text-[11px] font-medium text-charcoal-muted uppercase tracking-wider block">Traslados en curso</span>
            <div class="text-2xl font-bold text-charcoal mt-1">{{ store.pendingDeliveriesCount }}</div>
            <span class="text-[11px] text-charcoal-muted block mt-0.5">Entregas y retiros programados</span>
          </div>
        </div>
      </header>

      <!-- Navegación por Módulos Operativos -->
      <section class="max-w-7xl mx-auto px-4 sm:px-8 py-6 w-full flex-1">
        
        <div class="flex items-center space-x-6 border-b border-surface-border mb-6">
          <button 
            @click="store.adminTab = 'logistics'" 
            :class="store.adminTab === 'logistics' ? 'border-forest text-forest font-semibold' : 'border-transparent text-charcoal-muted hover:text-charcoal font-medium'"
            class="pb-3 border-b-2 text-xs transition-colors flex items-center space-x-2">
            <span>Control logístico</span>
            <span class="w-4 h-4 bg-forest text-white rounded-full text-[10px] flex items-center justify-center font-bold">
              {{ store.pendingDeliveriesCount }}
            </span>
          </button>

          <button 
            @click="store.adminTab = 'orders'" 
            :class="store.adminTab === 'orders' ? 'border-forest text-forest font-semibold' : 'border-transparent text-charcoal-muted hover:text-charcoal font-medium'"
            class="pb-3 border-b-2 text-xs transition-colors">
            Registro financiero y órdenes
          </button>

          <button 
            @click="store.adminTab = 'catalog'" 
            :class="store.adminTab === 'catalog' ? 'border-forest text-forest font-semibold' : 'border-transparent text-charcoal-muted hover:text-charcoal font-medium'"
            class="pb-3 border-b-2 text-xs transition-colors">
            Moderación de inventario
          </button>
        </div>

        <!-- MÓDULO 1: Monitoreo Logístico Interactivo -->
        <div v-if="store.adminTab === 'logistics'" class="space-y-4">
          
          <div class="p-4 rounded-xl border border-surface-border bg-surface-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 class="text-xs font-bold text-charcoal">Flujo de Estados Logísticos Gestionados</h3>
              <p class="text-xs text-charcoal-muted mt-0.5">Haga clic en los estados para coordinar la recogida, entrega física y eventual devolución del artículo.</p>
            </div>
            <span class="text-[11px] font-semibold text-charcoal bg-white border border-surface-border px-3 py-1 rounded-full self-start sm:self-auto">
              Operación gestionada
            </span>
          </div>

          <!-- Listado de Envíos en Curso -->
          <div class="space-y-4">
            <div 
              v-for="rental in store.rentals" 
              :key="rental.id"
              class="p-5 rounded-2xl border border-surface-border bg-white shadow-airbnb">
              
              <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-surface-border">
                <div class="flex items-center space-x-3">
                  <span class="text-xs font-mono font-bold text-forest bg-forest-light px-2 py-0.5 rounded border border-forest-border">
                    #ORD-{{ rental.id }}
                  </span>
                  <h4 class="text-sm font-bold text-charcoal">{{ rental.itemTitle }}</h4>
                </div>
                
                <div class="flex items-center space-x-2">
                  <span class="text-xs text-charcoal-muted">Estado operativo:</span>
                  <span 
                    :class="store.getAdminBadgeClass(rental.status)"
                    class="text-[11px] font-semibold px-2.5 py-1 rounded-full">
                    {{ rental.status }}
                  </span>
                </div>
              </div>

              <!-- Direcciones de Origen y Destino -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 py-4 text-xs text-charcoal">
                <div class="p-3.5 rounded-xl border border-surface-border bg-surface-subtle">
                  <span class="text-[10px] uppercase font-bold text-charcoal-muted block tracking-wider">1. Origen (Dirección del Arrendador)</span>
                  <p class="font-semibold text-charcoal mt-1">{{ rental.ownerName }}</p>
                  <p class="text-charcoal-muted mt-0.5">{{ rental.pickupAddress }}</p>
                </div>

                <div class="p-3.5 rounded-xl border border-surface-border bg-surface-subtle">
                  <span class="text-[10px] uppercase font-bold text-charcoal-muted block tracking-wider">2. Destino (Dirección del Arrendatario)</span>
                  <p class="font-semibold text-charcoal mt-1">{{ rental.renterName }} · {{ rental.renterPhone }}</p>
                  <p class="text-charcoal-muted mt-0.5">{{ rental.deliveryAddress }}</p>
                </div>
              </div>

              <!-- Botones de Transición de Estado -->
              <div class="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-surface-border">
                <span class="text-xs font-medium text-charcoal-muted">Actualizar estado en tiempo real:</span>

                <div class="flex flex-wrap gap-2">
                  <button 
                    @click="store.setRentalStatus(rental.id, 'Asignado')"
                    :disabled="rental.status === 'Asignado'"
                    class="text-xs px-3 py-1.5 rounded-full border border-surface-border text-charcoal font-medium hover:bg-surface-subtle disabled:opacity-40 transition-colors">
                    1. Asignar transportista
                  </button>
                  <button 
                    @click="store.setRentalStatus(rental.id, 'En recogida')"
                    :disabled="rental.status === 'En recogida'"
                    class="text-xs px-3 py-1.5 rounded-full border border-surface-border text-charcoal font-medium hover:bg-surface-subtle disabled:opacity-40 transition-colors">
                    2. En recogida
                  </button>
                  <button 
                    @click="store.setRentalStatus(rental.id, 'En tránsito')"
                    :disabled="rental.status === 'En tránsito'"
                    class="text-xs px-3 py-1.5 rounded-full bg-forest text-white font-medium hover:bg-forest-hover disabled:opacity-40 transition-colors">
                    3. En tránsito
                  </button>
                  <button 
                    @click="store.setRentalStatus(rental.id, 'Entregado')"
                    :disabled="rental.status === 'Entregado'"
                    class="text-xs px-3 py-1.5 rounded-full bg-neutral-900 text-white font-medium hover:bg-neutral-800 disabled:opacity-40 transition-colors">
                    4. Confirmar entrega
                  </button>
                  <button 
                    @click="store.setRentalStatus(rental.id, 'Devuelto')"
                    :disabled="rental.status === 'Devuelto'"
                    class="text-xs px-3 py-1.5 rounded-full border border-neutral-300 text-charcoal font-medium hover:bg-neutral-100 disabled:opacity-40 transition-colors">
                    5. Devolución y reembolso
                  </button>
                </div>
              </div>

            </div>
          </div>

        </div>

        <!-- MÓDULO 2: Registro Financiero -->
        <div v-if="store.adminTab === 'orders'" class="p-6 rounded-2xl border border-surface-border bg-white">
          <h3 class="text-sm font-bold text-charcoal mb-4">Registro Transaccional y Liquidación</h3>
          
          <div class="overflow-x-auto">
            <table class="w-full text-left text-xs">
              <thead class="bg-surface-subtle text-charcoal-muted uppercase text-[10px] font-bold border-y border-surface-border">
                <tr>
                  <th class="p-3">Referencia</th>
                  <th class="p-3">Arrendatario</th>
                  <th class="p-3">Cobro total</th>
                  <th class="p-3">Pago al dueño</th>
                  <th class="p-3">Flete logístico</th>
                  <th class="p-3">Margen MobiRent</th>
                  <th class="p-3">Depósito retenido</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-surface-border">
                <tr v-for="r in store.rentals" :key="r.id" class="hover:bg-surface-subtle/50">
                  <td class="p-3 font-medium">
                    <span class="font-mono text-forest font-semibold block">#{{ r.id }}</span>
                    <span class="text-charcoal">{{ r.itemTitle }}</span>
                  </td>
                  <td class="p-3 text-charcoal">{{ r.renterName }}</td>
                  <td class="p-3 font-bold text-charcoal">L {{ r.totalPaid }}</td>
                  <td class="p-3 text-charcoal-muted">L {{ r.ownerPayout }}</td>
                  <td class="p-3 text-charcoal-muted">L {{ r.transportFee }}</td>
                  <td class="p-3 font-bold text-forest">L {{ r.serviceFee }}</td>
                  <td class="p-3 font-semibold text-charcoal">L {{ r.deposit }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- MÓDULO 3: Moderación de Catálogo -->
        <div v-if="store.adminTab === 'catalog'" class="space-y-3">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div 
              v-for="item in store.items" 
              :key="item.id"
              class="p-4 rounded-xl border border-surface-border bg-white flex items-center justify-between gap-3">
              <div class="flex items-center space-x-3.5">
                <img :src="item.image" :alt="item.title" class="w-14 h-14 rounded-xl object-cover border border-surface-border shrink-0">
                <div>
                  <h4 class="text-xs font-semibold text-charcoal line-clamp-1">{{ item.title }}</h4>
                  <p class="text-[11px] text-charcoal-muted mt-0.5">{{ item.category }} · {{ item.city }}</p>
                  <p class="text-xs font-bold text-forest mt-1">L {{ item.priceDay }} / día</p>
                </div>
              </div>
              <button 
                @click="store.deleteItem(item.id)"
                class="text-xs text-charcoal-muted hover:text-red-700 px-3 py-1.5 rounded-full border border-surface-border hover:border-red-200 hover:bg-red-50 transition-colors">
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

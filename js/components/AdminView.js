/**
 * ==============================================================
 * Componente: AdminView (js/components/AdminView.js)
 * ==============================================================
 * Centro de Operaciones optimizado para móvil, iPad y computadora.
 * Incluye modo de avance para cliente (2/3 completado) con opción
 * de desbloquear la vista completa para la entrega final.
 */

window.AdminViewComponent = {
  template: `
    <div class="flex flex-col min-h-full bg-white pb-24 sm:pb-12">
      
      <!-- ============================================================== -->
      <!-- VISTA DE AVANCE PARA EL CLIENTE (2/3 COMPLETADO)               -->
      <!-- ============================================================== -->
      <section v-if="store.isClientAdvanceMode" class="max-w-3xl mx-auto px-4 sm:px-6 py-10 w-full flex-1 flex flex-col justify-center">
        
        <div class="bg-surface-subtle border border-surface-border rounded-3xl p-6 sm:p-8 shadow-airbnb">
          
          <!-- Badge de Estado del Sprint -->
          <div class="flex items-center justify-between mb-4">
            <span class="text-xs font-bold text-forest bg-forest-light border border-forest-border px-3 py-1 rounded-full">
              Entrega de Avance · 2/3 Completado
            </span>
            <span class="text-xs font-mono font-bold text-charcoal-muted">Fase 2 de 3</span>
          </div>

          <h2 class="text-xl sm:text-2xl font-bold text-charcoal tracking-tight">
            Módulo de Operaciones y Logística Central
          </h2>
          <p class="text-xs sm:text-sm text-charcoal-muted mt-2 leading-relaxed">
            Este módulo centralizará el monitoreo de transportistas, asignación de rutas de entrega e inspección física de devoluciones. Se encuentra actualmente en fase de integración para la entrega final.
          </p>

          <!-- Barra de Progreso del Proyecto -->
          <div class="mt-6 p-4 rounded-2xl bg-white border border-surface-border">
            <div class="flex justify-between text-xs font-bold mb-2">
              <span class="text-charcoal">Progreso general del proyecto:</span>
              <span class="text-forest">66% (2 de 3 módulos listos)</span>
            </div>
            <div class="w-full bg-neutral-100 rounded-full h-2.5 overflow-hidden">
              <div class="bg-forest h-2.5 rounded-full transition-all duration-500" style="width: 66.6%;"></div>
            </div>
          </div>

          <!-- Resumen de Hitos Entregados vs Pendientes -->
          <div class="mt-6 space-y-3">
            <h3 class="text-xs font-bold uppercase tracking-wider text-charcoal-muted">Resumen de avance:</h3>
            
            <div class="p-3.5 rounded-xl bg-white border border-surface-border flex items-start space-x-3">
              <div class="w-5 h-5 rounded-full bg-forest text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">✓</div>
              <div class="text-xs">
                <span class="font-bold text-charcoal block">Módulo 1: Experiencia del Arrendatario (100% interactivo)</span>
                <span class="text-charcoal-muted">Catálogo en SPS y Tegucigalpa, filtros, cotizador con garantía reembolsable y checkout.</span>
              </div>
            </div>

            <div class="p-3.5 rounded-xl bg-white border border-surface-border flex items-start space-x-3">
              <div class="w-5 h-5 rounded-full bg-forest text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">✓</div>
              <div class="text-xs">
                <span class="font-bold text-charcoal block">Módulo 2: Portal de Anfitriones y Dueños (100% interactivo)</span>
                <span class="text-charcoal-muted">Publicación de inventario con fotos, fijación de tarifas por día/semana/mes y balance de cobros.</span>
              </div>
            </div>

            <div class="p-3.5 rounded-xl bg-white border border-dashed border-neutral-300 flex items-start space-x-3 opacity-80">
              <div class="w-5 h-5 rounded-full bg-neutral-200 text-neutral-600 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">3</div>
              <div class="text-xs">
                <span class="font-bold text-charcoal block">Módulo 3: Trazabilidad Logística de Choferes (En desarrollo)</span>
                <span class="text-charcoal-muted">Despacho de vehículos, seguimiento en ruta física y liberación automática de garantías. Programado para la entrega final.</span>
              </div>
            </div>
          </div>

          <!-- Botón de acceso de desarrollador (oculto sutilmente al pie) -->
          <div class="mt-6 pt-4 border-t border-surface-border flex justify-between items-center text-[11px] text-charcoal-muted">
            <span>Vista de revisión previa para cliente</span>
            <button 
              @click="store.isClientAdvanceMode = false" 
              class="text-forest hover:underline font-semibold">
              Desbloquear módulo completo →
            </button>
          </div>

        </div>

      </section>

      <!-- ============================================================== -->
      <!-- VISTA COMPLETA DE OPERACIONES (100% DESBLOQUEADO)              -->
      <!-- ============================================================== -->
      <div v-else class="flex flex-col flex-1">
        
        <!-- Encabezado de Operaciones -->
        <header class="border-b border-surface-border bg-white px-4 sm:px-6 md:px-8 py-5">
          <div class="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div class="flex items-center space-x-2">
                <h1 class="text-xl font-bold tracking-tight text-charcoal">Centro de Operaciones</h1>
                <span class="text-[10px] font-bold text-forest bg-forest-light border border-forest-border px-2 py-0.5 rounded">
                  Modo Completo
                </span>
              </div>
              <p class="text-xs text-charcoal-muted mt-1">Supervisión logística, intermediación financiera y custodia de garantías.</p>
            </div>

            <div class="flex items-center space-x-2 self-start sm:self-auto">
              <button 
                @click="store.isClientAdvanceMode = true"
                class="text-xs text-charcoal-muted hover:text-charcoal border border-surface-border px-3 py-1.5 rounded-lg">
                Volver a Modo Avance (2/3)
              </button>
              <select class="text-xs font-bold text-charcoal bg-white border border-surface-border rounded-xl px-3 py-2 focus:outline-none">
                <option>Nacional (SPS y TGU)</option>
                <option>San Pedro Sula</option>
                <option>Tegucigalpa</option>
              </select>
            </div>
          </div>

          <!-- Tarjetas de Métricas de Negocio -->
          <div class="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mt-5">
            <div class="p-3.5 sm:p-4 rounded-2xl border border-surface-border bg-white shadow-airbnb">
              <span class="text-[10px] font-bold text-charcoal-muted uppercase tracking-wider block">Margen MobiRent</span>
              <div class="text-xl sm:text-2xl font-bold text-forest mt-1">L {{ store.adminMetrics.totalRevenue }}</div>
              <span class="text-[10px] text-charcoal-muted block mt-0.5">Comisiones cobradas</span>
            </div>

            <div class="p-3.5 sm:p-4 rounded-2xl border border-surface-border bg-white shadow-airbnb">
              <span class="text-[10px] font-bold text-charcoal-muted uppercase tracking-wider block">Garantías en custodia</span>
              <div class="text-xl sm:text-2xl font-bold text-charcoal mt-1">L {{ store.adminMetrics.escrowDeposits }}</div>
              <span class="text-[10px] text-charcoal-muted block mt-0.5">Depósitos reembolsables</span>
            </div>

            <div class="p-3.5 sm:p-4 rounded-2xl border border-surface-border bg-white shadow-airbnb">
              <span class="text-[10px] font-bold text-charcoal-muted uppercase tracking-wider block">Alquileres activos</span>
              <div class="text-xl sm:text-2xl font-bold text-charcoal mt-1">{{ store.rentals.length }}</div>
              <span class="text-[10px] text-charcoal-muted block mt-0.5">En gestión</span>
            </div>

            <div class="p-3.5 sm:p-4 rounded-2xl border border-surface-border bg-white shadow-airbnb">
              <span class="text-[10px] font-bold text-charcoal-muted uppercase tracking-wider block">Fletes en ruta</span>
              <div class="text-xl sm:text-2xl font-bold text-charcoal mt-1">{{ store.pendingDeliveriesCount }}</div>
              <span class="text-[10px] text-charcoal-muted block mt-0.5">En proceso logístico</span>
            </div>
          </div>
        </header>

        <!-- Módulos de Control -->
        <section class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-5 w-full flex-1">
          
          <div class="flex items-center space-x-4 sm:space-x-6 border-b border-surface-border mb-5 overflow-x-auto no-scrollbar">
            <button 
              @click="store.adminTab = 'logistics'" 
              :class="store.adminTab === 'logistics' ? 'border-forest text-forest font-bold' : 'border-transparent text-charcoal-muted hover:text-charcoal font-medium'"
              class="pb-3 border-b-2 text-xs whitespace-nowrap transition-colors flex items-center space-x-1.5">
              <span>Control de Envíos</span>
              <span class="w-4 h-4 bg-forest text-white rounded-full text-[10px] flex items-center justify-center font-bold">
                {{ store.pendingDeliveriesCount }}
              </span>
            </button>

            <button 
              @click="store.adminTab = 'orders'" 
              :class="store.adminTab === 'orders' ? 'border-forest text-forest font-bold' : 'border-transparent text-charcoal-muted hover:text-charcoal font-medium'"
              class="pb-3 border-b-2 text-xs whitespace-nowrap transition-colors">
              Registro de Órdenes
            </button>

            <button 
              @click="store.adminTab = 'catalog'" 
              :class="store.adminTab === 'catalog' ? 'border-forest text-forest font-bold' : 'border-transparent text-charcoal-muted hover:text-charcoal font-medium'"
              class="pb-3 border-b-2 text-xs whitespace-nowrap transition-colors">
              Inventario
            </button>
          </div>

          <!-- MÓDULO 1: Monitoreo Logístico -->
          <div v-if="store.adminTab === 'logistics'" class="space-y-4">
            
            <div class="p-4 rounded-2xl border border-surface-border bg-surface-subtle flex items-center justify-between">
              <div>
                <h3 class="text-xs font-bold text-charcoal">Gestión Logística en Tiempo Real</h3>
                <p class="text-[11px] text-charcoal-muted mt-0.5">Pulse cada estado para coordinar la recogida, transporte y entrega física.</p>
              </div>
            </div>

            <!-- Listado de Envíos -->
            <div class="space-y-4">
              <div 
                v-for="rental in store.rentals" 
                :key="rental.id"
                class="p-4 sm:p-5 rounded-2xl border border-surface-border bg-white shadow-airbnb">
                
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-surface-border">
                  <div class="flex items-center space-x-2.5">
                    <span class="text-xs font-mono font-bold text-forest bg-forest-light px-2.5 py-0.5 rounded-md border border-forest-border">
                      #ORD-{{ rental.id }}
                    </span>
                    <h4 class="text-sm font-bold text-charcoal leading-snug">{{ rental.itemTitle }}</h4>
                  </div>
                  
                  <div class="flex items-center space-x-2 self-start sm:self-auto">
                    <span class="text-xs text-charcoal-muted">Estado:</span>
                    <span 
                      :class="store.getAdminBadgeClass(rental.status)"
                      class="text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                      {{ rental.status }}
                    </span>
                  </div>
                </div>

                <!-- Direcciones -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-3 py-3.5 text-xs text-charcoal">
                  <div class="p-3 rounded-xl border border-surface-border bg-surface-subtle">
                    <span class="text-[10px] uppercase font-bold text-charcoal-muted block tracking-wider">1. Recogida (Arrendador)</span>
                    <p class="font-bold text-charcoal mt-1">{{ rental.ownerName }}</p>
                    <p class="text-charcoal-muted mt-0.5">{{ rental.pickupAddress }}</p>
                  </div>

                  <div class="p-3 rounded-xl border border-surface-border bg-surface-subtle">
                    <span class="text-[10px] uppercase font-bold text-charcoal-muted block tracking-wider">2. Entrega (Arrendatario)</span>
                    <p class="font-bold text-charcoal mt-1">{{ rental.renterName }} · {{ rental.renterPhone }}</p>
                    <p class="text-charcoal-muted mt-0.5">{{ rental.deliveryAddress }}</p>
                  </div>
                </div>

                <!-- Botones de Acción Táctiles -->
                <div class="pt-3 border-t border-surface-border">
                  <span class="text-xs font-bold text-charcoal-muted block mb-2">Avanzar estado operativo:</span>

                  <div class="grid grid-cols-2 sm:flex sm:flex-wrap gap-2">
                    <button 
                      @click="store.setRentalStatus(rental.id, 'Asignado')"
                      :disabled="rental.status === 'Asignado'"
                      class="text-xs py-2.5 px-3 rounded-xl border border-surface-border text-charcoal font-semibold hover:bg-surface-subtle disabled:opacity-30 transition-colors text-center">
                      1. Asignar
                    </button>
                    <button 
                      @click="store.setRentalStatus(rental.id, 'En recogida')"
                      :disabled="rental.status === 'En recogida'"
                      class="text-xs py-2.5 px-3 rounded-xl border border-surface-border text-charcoal font-semibold hover:bg-surface-subtle disabled:opacity-30 transition-colors text-center">
                      2. Recogida
                    </button>
                    <button 
                      @click="store.setRentalStatus(rental.id, 'En tránsito')"
                      :disabled="rental.status === 'En tránsito'"
                      class="text-xs py-2.5 px-3 rounded-xl bg-forest text-white font-bold hover:bg-forest-hover disabled:opacity-30 transition-colors text-center">
                      3. En tránsito
                    </button>
                    <button 
                      @click="store.setRentalStatus(rental.id, 'Entregado')"
                      :disabled="rental.status === 'Entregado'"
                      class="text-xs py-2.5 px-3 rounded-xl bg-neutral-900 text-white font-bold hover:bg-neutral-800 disabled:opacity-30 transition-colors text-center">
                      4. Entregado ✓
                    </button>
                    <button 
                      @click="store.setRentalStatus(rental.id, 'Devuelto')"
                      :disabled="rental.status === 'Devuelto'"
                      class="col-span-2 sm:col-span-1 text-xs py-2.5 px-3 rounded-xl border border-neutral-300 text-charcoal font-bold hover:bg-neutral-100 disabled:opacity-30 transition-colors text-center">
                      5. Devolución & Reembolso
                    </button>
                  </div>
                </div>

              </div>
            </div>

          </div>

          <!-- MÓDULO 2: Registro Financiero -->
          <div v-if="store.adminTab === 'orders'" class="p-4 sm:p-6 rounded-2xl border border-surface-border bg-white shadow-airbnb">
            <div class="flex items-center justify-between mb-3">
              <h3 class="text-sm font-bold text-charcoal">Registro Transaccional</h3>
              <span class="text-[11px] text-charcoal-muted sm:hidden">Deslice para ver más →</span>
            </div>
            
            <div class="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
              <table class="w-full text-left text-xs whitespace-nowrap sm:whitespace-normal">
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

          <!-- MÓDULO 3: Moderación de Catálogo -->
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

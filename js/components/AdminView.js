/**
 * ==============================================================
 * Componente: AdminView (js/components/AdminView.js)
 * ==============================================================
 * Panel Central de MobiRent: monitoreo de ingresos de la plataforma,
 * garantías en custodia, tablero logístico interactivo en tiempo real,
 * auditoría de transacciones y moderación de catálogo.
 */

window.AdminViewComponent = {
  template: `
    <div class="flex flex-col min-h-full bg-slate-900 text-slate-100">
      
      <!-- Header del Admin y KPIs Globales -->
      <div class="bg-slate-950 p-4 border-b border-slate-800">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div class="flex items-center space-x-2">
              <span class="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></span>
              <h1 class="text-xl font-black text-white tracking-tight">Panel Central MobiRent</h1>
              <span class="bg-slate-800 text-emerald-400 text-[10px] font-mono px-2 py-0.5 rounded border border-slate-700">MOBI-OPS v1.0</span>
            </div>
            <p class="text-xs text-slate-400">Control de operaciones, pagos de clientes, liquidaciones y logística en Honduras</p>
          </div>

          <!-- Filtro de Región -->
          <div class="flex items-center space-x-2">
            <span class="text-xs text-slate-400">Región:</span>
            <select class="bg-slate-800 text-xs text-white border border-slate-700 rounded-lg px-2.5 py-1.5 focus:outline-none">
              <option>Nacional (SPS y TGU)</option>
              <option>San Pedro Sula</option>
              <option>Tegucigalpa</option>
            </select>
          </div>
        </div>

        <!-- Tarjetas de Métricas del Negocio -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
          <div class="bg-slate-900/90 border border-slate-800 p-3 rounded-xl">
            <span class="text-[10px] uppercase font-bold text-slate-400">Margen MobiRent (Ingresos)</span>
            <div class="text-lg font-black text-emerald-400">L. {{ store.adminMetrics.totalRevenue }}</div>
            <span class="text-[10px] text-slate-500">Comisiones + Servicios cobrados</span>
          </div>
          <div class="bg-slate-900/90 border border-slate-800 p-3 rounded-xl">
            <span class="text-[10px] uppercase font-bold text-slate-400">Garantías en Custodia</span>
            <div class="text-lg font-black text-amber-400">L. {{ store.adminMetrics.escrowDeposits }}</div>
            <span class="text-[10px] text-amber-500/80">Reembolsables a clientes</span>
          </div>
          <div class="bg-slate-900/90 border border-slate-800 p-3 rounded-xl">
            <span class="text-[10px] uppercase font-bold text-slate-400">Alquileres Activos</span>
            <div class="text-lg font-black text-blue-400">{{ store.rentals.length }}</div>
            <span class="text-[10px] text-slate-500">Transacciones gestionadas</span>
          </div>
          <div class="bg-slate-900/90 border border-slate-800 p-3 rounded-xl">
            <span class="text-[10px] uppercase font-bold text-slate-400">Viajes Logísticos</span>
            <div class="text-lg font-black text-purple-400">{{ store.pendingDeliveriesCount }}</div>
            <span class="text-[10px] text-purple-300">En ruta o por retirar</span>
          </div>
        </div>
      </div>

      <!-- Pestañas del Administrador -->
      <div class="p-4 flex-1">
        <div class="flex space-x-2 border-b border-slate-800 pb-2 mb-4">
          <button 
            @click="store.adminTab = 'logistics'" 
            :class="store.adminTab === 'logistics' ? 'text-emerald-400 border-b-2 border-emerald-400 font-bold' : 'text-slate-400 hover:text-white font-medium'"
            class="text-xs pb-1.5 px-2 transition flex items-center space-x-1">
            <span>🚚 Monitoreo Logístico y Envíos</span>
            <span class="w-4 h-4 bg-purple-500 text-white rounded-full text-[9px] flex items-center justify-center font-bold">
              {{ store.pendingDeliveriesCount }}
            </span>
          </button>
          <button 
            @click="store.adminTab = 'orders'" 
            :class="store.adminTab === 'orders' ? 'text-emerald-400 border-b-2 border-emerald-400 font-bold' : 'text-slate-400 hover:text-white font-medium'"
            class="text-xs pb-1.5 px-2 transition">
            📑 Todas las Reservas y Finanzas
          </button>
          <button 
            @click="store.adminTab = 'catalog'" 
            :class="store.adminTab === 'catalog' ? 'text-emerald-400 border-b-2 border-emerald-400 font-bold' : 'text-slate-400 hover:text-white font-medium'"
            class="text-xs pb-1.5 px-2 transition">
            🪑 Catálogo y Moderación
          </button>
        </div>

        <!-- TAB 1: Monitoreo Logístico Interactivo -->
        <div v-if="store.adminTab === 'logistics'" class="space-y-4">
          <div class="bg-slate-800/80 p-3 rounded-xl border border-slate-700 flex items-center justify-between">
            <div>
              <h3 class="text-xs font-bold text-white">Flujo de Estados Logísticos Gestionados por MobiRent</h3>
              <p class="text-[11px] text-slate-400">Haz clic en los botones para avanzar el estado de transporte de cada alquiler en tiempo real.</p>
            </div>
            <span class="text-[10px] bg-slate-900 px-2.5 py-1 rounded-full text-slate-300 font-mono">
              Logística: MANAGED
            </span>
          </div>

          <!-- Lista de Pedidos Logísticos -->
          <div class="space-y-3">
            <div 
              v-for="rental in store.rentals" 
              :key="rental.id"
              class="bg-slate-950 p-4 rounded-xl border border-slate-800 hover:border-slate-700 transition">
              
              <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-2 mb-3">
                <div class="flex items-center space-x-2">
                  <span class="font-mono text-xs text-emerald-400 font-bold">#ORD-{{ rental.id }}</span>
                  <span class="text-xs font-bold text-white">{{ rental.itemTitle }}</span>
                </div>
                
                <!-- Badge de Estado Actual -->
                <div class="flex items-center space-x-2">
                  <span class="text-[10px] text-slate-400">Estado actual:</span>
                  <span 
                    :class="store.getAdminBadgeClass(rental.status)"
                    class="text-[10px] font-mono font-bold px-2.5 py-1 rounded-md uppercase">
                    {{ rental.status }}
                  </span>
                </div>
              </div>

              <!-- Direcciones de Recogida y Entrega -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300 mb-3 bg-slate-900/70 p-3 rounded-lg border border-slate-800/80">
                <div>
                  <span class="text-[10px] uppercase font-bold text-slate-500 block">1. Origen (Dirección del Dueño)</span>
                  <p class="font-semibold text-white">{{ rental.ownerName }}</p>
                  <p class="text-[11px] text-slate-400">📍 {{ rental.pickupAddress || 'Col. Trejo, San Pedro Sula' }}</p>
                </div>
                <div>
                  <span class="text-[10px] uppercase font-bold text-slate-500 block">2. Destino (Dirección del Cliente)</span>
                  <p class="font-semibold text-white">{{ rental.renterName }} (Tel: {{ rental.renterPhone || '+504 9988-1122' }})</p>
                  <p class="text-[11px] text-slate-400">📍 {{ rental.deliveryAddress }}</p>
                </div>
              </div>

              <!-- Controles Interactivos de Estado Logístico -->
              <div class="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-800/60">
                <span class="text-[11px] text-slate-400 font-medium">Avanzar estado operativo:</span>

                <div class="flex flex-wrap gap-1.5">
                  <button 
                    @click="store.setRentalStatus(rental.id, 'ASIGNADA')"
                    :disabled="rental.status === 'ASIGNADA'"
                    class="text-[11px] px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition disabled:opacity-30">
                    1. Asignar Chofer
                  </button>
                  <button 
                    @click="store.setRentalStatus(rental.id, 'EN RECOGIDA')"
                    :disabled="rental.status === 'EN RECOGIDA'"
                    class="text-[11px] px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition disabled:opacity-30">
                    2. En Recogida
                  </button>
                  <button 
                    @click="store.setRentalStatus(rental.id, 'EN TRÁNSITO')"
                    :disabled="rental.status === 'EN TRÁNSITO'"
                    class="text-[11px] px-2.5 py-1 rounded bg-blue-900/50 hover:bg-blue-800 text-blue-200 border border-blue-700 transition disabled:opacity-30">
                    3. En Tránsito
                  </button>
                  <button 
                    @click="store.setRentalStatus(rental.id, 'ENTREGADA')"
                    :disabled="rental.status === 'ENTREGADA'"
                    class="text-[11px] px-2.5 py-1 rounded bg-emerald-900/50 hover:bg-emerald-800 text-emerald-200 border border-emerald-700 transition disabled:opacity-30">
                    4. Entregada ✓
                  </button>
                  <button 
                    @click="store.setRentalStatus(rental.id, 'DEVUELTA')"
                    :disabled="rental.status === 'DEVUELTA'"
                    class="text-[11px] px-2.5 py-1 rounded bg-purple-900/50 hover:bg-purple-800 text-purple-200 border border-purple-700 transition disabled:opacity-30">
                    5. Devolución & Garantía
                  </button>
                </div>
              </div>

            </div>
          </div>

        </div>

        <!-- TAB 2: Finanzas y Reservas Totales -->
        <div v-if="store.adminTab === 'orders'" class="space-y-3">
          <div class="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <h3 class="text-xs font-bold text-white mb-2 uppercase tracking-wide">Desglose Transaccional Completo</h3>
            <div class="overflow-x-auto">
              <table class="w-full text-left text-xs text-slate-300">
                <thead class="bg-slate-900 text-slate-400 uppercase text-[10px] font-bold">
                  <tr>
                    <th class="p-2.5">ID / Artículo</th>
                    <th class="p-2.5">Cliente</th>
                    <th class="p-2.5">Pago Cliente</th>
                    <th class="p-2.5">Pago Dueño</th>
                    <th class="p-2.5">Logística</th>
                    <th class="p-2.5">Margen MobiRent</th>
                    <th class="p-2.5">Garantía</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-800">
                  <tr v-for="r in store.rentals" :key="r.id">
                    <td class="p-2.5">
                      <span class="font-mono text-emerald-400 block font-bold">#{{ r.id }}</span>
                      <span class="text-white">{{ r.itemTitle }}</span>
                    </td>
                    <td class="p-2.5">{{ r.renterName }}</td>
                    <td class="p-2.5 font-bold text-white">L. {{ r.totalPaid }}</td>
                    <td class="p-2.5 text-slate-300">L. {{ r.ownerPayout }}</td>
                    <td class="p-2.5 text-slate-400">L. {{ r.transportFee }}</td>
                    <td class="p-2.5 font-extrabold text-emerald-400">L. {{ r.serviceFee }}</td>
                    <td class="p-2.5 text-amber-400 font-semibold">L. {{ r.deposit }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- TAB 3: Moderación de Catálogo -->
        <div v-if="store.adminTab === 'catalog'" class="space-y-3">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div 
              v-for="item in store.items" 
              :key="item.id"
              class="bg-slate-950 p-3 rounded-xl border border-slate-800 flex items-center justify-between">
              <div class="flex items-center space-x-3">
                <img :src="item.image" class="w-12 h-12 rounded-lg object-cover">
                <div>
                  <h4 class="text-xs font-bold text-white">{{ item.title }}</h4>
                  <p class="text-[11px] text-slate-400">{{ item.category }} • {{ item.city }} • Dueño: {{ item.ownerName }}</p>
                  <span class="text-xs font-extrabold text-emerald-400">L. {{ item.priceDay }} /día</span>
                </div>
              </div>
              <button 
                @click="store.deleteItem(item.id)"
                class="text-xs text-red-400 hover:text-red-300 p-2 hover:bg-slate-900 rounded-lg">
                Eliminar
              </button>
            </div>
          </div>
        </div>

      </div>

    </div>
  `,
  setup() {
    return { store: window.MobiRentStore };
  }
};

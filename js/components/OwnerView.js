/**
 * ==============================================================
 * Componente: OwnerView (js/components/OwnerView.js)
 * ==============================================================
 * Vista del Arrendador / Propietario: publicación de artículos,
 * fijación de precios (día, semana, mes), control de inventario,
 * gestión de solicitudes y liquidaciones bancarias.
 */

window.OwnerViewComponent = {
  template: `
    <div class="flex flex-col min-h-full bg-slate-50">
      
      <!-- Header del Arrendador y KPIs -->
      <div class="bg-white border-b border-slate-200 p-4">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div class="flex items-center space-x-2">
              <h1 class="text-xl font-extrabold text-slate-900">Panel del Propietario</h1>
              <span class="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-md">Perfil Verificado</span>
            </div>
            <p class="text-xs text-slate-500">Monetiza tus muebles y electrodomésticos sin mover un dedo</p>
          </div>

          <!-- Botón Publicar Nuevo -->
          <button 
            @click="store.showPublishModal = true"
            class="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2 rounded-xl shadow-sm transition flex items-center justify-center space-x-1.5 self-start sm:self-auto">
            <span>➕</span>
            <span>Publicar Nuevo Artículo</span>
          </button>
        </div>

        <!-- Tarjetas de Métricas -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
          <div class="bg-slate-50 p-3 rounded-xl border border-slate-200">
            <span class="text-[10px] uppercase font-bold text-slate-400 block">Ganancias Acumuladas</span>
            <span class="text-lg font-extrabold text-emerald-600">L. {{ store.ownerStats.totalEarnings }}</span>
            <span class="text-[10px] text-emerald-700 block mt-0.5">Listo para liquidar</span>
          </div>
          <div class="bg-slate-50 p-3 rounded-xl border border-slate-200">
            <span class="text-[10px] uppercase font-bold text-slate-400 block">Artículos Activos</span>
            <span class="text-lg font-extrabold text-slate-900">{{ store.ownerArticles.length }}</span>
            <span class="text-[10px] text-slate-500 block mt-0.5">En catálogo</span>
          </div>
          <div class="bg-slate-50 p-3 rounded-xl border border-slate-200">
            <span class="text-[10px] uppercase font-bold text-slate-400 block">Alquileres en Curso</span>
            <span class="text-lg font-extrabold text-blue-600">{{ store.ownerStats.activeRentals }}</span>
            <span class="text-[10px] text-blue-500 block mt-0.5">Generando renta</span>
          </div>
          <div class="bg-slate-50 p-3 rounded-xl border border-slate-200">
            <span class="text-[10px] uppercase font-bold text-slate-400 block">Calificación Dueño</span>
            <span class="text-lg font-extrabold text-amber-500 flex items-center">
              ★ 4.9 <span class="text-xs text-slate-400 font-normal ml-1">(18)</span>
            </span>
            <span class="text-[10px] text-slate-500 block mt-0.5">Excelente estado</span>
          </div>
        </div>
      </div>

      <!-- Navegación por Pestañas del Propietario -->
      <div class="p-4 flex-1">
        <div class="flex space-x-2 border-b border-slate-200 pb-2 mb-4">
          <button 
            @click="store.ownerTab = 'items'" 
            :class="store.ownerTab === 'items' ? 'text-emerald-700 border-b-2 border-emerald-600 font-bold' : 'text-slate-500 hover:text-slate-800 font-medium'"
            class="text-xs pb-1.5 px-2 transition">
            📦 Mis Muebles y Artículos ({{ store.ownerArticles.length }})
          </button>
          <button 
            @click="store.ownerTab = 'requests'" 
            :class="store.ownerTab === 'requests' ? 'text-emerald-700 border-b-2 border-emerald-600 font-bold' : 'text-slate-500 hover:text-slate-800 font-medium'"
            class="text-xs pb-1.5 px-2 transition flex items-center space-x-1">
            <span>🔔 Solicitudes y Reservas</span>
            <span v-if="store.pendingRequestsCount > 0" class="w-4 h-4 bg-amber-500 text-white rounded-full text-[9px] flex items-center justify-center font-bold">
              {{ store.pendingRequestsCount }}
            </span>
          </button>
          <button 
            @click="store.ownerTab = 'payouts'" 
            :class="store.ownerTab === 'payouts' ? 'text-emerald-700 border-b-2 border-emerald-600 font-bold' : 'text-slate-500 hover:text-slate-800 font-medium'"
            class="text-xs pb-1.5 px-2 transition">
            💰 Liquidaciones Bancarias
          </button>
        </div>

        <!-- TAB 1: Artículos Publicados -->
        <div v-if="store.ownerTab === 'items'" class="space-y-3">
          <div 
            v-for="item in store.ownerArticles" 
            :key="item.id"
            class="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            
            <div class="flex items-center space-x-3">
              <img :src="item.image" class="w-16 h-16 rounded-xl object-cover border border-slate-100">
              <div>
                <div class="flex items-center space-x-2">
                  <h3 class="font-bold text-slate-800 text-xs sm:text-sm">{{ item.title }}</h3>
                  <span 
                    :class="item.status === 'activo' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'"
                    class="text-[10px] font-bold px-2 py-0.5 rounded-full capitalize">
                    {{ item.status }}
                  </span>
                </div>
                <p class="text-xs text-slate-500">{{ item.category }} • {{ item.city }}</p>
                
                <!-- Precios fijados por el propietario -->
                <div class="flex items-center space-x-2 mt-1 text-[11px] font-semibold text-slate-700">
                  <span>Día: <strong class="text-emerald-700">L. {{ item.priceDay }}</strong></span>
                  <span>•</span>
                  <span>Sem: <strong class="text-emerald-700">L. {{ item.priceWeek }}</strong></span>
                  <span>•</span>
                  <span>Mes: <strong class="text-emerald-700">L. {{ item.priceMonth }}</strong></span>
                  <span class="text-slate-400">• Garantía: L. {{ item.deposit }}</span>
                </div>
              </div>
            </div>

            <!-- Acciones sobre el artículo -->
            <div class="flex items-center space-x-2 w-full sm:w-auto justify-end">
              <button 
                @click="store.toggleItemStatus(item)" 
                class="text-xs px-3 py-1.5 rounded-lg border border-slate-200 font-medium hover:bg-slate-50 transition">
                {{ item.status === 'activo' ? 'Pausar' : 'Activar' }}
              </button>
              <button 
                @click="store.deleteItem(item.id)" 
                class="text-xs px-2.5 py-1.5 rounded-lg text-red-600 hover:bg-red-50 border border-red-200 transition">
                🗑️
              </button>
            </div>

          </div>

          <div v-if="store.ownerArticles.length === 0" class="text-center py-8 bg-white rounded-xl border border-dashed border-slate-200">
            <span class="text-3xl block mb-2">📦</span>
            <p class="text-xs font-bold text-slate-700">No tienes artículos publicados aún</p>
            <button 
              @click="store.showPublishModal = true"
              class="mt-2 text-xs bg-emerald-600 text-white px-3 py-1.5 rounded-lg font-bold">
              Publicar tu primer mueble
            </button>
          </div>
        </div>

        <!-- TAB 2: Solicitudes de Alquiler -->
        <div v-if="store.ownerTab === 'requests'" class="space-y-3">
          <div 
            v-for="rental in store.ownerRentals" 
            :key="rental.id"
            class="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
            
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-2 mb-2">
              <div>
                <span class="text-[10px] text-slate-400 uppercase font-bold">Reserva #{{ rental.id }}</span>
                <h4 class="font-bold text-sm text-slate-800">{{ rental.itemTitle }}</h4>
              </div>
              <span 
                :class="store.getRentalBadgeClass(rental.status)"
                class="text-[10px] font-bold px-2.5 py-1 rounded-full uppercase self-start">
                {{ rental.status }}
              </span>
            </div>

            <div class="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs text-slate-600 my-2">
              <div><span class="text-slate-400 block">Arrendatario:</span> <strong>{{ rental.renterName }}</strong></div>
              <div><span class="text-slate-400 block">Duración:</span> <strong>{{ rental.duration }} ({{ rental.durationType }})</strong></div>
              <div><span class="text-slate-400 block">Tu ganancia neta:</span> <strong class="text-emerald-600 font-extrabold">L. {{ rental.ownerPayout }}</strong></div>
            </div>

            <div class="bg-slate-50 p-2 rounded-lg text-xs flex items-center justify-between text-slate-600">
              <span>🚚 MobiRent recogerá en tu dirección: <strong>{{ rental.pickupAddress || 'Col. Trejo, San Pedro Sula' }}</strong></span>
            </div>

            <!-- Botones si la reserva está pendiente de aprobación -->
            <div v-if="rental.status === 'PENDIENTE_APROBACION'" class="mt-3 flex space-x-2 justify-end">
              <button 
                @click="store.approveRentalByOwner(rental.id)"
                class="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-3 py-1.5 rounded-lg transition">
                ✓ Aceptar Solicitud
              </button>
              <button 
                @click="store.rejectRentalByOwner(rental.id)"
                class="border border-red-300 text-red-600 hover:bg-red-50 text-xs font-bold px-3 py-1.5 rounded-lg transition">
                ✕ Rechazar
              </button>
            </div>

          </div>
        </div>

        <!-- TAB 3: Liquidaciones y Pagos Bancarios -->
        <div v-if="store.ownerTab === 'payouts'" class="bg-white p-4 rounded-xl border border-slate-200">
          <h3 class="font-bold text-sm text-slate-900 mb-2">Liquidaciones de MobiRent a tu cuenta</h3>
          <p class="text-xs text-slate-500 mb-4">MobiRent transfiere tu dinero directamente a tu cuenta bancaria (BAC, Atlántida, Ficohsa, Banpaís) tras verificar la entrega.</p>
          
          <div class="bg-emerald-50 border border-emerald-200 p-4 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <span class="text-xs text-emerald-800 font-bold block">Saldo acumulado disponible para retiro:</span>
              <span class="text-2xl font-black text-emerald-700">L. {{ store.ownerStats.totalEarnings }}</span>
              <span class="text-[11px] text-emerald-600 block mt-0.5">Cuenta: BAC Credomatic HNL •••• 4912</span>
            </div>
            <button 
              @click="store.requestPayout()"
              class="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2 rounded-xl shadow-xs transition">
              Solicitar Transferencia Bancaria
            </button>
          </div>

          <h4 class="font-bold text-xs text-slate-700 mt-6 mb-2 uppercase tracking-wide">Historial de pagos recibidos</h4>
          <div class="space-y-2 text-xs">
            <div class="p-2.5 rounded-lg border border-slate-100 flex justify-between items-center bg-slate-50/50">
              <div>
                <span class="font-bold text-slate-800">Alquiler Sofá Seccional Gris (1 Mes)</span>
                <span class="text-[10px] text-slate-400 block">Transferencia #BAC-98214 • Pagado</span>
              </div>
              <span class="font-extrabold text-emerald-600">+ L. 1,800.00</span>
            </div>
            <div class="p-2.5 rounded-lg border border-slate-100 flex justify-between items-center bg-slate-50/50">
              <div>
                <span class="font-bold text-slate-800">Alquiler Sillas Tiffany (Evento Fin de Semana)</span>
                <span class="text-[10px] text-slate-400 block">Transferencia #BAC-96301 • Pagado</span>
              </div>
              <span class="font-extrabold text-emerald-600">+ L. 1,650.00</span>
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

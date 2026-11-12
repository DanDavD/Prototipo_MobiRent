/**
 * ==============================================================
 * Componente: Modals (js/components/Modals.js)
 * ==============================================================
 * Modales interactivos: Detalle de producto con cotizador en vivo,
 * Checkout con desglose transparente, Tracking de entregas,
 * Formulario de publicación para dueños y Notificaciones Toast.
 */

window.ModalsComponent = {
  template: `
    <div>
      
      <!-- ============================================================== -->
      <!-- MODAL 1: DETALLE DEL ARTÍCULO Y COTIZADOR EN VIVO (COMPRADOR) -->
      <!-- ============================================================== -->
      <div 
        v-if="store.selectedItem" 
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto">
        
        <div class="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-100 flex flex-col my-6">
          
          <!-- Imagen y Botón Cerrar -->
          <div class="relative h-56 sm:h-64 bg-slate-100">
            <img :src="store.selectedItem.image" :alt="store.selectedItem.title" class="w-full h-full object-cover">
            <button 
              @click="store.selectedItem = null" 
              class="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center font-bold text-sm transition">
              ✕
            </button>
            <div class="absolute bottom-3 left-3 bg-white/95 backdrop-blur-xs text-slate-800 text-xs font-bold px-3 py-1 rounded-xl shadow-xs">
              📍 {{ store.selectedItem.city }}, Honduras
            </div>
          </div>

          <!-- Contenido del Artículo -->
          <div class="p-5 flex-1 flex flex-col">
            <div class="flex items-center justify-between mb-1">
              <span class="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md">
                {{ store.selectedItem.category }} • Estado: {{ store.selectedItem.condition }}
              </span>
              <span class="text-xs font-bold text-amber-500">
                ★ {{ store.selectedItem.rating }} ({{ store.selectedItem.reviewsCount }} opiniones)
              </span>
            </div>

            <h2 class="text-lg font-extrabold text-slate-900">{{ store.selectedItem.title }}</h2>
            <p class="text-xs text-slate-500 mt-1">{{ store.selectedItem.description }}</p>

            <!-- Datos del Dueño -->
            <div class="flex items-center space-x-2.5 my-3 p-2.5 bg-slate-50 rounded-xl border border-slate-100">
              <div class="w-8 h-8 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center">
                {{ store.selectedItem.ownerName.charAt(0) }}
              </div>
              <div class="text-xs">
                <span class="font-bold text-slate-800 block">Dueño: {{ store.selectedItem.ownerName }}</span>
                <span class="text-slate-400">Verificado por MobiRent • Identidad confirmada</span>
              </div>
            </div>

            <!-- CALCULADORA DE ALQUILER EN TIEMPO REAL -->
            <div class="border-t border-slate-100 pt-3 mt-1">
              <label class="text-xs font-bold text-slate-700 block mb-1.5">1. Selecciona la modalidad de alquiler:</label>
              
              <div class="grid grid-cols-3 gap-2 mb-3">
                <button 
                  @click="store.bookingDurationType = 'dia'"
                  :class="store.bookingDurationType === 'dia' ? 'bg-emerald-600 text-white shadow-xs' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'"
                  class="py-2 px-1 text-center rounded-xl text-xs font-bold transition">
                  Por Día
                  <span class="block text-[10px] font-normal opacity-90">L. {{ store.selectedItem.priceDay }}</span>
                </button>

                <button 
                  @click="store.bookingDurationType = 'semana'"
                  :class="store.bookingDurationType === 'semana' ? 'bg-emerald-600 text-white shadow-xs' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'"
                  class="py-2 px-1 text-center rounded-xl text-xs font-bold transition">
                  Por Semana
                  <span class="block text-[10px] font-normal opacity-90">L. {{ store.selectedItem.priceWeek }}</span>
                </button>

                <button 
                  @click="store.bookingDurationType = 'mes'"
                  :class="store.bookingDurationType === 'mes' ? 'bg-emerald-600 text-white shadow-xs' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'"
                  class="py-2 px-1 text-center rounded-xl text-xs font-bold transition">
                  Por Mes
                  <span class="block text-[10px] font-normal opacity-90">L. {{ store.selectedItem.priceMonth }}</span>
                </button>
              </div>

              <!-- Selector de Cantidad -->
              <div class="flex items-center justify-between mb-3 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                <span class="text-xs font-semibold text-slate-700">Cantidad de {{ store.bookingDurationTypeLabel }}:</span>
                <div class="flex items-center space-x-2">
                  <button 
                    @click="store.decreaseQuantity()" 
                    class="w-7 h-7 bg-white rounded-lg border border-slate-300 font-bold text-slate-700 flex items-center justify-center hover:bg-slate-100">
                    -
                  </button>
                  <span class="font-extrabold text-sm text-slate-800 w-6 text-center">{{ store.bookingQuantity }}</span>
                  <button 
                    @click="store.increaseQuantity()" 
                    class="w-7 h-7 bg-white rounded-lg border border-slate-300 font-bold text-slate-700 flex items-center justify-center hover:bg-slate-100">
                    +
                  </button>
                </div>
              </div>

              <!-- DESGLOSE TRANSPARENTE DEL COSTO (Requisito MobiRent) -->
              <div class="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 space-y-1.5 text-xs text-slate-600">
                <div class="flex justify-between">
                  <span>Alquiler ({{ store.bookingQuantity }} {{ store.bookingDurationTypeLabel }}):</span>
                  <span class="font-bold text-slate-800">L. {{ store.calculateRentalSubtotal }}</span>
                </div>
                <div class="flex justify-between">
                  <span>Transporte y Entrega MobiRent:</span>
                  <span class="font-bold text-slate-800">L. {{ store.defaultTransportFee }}</span>
                </div>
                <div class="flex justify-between">
                  <span>Tarifa de Servicio MobiRent:</span>
                  <span class="font-bold text-slate-800">L. {{ store.defaultServiceFee }}</span>
                </div>
                <div class="flex justify-between text-amber-700 bg-amber-50/80 -mx-1 px-1 py-0.5 rounded">
                  <span class="flex items-center">
                    <span>🛡️ Garantía (100% Reembolsable):</span>
                  </span>
                  <span class="font-extrabold">L. {{ store.selectedItem.deposit }}</span>
                </div>

                <div class="border-t border-slate-200 pt-2 mt-2 flex justify-between items-baseline text-slate-900">
                  <span class="text-xs font-extrabold uppercase">Total a Pagar:</span>
                  <span class="text-lg font-black text-emerald-600">L. {{ store.calculateRentalTotal }}</span>
                </div>
              </div>
            </div>

            <!-- Botón de Continuar a Checkout -->
            <button 
              @click="store.startCheckout()"
              class="mt-4 w-full bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-extrabold py-3 rounded-2xl shadow-md transition flex items-center justify-center space-x-2">
              <span>Continuar con la Reserva</span>
              <span>→</span>
            </button>

          </div>

        </div>
      </div>


      <!-- ============================================================== -->
      <!-- MODAL 2: CHECKOUT / PAGO Y DIRECCIÓN DE ENTREGA (COMPRADOR)    -->
      <!-- ============================================================== -->
      <div 
        v-if="store.showCheckoutModal" 
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto">
        
        <div class="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-slate-100 flex flex-col my-6">
          
          <div class="p-4 bg-slate-900 text-white flex items-center justify-between">
            <div>
              <h3 class="font-bold text-sm">Completar Alquiler en MobiRent</h3>
              <p class="text-[11px] text-slate-400">Entrega coordinada y garantía protegida</p>
            </div>
            <button @click="store.showCheckoutModal = false" class="text-slate-400 hover:text-white font-bold">✕</button>
          </div>

          <div class="p-5 space-y-4">
            
            <!-- Resumen del artículo -->
            <div class="flex items-center space-x-3 p-2.5 bg-slate-50 rounded-xl border border-slate-100">
              <img :src="store.selectedItem.image" class="w-12 h-12 rounded-lg object-cover">
              <div>
                <h4 class="text-xs font-bold text-slate-900">{{ store.selectedItem.title }}</h4>
                <p class="text-[11px] text-slate-500">{{ store.bookingQuantity }} {{ store.bookingDurationTypeLabel }} • Total: <strong class="text-emerald-700">L. {{ store.calculateRentalTotal }}</strong></p>
              </div>
            </div>

            <!-- Datos de Entrega -->
            <div>
              <label class="text-xs font-bold text-slate-700 block mb-1">Dirección de Entrega en {{ store.selectedItem.city }}:</label>
              <input 
                v-model="store.checkoutForm.address"
                type="text" 
                placeholder="Ej: Col. Los Castaños, 4ta calle, casa #24" 
                class="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500">
            </div>

            <div>
              <label class="text-xs font-bold text-slate-700 block mb-1">Teléfono de Contacto (WhatsApp):</label>
              <input 
                v-model="store.checkoutForm.phone"
                type="text" 
                placeholder="+504 9988-7766" 
                class="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500">
            </div>

            <!-- Método de Pago Simulado -->
            <div>
              <label class="text-xs font-bold text-slate-700 block mb-1.5">Método de Pago:</label>
              <div class="space-y-2">
                <label class="flex items-center space-x-2.5 p-2.5 rounded-xl border border-slate-200 cursor-pointer hover:bg-slate-50 transition" :class="store.checkoutForm.paymentMethod === 'card' ? 'border-emerald-500 bg-emerald-50/40' : ''">
                  <input type="radio" v-model="store.checkoutForm.paymentMethod" value="card" class="text-emerald-600 focus:ring-emerald-500">
                  <div class="text-xs">
                    <span class="font-bold text-slate-800 block">Tarjeta de Crédito / Débito</span>
                    <span class="text-slate-400">Visa / Mastercard (Procesamiento Seguro)</span>
                  </div>
                </label>

                <label class="flex items-center space-x-2.5 p-2.5 rounded-xl border border-slate-200 cursor-pointer hover:bg-slate-50 transition" :class="store.checkoutForm.paymentMethod === 'transfer' ? 'border-emerald-500 bg-emerald-50/40' : ''">
                  <input type="radio" v-model="store.checkoutForm.paymentMethod" value="transfer" class="text-emerald-600 focus:ring-emerald-500">
                  <div class="text-xs">
                    <span class="font-bold text-slate-800 block">Transferencia Bancaria en Honduras</span>
                    <span class="text-slate-400">BAC Credomatic / Banco Atlántida / Ficohsa</span>
                  </div>
                </label>
              </div>
            </div>

            <!-- Botón de Confirmación -->
            <button 
              @click="store.confirmBooking()"
              class="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-3 rounded-2xl shadow-lg transition flex items-center justify-center space-x-2">
              <span>✓ Pagar y Confirmar Alquiler</span>
            </button>

          </div>

        </div>
      </div>


      <!-- ============================================================== -->
      <!-- MODAL 3: MIS ALQUILERES / TRACKING LOGÍSTICO (COMPRADOR)       -->
      <!-- ============================================================== -->
      <div 
        v-if="store.showMyRentalsModal" 
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto">
        
        <div class="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-100 flex flex-col my-6">
          
          <div class="p-4 bg-slate-900 text-white flex items-center justify-between">
            <div class="flex items-center space-x-2">
              <span>📦</span>
              <h3 class="font-bold text-sm">Mis Alquileres Activos</h3>
            </div>
            <button @click="store.showMyRentalsModal = false" class="text-slate-400 hover:text-white font-bold">✕</button>
          </div>

          <div class="p-5 space-y-4 max-h-[75vh] overflow-y-auto">
            
            <div 
              v-for="rental in store.rentals" 
              :key="rental.id"
              class="bg-slate-50 p-4 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              
              <div class="flex items-center justify-between">
                <div>
                  <span class="text-[10px] text-slate-400 uppercase font-mono font-bold">Pedido #{{ rental.id }}</span>
                  <h4 class="font-bold text-sm text-slate-900">{{ rental.itemTitle }}</h4>
                </div>
                <span 
                  :class="store.getRentalBadgeClass(rental.status)"
                  class="text-[10px] font-bold px-2.5 py-1 rounded-full uppercase">
                  {{ rental.status }}
                </span>
              </div>

              <!-- LÍNEA DE TIEMPO / TRACKING LOGÍSTICO VISUAL -->
              <div class="py-2">
                <span class="text-[11px] font-bold text-slate-700 block mb-2">Progreso de la Entrega:</span>
                <div class="flex items-center justify-between relative">
                  <div class="absolute left-2 right-2 top-3 h-0.5 bg-slate-200 -z-0"></div>
                  
                  <!-- Paso 1 -->
                  <div class="flex flex-col items-center z-10">
                    <div class="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white bg-emerald-600 shadow">✓</div>
                    <span class="text-[9px] text-slate-600 mt-1 font-semibold">Confirmado</span>
                  </div>

                  <!-- Paso 2 -->
                  <div class="flex flex-col items-center z-10">
                    <div 
                      :class="['EN RECOGIDA', 'EN TRÁNSITO', 'ENTREGADA', 'DEVUELTA'].includes(rental.status) ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-400'"
                      class="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold shadow">
                      🚚
                    </div>
                    <span class="text-[9px] text-slate-600 mt-1 font-semibold">En Recogida</span>
                  </div>

                  <!-- Paso 3 -->
                  <div class="flex flex-col items-center z-10">
                    <div 
                      :class="['EN TRÁNSITO', 'ENTREGADA', 'DEVUELTA'].includes(rental.status) ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-400'"
                      class="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold shadow">
                      🛣️
                    </div>
                    <span class="text-[9px] text-slate-600 mt-1 font-semibold">En Tránsito</span>
                  </div>

                  <!-- Paso 4 -->
                  <div class="flex flex-col items-center z-10">
                    <div 
                      :class="['ENTREGADA', 'DEVUELTA'].includes(rental.status) ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-400'"
                      class="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold shadow">
                      🏠
                    </div>
                    <span class="text-[9px] text-slate-600 mt-1 font-semibold">Entregado</span>
                  </div>
                </div>
              </div>

              <!-- Datos de entrega -->
              <div class="text-xs text-slate-600 bg-white p-2.5 rounded-xl border border-slate-200/80 space-y-1">
                <div class="flex justify-between">
                  <span class="text-slate-400">Dirección:</span>
                  <span class="font-semibold text-slate-800">{{ rental.deliveryAddress }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-slate-400">Garantía Protegida:</span>
                  <span class="font-bold text-amber-600">L. {{ rental.deposit }} (Reembolsable)</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-slate-400">Total Pagado:</span>
                  <span class="font-extrabold text-emerald-700">L. {{ rental.totalPaid }}</span>
                </div>
              </div>

            </div>

            <div v-if="store.rentals.length === 0" class="text-center py-8">
              <p class="text-xs text-slate-500">No tienes alquileres registrados todavía.</p>
            </div>

          </div>

        </div>
      </div>


      <!-- ============================================================== -->
      <!-- MODAL 4: PUBLICAR NUEVO ARTÍCULO (VENDEDOR / DUEÑO)            -->
      <!-- ============================================================== -->
      <div 
        v-if="store.showPublishModal" 
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto">
        
        <div class="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-100 flex flex-col my-6">
          
          <div class="p-4 bg-emerald-600 text-white flex items-center justify-between">
            <div>
              <h3 class="font-bold text-sm">Publicar Artículo en MobiRent</h3>
              <p class="text-[11px] text-emerald-100">Gana dinero alquilando lo que no usas</p>
            </div>
            <button @click="store.showPublishModal = false" class="text-white hover:text-emerald-200 font-bold">✕</button>
          </div>

          <div class="p-5 space-y-4 max-h-[80vh] overflow-y-auto">
            
            <div>
              <label class="text-xs font-bold text-slate-700 block mb-1">Nombre o Título del Artículo:</label>
              <input 
                v-model="store.newItem.title"
                type="text" 
                placeholder="Ej: Juego de Comedor 6 Sillas Caoba" 
                class="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium">
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="text-xs font-bold text-slate-700 block mb-1">Categoría:</label>
                <select 
                  v-model="store.newItem.category"
                  class="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500">
                  <option v-for="cat in store.publishCategories" :key="cat" :value="cat">{{ cat }}</option>
                </select>
              </div>

              <div>
                <label class="text-xs font-bold text-slate-700 block mb-1">Ciudad:</label>
                <select 
                  v-model="store.newItem.city"
                  class="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500">
                  <option value="San Pedro Sula">San Pedro Sula (SPS)</option>
                  <option value="Tegucigalpa">Tegucigalpa (TGU)</option>
                </select>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="text-xs font-bold text-slate-700 block mb-1">Estado Físico:</label>
                <select 
                  v-model="store.newItem.condition"
                  class="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500">
                  <option value="Excelente">Excelente</option>
                  <option value="Como nuevo">Como nuevo</option>
                  <option value="Buen estado">Buen estado</option>
                </select>
              </div>

              <div>
                <label class="text-xs font-bold text-slate-700 block mb-1">Depósito Garantía (L.):</label>
                <input 
                  v-model.number="store.newItem.deposit"
                  type="number" 
                  placeholder="Ej: 800" 
                  class="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500">
              </div>
            </div>

            <!-- DEFINIR PRECIOS (PREGUNTA CLAVE DE ANDRES: "QUE PONGA PRECIO DECILE") -->
            <div class="bg-emerald-50/70 p-3.5 rounded-2xl border border-emerald-200/80">
              <label class="text-xs font-extrabold text-emerald-900 block mb-2">
                💰 Fija los Precios que recibirás (en Lempiras HNL):
              </label>
              <div class="grid grid-cols-3 gap-2">
                <div>
                  <span class="text-[10px] font-bold text-slate-600 block mb-0.5">Por Día (L.):</span>
                  <input 
                    v-model.number="store.newItem.priceDay"
                    type="number" 
                    class="w-full text-xs p-2 bg-white border border-emerald-300 rounded-lg font-bold text-emerald-800">
                </div>
                <div>
                  <span class="text-[10px] font-bold text-slate-600 block mb-0.5">Por Semana (L.):</span>
                  <input 
                    v-model.number="store.newItem.priceWeek"
                    type="number" 
                    class="w-full text-xs p-2 bg-white border border-emerald-300 rounded-lg font-bold text-emerald-800">
                </div>
                <div>
                  <span class="text-[10px] font-bold text-slate-600 block mb-0.5">Por Mes (L.):</span>
                  <input 
                    v-model.number="store.newItem.priceMonth"
                    type="number" 
                    class="w-full text-xs p-2 bg-white border border-emerald-300 rounded-lg font-bold text-emerald-800">
                </div>
              </div>
              <span class="text-[10px] text-emerald-700 block mt-2">
                * MobiRent sumará el transporte y su comisión al cliente final.
              </span>
            </div>

            <!-- Selección de Imagen Preset o URL -->
            <div>
              <label class="text-xs font-bold text-slate-700 block mb-1">Fotografía del Mueble:</label>
              <div class="grid grid-cols-4 gap-2 mb-2">
                <button 
                  type="button"
                  v-for="preset in store.imagePresets" 
                  :key="preset.name"
                  @click="store.newItem.image = preset.url"
                  :class="store.newItem.image === preset.url ? 'ring-2 ring-emerald-500 scale-95' : 'opacity-70 hover:opacity-100'"
                  class="relative h-14 rounded-lg overflow-hidden border border-slate-200 transition">
                  <img :src="preset.url" class="w-full h-full object-cover">
                  <span class="absolute bottom-0 inset-x-0 bg-black/60 text-[9px] text-white text-center truncate px-0.5">
                    {{ preset.name }}
                  </span>
                </button>
              </div>
              <input 
                v-model="store.newItem.image"
                type="text" 
                placeholder="O pega aquí la URL de una foto" 
                class="w-full text-[11px] p-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white">
            </div>

            <div>
              <label class="text-xs font-bold text-slate-700 block mb-1">Descripción y Medidas:</label>
              <textarea 
                v-model="store.newItem.description"
                rows="2" 
                placeholder="Describe las dimensiones, material, cuidados especiales..." 
                class="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"></textarea>
            </div>

            <button 
              @click="store.publishItem()"
              class="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-3 rounded-2xl shadow-md transition">
              ✓ Publicar Artículo Inmediatamente
            </button>

          </div>

        </div>
      </div>


      <!-- ============================================================== -->
      <!-- NOTIFICACIÓN TOAST FLOTANTE                                   -->
      <!-- ============================================================== -->
      <div 
        v-if="store.toastMessage" 
        class="fixed bottom-5 right-5 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-2xl border border-slate-700 flex items-center space-x-2 text-xs animate-bounce">
        <span>✨</span>
        <span>{{ store.toastMessage }}</span>
      </div>

    </div>
  `,
  setup() {
    return { store: window.MobiRentStore };
  }
};

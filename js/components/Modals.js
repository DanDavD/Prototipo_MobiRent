/**
 * ==============================================================
 * Componente: Modals (js/components/Modals.js)
 * ==============================================================
 * Ventanas modales optimizadas para móvil (Formato Bottom-Sheet):
 * - En móvil emergen desde la parte inferior con esquinas redondeadas.
 * - Tipografía de inputs a 16px para evitar auto-zoom en iOS Safari.
 * - Botones de acción táctiles de altura ergonómica (mínimo 48px).
 * - Notificaciones toast elevadas para no tapar la barra inferior móvil.
 */

window.ModalsComponent = {
  template: `
    <div>
      
      <!-- ============================================================== -->
      <!-- MODAL 1: DETALLE DEL ARTÍCULO Y COTIZADOR EN VIVO              -->
      <!-- ============================================================== -->
      <div 
        v-if="store.selectedItem" 
        class="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/50 backdrop-blur-xs overflow-y-auto">
        
        <div class="bg-white rounded-t-[28px] sm:rounded-3xl max-w-xl w-full max-h-[92vh] sm:max-h-[90vh] overflow-y-auto shadow-airbnb-modal border border-surface-border flex flex-col">
          
          <!-- Imagen y Botón Cerrar Flotante -->
          <div class="relative aspect-[16/10] sm:h-72 w-full bg-neutral-100 shrink-0">
            <img :src="store.selectedItem.image" :alt="store.selectedItem.title" class="w-full h-full object-cover">
            
            <button 
              @click="store.selectedItem = null" 
              class="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/95 text-charcoal flex items-center justify-center shadow-md border border-neutral-200 transition-colors">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>

            <span class="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm text-charcoal text-xs font-bold px-3 py-1.5 rounded-lg border border-neutral-200 shadow-sm">
              {{ store.selectedItem.city }} · {{ store.selectedItem.neighborhood }}
            </span>
          </div>

          <!-- Contenido y Calculadora de Alquiler -->
          <div class="p-5 sm:p-6 flex-1 flex flex-col">
            
            <div class="flex items-center justify-between text-xs text-charcoal-muted mb-2">
              <span class="font-bold text-forest bg-forest-light border border-forest-border px-2.5 py-1 rounded-md">
                {{ store.selectedItem.category }} · {{ store.selectedItem.condition }}
              </span>
              <span class="flex items-center space-x-1 font-bold text-charcoal">
                <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
                <span>{{ store.selectedItem.rating }}</span>
                <span class="font-normal text-charcoal-muted">({{ store.selectedItem.reviewsCount }})</span>
              </span>
            </div>

            <h2 class="text-lg sm:text-xl font-bold text-charcoal leading-snug tracking-tight">{{ store.selectedItem.title }}</h2>
            <p class="text-xs sm:text-sm text-charcoal-muted mt-2 leading-relaxed">{{ store.selectedItem.description }}</p>

            <!-- Datos del Anfitrión -->
            <div class="flex items-center space-x-3 my-4 p-3 rounded-xl border border-surface-border bg-surface-subtle">
              <div class="w-9 h-9 rounded-full bg-forest text-white font-bold text-xs flex items-center justify-center shrink-0">
                {{ store.selectedItem.ownerName.charAt(0) }}
              </div>
              <div class="text-xs">
                <span class="font-bold text-charcoal block">Anfitrión: {{ store.selectedItem.ownerName }}</span>
                <span class="text-charcoal-muted">Identidad verificada por MobiRent</span>
              </div>
            </div>

            <!-- Calculadora en Tiempo Real -->
            <div class="border-t border-surface-border pt-4 mt-1">
              <label class="text-xs font-bold text-charcoal block mb-2">Modalidad de cobro:</label>
              
              <div class="grid grid-cols-3 gap-2 sm:gap-2.5 mb-4">
                <button 
                  @click="store.bookingDurationType = 'dia'"
                  :class="store.bookingDurationType === 'dia' ? 'border-forest bg-forest text-white font-bold' : 'border-surface-border bg-white text-charcoal font-semibold hover:bg-surface-subtle'"
                  class="py-2.5 px-1.5 text-center rounded-xl border text-xs transition-colors">
                  Por día
                  <span class="block text-[11px] font-normal opacity-90 mt-0.5">L {{ store.selectedItem.priceDay }}</span>
                </button>

                <button 
                  @click="store.bookingDurationType = 'semana'"
                  :class="store.bookingDurationType === 'semana' ? 'border-forest bg-forest text-white font-bold' : 'border-surface-border bg-white text-charcoal font-semibold hover:bg-surface-subtle'"
                  class="py-2.5 px-1.5 text-center rounded-xl border text-xs transition-colors">
                  Por semana
                  <span class="block text-[11px] font-normal opacity-90 mt-0.5">L {{ store.selectedItem.priceWeek }}</span>
                </button>

                <button 
                  @click="store.bookingDurationType = 'mes'"
                  :class="store.bookingDurationType === 'mes' ? 'border-forest bg-forest text-white font-bold' : 'border-surface-border bg-white text-charcoal font-semibold hover:bg-surface-subtle'"
                  class="py-2.5 px-1.5 text-center rounded-xl border text-xs transition-colors">
                  Por mes
                  <span class="block text-[11px] font-normal opacity-90 mt-0.5">L {{ store.selectedItem.priceMonth }}</span>
                </button>
              </div>

              <!-- Selector de Duración -->
              <div class="flex items-center justify-between mb-4 p-3 rounded-xl border border-surface-border bg-white">
                <span class="text-xs font-bold text-charcoal">Cantidad de {{ store.bookingDurationTypeLabel }}:</span>
                <div class="flex items-center space-x-3">
                  <button 
                    @click="store.decreaseQuantity()" 
                    class="w-8 h-8 rounded-full border border-surface-border text-charcoal font-bold flex items-center justify-center hover:border-charcoal transition-colors">
                    -
                  </button>
                  <span class="font-bold text-sm text-charcoal w-6 text-center">{{ store.bookingQuantity }}</span>
                  <button 
                    @click="store.increaseQuantity()" 
                    class="w-8 h-8 rounded-full border border-surface-border text-charcoal font-bold flex items-center justify-center hover:border-charcoal transition-colors">
                    +
                  </button>
                </div>
              </div>

              <!-- Desglose Transparente de Costos -->
              <div class="p-4 rounded-xl border border-surface-border bg-surface-subtle space-y-2 text-xs text-charcoal">
                <div class="flex justify-between">
                  <span class="text-charcoal-muted">Subtotal alquiler ({{ store.bookingQuantity }} {{ store.bookingDurationTypeLabel }}):</span>
                  <span class="font-bold text-charcoal">L {{ store.calculateRentalSubtotal }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-charcoal-muted">Flete y entrega MobiRent:</span>
                  <span class="font-bold text-charcoal">L {{ store.defaultTransportFee }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-charcoal-muted">Tarifa de protección y servicio:</span>
                  <span class="font-bold text-charcoal">L {{ store.defaultServiceFee }}</span>
                </div>
                <div class="flex justify-between pt-1 border-t border-neutral-200">
                  <span class="text-charcoal-muted">Garantía reembolsable:</span>
                  <span class="font-bold text-forest">L {{ store.selectedItem.deposit }}</span>
                </div>

                <div class="pt-2.5 mt-2 border-t border-neutral-300 flex justify-between items-baseline">
                  <span class="text-xs font-bold uppercase tracking-wider text-charcoal">Total a pagar:</span>
                  <span class="text-lg font-bold text-forest">L {{ store.calculateRentalTotal }}</span>
                </div>
              </div>
            </div>

            <!-- Botón de Continuar -->
            <button 
              @click="store.startCheckout()"
              class="mt-5 w-full bg-forest hover:bg-forest-hover text-white font-bold py-3.5 rounded-full shadow-md transition-all duration-150 flex items-center justify-center space-x-2">
              <span>Continuar con la reserva</span>
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
              </svg>
            </button>

          </div>

        </div>
      </div>


      <!-- ============================================================== -->
      <!-- MODAL 2: CHECKOUT Y DATOS DE ENTREGA                           -->
      <!-- ============================================================== -->
      <div 
        v-if="store.showCheckoutModal" 
        class="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/50 backdrop-blur-xs overflow-y-auto">
        
        <div class="bg-white rounded-t-[28px] sm:rounded-3xl max-w-md w-full max-h-[92vh] sm:max-h-[85vh] overflow-y-auto shadow-airbnb-modal border border-surface-border flex flex-col">
          
          <div class="px-5 py-4 border-b border-surface-border flex items-center justify-between">
            <div>
              <h3 class="font-bold text-sm text-charcoal">Confirmar Alquiler</h3>
              <p class="text-xs text-charcoal-muted">Logística gestionada y garantía en custodia</p>
            </div>
            <button @click="store.showCheckoutModal = false" class="p-1 rounded-full text-charcoal-muted hover:text-charcoal">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>

          <div class="p-5 space-y-4">
            
            <div class="flex items-center space-x-3.5 p-3 rounded-xl border border-surface-border bg-surface-subtle">
              <img :src="store.selectedItem.image" :alt="store.selectedItem.title" class="w-14 h-14 rounded-lg object-cover shrink-0 border border-surface-border">
              <div>
                <h4 class="text-xs font-bold text-charcoal line-clamp-1">{{ store.selectedItem.title }}</h4>
                <p class="text-xs text-charcoal-muted mt-0.5">
                  {{ store.bookingQuantity }} {{ store.bookingDurationTypeLabel }} · Total: <strong class="text-forest font-bold">L {{ store.calculateRentalTotal }}</strong>
                </p>
              </div>
            </div>

            <div>
              <label class="text-xs font-bold text-charcoal block mb-1">Dirección exacta en {{ store.selectedItem.city }}:</label>
              <input 
                v-model="store.checkoutForm.address"
                type="text" 
                placeholder="Colonia, calle, número de casa..." 
                class="w-full text-base sm:text-xs p-3 border border-surface-border rounded-xl focus:border-forest focus:outline-none">
            </div>

            <div>
              <label class="text-xs font-bold text-charcoal block mb-1">Teléfono celular (WhatsApp):</label>
              <input 
                v-model="store.checkoutForm.phone"
                type="text" 
                placeholder="+504 9988-7766" 
                class="w-full text-base sm:text-xs p-3 border border-surface-border rounded-xl focus:border-forest focus:outline-none">
            </div>

            <div>
              <label class="text-xs font-bold text-charcoal block mb-2">Forma de pago:</label>
              <div class="space-y-2">
                <label 
                  class="flex items-center space-x-3 p-3.5 rounded-xl border cursor-pointer transition-colors"
                  :class="store.checkoutForm.paymentMethod === 'card' ? 'border-forest bg-forest-light' : 'border-surface-border hover:bg-surface-subtle'">
                  <input type="radio" v-model="store.checkoutForm.paymentMethod" value="card" class="accent-forest w-4 h-4">
                  <div class="text-xs">
                    <span class="font-bold text-charcoal block">Tarjeta de crédito o débito</span>
                    <span class="text-charcoal-muted">Visa o Mastercard</span>
                  </div>
                </label>

                <label 
                  class="flex items-center space-x-3 p-3.5 rounded-xl border cursor-pointer transition-colors"
                  :class="store.checkoutForm.paymentMethod === 'transfer' ? 'border-forest bg-forest-light' : 'border-surface-border hover:bg-surface-subtle'">
                  <input type="radio" v-model="store.checkoutForm.paymentMethod" value="transfer" class="accent-forest w-4 h-4">
                  <div class="text-xs">
                    <span class="font-bold text-charcoal block">Transferencia bancaria nacional</span>
                    <span class="text-charcoal-muted">BAC Credomatic, Atlántida o Ficohsa</span>
                  </div>
                </label>
              </div>
            </div>

            <button 
              @click="store.confirmBooking()"
              class="w-full bg-forest hover:bg-forest-hover text-white font-bold py-3.5 rounded-full shadow-md transition-colors mt-2 text-sm">
              Confirmar y pagar L {{ store.calculateRentalTotal }}
            </button>

          </div>

        </div>
      </div>


      <!-- ============================================================== -->
      <!-- MODAL 3: MIS ALQUILERES / SEGUIMIENTO LOGÍSTICO               -->
      <!-- ============================================================== -->
      <div 
        v-if="store.showMyRentalsModal" 
        class="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/50 backdrop-blur-xs overflow-y-auto">
        
        <div class="bg-white rounded-t-[28px] sm:rounded-3xl max-w-lg w-full max-h-[92vh] sm:max-h-[85vh] overflow-y-auto shadow-airbnb-modal border border-surface-border flex flex-col">
          
          <div class="px-5 py-4 border-b border-surface-border flex items-center justify-between">
            <h3 class="font-bold text-sm text-charcoal">Mis Alquileres Activos</h3>
            <button @click="store.showMyRentalsModal = false" class="p-1 rounded-full text-charcoal-muted hover:text-charcoal">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>

          <div class="p-5 space-y-4">
            
            <div 
              v-for="rental in store.rentals" 
              :key="rental.id"
              class="p-4 rounded-2xl border border-surface-border bg-white space-y-3 shadow-airbnb">
              
              <div class="flex items-center justify-between">
                <div>
                  <span class="text-[10px] text-charcoal-muted uppercase font-mono font-bold tracking-wider">Orden #{{ rental.id }}</span>
                  <h4 class="font-bold text-sm text-charcoal mt-0.5 leading-snug">{{ rental.itemTitle }}</h4>
                </div>
                <span 
                  :class="store.getRentalBadgeClass(rental.status)"
                  class="text-[11px] font-bold px-2.5 py-1 rounded-full">
                  {{ rental.status }}
                </span>
              </div>

              <!-- Indicador de Progreso -->
              <div class="py-2">
                <div class="flex items-center justify-between relative text-center">
                  <div class="absolute left-3 right-3 top-2.5 h-0.5 bg-neutral-200 -z-0"></div>
                  
                  <div class="flex flex-col items-center z-10">
                    <div class="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white bg-forest">✓</div>
                    <span class="text-[10px] text-charcoal-muted mt-1 font-medium">Confirmado</span>
                  </div>

                  <div class="flex flex-col items-center z-10">
                    <div 
                      :class="['En recogida', 'En tránsito', 'Entregado', 'Devuelto'].includes(rental.status) ? 'bg-forest text-white' : 'bg-neutral-200 text-neutral-500'"
                      class="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold">
                      2
                    </div>
                    <span class="text-[10px] text-charcoal-muted mt-1 font-medium">Recogida</span>
                  </div>

                  <div class="flex flex-col items-center z-10">
                    <div 
                      :class="['En tránsito', 'Entregado', 'Devuelto'].includes(rental.status) ? 'bg-forest text-white' : 'bg-neutral-200 text-neutral-500'"
                      class="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold">
                      3
                    </div>
                    <span class="text-[10px] text-charcoal-muted mt-1 font-medium">En ruta</span>
                  </div>

                  <div class="flex flex-col items-center z-10">
                    <div 
                      :class="['Entregado', 'Devuelto'].includes(rental.status) ? 'bg-forest text-white' : 'bg-neutral-200 text-neutral-500'"
                      class="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold">
                      4
                    </div>
                    <span class="text-[10px] text-charcoal-muted mt-1 font-medium">Entregado</span>
                  </div>
                </div>
              </div>

              <div class="text-xs text-charcoal-muted p-3 rounded-xl bg-surface-subtle space-y-1">
                <div class="flex justify-between">
                  <span>Entrega:</span>
                  <span class="font-bold text-charcoal">{{ rental.deliveryAddress }}</span>
                </div>
                <div class="flex justify-between">
                  <span>Garantía en custodia:</span>
                  <span class="font-bold text-forest">L {{ rental.deposit }}</span>
                </div>
                <div class="flex justify-between pt-1 border-t border-neutral-200">
                  <span>Total pagado:</span>
                  <span class="font-bold text-charcoal">L {{ rental.totalPaid }}</span>
                </div>
              </div>

            </div>

            <div v-if="store.rentals.length === 0" class="text-center py-8">
              <p class="text-xs text-charcoal-muted">No tiene reservas registradas en este momento.</p>
            </div>

          </div>

        </div>
      </div>


      <!-- ============================================================== -->
      <!-- MODAL 4: PUBLICAR ARTÍCULO (PROPIETARIO)                       -->
      <!-- ============================================================== -->
      <div 
        v-if="store.showPublishModal" 
        class="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/50 backdrop-blur-xs overflow-y-auto">
        
        <div class="bg-white rounded-t-[28px] sm:rounded-3xl max-w-lg w-full max-h-[92vh] sm:max-h-[85vh] overflow-y-auto shadow-airbnb-modal border border-surface-border flex flex-col">
          
          <div class="px-5 py-4 border-b border-surface-border flex items-center justify-between">
            <div>
              <h3 class="font-bold text-sm text-charcoal">Publicar Artículo</h3>
              <p class="text-xs text-charcoal-muted">Monetice sus pertenencias con logística gestionada</p>
            </div>
            <button @click="store.showPublishModal = false" class="p-1 rounded-full text-charcoal-muted hover:text-charcoal">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>

          <div class="p-5 space-y-4">
            
            <div>
              <label class="text-xs font-bold text-charcoal block mb-1">Título del artículo:</label>
              <input 
                v-model="store.newItem.title"
                type="text" 
                placeholder="Ej. Juego de sala modular en roble" 
                class="w-full text-base sm:text-xs p-3 border border-surface-border rounded-xl focus:border-forest focus:outline-none">
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="text-xs font-bold text-charcoal block mb-1">Categoría:</label>
                <select 
                  v-model="store.newItem.category"
                  class="w-full text-base sm:text-xs p-3 border border-surface-border rounded-xl focus:border-forest focus:outline-none bg-white">
                  <option v-for="cat in store.publishCategories" :key="cat" :value="cat">{{ cat }}</option>
                </select>
              </div>

              <div>
                <label class="text-xs font-bold text-charcoal block mb-1">Ciudad:</label>
                <select 
                  v-model="store.newItem.city"
                  class="w-full text-base sm:text-xs p-3 border border-surface-border rounded-xl focus:border-forest focus:outline-none bg-white">
                  <option value="San Pedro Sula">San Pedro Sula</option>
                  <option value="Tegucigalpa">Tegucigalpa</option>
                </select>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="text-xs font-bold text-charcoal block mb-1">Estado físico:</label>
                <select 
                  v-model="store.newItem.condition"
                  class="w-full text-base sm:text-xs p-3 border border-surface-border rounded-xl focus:border-forest focus:outline-none bg-white">
                  <option value="Excelente estado">Excelente estado</option>
                  <option value="Como nuevo">Como nuevo</option>
                  <option value="Buen estado">Buen estado</option>
                </select>
              </div>

              <div>
                <label class="text-xs font-bold text-charcoal block mb-1">Garantía requerida (L):</label>
                <input 
                  v-model.number="store.newItem.deposit"
                  type="number" 
                  placeholder="Ej. 800" 
                  class="w-full text-base sm:text-xs p-3 border border-surface-border rounded-xl focus:border-forest focus:outline-none">
              </div>
            </div>

            <!-- Fijación de Tarifas -->
            <div class="p-4 rounded-xl border border-surface-border bg-surface-subtle">
              <label class="text-xs font-bold text-charcoal block mb-1">Tarifas que usted recibirá (Lempiras):</label>
              
              <div class="grid grid-cols-3 gap-2 mt-2">
                <div>
                  <span class="text-[10px] font-bold text-charcoal-muted block mb-1">Por día (L)</span>
                  <input 
                    v-model.number="store.newItem.priceDay"
                    type="number" 
                    class="w-full text-base sm:text-xs p-2.5 bg-white border border-surface-border rounded-lg font-bold text-charcoal focus:border-forest focus:outline-none">
                </div>
                <div>
                  <span class="text-[10px] font-bold text-charcoal-muted block mb-1">Por semana (L)</span>
                  <input 
                    v-model.number="store.newItem.priceWeek"
                    type="number" 
                    class="w-full text-base sm:text-xs p-2.5 bg-white border border-surface-border rounded-lg font-bold text-charcoal focus:border-forest focus:outline-none">
                </div>
                <div>
                  <span class="text-[10px] font-bold text-charcoal-muted block mb-1">Por mes (L)</span>
                  <input 
                    v-model.number="store.newItem.priceMonth"
                    type="number" 
                    class="w-full text-base sm:text-xs p-2.5 bg-white border border-surface-border rounded-lg font-bold text-charcoal focus:border-forest focus:outline-none">
                </div>
              </div>
            </div>

            <!-- Fotografía -->
            <div>
              <label class="text-xs font-bold text-charcoal block mb-1.5">Fotografía:</label>
              <div class="grid grid-cols-3 gap-2 mb-2">
                <button 
                  type="button"
                  v-for="preset in store.imagePresets" 
                  :key="preset.name"
                  @click="store.newItem.image = preset.url"
                  :class="store.newItem.image === preset.url ? 'ring-2 ring-forest' : 'opacity-70 hover:opacity-100'"
                  class="relative aspect-[4/3] rounded-lg overflow-hidden border border-surface-border transition-all">
                  <img :src="preset.url" :alt="preset.name" class="w-full h-full object-cover">
                  <span class="absolute bottom-0 inset-x-0 bg-black/60 text-[10px] text-white text-center truncate px-1 py-0.5">
                    {{ preset.name }}
                  </span>
                </button>
              </div>
            </div>

            <div>
              <label class="text-xs font-bold text-charcoal block mb-1">Descripción:</label>
              <textarea 
                v-model="store.newItem.description"
                rows="2" 
                placeholder="Dimensiones, materiales y cuidados..." 
                class="w-full text-base sm:text-xs p-3 border border-surface-border rounded-xl focus:border-forest focus:outline-none"></textarea>
            </div>

            <button 
              @click="store.publishItem()"
              class="w-full bg-forest hover:bg-forest-hover text-white font-bold py-3.5 rounded-full shadow-md transition-colors text-sm">
              Publicar artículo
            </button>

          </div>

        </div>
      </div>


      <!-- ============================================================== -->
      <!-- NOTIFICACIÓN DE SISTEMA (TOAST SOBRIO)                         -->
      <!-- ============================================================== -->
      <div 
        v-if="store.toastMessage" 
        class="fixed bottom-20 sm:bottom-6 right-4 left-4 sm:left-auto z-50 bg-charcoal text-white text-xs px-4 py-3 rounded-full shadow-lg border border-neutral-700 flex items-center justify-center space-x-2.5">
        <div class="w-2 h-2 rounded-full bg-forest-border shrink-0"></div>
        <span class="truncate">{{ store.toastMessage }}</span>
      </div>

    </div>
  `,
  setup() {
    return { store: window.MobiRentStore };
  }
};

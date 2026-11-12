/**
 * ==============================================================
 * Componente: Modals (js/components/Modals.js)
 * ==============================================================
 * Capa de ventanas modales con lenguaje de diseño Airbnb:
 * fondos blancos, sombras suaves, tipografía sobria, botones
 * forest green (#1A4314) e iconografía vectorial sin emojis.
 */

window.ModalsComponent = {
  template: `
    <div>
      
      <!-- ============================================================== -->
      <!-- MODAL 1: DETALLE DEL ARTÍCULO Y COTIZADOR TRANSPARENTE        -->
      <!-- ============================================================== -->
      <div 
        v-if="store.selectedItem" 
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs overflow-y-auto">
        
        <div class="bg-white rounded-3xl max-w-xl w-full overflow-hidden shadow-airbnb-modal border border-surface-border flex flex-col my-6">
          
          <!-- Encabezado de Imagen -->
          <div class="relative h-64 sm:h-72 bg-neutral-100">
            <img :src="store.selectedItem.image" :alt="store.selectedItem.title" class="w-full h-full object-cover">
            
            <button 
              @click="store.selectedItem = null" 
              class="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-charcoal flex items-center justify-center shadow-sm border border-neutral-200 transition-colors">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>

            <div class="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm text-charcoal text-xs font-semibold px-3 py-1.5 rounded-lg border border-neutral-200 shadow-sm">
              {{ store.selectedItem.city }} · {{ store.selectedItem.neighborhood }}
            </div>
          </div>

          <!-- Cuerpo Informativo y Calculadora -->
          <div class="p-6 sm:p-7 flex-1 flex flex-col">
            
            <div class="flex items-center justify-between text-xs text-charcoal-muted mb-1.5">
              <span class="font-semibold text-forest bg-forest-light border border-forest-border px-2.5 py-0.5 rounded-md">
                {{ store.selectedItem.category }} · {{ store.selectedItem.condition }}
              </span>
              <span class="flex items-center space-x-1 font-semibold text-charcoal">
                <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
                <span>{{ store.selectedItem.rating }}</span>
                <span class="font-normal text-charcoal-muted">({{ store.selectedItem.reviewsCount }} valoraciones)</span>
              </span>
            </div>

            <h2 class="text-xl font-bold text-charcoal tracking-tight">{{ store.selectedItem.title }}</h2>
            <p class="text-xs text-charcoal-muted mt-2 leading-relaxed">{{ store.selectedItem.description }}</p>

            <!-- Datos del Anfitrión -->
            <div class="flex items-center space-x-3 my-4 p-3 rounded-xl border border-surface-border bg-surface-subtle">
              <div class="w-9 h-9 rounded-full bg-forest text-white font-bold text-xs flex items-center justify-center shrink-0">
                {{ store.selectedItem.ownerName.charAt(0) }}
              </div>
              <div class="text-xs">
                <span class="font-semibold text-charcoal block">Anfitrión verificado: {{ store.selectedItem.ownerName }}</span>
                <span class="text-charcoal-muted">Identidad validada y garantía física comprobada por MobiRent</span>
              </div>
            </div>

            <!-- Calculadora de Alquiler -->
            <div class="border-t border-surface-border pt-4 mt-2">
              <label class="text-xs font-semibold text-charcoal block mb-2">Modalidad de alquiler:</label>
              
              <div class="grid grid-cols-3 gap-2.5 mb-4">
                <button 
                  @click="store.bookingDurationType = 'dia'"
                  :class="store.bookingDurationType === 'dia' ? 'border-forest bg-forest text-white' : 'border-surface-border bg-white text-charcoal hover:bg-surface-subtle'"
                  class="py-2.5 px-2 text-center rounded-xl border text-xs font-semibold transition-colors">
                  Por día
                  <span class="block text-[11px] font-normal opacity-90 mt-0.5">L {{ store.selectedItem.priceDay }}</span>
                </button>

                <button 
                  @click="store.bookingDurationType = 'semana'"
                  :class="store.bookingDurationType === 'semana' ? 'border-forest bg-forest text-white' : 'border-surface-border bg-white text-charcoal hover:bg-surface-subtle'"
                  class="py-2.5 px-2 text-center rounded-xl border text-xs font-semibold transition-colors">
                  Por semana
                  <span class="block text-[11px] font-normal opacity-90 mt-0.5">L {{ store.selectedItem.priceWeek }}</span>
                </button>

                <button 
                  @click="store.bookingDurationType = 'mes'"
                  :class="store.bookingDurationType === 'mes' ? 'border-forest bg-forest text-white' : 'border-surface-border bg-white text-charcoal hover:bg-surface-subtle'"
                  class="py-2.5 px-2 text-center rounded-xl border text-xs font-semibold transition-colors">
                  Por mes
                  <span class="block text-[11px] font-normal opacity-90 mt-0.5">L {{ store.selectedItem.priceMonth }}</span>
                </button>
              </div>

              <!-- Selector de Duración -->
              <div class="flex items-center justify-between mb-4 p-3 rounded-xl border border-surface-border bg-white">
                <span class="text-xs font-medium text-charcoal">Cantidad de {{ store.bookingDurationTypeLabel }}:</span>
                <div class="flex items-center space-x-3">
                  <button 
                    @click="store.decreaseQuantity()" 
                    class="w-7 h-7 rounded-full border border-surface-border text-charcoal flex items-center justify-center hover:border-charcoal transition-colors">
                    -
                  </button>
                  <span class="font-bold text-sm text-charcoal w-6 text-center">{{ store.bookingQuantity }}</span>
                  <button 
                    @click="store.increaseQuantity()" 
                    class="w-7 h-7 rounded-full border border-surface-border text-charcoal flex items-center justify-center hover:border-charcoal transition-colors">
                    +
                  </button>
                </div>
              </div>

              <!-- Desglose Transparente de Costos -->
              <div class="p-4 rounded-xl border border-surface-border bg-surface-subtle space-y-2 text-xs text-charcoal">
                <div class="flex justify-between">
                  <span class="text-charcoal-muted">Subtotal alquiler ({{ store.bookingQuantity }} {{ store.bookingDurationTypeLabel }}):</span>
                  <span class="font-semibold text-charcoal">L {{ store.calculateRentalSubtotal }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-charcoal-muted">Transporte y entrega MobiRent:</span>
                  <span class="font-semibold text-charcoal">L {{ store.defaultTransportFee }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-charcoal-muted">Tarifa de protección y servicio:</span>
                  <span class="font-semibold text-charcoal">L {{ store.defaultServiceFee }}</span>
                </div>
                <div class="flex justify-between pt-1 border-t border-neutral-200">
                  <span class="text-charcoal-muted">Depósito de garantía (100% reembolsable):</span>
                  <span class="font-bold text-forest">L {{ store.selectedItem.deposit }}</span>
                </div>

                <div class="pt-2.5 mt-2 border-t border-neutral-300 flex justify-between items-baseline">
                  <span class="text-xs font-bold uppercase tracking-wider text-charcoal">Total a pagar:</span>
                  <span class="text-lg font-bold text-forest">L {{ store.calculateRentalTotal }}</span>
                </div>
              </div>
            </div>

            <!-- Botón Principal -->
            <button 
              @click="store.startCheckout()"
              class="mt-5 w-full bg-forest hover:bg-forest-hover text-white font-semibold py-3.5 rounded-full shadow-sm transition-all duration-150 flex items-center justify-center space-x-2">
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
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs overflow-y-auto">
        
        <div class="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-airbnb-modal border border-surface-border flex flex-col my-6">
          
          <div class="px-6 py-4 border-b border-surface-border flex items-center justify-between">
            <div>
              <h3 class="font-bold text-sm text-charcoal">Confirmación de Alquiler</h3>
              <p class="text-xs text-charcoal-muted">Logística gestionada y garantía en custodia</p>
            </div>
            <button @click="store.showCheckoutModal = false" class="p-1 rounded-full text-charcoal-muted hover:text-charcoal">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>

          <div class="p-6 space-y-4">
            
            <div class="flex items-center space-x-3.5 p-3 rounded-xl border border-surface-border bg-surface-subtle">
              <img :src="store.selectedItem.image" :alt="store.selectedItem.title" class="w-12 h-12 rounded-lg object-cover shrink-0 border border-surface-border">
              <div>
                <h4 class="text-xs font-semibold text-charcoal line-clamp-1">{{ store.selectedItem.title }}</h4>
                <p class="text-xs text-charcoal-muted mt-0.5">
                  {{ store.bookingQuantity }} {{ store.bookingDurationTypeLabel }} · Total: <strong class="text-forest font-bold">L {{ store.calculateRentalTotal }}</strong>
                </p>
              </div>
            </div>

            <div>
              <label class="text-xs font-semibold text-charcoal block mb-1">Dirección de entrega en {{ store.selectedItem.city }}:</label>
              <input 
                v-model="store.checkoutForm.address"
                type="text" 
                placeholder="Ej. Colonia Los Castaños, 4ta calle, casa 24" 
                class="w-full text-xs p-3 border border-surface-border rounded-xl focus:border-forest focus:outline-none">
            </div>

            <div>
              <label class="text-xs font-semibold text-charcoal block mb-1">Teléfono de contacto para la entrega:</label>
              <input 
                v-model="store.checkoutForm.phone"
                type="text" 
                placeholder="+504 9988-7766" 
                class="w-full text-xs p-3 border border-surface-border rounded-xl focus:border-forest focus:outline-none">
            </div>

            <div>
              <label class="text-xs font-semibold text-charcoal block mb-2">Método de pago:</label>
              <div class="space-y-2">
                <label 
                  class="flex items-center space-x-3 p-3 rounded-xl border cursor-pointer transition-colors"
                  :class="store.checkoutForm.paymentMethod === 'card' ? 'border-forest bg-forest-light' : 'border-surface-border hover:bg-surface-subtle'">
                  <input type="radio" v-model="store.checkoutForm.paymentMethod" value="card" class="accent-forest">
                  <div class="text-xs">
                    <span class="font-semibold text-charcoal block">Tarjeta de crédito o débito</span>
                    <span class="text-charcoal-muted">Visa, Mastercard o American Express</span>
                  </div>
                </label>

                <label 
                  class="flex items-center space-x-3 p-3 rounded-xl border cursor-pointer transition-colors"
                  :class="store.checkoutForm.paymentMethod === 'transfer' ? 'border-forest bg-forest-light' : 'border-surface-border hover:bg-surface-subtle'">
                  <input type="radio" v-model="store.checkoutForm.paymentMethod" value="transfer" class="accent-forest">
                  <div class="text-xs">
                    <span class="font-semibold text-charcoal block">Transferencia bancaria directa</span>
                    <span class="text-charcoal-muted">BAC Credomatic, Banco Atlántida o Ficohsa</span>
                  </div>
                </label>
              </div>
            </div>

            <button 
              @click="store.confirmBooking()"
              class="w-full bg-forest hover:bg-forest-hover text-white font-semibold py-3.5 rounded-full shadow-sm transition-colors mt-2">
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
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs overflow-y-auto">
        
        <div class="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-airbnb-modal border border-surface-border flex flex-col my-6">
          
          <div class="px-6 py-4 border-b border-surface-border flex items-center justify-between">
            <h3 class="font-bold text-sm text-charcoal">Mis Alquileres Activos</h3>
            <button @click="store.showMyRentalsModal = false" class="p-1 rounded-full text-charcoal-muted hover:text-charcoal">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>

          <div class="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
            
            <div 
              v-for="rental in store.rentals" 
              :key="rental.id"
              class="p-4 rounded-2xl border border-surface-border bg-white space-y-3">
              
              <div class="flex items-center justify-between">
                <div>
                  <span class="text-[10px] text-charcoal-muted uppercase font-mono font-bold tracking-wider">Orden #{{ rental.id }}</span>
                  <h4 class="font-bold text-sm text-charcoal mt-0.5">{{ rental.itemTitle }}</h4>
                </div>
                <span 
                  :class="store.getRentalBadgeClass(rental.status)"
                  class="text-[11px] font-semibold px-2.5 py-1 rounded-full">
                  {{ rental.status }}
                </span>
              </div>

              <!-- Indicador de Progreso Logístico -->
              <div class="py-3">
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
                    <span class="text-[10px] text-charcoal-muted mt-1 font-medium">En recogida</span>
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
                  <span>Destino:</span>
                  <span class="font-medium text-charcoal">{{ rental.deliveryAddress }}</span>
                </div>
                <div class="flex justify-between">
                  <span>Garantía en custodia:</span>
                  <span class="font-semibold text-forest">L {{ rental.deposit }} (Reembolsable)</span>
                </div>
                <div class="flex justify-between pt-1 border-t border-neutral-200">
                  <span>Total abonado:</span>
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
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs overflow-y-auto">
        
        <div class="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-airbnb-modal border border-surface-border flex flex-col my-6">
          
          <div class="px-6 py-4 border-b border-surface-border flex items-center justify-between">
            <div>
              <h3 class="font-bold text-sm text-charcoal">Publicar Artículo en MobiRent</h3>
              <p class="text-xs text-charcoal-muted">Monetice mobiliario y equipamiento con logística gestionada</p>
            </div>
            <button @click="store.showPublishModal = false" class="p-1 rounded-full text-charcoal-muted hover:text-charcoal">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>

          <div class="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
            
            <div>
              <label class="text-xs font-semibold text-charcoal block mb-1">Título del artículo:</label>
              <input 
                v-model="store.newItem.title"
                type="text" 
                placeholder="Ej. Juego de sala modular en roble" 
                class="w-full text-xs p-3 border border-surface-border rounded-xl focus:border-forest focus:outline-none">
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="text-xs font-semibold text-charcoal block mb-1">Categoría:</label>
                <select 
                  v-model="store.newItem.category"
                  class="w-full text-xs p-3 border border-surface-border rounded-xl focus:border-forest focus:outline-none bg-white">
                  <option v-for="cat in store.publishCategories" :key="cat" :value="cat">{{ cat }}</option>
                </select>
              </div>

              <div>
                <label class="text-xs font-semibold text-charcoal block mb-1">Ciudad:</label>
                <select 
                  v-model="store.newItem.city"
                  class="w-full text-xs p-3 border border-surface-border rounded-xl focus:border-forest focus:outline-none bg-white">
                  <option value="San Pedro Sula">San Pedro Sula</option>
                  <option value="Tegucigalpa">Tegucigalpa</option>
                </select>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="text-xs font-semibold text-charcoal block mb-1">Estado de conservación:</label>
                <select 
                  v-model="store.newItem.condition"
                  class="w-full text-xs p-3 border border-surface-border rounded-xl focus:border-forest focus:outline-none bg-white">
                  <option value="Excelente estado">Excelente estado</option>
                  <option value="Como nuevo">Como nuevo</option>
                  <option value="Buen estado">Buen estado</option>
                </select>
              </div>

              <div>
                <label class="text-xs font-semibold text-charcoal block mb-1">Depósito sugerido (L):</label>
                <input 
                  v-model.number="store.newItem.deposit"
                  type="number" 
                  placeholder="Ej. 800" 
                  class="w-full text-xs p-3 border border-surface-border rounded-xl focus:border-forest focus:outline-none">
              </div>
            </div>

            <!-- Tarifas a Percibir por el Anfitrión -->
            <div class="p-4 rounded-xl border border-surface-border bg-surface-subtle">
              <label class="text-xs font-bold text-charcoal block mb-1">
                Fijación de tarifas a percibir (Lempiras HNL):
              </label>
              <p class="text-[11px] text-charcoal-muted mb-3">
                MobiRent agregará la tarifa de flete y protección al cliente final.
              </p>

              <div class="grid grid-cols-3 gap-2">
                <div>
                  <span class="text-[10px] font-medium text-charcoal-muted block mb-1">Por día (L)</span>
                  <input 
                    v-model.number="store.newItem.priceDay"
                    type="number" 
                    class="w-full text-xs p-2.5 bg-white border border-surface-border rounded-lg font-bold text-charcoal focus:border-forest focus:outline-none">
                </div>
                <div>
                  <span class="text-[10px] font-medium text-charcoal-muted block mb-1">Por semana (L)</span>
                  <input 
                    v-model.number="store.newItem.priceWeek"
                    type="number" 
                    class="w-full text-xs p-2.5 bg-white border border-surface-border rounded-lg font-bold text-charcoal focus:border-forest focus:outline-none">
                </div>
                <div>
                  <span class="text-[10px] font-medium text-charcoal-muted block mb-1">Por mes (L)</span>
                  <input 
                    v-model.number="store.newItem.priceMonth"
                    type="number" 
                    class="w-full text-xs p-2.5 bg-white border border-surface-border rounded-lg font-bold text-charcoal focus:border-forest focus:outline-none">
                </div>
              </div>
            </div>

            <!-- Selección de Fotografía -->
            <div>
              <label class="text-xs font-semibold text-charcoal block mb-2">Fotografía referencial:</label>
              <div class="grid grid-cols-3 gap-2 mb-2">
                <button 
                  type="button"
                  v-for="preset in store.imagePresets" 
                  :key="preset.name"
                  @click="store.newItem.image = preset.url"
                  :class="store.newItem.image === preset.url ? 'ring-2 ring-forest' : 'opacity-80 hover:opacity-100'"
                  class="relative aspect-[4/3] rounded-lg overflow-hidden border border-surface-border transition-all">
                  <img :src="preset.url" :alt="preset.name" class="w-full h-full object-cover">
                  <span class="absolute bottom-0 inset-x-0 bg-black/60 text-[10px] text-white text-center truncate px-1 py-0.5">
                    {{ preset.name }}
                  </span>
                </button>
              </div>
              <input 
                v-model="store.newItem.image"
                type="text" 
                placeholder="O ingrese la URL directa de una imagen" 
                class="w-full text-[11px] p-2.5 border border-surface-border rounded-xl focus:border-forest focus:outline-none">
            </div>

            <div>
              <label class="text-xs font-semibold text-charcoal block mb-1">Descripción y detalles técnicos:</label>
              <textarea 
                v-model="store.newItem.description"
                rows="2" 
                placeholder="Dimensiones, materiales y cuidados requeridos..." 
                class="w-full text-xs p-3 border border-surface-border rounded-xl focus:border-forest focus:outline-none"></textarea>
            </div>

            <button 
              @click="store.publishItem()"
              class="w-full bg-forest hover:bg-forest-hover text-white font-semibold py-3.5 rounded-full shadow-sm transition-colors">
              Publicar artículo en catálogo
            </button>

          </div>

        </div>
      </div>


      <!-- ============================================================== -->
      <!-- NOTIFICACIÓN DE SISTEMA (TOAST SOBRIO)                         -->
      <!-- ============================================================== -->
      <div 
        v-if="store.toastMessage" 
        class="fixed bottom-6 right-6 z-50 bg-charcoal text-white text-xs px-4 py-3 rounded-full shadow-lg border border-neutral-700 flex items-center space-x-2.5">
        <div class="w-2 h-2 rounded-full bg-forest-border"></div>
        <span>{{ store.toastMessage }}</span>
      </div>

    </div>
  `,
  setup() {
    return { store: window.MobiRentStore };
  }
};

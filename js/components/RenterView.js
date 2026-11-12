/**
 * ==============================================================
 * Componente: RenterView (js/components/RenterView.js)
 * ==============================================================
 * Catálogo del Arrendatario inspirado en la interfaz de Airbnb:
 * barra de búsqueda flotante segmentada, carrusel de categorías
 * con líneas sobrias y tarjetas fotográficas de bordes suaves.
 */

window.RenterViewComponent = {
  template: `
    <div class="flex flex-col min-h-full bg-white">
      
      <!-- Sección Superior: Barra de Búsqueda Segmentada Estilo Airbnb -->
      <section class="border-b border-surface-border bg-white pt-5 pb-4 px-4 sm:px-8">
        <div class="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          
          <!-- Barra de Búsqueda Central -->
          <div class="w-full md:w-auto flex-1 max-w-2xl bg-white rounded-full border border-surface-border shadow-airbnb hover:shadow-airbnb-hover transition-all duration-200 flex items-center p-1.5 divide-x divide-surface-border">
            
            <!-- Segmento 1: Ciudad -->
            <div class="flex-1 px-4 py-1">
              <label class="block text-[10px] uppercase font-bold text-charcoal tracking-wider">Ubicación</label>
              <select 
                v-model="store.selectedCity" 
                class="w-full text-xs font-medium text-charcoal bg-transparent focus:outline-none cursor-pointer truncate">
                <option value="Todas">Todas las ciudades</option>
                <option value="San Pedro Sula">San Pedro Sula, Cortés</option>
                <option value="Tegucigalpa">Tegucigalpa, F.M.</option>
              </select>
            </div>

            <!-- Segmento 2: Búsqueda libre -->
            <div class="flex-[1.5] px-4 py-1">
              <label class="block text-[10px] uppercase font-bold text-charcoal tracking-wider">Artículo</label>
              <input 
                v-model="store.searchQuery" 
                type="text" 
                placeholder="Sofás, refrigeradoras, sillas..." 
                class="w-full text-xs text-charcoal placeholder-charcoal-light bg-transparent focus:outline-none truncate">
            </div>

            <!-- Botón Buscar Circular Forest Green -->
            <div class="pl-2 pr-1">
              <button 
                class="w-9 h-9 rounded-full bg-forest hover:bg-forest-hover text-white flex items-center justify-center transition-colors">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                </svg>
              </button>
            </div>

          </div>

          <!-- Botón de Mis Alquileres -->
          <button 
            @click="store.showMyRentalsModal = true" 
            class="flex items-center space-x-2 px-4 py-2 rounded-full border border-surface-border text-xs font-semibold text-charcoal hover:bg-surface-subtle transition-colors shrink-0">
            <svg class="w-4 h-4 text-forest" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
            </svg>
            <span>Mis alquileres</span>
            <span v-if="store.myRentalsCount > 0" class="w-5 h-5 bg-forest text-white rounded-full text-[10px] flex items-center justify-center font-bold">
              {{ store.myRentalsCount }}
            </span>
          </button>

        </div>

        <!-- Filtro de Categorías con Línea de Acento -->
        <div class="max-w-5xl mx-auto flex items-center space-x-6 overflow-x-auto pt-5 pb-1 no-scrollbar">
          <button 
            v-for="cat in store.categories" 
            :key="cat.name"
            @click="store.selectedCategory = cat.name"
            :class="store.selectedCategory === cat.name ? 'border-forest text-forest font-semibold' : 'border-transparent text-charcoal-muted hover:text-charcoal hover:border-neutral-300 font-medium'"
            class="pb-2.5 border-b-2 text-xs whitespace-nowrap transition-all duration-150 flex items-center space-x-2">
            <span>{{ cat.name }}</span>
          </button>
        </div>
      </section>

      <!-- Banner de Confianza y Logística Gestionada -->
      <section class="max-w-7xl mx-auto px-4 sm:px-8 py-4 w-full">
        <div class="bg-surface-subtle rounded-2xl border border-surface-border p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div class="flex items-center space-x-3.5">
            <div class="w-10 h-10 rounded-xl bg-forest-light border border-forest-border flex items-center justify-center text-forest shrink-0">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
              </svg>
            </div>
            <div>
              <h3 class="text-xs font-bold text-charcoal tracking-tight">Operación logística centralizada por MobiRent</h3>
              <p class="text-xs text-charcoal-muted mt-0.5">Recogida e inspección en origen, entrega programada a domicilio y resguardo seguro del depósito de garantía.</p>
            </div>
          </div>
          <span class="text-[11px] font-semibold text-forest bg-white px-3 py-1.5 rounded-full border border-forest-border shrink-0 self-end sm:self-auto">
            Logística gestionada
          </span>
        </div>
      </section>

      <!-- Cuadrícula de Artículos (Cards Estilo Airbnb) -->
      <section class="max-w-7xl mx-auto px-4 sm:px-8 py-4 pb-16 w-full flex-1">
        
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-sm font-semibold text-charcoal">
            {{ store.filteredItems.length }} {{ store.filteredItems.length === 1 ? 'artículo disponible' : 'artículos disponibles' }}
          </h2>
          <span class="text-xs text-charcoal-muted">Tarifas en Lempiras hondureños (HNL)</span>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 sm:gap-7">
          <article 
            v-for="item in store.filteredItems" 
            :key="item.id"
            class="group cursor-pointer flex flex-col"
            @click="store.openItemDetail(item)">
            
            <!-- Fotografía Principal con Relación de Aspecto Fija -->
            <div class="relative aspect-[4/3] rounded-2xl overflow-hidden bg-neutral-100 border border-surface-border">
              <img 
                :src="item.image" 
                :alt="item.title"
                loading="lazy"
                class="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300 ease-out">
              
              <!-- Etiqueta de Condición -->
              <div class="absolute top-3 left-3 bg-white/95 backdrop-blur-sm text-charcoal text-[11px] font-semibold px-2.5 py-1 rounded-md shadow-sm border border-neutral-200/80">
                {{ item.condition }}
              </div>

              <!-- Ciudad -->
              <div class="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm text-white text-[11px] font-medium px-2.5 py-1 rounded-md">
                {{ item.city }}
              </div>
            </div>

            <!-- Metadatos de la Tarjeta -->
            <div class="pt-3 flex flex-col flex-1 justify-between">
              <div>
                <div class="flex items-center justify-between text-xs text-charcoal-muted mb-1">
                  <span>{{ item.neighborhood || item.city }}</span>
                  <span class="flex items-center space-x-1 font-semibold text-charcoal">
                    <svg class="w-3.5 h-3.5 text-charcoal fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                    <span>{{ item.rating }}</span>
                    <span class="font-normal text-charcoal-muted">({{ item.reviewsCount }})</span>
                  </span>
                </div>

                <h3 class="text-sm font-semibold text-charcoal leading-snug group-hover:text-forest transition-colors line-clamp-1">
                  {{ item.title }}
                </h3>
                <p class="text-xs text-charcoal-muted mt-1 line-clamp-1">
                  Propietario: {{ item.ownerName }}
                </p>
              </div>

              <!-- Tarifa Diaria / Llamada a Acción -->
              <div class="mt-3 pt-2 flex items-baseline justify-between border-t border-surface-border">
                <div>
                  <span class="text-sm font-bold text-charcoal tracking-tight">L {{ item.priceDay }}</span>
                  <span class="text-xs text-charcoal-muted font-normal ml-1">/ día</span>
                </div>
                <span class="text-xs font-semibold text-forest group-hover:underline">
                  Consultar reserva
                </span>
              </div>

            </div>

          </article>
        </div>

        <!-- Sin resultados -->
        <div v-if="store.filteredItems.length === 0" class="text-center py-16">
          <div class="w-12 h-12 rounded-full bg-surface-subtle border border-surface-border mx-auto flex items-center justify-center text-charcoal-muted mb-3">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
          </div>
          <p class="text-sm font-semibold text-charcoal">No hay artículos que coincidan con estos criterios</p>
          <p class="text-xs text-charcoal-muted mt-1">Pruebe ajustando el término de búsqueda o seleccionando todas las ciudades.</p>
        </div>

      </section>

    </div>
  `,
  setup() {
    return { store: window.MobiRentStore };
  }
};

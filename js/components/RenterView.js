/**
 * ==============================================================
 * Componente: RenterView (js/components/RenterView.js)
 * ==============================================================
 * Catálogo del Arrendatario optimizado para móvil y iPad:
 * - Búsqueda adaptativa ergonómica (sin campos apretados).
 * - Carrusel de categorías con desplazamiento táctil suave.
 * - Tarjetas tipo Airbnb de tamaño generoso y legible.
 * - Margen inferior seguro para evitar superposición con la barra móvil.
 */

window.RenterViewComponent = {
  template: `
    <div class="flex flex-col min-h-full bg-white pb-24 sm:pb-12">
      
      <!-- BÚSQUEDA ADAPTATIVA -->
      <section class="border-b border-surface-border bg-white pt-4 pb-3 px-4 sm:px-6 md:px-8">
        <div class="max-w-5xl mx-auto flex flex-col gap-3">
          
          <!-- Barra de Búsqueda Móvil y Tablet -->
          <div class="w-full bg-white rounded-2xl sm:rounded-full border border-surface-border shadow-airbnb flex flex-col sm:flex-row items-stretch sm:items-center p-2 sm:p-1.5 divide-y sm:divide-y-0 sm:divide-x divide-surface-border">
            
            <!-- Segmento 1: Ubicación -->
            <div class="flex-1 px-3 py-2 sm:py-1">
              <label class="block text-[10px] uppercase font-bold text-charcoal-muted tracking-wider mb-0.5">Ubicación</label>
              <select 
                v-model="store.selectedCity" 
                class="w-full text-sm font-semibold text-charcoal bg-transparent focus:outline-none cursor-pointer py-1">
                <option value="Todas">Todas las ciudades</option>
                <option value="San Pedro Sula">San Pedro Sula, Cortés</option>
                <option value="Tegucigalpa">Tegucigalpa, F.M.</option>
              </select>
            </div>

            <!-- Segmento 2: Término de búsqueda -->
            <div class="flex-[1.5] px-3 py-2 sm:py-1 flex items-center justify-between gap-2">
              <div class="flex-1">
                <label class="block text-[10px] uppercase font-bold text-charcoal-muted tracking-wider mb-0.5">Artículo o necesidad</label>
                <input 
                  v-model="store.searchQuery" 
                  type="text" 
                  placeholder="Sofás, camas, refrigeradoras, mesas..." 
                  class="w-full text-sm text-charcoal placeholder-charcoal-light bg-transparent focus:outline-none py-1">
              </div>

              <!-- Botón Buscar Circular Forest Green -->
              <button 
                class="w-10 h-10 rounded-xl sm:rounded-full bg-forest text-white flex items-center justify-center shrink-0 shadow-sm active:scale-95 transition-transform">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                </svg>
              </button>
            </div>

          </div>

          <!-- Filtro de Categorías con Desplazamiento Táctil Fluido -->
          <div class="flex items-center space-x-6 overflow-x-auto pt-2 pb-1 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
            <button 
              v-for="cat in store.categories" 
              :key="cat.name"
              @click="store.selectedCategory = cat.name"
              :class="store.selectedCategory === cat.name ? 'border-forest text-forest font-bold' : 'border-transparent text-charcoal-muted hover:text-charcoal font-medium'"
              class="pb-2.5 border-b-2 text-xs whitespace-nowrap transition-all duration-150 shrink-0">
              {{ cat.name }}
            </button>
          </div>

        </div>
      </section>

      <!-- Banner de Confianza / Logística Gestionada -->
      <section class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 pt-4 w-full">
        <div class="bg-surface-subtle rounded-2xl border border-surface-border p-4 flex items-center justify-between gap-3">
          <div class="flex items-center space-x-3">
            <div class="w-9 h-9 rounded-xl bg-forest-light border border-forest-border flex items-center justify-center text-forest shrink-0">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
              </svg>
            </div>
            <div>
              <h3 class="text-xs font-bold text-charcoal">Transporte e inspección coordinados por MobiRent</h3>
              <p class="text-[11px] text-charcoal-muted">Entrega a domicilio, retiro al finalizar y depósito protegido.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- CUADRÍCULA DE ARTÍCULOS ADAPTATIVA (1 en móvil, 2 en iPad, 3 en desktop) -->
      <section class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-5 w-full flex-1">
        
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-sm font-bold text-charcoal">
            {{ store.filteredItems.length }} {{ store.filteredItems.length === 1 ? 'artículo' : 'artículos' }} en catálogo
          </h2>
          <span class="text-xs text-charcoal-muted">Lempiras (HNL)</span>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-6 md:gap-7">
          <article 
            v-for="item in store.filteredItems" 
            :key="item.id"
            class="group cursor-pointer flex flex-col bg-white rounded-2xl overflow-hidden border border-surface-border shadow-airbnb hover:shadow-airbnb-hover transition-all duration-200"
            @click="store.openItemDetail(item)">
            
            <!-- Fotografía con proporción óptima para pantallas táctiles -->
            <div class="relative aspect-[4/3] w-full bg-neutral-100 overflow-hidden">
              <img 
                :src="item.image" 
                :alt="item.title"
                loading="lazy"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ease-out">
              
              <!-- Etiqueta de Condición -->
              <span class="absolute top-3 left-3 bg-white/95 backdrop-blur-sm text-charcoal text-[11px] font-bold px-2.5 py-1 rounded-md shadow-sm border border-neutral-200">
                {{ item.condition }}
              </span>

              <!-- Ciudad -->
              <span class="absolute bottom-3 left-3 bg-black/65 backdrop-blur-sm text-white text-[11px] font-semibold px-2.5 py-1 rounded-md">
                {{ item.city }}
              </span>
            </div>

            <!-- Datos del Artículo (Tipografía amplia y legible en móvil) -->
            <div class="p-4 flex flex-col flex-1 justify-between">
              <div>
                <div class="flex items-center justify-between text-xs text-charcoal-muted mb-1.5">
                  <span class="font-medium truncate pr-2">{{ item.neighborhood || item.city }}</span>
                  <span class="flex items-center space-x-1 font-bold text-charcoal shrink-0">
                    <svg class="w-3.5 h-3.5 text-charcoal fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                    <span>{{ item.rating }}</span>
                    <span class="font-normal text-charcoal-muted">({{ item.reviewsCount }})</span>
                  </span>
                </div>

                <h3 class="text-base font-bold text-charcoal leading-snug group-hover:text-forest transition-colors line-clamp-1">
                  {{ item.title }}
                </h3>
                <p class="text-xs text-charcoal-muted mt-1 line-clamp-1">
                  Propietario: {{ item.ownerName }}
                </p>
              </div>

              <!-- Precio y Llamado a la Acción -->
              <div class="mt-4 pt-3 flex items-baseline justify-between border-t border-surface-border">
                <div>
                  <span class="text-base font-bold text-charcoal">L {{ item.priceDay }}</span>
                  <span class="text-xs text-charcoal-muted font-normal ml-1">/ día</span>
                </div>
                <span class="text-xs font-bold text-forest">
                  Ver detalle →
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
          <p class="text-sm font-semibold text-charcoal">No encontramos artículos para esa búsqueda</p>
          <p class="text-xs text-charcoal-muted mt-1">Pruebe seleccionando 'Todas las ciudades' o cambiando la categoría.</p>
        </div>

      </section>

    </div>
  `,
  setup() {
    return { store: window.MobiRentStore };
  }
};

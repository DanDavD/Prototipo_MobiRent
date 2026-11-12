/**
 * ==============================================================
 * Componente: RenterView (js/components/RenterView.js)
 * ==============================================================
 * Vista del Arrendatario / Comprador: catálogo de artículos,
 * filtros por ciudad y categoría, cotizaciones y acceso a reservas.
 */

window.RenterViewComponent = {
  template: `
    <div class="flex flex-col min-h-full">
      
      <!-- Header de Búsqueda y Filtros -->
      <div class="bg-white border-b border-slate-100 p-4 sticky top-0 z-20 shadow-xs">
        <div class="flex items-center justify-between mb-3">
          <div>
            <h1 class="text-xl font-extrabold text-slate-900 tracking-tight">¿Qué necesitas alquilar?</h1>
            <p class="text-xs text-slate-500">Muebles, electrodomésticos y equipo en Honduras</p>
          </div>
          
          <!-- Botón Mis Alquileres -->
          <button 
            @click="store.showMyRentalsModal = true" 
            class="relative bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 text-xs font-bold px-3 py-1.5 rounded-xl flex items-center space-x-1.5 transition">
            <span>📦</span>
            <span>Mis Alquileres</span>
            <span v-if="store.myRentalsCount > 0" class="w-5 h-5 bg-emerald-600 text-white rounded-full text-[10px] flex items-center justify-center font-bold">
              {{ store.myRentalsCount }}
            </span>
          </button>
        </div>

        <!-- Barra de Búsqueda y Selector de Ciudad -->
        <div class="flex flex-col sm:flex-row gap-2">
          <div class="relative flex-1">
            <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">🔍</span>
            <input 
              v-model="store.searchQuery" 
              type="text" 
              placeholder="Buscar sofás, refrigeradoras, sillas tiffany..." 
              class="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition">
          </div>

          <!-- Selector de Ciudad -->
          <select 
            v-model="store.selectedCity" 
            class="text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-medium text-slate-700 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500">
            <option value="Todas">📍 Todas las Ciudades</option>
            <option value="San Pedro Sula">San Pedro Sula (SPS)</option>
            <option value="Tegucigalpa">Tegucigalpa (TGU)</option>
          </select>
        </div>

        <!-- Pills de Categorías -->
        <div class="flex items-center space-x-2 overflow-x-auto pt-3 pb-1 no-scrollbar text-xs">
          <button 
            v-for="cat in store.categories" 
            :key="cat.name"
            @click="store.selectedCategory = cat.name"
            :class="store.selectedCategory === cat.name ? 'bg-slate-900 text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'"
            class="px-3 py-1.5 rounded-full font-semibold whitespace-nowrap transition flex items-center space-x-1">
            <span>{{ cat.icon }}</span>
            <span>{{ cat.name }}</span>
          </button>
        </div>
      </div>

      <!-- Banner Informativo de Logística Gestionada -->
      <div class="p-4">
        <div class="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 rounded-2xl p-4 text-white shadow-md relative overflow-hidden">
          <div class="relative z-10 max-w-sm">
            <span class="bg-white/20 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full backdrop-blur-xs">Logística Gestionada</span>
            <h2 class="text-base font-extrabold mt-1">Nosotros recogemos y te lo llevamos a la puerta</h2>
            <p class="text-xs text-emerald-100 mt-1">Con garantía reembolsable y transporte coordinado por MobiRent.</p>
          </div>
          <div class="absolute -right-4 -bottom-6 text-7xl opacity-20 pointer-events-none">🚚</div>
        </div>
      </div>

      <!-- Catálogo de Artículos -->
      <div class="px-4 pb-12">
        <div class="flex items-center justify-between mb-3">
          <h2 class="text-sm font-bold text-slate-800">
            Artículos disponibles ({{ store.filteredItems.length }})
          </h2>
          <span class="text-xs text-slate-400">Precios en Lempiras (HNL)</span>
        </div>

        <!-- Grid de Productos -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div 
            v-for="item in store.filteredItems" 
            :key="item.id"
            class="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-md transition overflow-hidden flex flex-col group">
            
            <!-- Imagen y Etiquetas -->
            <div class="relative h-44 bg-slate-100 overflow-hidden cursor-pointer" @click="store.openItemDetail(item)">
              <img 
                :src="item.image" 
                :alt="item.title"
                class="w-full h-full object-cover group-hover:scale-105 transition duration-300">
              <div class="absolute top-2.5 left-2.5 flex flex-col gap-1">
                <span class="bg-white/90 backdrop-blur-md text-slate-800 text-[10px] font-bold px-2 py-0.5 rounded-md shadow-xs">
                  {{ item.category }}
                </span>
                <span class="bg-emerald-600/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow-xs">
                  {{ item.condition }}
                </span>
              </div>
              <div class="absolute top-2.5 right-2.5 bg-black/60 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full flex items-center space-x-1">
                <span>📍</span>
                <span>{{ item.city }}</span>
              </div>
            </div>

            <!-- Información del Artículo -->
            <div class="p-3.5 flex-1 flex flex-col justify-between">
              <div>
                <div class="flex items-center justify-between mb-1">
                  <span class="text-[11px] text-slate-400">Dueño: {{ item.ownerName }}</span>
                  <span class="text-xs font-bold text-amber-500 flex items-center">
                    ★ {{ item.rating }} <span class="text-[10px] text-slate-400 font-normal ml-0.5">({{ item.reviewsCount }})</span>
                  </span>
                </div>
                <h3 
                  @click="store.openItemDetail(item)"
                  class="font-bold text-slate-900 text-sm hover:text-emerald-600 transition cursor-pointer line-clamp-1">
                  {{ item.title }}
                </h3>
                <p class="text-xs text-slate-500 mt-1 line-clamp-2">{{ item.description }}</p>
              </div>

              <!-- Precios y Botón Alquilar -->
              <div class="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span class="text-[10px] text-slate-400 uppercase font-semibold block">Desde</span>
                  <div class="flex items-baseline space-x-1">
                    <span class="text-base font-extrabold text-slate-900">L. {{ item.priceDay }}</span>
                    <span class="text-[10px] text-slate-500">/día</span>
                  </div>
                </div>

                <button 
                  @click="store.openItemDetail(item)"
                  class="bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white px-3.5 py-1.5 rounded-xl text-xs font-bold shadow-xs transition flex items-center space-x-1">
                  <span>Alquilar</span>
                  <span>→</span>
                </button>
              </div>

            </div>

          </div>
        </div>

        <!-- Estado vacío si no hay resultados -->
        <div v-if="store.filteredItems.length === 0" class="text-center py-12">
          <span class="text-4xl block mb-2">🔍</span>
          <p class="text-sm font-semibold text-slate-700">No encontramos artículos para esa búsqueda</p>
          <p class="text-xs text-slate-400 mt-1">Prueba cambiando la ciudad o la categoría seleccionada.</p>
        </div>

      </div>

    </div>
  `,
  setup() {
    return { store: window.MobiRentStore };
  }
};

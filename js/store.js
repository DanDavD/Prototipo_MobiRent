/**
 * ==============================================================
 * MobiRent Honduras - Gestor de Estado Central (js/store.js)
 * ==============================================================
 * Centraliza el estado reactivo, la lógica de negocio y las
 * operaciones de la aplicación (Patrón Store de Vue 3).
 */

const { reactive, computed } = Vue;

const rawData = window.MobiRentData;

const store = reactive({
  // Estado de navegación y presentación
  activeRole: 'renter', // 'renter' (comprador), 'owner' (vendedor/dueño), 'admin' (administrador)
  isMobileView: false,
  toastMessage: '',

  // Filtros del catálogo
  searchQuery: '',
  selectedCity: 'Todas',
  selectedCategory: 'Todos',

  // Datos reactivos de catálogo y pedidos
  categories: rawData.categories,
  publishCategories: rawData.publishCategories,
  imagePresets: rawData.imagePresets,
  items: [...rawData.initialItems],
  rentals: [...rawData.initialRentals],

  // Control de modales
  selectedItem: null,
  showCheckoutModal: false,
  showMyRentalsModal: false,
  showPublishModal: false,

  // Pestañas activas por rol
  ownerTab: 'items',
  adminTab: 'logistics',

  // Calculadora de alquiler
  bookingDurationType: 'dia', // 'dia', 'semana', 'mes'
  bookingQuantity: 2,
  defaultTransportFee: 250,
  defaultServiceFee: 150,

  // Formulario de checkout
  checkoutForm: {
    address: 'Colonia Los Castaños, 4ta calle, casa #12',
    phone: '+504 9988-7766',
    paymentMethod: 'card'
  },

  // Formulario de publicación (Dueño)
  newItem: {
    title: '',
    category: 'Mobiliario Hogar',
    city: 'San Pedro Sula',
    condition: 'Como nuevo',
    deposit: 600,
    priceDay: 90,
    priceWeek: 400,
    priceMonth: 1200,
    image: rawData.imagePresets[0].url,
    description: 'Mueble en excelente condición listo para entrega con MobiRent.'
  },

  // ==============================================================
  // PROPIEDADES COMPUTADAS Y CÁLCULOS
  // ==============================================================

  get filteredItems() {
    return this.items.filter(item => {
      const matchesCategory = this.selectedCategory === 'Todos' || item.category === this.selectedCategory;
      const matchesCity = this.selectedCity === 'Todas' || item.city === this.selectedCity;
      const matchesSearch = item.title.toLowerCase().includes(this.searchQuery.toLowerCase()) || 
                            item.description.toLowerCase().includes(this.searchQuery.toLowerCase());
      return matchesCategory && matchesCity && matchesSearch;
    });
  },

  get ownerArticles() {
    // Para la demostración se toma a Gabriela Flores como usuaria activa
    return this.items.filter(item => item.ownerName === 'Gabriela Flores');
  },

  get ownerRentals() {
    return this.rentals.filter(r => r.ownerName === 'Gabriela Flores');
  },

  get ownerStats() {
    const totalEarnings = this.ownerRentals.reduce((sum, r) => sum + r.ownerPayout, 0);
    const activeRentals = this.ownerRentals.filter(r => r.status !== 'DEVUELTA').length;
    return { totalEarnings, activeRentals };
  },

  get adminMetrics() {
    const totalRevenue = this.rentals.reduce((sum, r) => sum + r.serviceFee + (r.transportFee * 0.3), 0);
    const escrowDeposits = this.rentals.reduce((sum, r) => sum + r.deposit, 0);
    return {
      totalRevenue: Math.round(totalRevenue),
      escrowDeposits
    };
  },

  get pendingDeliveriesCount() {
    return this.rentals.filter(r => ['ASIGNADA', 'EN RECOGIDA', 'EN TRÁNSITO'].includes(r.status)).length;
  },

  get pendingRequestsCount() {
    return this.rentals.filter(r => r.status === 'PENDIENTE_APROBACION').length;
  },

  get myRentalsCount() {
    return this.rentals.length;
  },

  get bookingDurationTypeLabel() {
    if (this.bookingDurationType === 'dia') return this.bookingQuantity === 1 ? 'Día' : 'Días';
    if (this.bookingDurationType === 'semana') return this.bookingQuantity === 1 ? 'Semana' : 'Semanas';
    return this.bookingQuantity === 1 ? 'Mes' : 'Meses';
  },

  get calculateRentalSubtotal() {
    if (!this.selectedItem) return 0;
    let unitPrice = this.selectedItem.priceDay;
    if (this.bookingDurationType === 'semana') unitPrice = this.selectedItem.priceWeek;
    if (this.bookingDurationType === 'mes') unitPrice = this.selectedItem.priceMonth;
    return unitPrice * this.bookingQuantity;
  },

  get calculateRentalTotal() {
    if (!this.selectedItem) return 0;
    return this.calculateRentalSubtotal + this.defaultTransportFee + this.defaultServiceFee + this.selectedItem.deposit;
  },

  // ==============================================================
  // ACCIONES / MÉTODOS DEL NEGOCIO
  // ==============================================================

  showToast(msg) {
    this.toastMessage = msg;
    setTimeout(() => {
      this.toastMessage = '';
    }, 3200);
  },

  toggleDeviceMode() {
    this.isMobileView = !this.isMobileView;
  },

  openItemDetail(item) {
    this.selectedItem = item;
    this.bookingQuantity = 2;
    this.bookingDurationType = 'dia';
  },

  startCheckout() {
    this.showCheckoutModal = true;
  },

  decreaseQuantity() {
    if (this.bookingQuantity > 1) {
      this.bookingQuantity--;
    }
  },

  increaseQuantity() {
    this.bookingQuantity++;
  },

  confirmBooking() {
    const newRental = {
      id: Math.floor(100 + Math.random() * 900),
      itemId: this.selectedItem.id,
      itemTitle: this.selectedItem.title,
      renterName: 'Daniel Hernández (Tú)',
      renterPhone: this.checkoutForm.phone,
      ownerName: this.selectedItem.ownerName,
      duration: `${this.bookingQuantity} ${this.bookingDurationTypeLabel}`,
      durationType: this.bookingDurationTypeLabel,
      rentalFee: this.calculateRentalSubtotal,
      transportFee: this.defaultTransportFee,
      serviceFee: this.defaultServiceFee,
      deposit: this.selectedItem.deposit,
      totalPaid: this.calculateRentalTotal,
      ownerPayout: this.calculateRentalSubtotal,
      status: 'EN RECOGIDA',
      pickupAddress: 'Col. Moderna, San Pedro Sula',
      deliveryAddress: this.checkoutForm.address
    };

    this.rentals.unshift(newRental);
    this.showCheckoutModal = false;
    this.selectedItem = null;
    this.showToast('¡Alquiler confirmado con éxito! MobiRent ya programó la recogida.');
    this.showMyRentalsModal = true;
  },

  publishItem() {
    if (!this.newItem.title.trim()) {
      alert('Por favor ingresa un título para tu artículo');
      return;
    }

    const createdItem = {
      id: Date.now(),
      title: this.newItem.title,
      category: this.newItem.category,
      condition: this.newItem.condition,
      city: this.newItem.city,
      priceDay: Number(this.newItem.priceDay) || 100,
      priceWeek: Number(this.newItem.priceWeek) || 450,
      priceMonth: Number(this.newItem.priceMonth) || 1300,
      deposit: Number(this.newItem.deposit) || 500,
      ownerName: 'Gabriela Flores',
      rating: 5.0,
      reviewsCount: 1,
      image: this.newItem.image,
      description: this.newItem.description,
      status: 'activo'
    };

    this.items.unshift(createdItem);
    this.showPublishModal = false;
    this.showToast('¡Artículo publicado en MobiRent! Ya aparece en el catálogo.');

    // Limpiar campo título
    this.newItem.title = '';
  },

  toggleItemStatus(item) {
    item.status = item.status === 'activo' ? 'pausado' : 'activo';
    this.showToast(`Artículo ${item.status === 'activo' ? 'activado' : 'pausado'}`);
  },

  deleteItem(itemId) {
    if (confirm('¿Seguro que deseas eliminar este artículo de MobiRent?')) {
      this.items = this.items.filter(i => i.id !== itemId);
      this.showToast('Artículo eliminado del catálogo');
    }
  },

  setRentalStatus(rentalId, newStatus) {
    const rental = this.rentals.find(r => r.id === rentalId);
    if (rental) {
      rental.status = newStatus;
      this.showToast(`Estado del pedido #${rentalId} actualizado a: ${newStatus}`);
    }
  },

  approveRentalByOwner(rentalId) {
    this.setRentalStatus(rentalId, 'ASIGNADA');
  },

  rejectRentalByOwner(rentalId) {
    this.rentals = this.rentals.filter(r => r.id !== rentalId);
    this.showToast('Solicitud rechazada');
  },

  requestPayout() {
    this.showToast('¡Solicitud de retiro enviada! Se depositará en tu cuenta BAC.');
  },

  getRentalBadgeClass(status) {
    switch(status) {
      case 'PENDIENTE': return 'bg-amber-100 text-amber-800';
      case 'ASIGNADA': return 'bg-indigo-100 text-indigo-800';
      case 'EN RECOGIDA': return 'bg-sky-100 text-sky-800';
      case 'EN TRÁNSITO': return 'bg-blue-100 text-blue-800 animate-pulse';
      case 'ENTREGADA': return 'bg-emerald-100 text-emerald-800';
      case 'DEVUELTA': return 'bg-purple-100 text-purple-800';
      default: return 'bg-slate-100 text-slate-800';
    }
  },

  getAdminBadgeClass(status) {
    switch(status) {
      case 'PENDIENTE': return 'bg-amber-900/60 text-amber-300 border border-amber-700';
      case 'ASIGNADA': return 'bg-indigo-900/60 text-indigo-300 border border-indigo-700';
      case 'EN RECOGIDA': return 'bg-sky-900/60 text-sky-300 border border-sky-700';
      case 'EN TRÁNSITO': return 'bg-blue-900/60 text-blue-300 border border-blue-700';
      case 'ENTREGADA': return 'bg-emerald-900/60 text-emerald-300 border border-emerald-700';
      case 'DEVUELTA': return 'bg-purple-900/60 text-purple-300 border border-purple-700';
      default: return 'bg-slate-800 text-slate-300';
    }
  },

  resetData() {
    if (confirm('¿Restablecer los datos de ejemplo del prototipo?')) {
      location.reload();
    }
  }
});

window.MobiRentStore = store;

/**
 * ==============================================================
 * MobiRent - Gestor de Estado Central (js/store.js)
 * ==============================================================
 * Manejo reactivo de estado global, filtrado de inventario,
 * cotizador transparente y transiciones operativas.
 */

const { reactive } = Vue;

const rawData = window.MobiRentData;

const store = reactive({
  // Navegación de roles y visualización
  activeRole: 'renter', // 'renter', 'owner', 'admin'
  showFullAdmin: false, // Controla si se muestra el panel completo de admin o la vista sutil de avance
  toastMessage: '',

  // Parámetros de búsqueda y filtros
  searchQuery: '',
  selectedCity: 'Todas',
  selectedCategory: 'Todos los artículos',

  // Datos reactivos
  categories: rawData.categories,
  publishCategories: rawData.publishCategories,
  imagePresets: rawData.imagePresets,
  items: [...rawData.initialItems],
  rentals: [...rawData.initialRentals],

  // Control de ventanas modulares
  selectedItem: null,
  showCheckoutModal: false,
  showMyRentalsModal: false,
  showPublishModal: false,

  // Pestañas secundarias
  ownerTab: 'items',
  adminTab: 'logistics',

  // Configuración de cotización
  bookingDurationType: 'dia', // 'dia', 'semana', 'mes'
  bookingQuantity: 2,
  defaultTransportFee: 250,
  defaultServiceFee: 150,

  // Datos de entrega y pago
  checkoutForm: {
    address: 'Colonia Los Castaños, 4ta calle, casa 12',
    phone: '+504 9988-7766',
    paymentMethod: 'card'
  },

  // Formulario para nuevo artículo
  newItem: {
    title: '',
    category: 'Mobiliario de hogar',
    city: 'San Pedro Sula',
    condition: 'Como nuevo',
    deposit: 600,
    priceDay: 90,
    priceWeek: 400,
    priceMonth: 1200,
    image: rawData.imagePresets[0].url,
    description: 'Artículo en óptimo estado de conservación, verificado y listo para entrega mediante el servicio logístico de MobiRent.'
  },

  // ==============================================================
  // PROPIEDADES CALCULADAS
  // ==============================================================

  get filteredItems() {
    return this.items.filter(item => {
      const matchesCategory = this.selectedCategory === 'Todos los artículos' || item.category === this.selectedCategory;
      const matchesCity = this.selectedCity === 'Todas' || item.city === this.selectedCity;
      const query = this.searchQuery.toLowerCase().trim();
      const matchesSearch = !query || 
                            item.title.toLowerCase().includes(query) || 
                            item.description.toLowerCase().includes(query) ||
                            (item.neighborhood && item.neighborhood.toLowerCase().includes(query));
      return matchesCategory && matchesCity && matchesSearch;
    });
  },

  get ownerArticles() {
    return this.items.filter(item => item.ownerName === 'Gabriela Flores');
  },

  get ownerRentals() {
    return this.rentals.filter(r => r.ownerName === 'Gabriela Flores');
  },

  get ownerStats() {
    const totalEarnings = this.ownerRentals.reduce((sum, r) => sum + r.ownerPayout, 0);
    const activeRentals = this.ownerRentals.filter(r => r.status !== 'Devuelto').length;
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
    return this.rentals.filter(r => ['Asignado', 'En recogida', 'En tránsito'].includes(r.status)).length;
  },

  get pendingRequestsCount() {
    return this.rentals.filter(r => r.status === 'Pendiente de aprobación').length;
  },

  get myRentalsCount() {
    return this.rentals.length;
  },

  get bookingDurationTypeLabel() {
    if (this.bookingDurationType === 'dia') return this.bookingQuantity === 1 ? 'día' : 'días';
    if (this.bookingDurationType === 'semana') return this.bookingQuantity === 1 ? 'semana' : 'semanas';
    return this.bookingQuantity === 1 ? 'mes' : 'meses';
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
  // ACCIONES Y MÉTODOS OPERATIVOS
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
      renterName: 'Daniel Hernández',
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
      status: 'En recogida',
      pickupAddress: 'Colonia Trejo, San Pedro Sula',
      deliveryAddress: this.checkoutForm.address
    };

    this.rentals.unshift(newRental);
    this.showCheckoutModal = false;
    this.selectedItem = null;
    this.showToast('Reserva confirmada. La recogida ha sido programada con el transportista.');
    this.showMyRentalsModal = true;
  },

  publishItem() {
    if (!this.newItem.title.trim()) {
      alert('Por favor ingrese un título descriptivo para el artículo.');
      return;
    }

    const createdItem = {
      id: Date.now(),
      title: this.newItem.title.trim(),
      category: this.newItem.category,
      condition: this.newItem.condition,
      city: this.newItem.city,
      neighborhood: this.newItem.city === 'San Pedro Sula' ? 'Colonia Moderna' : 'Lomas del Guijarro',
      priceDay: Number(this.newItem.priceDay) || 100,
      priceWeek: Number(this.newItem.priceWeek) || 450,
      priceMonth: Number(this.newItem.priceMonth) || 1300,
      deposit: Number(this.newItem.deposit) || 500,
      ownerName: 'Gabriela Flores',
      rating: 5.0,
      reviewsCount: 1,
      image: this.newItem.image,
      description: this.newItem.description.trim(),
      status: 'activo'
    };

    this.items.unshift(createdItem);
    this.showPublishModal = false;
    this.showToast('Artículo publicado exitosamente en el catálogo de MobiRent.');
    this.newItem.title = '';
  },

  toggleItemStatus(item) {
    item.status = item.status === 'activo' ? 'pausado' : 'activo';
    this.showToast(`El artículo ahora está ${item.status}.`);
  },

  deleteItem(itemId) {
    if (confirm('¿Desea retirar esta publicación del catálogo?')) {
      this.items = this.items.filter(i => i.id !== itemId);
      this.showToast('Publicación retirada.');
    }
  },

  setRentalStatus(rentalId, newStatus) {
    const rental = this.rentals.find(r => r.id === rentalId);
    if (rental) {
      rental.status = newStatus;
      this.showToast(`Estado de la orden #${rentalId} actualizado a ${newStatus}.`);
    }
  },

  approveRentalByOwner(rentalId) {
    this.setRentalStatus(rentalId, 'Asignado');
  },

  rejectRentalByOwner(rentalId) {
    this.rentals = this.rentals.filter(r => r.id !== rentalId);
    this.showToast('Solicitud declinada.');
  },

  requestPayout() {
    this.showToast('Solicitud de liquidación procesada para depósito bancario.');
  },

  getRentalBadgeClass(status) {
    switch(status) {
      case 'Pendiente de aprobación': return 'bg-neutral-100 text-neutral-700 border border-neutral-200';
      case 'Asignado': return 'bg-neutral-100 text-charcoal border border-neutral-300';
      case 'En recogida': return 'bg-forest-light text-forest border border-forest-border';
      case 'En tránsito': return 'bg-forest text-white';
      case 'Entregado': return 'bg-neutral-900 text-white';
      case 'Devuelto': return 'bg-neutral-100 text-neutral-600 border border-neutral-200';
      default: return 'bg-neutral-100 text-neutral-700';
    }
  },

  getAdminBadgeClass(status) {
    switch(status) {
      case 'Pendiente de aprobación': return 'bg-neutral-100 text-neutral-700 border border-neutral-300';
      case 'Asignado': return 'bg-neutral-100 text-charcoal border border-neutral-300';
      case 'En recogida': return 'bg-forest-light text-forest border border-forest-border';
      case 'En tránsito': return 'bg-forest text-white';
      case 'Entregado': return 'bg-neutral-900 text-white';
      case 'Devuelto': return 'bg-neutral-100 text-neutral-600 border border-neutral-200';
      default: return 'bg-neutral-100 text-neutral-700';
    }
  },

  resetData() {
    if (confirm('¿Restablecer los datos de demostración del sistema?')) {
      location.reload();
    }
  }
});

window.MobiRentStore = store;

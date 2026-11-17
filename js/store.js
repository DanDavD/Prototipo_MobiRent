// File: js/store.js
/**
 * ==============================================================
 * MobiRent - Gestor de Estado Central (js/store.js)
 * ==============================================================
 * Manejo reactivo de estado global con datos aislados por cuenta:
 * - Cada alquiler pertenece a un cliente (renterEmail) y a un anfitrión (ownerEmail).
 * - Cada artículo pertenece a un anfitrión (ownerEmail).
 * - Todo se guarda en localStorage (sin servidor ni base de datos).
 * - Reglas de negocio: disponibilidad, cuotas, estados logísticos y liquidaciones.
 */

const { reactive } = Vue;

const rawData = window.MobiRentData;

// ==============================================================
// CONSTANTES Y UTILIDADES
// ==============================================================

const SCHEMA_VERSION = '3';
const KEYS = {
  schema: 'mobirent_schema',
  rentals: 'mobirent_rentals',
  items: 'mobirent_items',
  users: 'mobirent_users',
  payouts: 'mobirent_payouts',
  prefs: 'mobirent_prefs',
  session: 'mobirent_auth_user'
};

const STATUS_FLOW = ['Asignado', 'En tránsito', 'Entregado', 'Devuelto'];

// Cuentas de demostración
const DEMO_USERS = [
  { email: 'cliente@gmail.com', password: 'contra123', name: 'Carlos Mendoza', role: 'client', phone: '+504 9988-7766', city: 'Tegucigalpa', address: 'Colonia Los Castaños, 4ta calle, casa 12' },
  { email: 'anfitrion@gmail.com', password: 'contra123', name: 'Gabriela Flores', role: 'client', phone: '+504 9455-2210', city: 'San Pedro Sula', address: 'Colonia Moderna, 12 Calle, casa 5' },
  { email: 'admin@gmail.com', password: 'contra123', name: 'Administración MobiRent', role: 'admin', phone: '', city: '', address: '' }
];

// Anfitriones del catálogo inicial -> correo propietario
const SEED_OWNER_EMAILS = {
  'Gabriela Flores': 'anfitrion@gmail.com',
  'Carlos Midence': 'carlos.midence@mobirent.hn',
  'Mario Pineda': 'mario.pineda@mobirent.hn',
  'Andrés Martínez': 'andres.martinez@mobirent.hn'
};

// Clientes de las órdenes de ejemplo -> correo
const SEED_RENTER_EMAILS = {
  101: 'cliente@gmail.com',
  102: 'eventos.gala@mobirent.hn',
  103: 'sofia.barahona@mobirent.hn'
};

function readStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  return fallback;
}

function writeStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {}
}

function addDaysISO(days) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString();
}

function formatDate(iso) {
  if (!iso) return '';
  try {
    return new Date(iso).toLocaleDateString('es-HN', { day: 'numeric', month: 'short', year: 'numeric' });
  } catch (e) {
    return '';
  }
}

function unitDays(type) {
  if (type === 'semana') return 7;
  if (type === 'mes') return 30;
  return 1;
}

function buildInstallments(total, plan, payFirst) {
  const base = Math.floor(total / plan);
  const list = [];
  const gap = plan === 2 ? 15 : 30;
  for (let n = 1; n <= plan; n++) {
    const amount = n === plan ? total - base * (plan - 1) : base;
    list.push({
      n,
      amount,
      dueDate: addDaysISO((n - 1) * gap),
      status: n === 1 && payFirst ? 'Pagada' : 'Pendiente'
    });
  }
  return list;
}

// Migración de esquema: descarta datos antiguos incompatibles (órdenes sin dueño)
(function ensureSchema() {
  try {
    if (localStorage.getItem(KEYS.schema) !== SCHEMA_VERSION) {
      [KEYS.rentals, KEYS.items, KEYS.users, KEYS.payouts, KEYS.prefs, KEYS.session].forEach(k => localStorage.removeItem(k));
      localStorage.setItem(KEYS.schema, SCHEMA_VERSION);
    }
  } catch (e) {}
})();

function seedItems() {
  return rawData.initialItems.map(item => ({
    ...item,
    ownerEmail: SEED_OWNER_EMAILS[item.ownerName] || 'anfitrion@gmail.com'
  }));
}

function seedRentals() {
  return rawData.initialRentals.map(r => ({
    ...r,
    renterEmail: SEED_RENTER_EMAILS[r.id] || 'cliente@gmail.com',
    ownerEmail: SEED_OWNER_EMAILS[r.ownerName] || 'anfitrion@gmail.com',
    paymentMethod: 'card',
    paymentPlan: 1,
    installmentAmount: r.totalPaid,
    installments: buildInstallments(r.totalPaid, 1, true),
    startDate: addDaysISO(-3),
    endDate: addDaysISO(4)
  }));
}

function seedPayouts() {
  return [
    { id: 1, ownerEmail: 'anfitrion@gmail.com', concept: 'Sala seccional gris (1 mes)', ref: 'BAC-98214', amount: 1800, historic: true },
    { id: 2, ownerEmail: 'anfitrion@gmail.com', concept: 'Sillas Tiffany (Evento fin de semana)', ref: 'BAC-96301', amount: 1650, historic: true }
  ];
}

const store = reactive({
  // Autenticación de usuarios
  currentUser: null,
  loginForm: {
    email: '',
    password: '',
    error: '',
    showPassword: false
  },

  // Navegación de roles y visualización
  activeRole: 'renter', // 'renter', 'owner', 'admin'
  showFullAdmin: false,
  toastMessage: '',

  // Parámetros de búsqueda y filtros
  searchQuery: '',
  selectedCity: 'Todas',
  selectedCategory: 'Todos los artículos',

  // Datos reactivos (persistentes)
  categories: rawData.categories,
  publishCategories: rawData.publishCategories,
  imagePresets: rawData.imagePresets,
  items: readStorage(KEYS.items, null) || seedItems(),
  rentals: readStorage(KEYS.rentals, null) || seedRentals(),
  payouts: readStorage(KEYS.payouts, null) || seedPayouts(),
  registeredUsers: readStorage(KEYS.users, []),

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

  // Datos de entrega y pago (se cargan por cuenta al iniciar sesión)
  checkoutForm: {
    address: '',
    phone: '',
    paymentMethod: 'card',
    paymentPlan: '1' // '1': Contado, '2': 2 cuotas quincenales, '3': 3 cuotas mensuales
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
  // HELPERS DE INVENTARIO Y DISPONIBILIDAD
  // ==============================================================

  formatDate(iso) {
    return formatDate(iso);
  },

  isItemRented(itemId) {
    return this.rentals.some(r => r.itemId === itemId && r.status !== 'Devuelto');
  },

  isOwnItem(item) {
    return !!(this.currentUser && item && item.ownerEmail === this.currentUser.email);
  },

  get userEmail() {
    return this.currentUser ? this.currentUser.email : '';
  },

  get filteredItems() {
    return this.items.filter(item => {
      // Reglas de negocio del catálogo público
      if (item.status !== 'activo') return false;           // pausados no se muestran
      if (this.isItemRented(item.id)) return false;         // alquilados no se muestran
      if (this.isOwnItem(item)) return false;               // no se alquila lo propio

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

  // ==============================================================
  // DATOS POR CUENTA (CLIENTE)
  // ==============================================================

  get myRentals() {
    return this.rentals.filter(r => r.renterEmail === this.userEmail);
  },

  get myRentalsCount() {
    return this.myRentals.filter(r => r.status !== 'Devuelto').length;
  },

  rentalPaid(rental) {
    if (!rental || !rental.installments) return 0;
    return rental.installments.filter(i => i.status === 'Pagada').reduce((s, i) => s + i.amount, 0);
  },

  rentalPending(rental) {
    return (rental ? rental.totalPaid : 0) - this.rentalPaid(rental);
  },

  nextInstallment(rental) {
    if (!rental || !rental.installments) return null;
    return rental.installments.find(i => i.status === 'Pendiente') || null;
  },

  // ==============================================================
  // DATOS POR CUENTA (ANFITRIÓN)
  // ==============================================================

  get ownerArticles() {
    return this.items.filter(item => item.ownerEmail === this.userEmail);
  },

  get ownerRentals() {
    return this.rentals.filter(r => r.ownerEmail === this.userEmail);
  },

  get ownerPayouts() {
    return this.payouts.filter(p => p.ownerEmail === this.userEmail);
  },

  get ownerStats() {
    const rentals = this.ownerRentals;
    const released = rentals
      .filter(r => r.status === 'Entregado' || r.status === 'Devuelto')
      .reduce((sum, r) => sum + r.ownerPayout, 0);
    const pending = rentals
      .filter(r => r.status === 'Asignado' || r.status === 'En tránsito')
      .reduce((sum, r) => sum + r.ownerPayout, 0);
    const withdrawn = this.ownerPayouts
      .filter(p => !p.historic)
      .reduce((sum, p) => sum + p.amount, 0);
    const activeRentals = rentals.filter(r => r.status !== 'Devuelto').length;
    return {
      totalEarnings: Math.max(0, released - withdrawn), // saldo disponible para retiro
      pendingEarnings: pending,                          // se libera al entregar
      activeRentals
    };
  },

  // ==============================================================
  // MÉTRICAS DE ADMINISTRACIÓN
  // ==============================================================

  get adminMetrics() {
    const totalRevenue = this.rentals.reduce((sum, r) => sum + r.serviceFee + (r.transportFee * 0.3), 0);
    const escrowDeposits = this.rentals
      .filter(r => r.status !== 'Devuelto')
      .reduce((sum, r) => sum + r.deposit, 0);
    return {
      totalRevenue: Math.round(totalRevenue),
      escrowDeposits
    };
  },

  get pendingDeliveriesCount() {
    return this.rentals.filter(r => ['Asignado', 'En recogida', 'En tránsito'].includes(r.status)).length;
  },

  get pendingRequestsCount() {
    return this.ownerRentals.filter(r => r.status !== 'Devuelto').length;
  },

  // ==============================================================
  // COTIZADOR
  // ==============================================================

  get installmentAmount() {
    const plan = Number(this.checkoutForm.paymentPlan) || 1;
    return buildInstallments(this.calculateRentalTotal, plan, true)[0].amount;
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
  // PERSISTENCIA
  // ==============================================================

  persistRentals() { writeStorage(KEYS.rentals, this.rentals); },
  persistItems() { writeStorage(KEYS.items, this.items); },
  persistPayouts() { writeStorage(KEYS.payouts, this.payouts); },
  persistUsers() { writeStorage(KEYS.users, this.registeredUsers); },

  loadPrefs(email) {
    const all = readStorage(KEYS.prefs, {});
    return all[email] || null;
  },

  savePrefs(email, prefs) {
    const all = readStorage(KEYS.prefs, {});
    all[email] = prefs;
    writeStorage(KEYS.prefs, all);
  },

  nextId(list) {
    return list.reduce((max, x) => Math.max(max, Number(x.id) || 0), 100) + 1;
  },

  // ==============================================================
  // ACCIONES Y MÉTODOS OPERATIVOS
  // ==============================================================

  showToast(message) {
    this.toastMessage = message;
    setTimeout(() => {
      if (this.toastMessage === message) {
        this.toastMessage = '';
      }
    }, 3500);
  },

  openItemDetail(item) {
    this.selectedItem = item;
    this.bookingQuantity = 2;
    this.bookingDurationType = 'dia';
    this.checkoutForm.paymentPlan = '1';
  },

  closeItemDetail() {
    this.selectedItem = null;
  },

  openCheckout(item) {
    this.selectedItem = item;
    this.showCheckoutModal = true;
  },

  startCheckout() {
    if (!this.selectedItem) return;
    if (this.isOwnItem(this.selectedItem)) {
      this.showToast('No puedes alquilar un artículo que tú publicaste.');
      return;
    }
    if (this.isItemRented(this.selectedItem.id)) {
      this.showToast('Este artículo acaba de ser alquilado por otra persona.');
      this.selectedItem = null;
      return;
    }
    this.showCheckoutModal = true;
  },

  closeCheckout() {
    this.showCheckoutModal = false;
  },

  increaseQuantity() {
    this.bookingQuantity++;
  },

  decreaseQuantity() {
    if (this.bookingQuantity > 1) {
      this.bookingQuantity--;
    }
  },

  confirmBooking() {
    this.confirmCheckout();
  },

  confirmCheckout() {
    if (!this.selectedItem || !this.currentUser) return;
    const item = this.items.find(i => i.id === this.selectedItem.id) || this.selectedItem;

    // Validaciones de negocio
    if (this.isOwnItem(item)) {
      this.showToast('No puedes alquilar un artículo que tú publicaste.');
      return;
    }
    if (item.status !== 'activo' || this.isItemRented(item.id)) {
      this.showToast('Este artículo ya no está disponible.');
      this.closeCheckout();
      this.closeItemDetail();
      return;
    }
    const address = (this.checkoutForm.address || '').trim();
    const phone = (this.checkoutForm.phone || '').trim();
    if (!address || !phone) {
      this.showToast('Ingresa tu dirección de entrega y tu teléfono para continuar.');
      return;
    }

    const plan = Number(this.checkoutForm.paymentPlan) || 1;
    const total = this.calculateRentalTotal;
    const installments = buildInstallments(total, plan, true);
    const days = unitDays(this.bookingDurationType) * this.bookingQuantity;

    const newRental = {
      id: this.nextId(this.rentals),
      itemId: item.id,
      itemTitle: item.title,
      renterName: this.currentUser.name,
      renterEmail: this.currentUser.email,
      renterPhone: phone,
      ownerName: item.ownerName,
      ownerEmail: item.ownerEmail,
      duration: `${this.bookingQuantity} ${this.bookingDurationTypeLabel}`,
      durationType: this.bookingDurationType,
      rentalFee: this.calculateRentalSubtotal,
      transportFee: this.defaultTransportFee,
      serviceFee: this.defaultServiceFee,
      deposit: item.deposit,
      totalPaid: total,
      ownerPayout: this.calculateRentalSubtotal,
      status: 'Asignado',
      pickupAddress: `${item.neighborhood}, ${item.city}`,
      deliveryAddress: `${address}, ${item.city}`,
      paymentMethod: this.checkoutForm.paymentMethod,
      paymentPlan: plan,
      installmentAmount: installments[0].amount,
      installments,
      startDate: new Date().toISOString(),
      endDate: addDaysISO(days)
    };

    this.rentals.unshift(newRental);
    this.persistRentals();
    this.savePrefs(this.currentUser.email, { address, phone });
    this.closeCheckout();
    this.closeItemDetail();
    this.checkoutForm.paymentPlan = '1';
    this.showMyRentalsModal = true;
    this.showToast('¡Reserva confirmada con éxito! Artículo retirado del catálogo para entrega.');
  },

  payInstallment(rentalId, n) {
    const rental = this.rentals.find(r => r.id === rentalId);
    if (!rental || rental.renterEmail !== this.userEmail) return;
    const inst = rental.installments.find(i => i.n === n);
    if (!inst || inst.status === 'Pagada') return;
    // Las cuotas se pagan en orden
    const previousPending = rental.installments.some(i => i.n < n && i.status === 'Pendiente');
    if (previousPending) {
      this.showToast('Debes pagar primero la cuota anterior.');
      return;
    }
    inst.status = 'Pagada';
    this.persistRentals();
    this.showToast(`Cuota ${n} de ${rental.installments.length} pagada: L ${inst.amount}.`);
  },

  publishItem() {
    if (!this.currentUser) return;
    if (!this.newItem.title.trim()) {
      this.showToast('Ingresa un título descriptivo para el artículo.');
      return;
    }
    const priceDay = Number(this.newItem.priceDay);
    const priceWeek = Number(this.newItem.priceWeek);
    const priceMonth = Number(this.newItem.priceMonth);
    const deposit = Number(this.newItem.deposit);
    if (!(priceDay > 0) || !(priceWeek > 0) || !(priceMonth > 0)) {
      this.showToast('Las tarifas por día, semana y mes deben ser mayores a cero.');
      return;
    }
    if (!(deposit >= 0)) {
      this.showToast('La garantía no puede ser negativa.');
      return;
    }

    const createdItem = {
      id: this.nextId(this.items),
      title: this.newItem.title.trim(),
      category: this.newItem.category,
      condition: this.newItem.condition,
      city: this.newItem.city,
      neighborhood: this.newItem.city === 'San Pedro Sula' ? 'Colonia Moderna' : 'Lomas del Guijarro',
      priceDay,
      priceWeek,
      priceMonth,
      deposit,
      ownerName: this.currentUser.name,
      ownerEmail: this.currentUser.email,
      rating: 5.0,
      reviewsCount: 1,
      image: this.newItem.image,
      description: this.newItem.description.trim(),
      status: 'activo'
    };

    this.items.unshift(createdItem);
    this.persistItems();
    this.showPublishModal = false;
    this.ownerTab = 'items';
    this.showToast('Artículo publicado. Ya aparece en el catálogo para otros usuarios.');
    this.newItem.title = '';
  },

  toggleItemStatus(item) {
    if (this.isItemRented(item.id)) {
      this.showToast('No puedes pausar un artículo mientras está alquilado.');
      return;
    }
    item.status = item.status === 'activo' ? 'pausado' : 'activo';
    this.persistItems();
    this.showToast(item.status === 'activo' ? 'Artículo activo: visible en el catálogo.' : 'Artículo pausado: oculto del catálogo.');
  },

  deleteItem(itemId) {
    if (this.isItemRented(itemId)) {
      this.showToast('No se puede retirar: el artículo tiene un alquiler en curso.');
      return;
    }
    if (confirm('¿Desea retirar esta publicación del catálogo?')) {
      this.items = this.items.filter(i => i.id !== itemId);
      this.persistItems();
      this.showToast('Publicación retirada.');
    }
  },

  // ==============================================================
  // FLUJO LOGÍSTICO (solo avanza hacia adelante)
  // ==============================================================

  getStageIndex(status) {
    const map = {
      'Asignado': 0,
      'En recogida': 0,
      'Pendiente de aprobación': 0,
      'En tránsito': 1,
      'Entregado': 2,
      'Devuelto': 3
    };
    return map[status] !== undefined ? map[status] : 0;
  },

  setRentalStatus(rentalId, newStatus) {
    if (!this.currentUser || this.currentUser.role !== 'admin') return;
    const rental = this.rentals.find(r => r.id === rentalId);
    if (!rental) return;
    if (this.getStageIndex(newStatus) < this.getStageIndex(rental.status)) {
      this.showToast('El estado de una orden no puede retroceder.');
      return;
    }
    rental.status = newStatus;
    this.persistRentals();
    this.showToast(`Orden #${rentalId}: Estado cambiado a "${newStatus}".`);
  },

  advanceRentalStatus(rentalId) {
    const rental = this.rentals.find(r => r.id === rentalId);
    if (!rental) return;
    const currentIndex = this.getStageIndex(rental.status);
    if (currentIndex < 3) {
      this.setRentalStatus(rentalId, STATUS_FLOW[currentIndex + 1]);
    }
  },

  getNextActionTitle(status) {
    switch(status) {
      case 'Asignado':
      case 'En recogida':
      case 'Pendiente de aprobación':
        return 'Poner en ruta de entrega →';
      case 'En tránsito':
        return 'Confirmar entrega al cliente ✓';
      case 'Entregado':
        return 'Registrar devolución y retorno →';
      case 'Devuelto':
        return 'Servicio finalizado';
      default:
        return 'Avanzar estado';
    }
  },

  requestPayout() {
    const available = this.ownerStats.totalEarnings;
    if (available <= 0) {
      this.showToast('Aún no tienes saldo disponible. Se libera al entregarse el artículo.');
      return;
    }
    this.payouts.unshift({
      id: this.nextId(this.payouts),
      ownerEmail: this.userEmail,
      concept: 'Liquidación de alquileres entregados',
      ref: `BAC-${Math.floor(10000 + Math.random() * 89999)}`,
      amount: available,
      date: new Date().toISOString()
    });
    this.persistPayouts();
    this.showToast(`Transferencia de L ${available} enviada a tu cuenta bancaria.`);
  },

  getRentalBadgeClass(status) {
    switch(status) {
      case 'Asignado': return 'bg-surface-subtle text-charcoal border border-surface-border';
      case 'En tránsito': return 'bg-amber-50 text-amber-800 border border-amber-200';
      case 'Entregado': return 'bg-forest text-white';
      case 'Devuelto': return 'bg-neutral-100 text-charcoal-muted border border-surface-border';
      default: return 'bg-surface-subtle text-charcoal';
    }
  },

  getAdminBadgeClass(status) {
    return this.getRentalBadgeClass(status);
  },

  resetData() {
    if (confirm('¿Restablecer los datos de demostración del sistema?')) {
      Object.values(KEYS).forEach(k => {
        try { localStorage.removeItem(k); } catch (e) {}
      });
      location.reload();
    }
  },

  // ==============================================================
  // AUTENTICACIÓN Y PERFIL (aislado por cuenta)
  // ==============================================================

  findUser(email) {
    const clean = (email || '').trim().toLowerCase();
    return DEMO_USERS.find(u => u.email === clean) || this.registeredUsers.find(u => u.email === clean) || null;
  },

  startSession(user) {
    // Limpia todo el estado visual de la cuenta anterior
    this.selectedItem = null;
    this.showCheckoutModal = false;
    this.showMyRentalsModal = false;
    this.showPublishModal = false;
    this.searchQuery = '';
    this.selectedCity = 'Todas';
    this.selectedCategory = 'Todos los artículos';
    this.ownerTab = 'items';
    this.adminTab = 'logistics';

    this.currentUser = {
      email: user.email,
      name: user.name,
      phone: user.phone || '',
      city: user.city || '',
      role: user.role
    };
    this.activeRole = user.role === 'admin' ? 'admin' : 'renter';
    this.showFullAdmin = user.role === 'admin';
    this.loginForm.error = '';

    // Preferencias de entrega propias de la cuenta
    const prefs = this.loadPrefs(user.email);
    this.checkoutForm.address = prefs ? prefs.address : (user.address || '');
    this.checkoutForm.phone = prefs ? prefs.phone : (user.phone || '');
    this.checkoutForm.paymentMethod = 'card';
    this.checkoutForm.paymentPlan = '1';

    writeStorage(KEYS.session, this.currentUser);
  },

  register(formData) {
    const name = (formData.name || '').trim();
    const email = (formData.email || '').trim().toLowerCase();
    const phone = (formData.phone || '').trim();
    const city = formData.city || 'San Pedro Sula';
    const password = (formData.password || '').trim();

    if (!name || !email || !password) {
      this.loginForm.error = 'Por favor complete su nombre, correo y contraseña.';
      return false;
    }
    if (password.length < 6) {
      this.loginForm.error = 'La contraseña debe tener al menos 6 caracteres.';
      return false;
    }
    if (this.findUser(email)) {
      this.loginForm.error = 'Este correo electrónico ya tiene una cuenta registrada.';
      return false;
    }

    const newUser = { name, email, phone, city, password, role: 'client', address: '' };
    this.registeredUsers.push(newUser);
    this.persistUsers();

    this.startSession(newUser);
    this.showToast(`¡Cuenta creada! Bienvenido a MobiRent, ${newUser.name}.`);
    return true;
  },

  login(email, password) {
    const user = this.findUser(email);
    const cleanPassword = (password || '').trim();

    if (user && user.password === cleanPassword) {
      this.startSession(user);
      this.showToast(user.role === 'admin'
        ? 'Acceso concedido al Centro de Operaciones.'
        : `Bienvenido, ${user.name.split(' ')[0]}. Sesión iniciada.`);
      return true;
    }

    this.loginForm.error = 'Correo electrónico o contraseña incorrectos.';
    return false;
  },

  logout() {
    this.currentUser = null;
    this.activeRole = 'renter';
    this.showFullAdmin = false;
    this.selectedItem = null;
    this.showCheckoutModal = false;
    this.showMyRentalsModal = false;
    this.showPublishModal = false;
    this.searchQuery = '';
    this.selectedCity = 'Todas';
    this.selectedCategory = 'Todos los artículos';
    this.checkoutForm.address = '';
    this.checkoutForm.phone = '';
    this.checkoutForm.paymentPlan = '1';
    this.loginForm.email = '';
    this.loginForm.password = '';
    this.loginForm.error = '';
    try {
      localStorage.removeItem(KEYS.session);
    } catch (e) {}
    this.showToast('Sesión cerrada.');
  }
});

// Restauración de sesión persistente (solo si la cuenta existe)
try {
  const saved = readStorage(KEYS.session, null);
  if (saved && saved.email) {
    const user = store.findUser(saved.email);
    if (user) store.startSession(user);
  }
} catch (e) {}

// Expose store globally
window.MobiRentStore = store;
window.store = store;

// Sincronización en tiempo real entre pestañas del mismo navegador
if (typeof window !== 'undefined' && window.addEventListener) {
  window.addEventListener('storage', (e) => {
    if (!e.newValue) return;
    const targets = {
      [KEYS.rentals]: 'rentals',
      [KEYS.items]: 'items',
      [KEYS.payouts]: 'payouts',
      [KEYS.users]: 'registeredUsers'
    };
    const prop = targets[e.key];
    if (!prop) return;
    try {
      const updated = JSON.parse(e.newValue);
      if (Array.isArray(updated)) store[prop] = updated;
    } catch (err) {}
  });
}

// File: js/store.js
const { reactive } = Vue;

const rawData = window.MobiRentData;

const store = reactive({
  // User authentication state
  currentUser: null, // null | { email: 'cliente@gmail.com', name: 'Carlos Mendoza', role: 'client' } | { email: 'admin@gmail.com', name: 'Administrador MobiRent', role: 'admin' }
  loginForm: {
    email: '',
    password: '',
    error: ''
  },

  // UI state for role navigation and display
  activeRole: 'renter', // 'renter', 'owner', 'admin'
  showFullAdmin: false,
  toastMessage: '',

  // Search and filter parameters
  searchQuery: '',
  selectedCity: 'Todas',
  selectedCategory: 'Todos los artículos',

  // Inventory and item management
  inventory: rawData.inventory,
  selectedItem: null, // Item currently selected for viewing/details
  itemDetailsModalOpen: false,

  // Rental process state
  rentalQuote: {
    startDate: null,
    endDate: null,
    totalDays: 0,
    dailyRate: 0,
    subtotal: 0,
    deposit: 0,
    total: 0,
    item: null
  },
  rentalConfirmationModalOpen: false,
  paymentProcessing: false,
  paymentSuccess: false,

  // Admin specific state
  adminPanel: {
    activeTab: 'dashboard', // 'dashboard', 'inventory', 'users', 'rentals'
    editingItem: null,
    editingUser: null,
    editingRental: null,
    itemForm: {
      id: null,
      name: '',
      description: '',
      category: '',
      city: '',
      dailyRate: 0,
      deposit: 0,
      imageUrl: '',
      availability: true
    },
    userForm: {
      id: null,
      name: '',
      email: '',
      role: 'client'
    },
    rentalForm: {
      id: null,
      itemId: null,
      renterId: null,
      ownerId: null,
      startDate: '',
      endDate: '',
      status: 'pending'
    }
  },

  // Modals control
  modals: {
    itemDetails: {
      isOpen: false,
      item: null
    },
    rentalConfirmation: {
      isOpen: false,
      quote: null
    },
    adminItemEdit: {
      isOpen: false,
      item: null
    },
    adminUserEdit: {
      isOpen: false,
      user: null
    },
    adminRentalEdit: {
      isOpen: false,
      rental: null
    }
  }
});

// --- Getters (Computed Properties) ---
Object.defineProperty(store, 'filteredInventory', {
  get() {
    let filtered = store.inventory;

    if (store.searchQuery) {
      const query = store.searchQuery.toLowerCase();
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.city.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query)
      );
    }

    if (store.selectedCity !== 'Todas') {
      filtered = filtered.filter(item => item.city === store.selectedCity);
    }

    if (store.selectedCategory !== 'Todos los artículos') {
      filtered = filtered.filter(item => item.category === store.selectedCategory);
    }

    return filtered;
  }
});

Object.defineProperty(store, 'availableCities', {
  get() {
    const cities = new Set(store.inventory.map(item => item.city));
    return ['Todas', ...Array.from(cities).sort()];
  }
});

Object.defineProperty(store, 'availableCategories', {
  get() {
    const categories = new Set(store.inventory.map(item => item.category));
    return ['Todos los artículos', ...Array.from(categories).sort()];
  }
});

Object.defineProperty(store, 'isAuthenticated', {
  get() {
    return store.currentUser !== null;
  }
});

Object.defineProperty(store, 'isAdmin', {
  get() {
    return store.currentUser && store.currentUser.role === 'admin';
  }
});

Object.defineProperty(store, 'isOwner', {
  get() {
    return store.currentUser && store.currentUser.role === 'owner';
  }
});

Object.defineProperty(store, 'isRenter', {
  get() {
    return store.currentUser && store.currentUser.role === 'client';
  }
});

// --- Actions (Methods) ---
store.login = (email, password) => {
  store.loginForm.error = ''; // Clear previous errors

  // Simulate API call
  setTimeout(() => {
    if (email === 'cliente@gmail.com' && password === 'contra123') {
      store.currentUser = { email: 'cliente@gmail.com', name: 'Carlos Mendoza', role: 'client' };
      store.activeRole = 'renter';
      store.toastMessage = '¡Bienvenido, Carlos Mendoza!';
    } else if (email === 'admin@gmail.com' && password === 'contra123') {
      store.currentUser = { email: 'admin@gmail.com', name: 'Administrador MobiRent', role: 'admin' };
      store.activeRole = 'admin';
      store.toastMessage = '¡Bienvenido, Administrador!';
    } else if (email === 'propietario@gmail.com' && password === 'contra123') {
      store.currentUser = { email: 'propietario@gmail.com', name: 'Ana García', role: 'owner' };
      store.activeRole = 'owner';
      store.toastMessage = '¡Bienvenido, Ana García!';
    } else {
      store.loginForm.error = 'Credenciales incorrectas. Intente de nuevo.';
      store.toastMessage = 'Error de inicio de sesión.';
    }
    // Clear toast message after a delay
    setTimeout(() => store.toastMessage = '', 3000);
  }, 500);
};

store.logout = () => {
  store.currentUser = null;
  store.activeRole = 'renter'; // Default to renter view after logout
  store.loginForm.email = '';
  store.loginForm.password = '';
  store.loginForm.error = '';
  store.toastMessage = 'Sesión cerrada exitosamente.';
  setTimeout(() => store.toastMessage = '', 3000);
};

store.setActiveRole = (role) => {
  if (store.currentUser && (role === 'renter' || store.currentUser.role === role)) {
    store.activeRole = role;
  } else if (!store.currentUser && role === 'renter') {
    store.activeRole = role; // Allow unauthenticated users to view renter page
  }
};

store.showItemDetails = (item) => {
  store.modals.itemDetails.item = item;
  store.modals.itemDetails.isOpen = true;
};

store.hideItemDetails = () => {
  store.modals.itemDetails.isOpen = false;
  store.modals.itemDetails.item = null;
};

store.calculateRentalQuote = (item, startDate, endDate) => {
  if (!item || !startDate || !endDate) {
    store.rentalQuote = {
      startDate: null, endDate: null, totalDays: 0, dailyRate: 0, subtotal: 0, deposit: 0, total: 0, item: null
    };
    return;
  }

  const start = new Date(startDate);
  const end = new Date(endDate);
  const timeDiff = end.getTime() - start.getTime();
  const totalDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

  if (totalDays <= 0) {
    store.rentalQuote = {
      startDate: null, endDate: null, totalDays: 0, dailyRate: 0, subtotal: 0, deposit: 0, total: 0, item: null
    };
    return;
  }

  const dailyRate = item.dailyRate;
  const subtotal = dailyRate * totalDays;
  const deposit = item.deposit;
  const total = subtotal + deposit;

  store.rentalQuote = {
    startDate,
    endDate,
    totalDays,
    dailyRate,
    subtotal,
    deposit,
    total,
    item
  };
};

store.confirmRental = () => {
  if (!store.rentalQuote.item || !store.currentUser) {
    store.toastMessage = 'Error: No hay una cotización o usuario para confirmar.';
    setTimeout(() => store.toastMessage = '', 3000);
    return;
  }

  store.modals.rentalConfirmation.quote = store.rentalQuote;
  store.modals.rentalConfirmation.isOpen = true;
};

store.processPayment = () => {
  store.paymentProcessing = true;
  store.toastMessage = 'Procesando pago...';

  setTimeout(() => {
    // Simulate payment success/failure
    const success = Math.random() > 0.1; // 90% success rate

    if (success) {
      store.paymentSuccess = true;
      store.toastMessage = '¡Pago exitoso! Su alquiler ha sido confirmado.';
      // Here you would typically add the rental to a list of active rentals
      // and update item availability.
    } else {
      store.paymentSuccess = false;
      store.toastMessage = 'Error en el pago. Por favor, intente de nuevo.';
    }

    store.paymentProcessing = false;
    setTimeout(() => {
      store.toastMessage = '';
      store.modals.rentalConfirmation.isOpen = false;
      store.paymentSuccess = false; // Reset for next transaction
      store.rentalQuote = { // Clear quote after transaction
        startDate: null, endDate: null, totalDays: 0, dailyRate: 0, subtotal: 0, deposit: 0, total: 0, item: null
      };
    }, 3000);

  }, 2000);
};

// Admin Actions
store.openAdminItemEdit = (item = null) => {
  store.adminPanel.editingItem = item;
  if (item) {
    Object.assign(store.adminPanel.itemForm, item);
  } else {
    // Reset form for new item
    store.adminPanel.itemForm = {
      id: null, name: '', description: '', category: '', city: '', dailyRate: 0, deposit: 0, imageUrl: '', availability: true
    };
  }
  store.modals.adminItemEdit.isOpen = true;
};

store.closeAdminItemEdit = () => {
  store.modals.adminItemEdit.isOpen = false;
  store.adminPanel.editingItem = null;
  // Clear form
  store.adminPanel.itemForm = {
    id: null, name: '', description: '', category: '', city: '', dailyRate: 0, deposit: 0, imageUrl: '', availability: true
  };
};

store.saveAdminItem = () => {
  const form = store.adminPanel.itemForm;
  if (form.id) {
    // Update existing item
    const index = store.inventory.findIndex(item => item.id === form.id);
    if (index !== -1) {
      store.inventory[index] = { ...store.inventory[index], ...form };
      store.toastMessage = 'Artículo actualizado exitosamente.';
    }
  } else {
    // Add new item
    form.id = store.inventory.length > 0 ? Math.max(...store.inventory.map(i => i.id)) + 1 : 1;
    store.inventory.push({ ...form });
    store.toastMessage = 'Artículo añadido exitosamente.';
  }
  store.closeAdminItemEdit();
  setTimeout(() => store.toastMessage = '', 3000);
};

store.deleteAdminItem = (itemId) => {
  if (confirm('¿Está seguro de que desea eliminar este artículo?')) {
    store.inventory = store.inventory.filter(item => item.id !== itemId);
    store.toastMessage = 'Artículo eliminado exitosamente.';
    setTimeout(() => store.toastMessage = '', 3000);
  }
};

// Expose the store globally
window.MobiRentStore = store;

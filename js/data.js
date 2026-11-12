/**
 * ==============================================================
 * MobiRent Honduras - Datos Iniciales y Mocks (js/data.js)
 * ==============================================================
 * Contiene el catálogo inicial de muebles, electrodomésticos,
 * categorías, ciudades y alquileres de prueba para San Pedro Sula
 * y Tegucigalpa.
 */

window.MobiRentData = {
  // Ciudades activas en Honduras
  cities: [
    'San Pedro Sula',
    'Tegucigalpa'
  ],

  // Categorías con íconos para navegación
  categories: [
    { name: 'Todos', icon: '✨' },
    { name: 'Mobiliario Hogar', icon: '🛋️' },
    { name: 'Electrodomésticos', icon: '🧊' },
    { name: 'Eventos y Fiestas', icon: '🎉' },
    { name: 'Oficina y Escritorios', icon: '💼' },
    { name: 'Catering y Gourmet', icon: '🍽️' },
  ],

  // Categorías permitidas al publicar
  publishCategories: [
    'Mobiliario Hogar',
    'Electrodomésticos',
    'Eventos y Fiestas',
    'Oficina y Escritorios',
    'Catering y Gourmet'
  ],

  // Presets de fotos de alta resolución para publicación rápida
  imagePresets: [
    { name: 'Sofá Gris', url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80' },
    { name: 'Refrigeradora', url: 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=800&q=80' },
    { name: 'Sillas Evento', url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80' },
    { name: 'Comedor Caoba', url: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=800&q=80' },
    { name: 'Escritorio', url: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=80' },
    { name: 'Chafing Dishes', url: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80' }
  ],

  // Catálogo inicial precargado
  initialItems: [
    {
      id: 1,
      title: 'Sofá Seccional Moderno Gris Oxford',
      category: 'Mobiliario Hogar',
      condition: 'Como nuevo',
      city: 'San Pedro Sula',
      priceDay: 150,
      priceWeek: 650,
      priceMonth: 1800,
      deposit: 1000,
      ownerName: 'Gabriela Flores',
      rating: 4.9,
      reviewsCount: 14,
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80',
      description: 'Sofá de 3 piezas tapizado en tela lavable premium. Ideal para apartamentos en alquiler temporal o visitas familiares.',
      status: 'activo'
    },
    {
      id: 2,
      title: 'Refrigeradora Smart Inverter 16 Pies',
      category: 'Electrodomésticos',
      condition: 'Excelente',
      city: 'Tegucigalpa',
      priceDay: 130,
      priceWeek: 550,
      priceMonth: 1600,
      deposit: 1500,
      ownerName: 'Carlos Midence',
      rating: 5.0,
      reviewsCount: 8,
      image: 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=800&q=80',
      description: 'Ahorro de energía A+++, dispensador de agua purificada y congelador frost-free. Muy espaciosa y silenciosa.',
      status: 'activo'
    },
    {
      id: 3,
      title: 'Set de 50 Sillas Tiffany Doradas para Eventos',
      category: 'Eventos y Fiestas',
      condition: 'Excelente',
      city: 'San Pedro Sula',
      priceDay: 750,
      priceWeek: 2600,
      priceMonth: 5500,
      deposit: 2000,
      ownerName: 'Gabriela Flores',
      rating: 4.8,
      reviewsCount: 22,
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
      description: 'Mobiliario elegante para bodas, aniversarios y recepciones corporativas. Incluye cojines blancos de vinil acolchado.',
      status: 'activo'
    },
    {
      id: 4,
      title: 'Juego de Comedor Minimalista 6 Puestos',
      category: 'Mobiliario Hogar',
      condition: 'Como nuevo',
      city: 'San Pedro Sula',
      priceDay: 110,
      priceWeek: 480,
      priceMonth: 1400,
      deposit: 900,
      ownerName: 'Gabriela Flores',
      rating: 4.7,
      reviewsCount: 9,
      image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=800&q=80',
      description: 'Mesa de madera de cedro con acabado mate y sillas ergonómicas tapizadas. Ideal para profesionales en traslados de trabajo.',
      status: 'activo'
    },
    {
      id: 5,
      title: 'Estación de Chafing Dishes (Buffet Catering)',
      category: 'Catering y Gourmet',
      condition: 'Excelente',
      city: 'Tegucigalpa',
      priceDay: 280,
      priceWeek: 850,
      priceMonth: 2100,
      deposit: 700,
      ownerName: 'Mario Pineda',
      rating: 4.9,
      reviewsCount: 16,
      image: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80',
      description: '4 calentadores de comida de acero inoxidable de 8 cuartos con bandejas dobles y tapas roll-top para eventos gourmet.',
      status: 'activo'
    },
    {
      id: 6,
      title: 'Escritorio Ergonómico + Silla Ejecutiva de Malla',
      category: 'Oficina y Escritorios',
      condition: 'Buen estado',
      city: 'San Pedro Sula',
      priceDay: 80,
      priceWeek: 350,
      priceMonth: 950,
      deposit: 500,
      ownerName: 'Andrés Martínez',
      rating: 4.6,
      reviewsCount: 5,
      image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=80',
      description: 'Kit para Home Office completo. Escritorio de 1.40m con pasacables y silla ergonómica con soporte lumbar regulable.',
      status: 'activo'
    }
  ],

  // Pedidos y Alquileres de prueba
  initialRentals: [
    {
      id: 101,
      itemId: 1,
      itemTitle: 'Sofá Seccional Moderno Gris Oxford',
      renterName: 'Daniel Hernández',
      renterPhone: '+504 9845-1234',
      ownerName: 'Gabriela Flores',
      duration: '1 Mes',
      durationType: 'Mes',
      rentalFee: 1800,
      transportFee: 250,
      serviceFee: 150,
      deposit: 1000,
      totalPaid: 3200,
      ownerPayout: 1800,
      status: 'EN TRÁNSITO',
      pickupAddress: 'Col. Trejo, 21 Calle, San Pedro Sula',
      deliveryAddress: 'Condominios Panorama II, Apto 502, SPS'
    },
    {
      id: 102,
      itemId: 3,
      itemTitle: 'Set de 50 Sillas Tiffany Doradas',
      renterName: 'Eventos Gala HN',
      renterPhone: '+504 9566-7788',
      ownerName: 'Gabriela Flores',
      duration: '3 Días',
      durationType: 'Día',
      rentalFee: 2250,
      transportFee: 350,
      serviceFee: 250,
      deposit: 2000,
      totalPaid: 4850,
      ownerPayout: 2250,
      status: 'ENTREGADA',
      pickupAddress: 'Col. Moderna, San Pedro Sula',
      deliveryAddress: 'Club Hondureño Árabe, Salón Jordán, SPS'
    }
  ]
};

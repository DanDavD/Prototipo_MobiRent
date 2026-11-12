/**
 * ==============================================================
 * MobiRent - Catálogo y Datos de Referencia (js/data.js)
 * ==============================================================
 * Catálogo inicial, ubicaciones y parámetros base con estética
 * sobria y lenguaje profesional sin emojis.
 */

window.MobiRentData = {
  // Ciudades de operación
  cities: [
    'San Pedro Sula',
    'Tegucigalpa'
  ],

  // Categorías de catálogo
  categories: [
    { id: 'todos', name: 'Todos los artículos' },
    { id: 'hogar', name: 'Mobiliario de hogar' },
    { id: 'electro', name: 'Electrodomésticos' },
    { id: 'eventos', name: 'Eventos y reuniones' },
    { id: 'oficina', name: 'Espacios de trabajo' },
    { id: 'gourmet', name: 'Menaje y gastronomía' },
  ],

  // Categorías para formulario de publicación
  publishCategories: [
    'Mobiliario de hogar',
    'Electrodomésticos',
    'Eventos y reuniones',
    'Espacios de trabajo',
    'Menaje y gastronomía'
  ],

  // Presets de fotografía de alta resolución
  imagePresets: [
    { name: 'Sala seccional', url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80' },
    { name: 'Refrigeración', url: 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=1200&q=80' },
    { name: 'Sillas de evento', url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80' },
    { name: 'Comedor madera', url: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1200&q=80' },
    { name: 'Escritorio ejecutivo', url: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80' },
    { name: 'Calentadores buffet', url: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1200&q=80' }
  ],

  // Inventario disponible
  initialItems: [
    {
      id: 1,
      title: 'Sofá seccional tres plazas en lino gris',
      category: 'Mobiliario de hogar',
      condition: 'Excelente estado',
      city: 'San Pedro Sula',
      neighborhood: 'Colonia Trejo',
      priceDay: 150,
      priceWeek: 650,
      priceMonth: 1800,
      deposit: 1000,
      ownerName: 'Gabriela Flores',
      rating: 4.94,
      reviewsCount: 14,
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80',
      description: 'Estructura sólida de madera tratada con tapicería en lino de alta densidad. Desmontable en dos módulos para traslados sencillos.',
      status: 'activo'
    },
    {
      id: 2,
      title: 'Refrigeradora Inverter 16 pies cúbicos',
      category: 'Electrodomésticos',
      condition: 'Como nuevo',
      city: 'Tegucigalpa',
      neighborhood: 'Lomas del Guijarro',
      priceDay: 130,
      priceWeek: 550,
      priceMonth: 1600,
      deposit: 1500,
      ownerName: 'Carlos Midence',
      rating: 5.0,
      reviewsCount: 8,
      image: 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=1200&q=80',
      description: 'Compresor de eficiencia energética A+++, dispensador exterior de agua y bandejas de cristal templado ajustables.',
      status: 'activo'
    },
    {
      id: 3,
      title: 'Juego de 50 sillas Tiffany acabado oro mate',
      category: 'Eventos y reuniones',
      condition: 'Excelente estado',
      city: 'San Pedro Sula',
      neighborhood: 'Colonia Moderna',
      priceDay: 750,
      priceWeek: 2600,
      priceMonth: 5500,
      deposit: 2000,
      ownerName: 'Gabriela Flores',
      rating: 4.88,
      reviewsCount: 22,
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
      description: 'Lote de 50 piezas apilables con estructura monocasco reforzada. Incluye cojines individuales en ecocuero blanco.',
      status: 'activo'
    },
    {
      id: 4,
      title: 'Comedor rectangular de roble con 6 puestos',
      category: 'Mobiliario de hogar',
      condition: 'Excelente estado',
      city: 'San Pedro Sula',
      neighborhood: 'Jardines del Valle',
      priceDay: 110,
      priceWeek: 480,
      priceMonth: 1400,
      deposit: 900,
      ownerName: 'Gabriela Flores',
      rating: 4.75,
      reviewsCount: 9,
      image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1200&q=80',
      description: 'Mesa de 1.80m de longitud con acabado mate natural. Sillas anatómicas tapizadas en tejido repelente a líquidos.',
      status: 'activo'
    },
    {
      id: 5,
      title: 'Juego de 4 unidades chafing dish en acero inoxidable',
      category: 'Menaje y gastronomía',
      condition: 'Como nuevo',
      city: 'Tegucigalpa',
      neighborhood: 'Las Hadas',
      priceDay: 280,
      priceWeek: 850,
      priceMonth: 2100,
      deposit: 700,
      ownerName: 'Mario Pineda',
      rating: 4.95,
      reviewsCount: 16,
      image: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1200&q=80',
      description: 'Capacidad de 8 cuartos por unidad, tapas basculantes roll-top y compartimentos para combustible térmico.',
      status: 'activo'
    },
    {
      id: 6,
      title: 'Estación de trabajo ergonómica con silla de malla',
      category: 'Espacios de trabajo',
      condition: 'Buen estado',
      city: 'San Pedro Sula',
      neighborhood: 'Barrio Guamilito',
      priceDay: 80,
      priceWeek: 350,
      priceMonth: 950,
      deposit: 500,
      ownerName: 'Andrés Martínez',
      rating: 4.8,
      reviewsCount: 7,
      image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80',
      description: 'Superficie de 1.40 x 0.70m con pasacables integrado. Silla giratoria con apoyo lumbar y mecanismo sincro.',
      status: 'activo'
    }
  ],

  // Reservas activas de prueba
  initialRentals: [
    {
      id: 101,
      itemId: 1,
      itemTitle: 'Sofá seccional tres plazas en lino gris',
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
      status: 'En tránsito',
      pickupAddress: 'Colonia Trejo, 21 Calle, San Pedro Sula',
      deliveryAddress: 'Condominios Panorama II, Apto 502, San Pedro Sula'
    },
    {
      id: 102,
      itemId: 3,
      itemTitle: 'Juego de 50 sillas Tiffany acabado oro mate',
      renterName: 'Eventos Gala Honduras',
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
      status: 'Entregado',
      pickupAddress: 'Colonia Moderna, San Pedro Sula',
      deliveryAddress: 'Club Hondureño Árabe, Salón Jordán, San Pedro Sula'
    }
  ]
};

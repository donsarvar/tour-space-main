export interface LocalizedString {
  en: string;
  uz: string;
}

export interface Property {
  id: string;
  title: LocalizedString;
  price: number;
  location: LocalizedString;
  rooms: number;
  area: number;
  thumbnail: string;
  panoramaUrl: string;
  coordinates: { lat: number; lng: number };
  features: LocalizedString[];
  description?: LocalizedString;
}

export const properties: Property[] = [
  {
    id: "1",
    title: { en: "Modern 3-room Apartment", uz: "Zamonaviy 3 xonali kvartira" },
    price: 85000,
    location: { en: "Tashkent, Yunusobod District", uz: "Toshkent, Yunusobod tumani" },
    rooms: 3,
    area: 75,
    thumbnail: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
    panoramaUrl: "https://pannellum.org/images/alma.jpg",
    coordinates: { lat: 41.361081, lng: 69.280562 },
    features: [
      { en: "Wi-Fi", uz: "Wi-Fi" },
      { en: "Air Conditioning", uz: "Konditsioner" },
      { en: "Newly Renovated", uz: "Yangi ta'mirlangan" },
      { en: "Parking", uz: "Avtoturargoh" }
    ],
    description: {
      en: "A bright and spacious apartment in the heart of Yunusobod with modern finishes throughout.",
      uz: "Yunusobod markazida joylashgan, zamonaviy ta'mirlangan yorug' va shinam kvartira."
    },
  },
  {
    id: "2",
    title: { en: "Cozy 2-room Flat with Balcony", uz: "Balkonli shinam 2 xonali kvartira" },
    price: 62000,
    location: { en: "Tashkent, Mirzo Ulugbek District", uz: "Toshkent, Mirzo Ulug'bek tumani" },
    rooms: 2,
    area: 54,
    thumbnail: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800",
    panoramaUrl: "https://pannellum.org/images/cerro-toco-0.jpg",
    coordinates: { lat: 41.3275, lng: 69.3214 },
    features: [
      { en: "Balcony", uz: "Balkon" },
      { en: "Furnished", uz: "Mebelli" },
      { en: "Elevator", uz: "Lift" },
      { en: "Security", uz: "Qo'riqlash xizmati" }
    ],
    description: {
      en: "Comfortable 2-room apartment with an open balcony and lovely city views.",
      uz: "Ochiq balkon va shaharning go'zal manzarasi bilan qulay 2 xonali kvartira."
    },
  },
  {
    id: "3",
    title: { en: "Luxury 4-room Penthouse", uz: "Hashamatli 4 xonali penthaus" },
    price: 185000,
    location: { en: "Tashkent, Mirobod District", uz: "Toshkent, Mirobod tumani" },
    rooms: 4,
    area: 142,
    thumbnail: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
    panoramaUrl: "https://pannellum.org/images/bma-1.jpg",
    coordinates: { lat: 41.2995, lng: 69.2401 },
    features: [
      { en: "Rooftop Terrace", uz: "Tomdagi terrasa" },
      { en: "Smart Home", uz: "Aqlli uy" },
      { en: "Gym Access", uz: "Sport zali" },
      { en: "Concierge", uz: "Konsyerj" },
      { en: "Parking", uz: "Avtoturargoh" }
    ],
    description: {
      en: "Top-floor penthouse with panoramic views, smart home tech and premium finishes.",
      uz: "Panoramik manzarali, aqlli uy texnologiyalari va premium bezaklarga ega yuqori qavatdagi penthaus."
    },
  },
  {
    id: "4",
    title: { en: "Studio near Metro", uz: "Metro yaqinidagi studiya" },
    price: 38000,
    location: { en: "Tashkent, Chilonzor District", uz: "Toshkent, Chilonzor tumani" },
    rooms: 1,
    area: 32,
    thumbnail: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=800",
    panoramaUrl: "https://pannellum.org/images/jfk.jpg",
    coordinates: { lat: 41.2756, lng: 69.2034 },
    features: [
      { en: "Metro Access", uz: "Metro yaqinida" },
      { en: "Furnished", uz: "Mebelli" },
      { en: "Wi-Fi", uz: "Wi-Fi" }
    ],
    description: {
      en: "Compact studio steps from the metro — perfect for students or young professionals.",
      uz: "Metro stansiyasiga piyoda yetib borish mumkin bo'lgan ixcham studiya — talabalar yoki yosh mutaxassislar uchun mukammal."
    },
  },
  {
    id: "5",
    title: { en: "Family House with Garden", uz: "Bog'li oilaviy hovli" },
    price: 220000,
    location: { en: "Tashkent, Yashnobod District", uz: "Toshkent, Yashnobod tumani" },
    rooms: 5,
    area: 210,
    thumbnail: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800",
    panoramaUrl: "https://pannellum.org/images/from-tree.jpg",
    coordinates: { lat: 41.3168, lng: 69.3501 },
    features: [
      { en: "Garden", uz: "Bog'" },
      { en: "Garage", uz: "Garaj" },
      { en: "Fireplace", uz: "Kamin" },
      { en: "4 Bathrooms", uz: "4 ta yuvinish xonasi" }
    ],
    description: {
      en: "Spacious family home with a private garden, garage and quiet neighborhood.",
      uz: "Shaxsiy bog', garaj va tinch mahallaga ega shinam oilaviy uy."
    },
  },
  {
    id: "6",
    title: { en: "Renovated 3-room in Center", uz: "Markazdagi ta'mirlangan 3 xonali kvartira" },
    price: 110000,
    location: { en: "Tashkent, Shaykhontohur District", uz: "Toshkent, Shayxontohur tumani" },
    rooms: 3,
    area: 88,
    thumbnail: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800",
    panoramaUrl: "https://pannellum.org/images/tocopilla.jpg",
    coordinates: { lat: 41.3225, lng: 69.2401 },
    features: [
      { en: "Newly Renovated", uz: "Yangi ta'mirlangan" },
      { en: "Central Heating", uz: "Markaziy isitish tizimi" },
      { en: "Wi-Fi", uz: "Wi-Fi" },
      { en: "Parking", uz: "Avtoturargoh" }
    ],
    description: {
      en: "Fully renovated apartment in the historical center with premium materials.",
      uz: "Tarixiy markazda, yuqori sifatli materiallar bilan to'liq ta'mirlangan kvartira."
    },
  },
];

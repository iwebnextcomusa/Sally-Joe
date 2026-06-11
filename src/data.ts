import { MenuItem, Review, CateringPackage } from "./types";

export const MENU_ITEMS: MenuItem[] = [
  // --- SPECIALTY PIZZAS ---
  {
    id: "spec-1",
    name: "The Asbury Classic",
    description: "Our signature pie loaded with double pepperoni, house mozzarella, and rich Jersey tomato marinara over perfect thin crust.",
    price: 16.99,
    category: "specialty",
    popular: true,
    jerseyTradition: true
  },
  {
    id: "spec-2",
    name: "The Boardwalk Supreme",
    description: "Sweet Italian sausage, bell peppers, sweet caramelized onions, roasted cremini mushrooms, and shredded mozzarella.",
    price: 18.99,
    category: "specialty",
    popular: true
  },
  {
    id: "spec-3",
    name: "Jersey Fire",
    description: "Spicy capicola ham, Calabrian chili paste, hot honey drizzle, fresh house-made mozzarella, marinara, and fresh sweet basil.",
    price: 19.99,
    category: "specialty",
    spicy: true,
    popular: false
  },
  {
    id: "spec-4",
    name: "Garden State Margherita",
    description: "Vibrant local Jersey fresh tomatoes, hand-stretched fresh mozzarella balls, extra virgin olive oil, and fresh garden sweet basil.",
    price: 17.99,
    category: "specialty",
    vegetarian: true,
    jerseyTradition: true
  },
  {
    id: "spec-5",
    name: "White Shore Beach",
    description: "Garlic-herb infused whipped ricotta, standard mozzarella, wild Italian oregano, and extra virgin olive oil drizzle. No red sauce.",
    price: 17.99,
    category: "specialty",
    vegetarian: true
  },

  // --- CLASSIC PIZZAS ---
  {
    id: "clas-1",
    name: "Classic Cheese Pizza",
    description: "Traditional NY-style thin crust cooked to crispy golden perfection, loaded with premium mozzarella and signature marinara sauce.",
    price: 13.99,
    category: "classic"
  },
  {
    id: "clas-2",
    name: "Traditional Pepperoni",
    description: "Savory, crispy-browning pepperoni slices on our premium classic cheese pie.",
    price: 15.49,
    category: "classic"
  },
  {
    id: "clas-3",
    name: "Classic Veggie",
    description: "Mushrooms, onions, peppers, and black olives over our house-cooked pizza crust and standard cheese.",
    price: 16.49,
    category: "classic",
    vegetarian: true
  },
  {
    id: "clas-4",
    name: "Meat Hothead",
    description: "Sweet sausage, crispy pepperoni, capicola, and fresh meatballs over classic thin crust with extra sauce and cheese.",
    price: 18.49,
    category: "classic"
  },

  // --- APPETIZERS ---
  {
    id: "app-1",
    name: "Sally Joe's Garlic Knots",
    description: "Fresh dough baked golden, tossed in fresh garlic butter, parsley, and romano cheese. Served with a side of warm marinara.",
    price: 5.99,
    category: "appetizers",
    popular: true,
    vegetarian: true
  },
  {
    id: "app-2",
    name: "Crisis-Crisp Mozzarella Sticks",
    description: "Golden fried, extra long mozzarella pulled-cheese sticks with Italian herb crust and sweet marinara dip.",
    price: 6.99,
    category: "appetizers",
    vegetarian: true
  },
  {
    id: "app-3",
    name: "Oven Fire Wings",
    description: "Signature jumbo wings roasted in our high-heat oven, tossed in smoky hot-honey garlic, served with creamy blue cheese.",
    price: 9.99,
    category: "appetizers",
    spicy: true
  },

  // --- SALADS ---
  {
    id: "sal-1",
    name: "Asbury Caesar",
    description: "Crisp romaine lettuce, toasted garlic croutons, aged parmesan shavings, and house specialty Caesar cream dressing.",
    price: 8.99,
    category: "salads"
  },
  {
    id: "sal-2",
    name: "Boardwalk Caprese",
    description: "Jersey beefsteak tomatoes, fresh milk mozzarella disks, premium fresh basil leaves, drizzled with sweet balsamic reduction.",
    price: 9.99,
    category: "salads",
    vegetarian: true,
    jerseyTradition: true
  },

  // --- SANDWICHES ---
  {
    id: "sub-1",
    name: "Chicken Parmigiana Sub",
    description: "Crispy breaded chicken cutlet, rich house marinara, melted provolone and mozzarella cheeses on a fresh toasted Italian sub roll.",
    price: 11.99,
    category: "sandwiches",
    popular: true
  },
  {
    id: "sub-2",
    name: "Jersey Shore Cheesesteak",
    description: "Finely shaved ribeye steak, caramelized sweet onions, green peppers, and melted cheese on a dynamic toasted roll.",
    price: 12.99,
    category: "sandwiches"
  },

  // --- PASTA ---
  {
    id: "pas-1",
    name: "Grandma's Penne alla Vodka",
    description: "Penne pasta tossed in our creamy tomato-vodka sauce with crushed garlic, extra virgin olive oil, and shaved parmesan.",
    price: 13.99,
    category: "pasta",
    vegetarian: true,
    popular: true
  },
  {
    id: "pas-2",
    name: "Baked Ziti Al Forno",
    description: "Ziti pasta baked with standard mozzarella, creamy ricotta cheese, marinara, fresh garlic, and basil.",
    price: 12.99,
    category: "pasta",
    vegetarian: true
  },

  // --- DESSERTS ---
  {
    id: "des-1",
    name: "Boardwalk Cannoli (2 pcs)",
    description: "Crisp pastry shells overflowing with our sweet chocolate-chip and orange-zest flavored ricotta cannoli filling.",
    price: 4.99,
    category: "desserts"
  },
  {
    id: "des-2",
    name: "Fresh Hot Zeppoles (6 pcs)",
    description: "Fluffy fried dough puffs tossed live in powdered sugar, served crisp in a traditional paper bag.",
    price: 5.99,
    category: "desserts",
    popular: true,
    jerseyTradition: true
  },

  // --- BEVERAGES ---
  {
    id: "bev-1",
    name: "Fountain/Bottled Soda",
    description: "Choice of Coca-Cola, Diet Coke, Sprite, Root Beer, or Jersey Shore Birch Beer.",
    price: 2.50,
    category: "beverages"
  },
  {
    id: "bev-2",
    name: "Local NJ Craft Beer (Can/Draft)",
    description: "Rotating pale ales and lagers from Asbury Park Brewery and Kane Brewing. Over 21, dine-in or pickup only.",
    price: 6.00,
    category: "beverages"
  }
];

export const REVIEWS: Review[] = [
  {
    id: "rev-1",
    author: "Dominic T.",
    location: "Asbury Park, NJ",
    rating: 5,
    comment: "The Jersey Fire pie is an absolute legend. The spicy capicola and hot honey are incredible! Crust is crisp and chewy exactly how true NY pizza is meant to be. Our Friday night staple!",
    date: "2026-05-18"
  },
  {
    id: "rev-2",
    author: "Gianna M.",
    location: "Ocean Grove, NJ",
    rating: 5,
    comment: "Stumbled upon Sally Joe's on our way back from the Asbury boardwalk. Best decision ever. Fresh mozzarella, amazing tomato sauce, and garlic knots that are out of this world. Highly recommend!",
    date: "2026-06-02"
  },
  {
    id: "rev-3",
    author: "Marcus S.",
    location: "Belmar, NJ",
    rating: 5,
    comment: "Unmatched catering quality! We ordered 8 specialty pies and salads for a backstage VIP session at the Stone Pony, and everyone was blown away. Absolute pros.",
    date: "2026-04-12"
  }
];

export const CATERING_PACKAGES: CateringPackage[] = [
  {
    id: "cat-1",
    name: "Boardwalk Party Starter",
    description: "Perfect for casual gatherings, beach picnics, or game nights. Features a tasty select choice of classic and specialty keys.",
    pricePerPerson: 14.99,
    minimumGuests: 15,
    includes: [
      "Any 4 Large Classic or Specialty Pizzas",
      "Half Tray of Sally Joe's Garlic Knots with marinara",
      "Large Asbury House Caesar Salad",
      "Choice of 2-Liter Coca Cola soft beverages"
    ]
  },
  {
    id: "cat-2",
    name: "The Jersey Shore Feast",
    description: "Ideal for birthdays, corporate parties, and full-scale backstage concert celebrations. Features pizza, appetizers, and pasta.",
    pricePerPerson: 19.99,
    minimumGuests: 20,
    includes: [
      "Assorted Large Specialty Pizzas (1 pie per 4 guests)",
      "Full Tray of Garlic Knots & Mozzarella Sticks",
      "Full Tray of Grandma's Penne alla Vodka",
      "Large Caprese Salad Jersey Style with garlic bread",
      "Freshly baked Hot Zeppoles for dessert"
    ]
  },
  {
    id: "cat-3",
    name: "The Grand Master Event",
    description: "A premium package incorporating specialty double baking, personalized customized pizza builds, hot sandwiches, and full logistics.",
    pricePerPerson: 25.99,
    minimumGuests: 30,
    includes: [
      "Unlimited customizable pizza options (interactive topping requests)",
      "Jumbo fire-roasted Wings with hot honey garlic combo",
      "Chicken Parmigiana sub sliders (half sizes)",
      "Penne alla Vodka or Baked Ziti trays",
      "Fresh Boardwalk Cannolis & Zeppoles baskets",
      "Eco-elegant plates, napkins, and serving utensils"
    ]
  }
];

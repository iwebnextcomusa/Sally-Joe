export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: "specialty" | "classic" | "appetizers" | "salads" | "sandwiches" | "pasta" | "desserts" | "beverages";
  spicy?: boolean;
  vegetarian?: boolean;
  popular?: boolean;
  jerseyTradition?: boolean;
}

export interface CustomPizza {
  size: "personal" | "medium" | "large" | "jersey-giant";
  crust: "thin" | "thick" | "gluten-free";
  sauce: "marinara" | "white-garlic" | "spicy-vodka" | "pesto";
  cheese: "normal" | "extra" | "vegan" | "light";
  toppings: string[];
  basePrice: number;
  totalPrice: number;
}

export interface CartItem {
  id: string; // unique cart instance id
  menuItem?: MenuItem;
  customPizza?: CustomPizza;
  quantity: number;
  notes?: string;
  totalPrice: number;
}

export interface Review {
  id: string;
  author: string;
  location: string;
  rating: number;
  comment: string;
  date: string;
}

export interface CateringPackage {
  id: string;
  name: string;
  description: string;
  pricePerPerson: number;
  minimumGuests: number;
  includes: string[];
}

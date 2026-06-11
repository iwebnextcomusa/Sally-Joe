import { useState, useMemo } from "react";
import { MenuItem, CustomPizza } from "../types";
import { MENU_ITEMS } from "../data";
import { Pizza, Check, Sparkles, Plus, Info, MessageSquare } from "lucide-react";

interface OrderOnlineProps {
  onAddToOrder: (item: MenuItem | null, customPizza: CustomPizza | null, notes: string) => void;
}

export default function OrderOnline({ onAddToOrder }: OrderOnlineProps) {
  const [activeCategory, setActiveCategory] = useState<string>("specialty");
  const [notes, setNotes] = useState<{ [key: string]: string }>({});

  // Pizza customization state
  const [pizzaBuilder, setPizzaBuilder] = useState<{
    size: "personal" | "medium" | "large" | "jersey-giant";
    crust: "thin" | "thick" | "gluten-free";
    sauce: "marinara" | "white-garlic" | "spicy-vodka" | "pesto";
    cheese: "normal" | "extra" | "vegan" | "light";
    toppings: string[];
  }>({
    size: "large",
    crust: "thin",
    sauce: "marinara",
    cheese: "normal",
    toppings: ["Pepperoni", "Fresh Basil"],
  });

  const [builderNotes, setBuilderNotes] = useState("");

  const sizes = {
    personal: { name: 'Personal 10"', price: 9.99 },
    medium: { name: 'Medium 12"', price: 13.99 },
    large: { name: 'Large 16"', price: 16.99 },
    "jersey-giant": { name: 'Jersey Giant 20"', price: 21.99 },
  };

  const crusts = {
    thin: { name: "Wood-Fired Thin Crust", price: 0 },
    thick: { name: "Crispy Double Dough", price: 1.50 },
    "gluten-free": { name: "Asbury Gluten-Free", price: 2.00 },
  };

  const sauces = {
    marinara: { name: "Sally's Sweet Jersey Tomato Sauce", price: 0 },
    "white-garlic": { name: "Creamy Garlic Herb Sauce", price: 0 },
    "spicy-vodka": { name: "Grandma's Spicy Vodka Sauce", price: 1.00 },
    pesto: { name: "Fresh Genovese Walnut Pesto", price: 1.00 },
  };

  const cheeses = {
    normal: { name: "Whole Milk Shredded Mozzarella", price: 0 },
    extra: { name: "Double Mozzarella Blend", price: 1.50 },
    vegan: { name: "Premium Vegan Mozzarella", price: 2.00 },
    light: { name: "Light Mozzarella dusting", price: 0 },
  };

  const availableToppings = [
    { name: "Pepperoni", category: "meat" },
    { name: "Sweet Italian Sausage", category: "meat" },
    { name: "Spicy Capicola", category: "meat" },
    { name: "Anchovies", category: "meat" },
    { name: "Roasted Mushrooms", category: "veggie" },
    { name: "Green Peppers", category: "veggie" },
    { name: "Caramelized Onions", category: "veggie" },
    { name: "Fresh Tomatoes", category: "veggie" },
    { name: "Jalapeños", category: "veggie" },
    { name: "Hot Honey Drizzle", category: "premium" },
    { name: "Fresh Basil", category: "premium" },
    { name: "Garlic Confit", category: "premium" },
  ];

  // Calculate dynamic custom pizza total
  const calculatedPizzaPrice = useMemo(() => {
    let total = sizes[pizzaBuilder.size].price;
    total += crusts[pizzaBuilder.crust].price;
    total += sauces[pizzaBuilder.sauce].price;
    total += cheeses[pizzaBuilder.cheese].price;
    
    // Each topping costs $1.50
    total += pizzaBuilder.toppings.length * 1.50;
    
    return parseFloat(total.toFixed(2));
  }, [pizzaBuilder]);

  const handleToppingToggle = (toppingName: string) => {
    setPizzaBuilder(prev => {
      const exists = prev.toppings.includes(toppingName);
      if (exists) {
        return { ...prev, toppings: prev.toppings.filter(t => t !== toppingName) };
      } else {
        return { ...prev, toppings: [...prev.toppings, toppingName] };
      }
    });
  };

  const menuCategories = [
    { id: "specialty", label: "Specialty Pies" },
    { id: "classic", label: "NY Classic Pies" },
    { id: "appetizers", label: "Appetizers" },
    { id: "salads", label: "Fresh Salads" },
    { id: "sandwiches", label: "Subs & Sandwiches" },
    { id: "pasta", label: "Pasta Dishes" },
    { id: "desserts", label: "Sweet Desserts" },
    { id: "beverages", label: "Cold Drinks" },
  ];

  const filteredMenuItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  const submitCustomPizza = () => {
    const customPizzaObj: CustomPizza = {
      size: pizzaBuilder.size,
      crust: pizzaBuilder.crust,
      sauce: pizzaBuilder.sauce,
      cheese: pizzaBuilder.cheese,
      toppings: pizzaBuilder.toppings,
      basePrice: sizes[pizzaBuilder.size].price,
      totalPrice: calculatedPizzaPrice
    };

    onAddToOrder(null, customPizzaObj, builderNotes);
    
    // Reset toppings to default
    setBuilderNotes("");
  };

  return (
    <div className="space-y-16 py-4 text-[#1A1A1A]">
      
      {/* Visual Title Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#C82333]/5 border border-[#C82333]/25 text-[#C82333] rounded-sm text-xs font-mono uppercase tracking-widest font-bold">
          <Sparkles className="w-3.5 h-3.5" />
          Hot & Fresh Delivery
        </div>
        <h1 className="text-4xl md:text-5xl font-display font-medium text-[#1A1A1A] tracking-tight">
          SALLY BOY'S <span className="text-[#C82333] font-bold">DIGITAL OVEN</span>
        </h1>
        <p className="text-zinc-500 text-base md:text-lg font-sans">
          Craft your own wood-fired masterpiece or order from our generation of authentic family recipes. Prepared live and delivered blistering hot to Asbury Park.
        </p>
      </div>

      {/* Grid Layout: Left is Custom Builder, Right is Menu Sheet */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Interactive Custom Builder - Col Span 5 */}
        <div className="lg:col-span-12 xl:col-span-5 bg-zinc-50 rounded-sm p-6 border border-zinc-150 shadow-sm space-y-6 relative overflow-hidden text-left">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#C82333]/5 rounded-full filter blur-xl pointer-events-none"></div>
          
          <div className="flex items-center gap-2.5 border-b border-zinc-200 pb-4">
            <div className="p-2 bg-[#C82333]/5 text-[#C82333] border border-[#C82333]/25 rounded-sm">
              <Pizza className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h2 className="font-display font-medium text-xl text-[#1A1A1A]">Interactive Pizza Builder</h2>
              <p className="text-xs text-zinc-400 font-sans">Design your perfect Jersey slice</p>
            </div>
          </div>

          {/* Size Choice */}
          <div className="space-y-3">
            <label className="text-[11px] font-mono font-extrabold text-zinc-500 uppercase tracking-widest block">1. Select Pizza Size</label>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(sizes).map(([key, item]) => (
                <button
                  key={key}
                  onClick={() => setPizzaBuilder(prev => ({ ...prev, size: key as any }))}
                  className={`p-3 rounded-sm text-xs font-medium text-left transition-all border block cursor-pointer ${
                    pizzaBuilder.size === key
                      ? "border-[#C82333] bg-[#C82333]/5 text-[#C82333] font-bold"
                      : "border-zinc-200 bg-white hover:border-zinc-350 text-zinc-650 text-zinc-700"
                  }`}
                >
                  <div className="font-bold mb-0.5">{item.name}</div>
                  <div className={`${pizzaBuilder.size === key ? "text-[#C82333]/80" : "text-zinc-400"} font-mono text-[10px] font-bold`}>${item.price} base</div>
                </button>
              ))}
            </div>
          </div>

          {/* Crust Choice */}
          <div className="space-y-3">
            <label className="text-[11px] font-mono font-extrabold text-zinc-500 uppercase tracking-widest block text-left">2. Choose Dough & Crust</label>
            <div className="grid grid-cols-3 gap-2">
              {Object.entries(crusts).map(([key, item]) => (
                <button
                  key={key}
                  onClick={() => setPizzaBuilder(prev => ({ ...prev, crust: key as any }))}
                  className={`p-2.5 rounded-sm text-xs font-medium text-center transition-all border block cursor-pointer ${
                    pizzaBuilder.crust === key
                      ? "border-[#C82333] bg-[#C82333]/5 text-[#C82333] font-bold"
                      : "border-zinc-200 bg-white hover:border-zinc-350 text-zinc-700"
                  }`}
                >
                  <div className="font-bold truncate">{item.name.split(" ")[0]}</div>
                  <div className={`${pizzaBuilder.crust === key ? "text-[#C82333]/80" : "text-zinc-400"} text-[10px] font-mono font-bold`}>
                    {item.price === 0 ? "Free" : `+$${item.price}`}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Sauce Choice */}
          <div className="space-y-3">
            <label className="text-[11px] font-mono font-extrabold text-zinc-500 uppercase tracking-widest block text-left">3. Sauce Selection</label>
            <select
              value={pizzaBuilder.sauce}
              onChange={(e) => setPizzaBuilder(prev => ({ ...prev, sauce: e.target.value as any }))}
              className="w-full bg-white border border-zinc-200 text-[#1A1A1A] py-3 px-4 rounded-sm text-sm focus:outline-none focus:border-[#C82333] transition-colors cursor-pointer"
            >
              {Object.entries(sauces).map(([key, item]) => (
                <option key={key} value={key} className="bg-white text-[#1A1A1A]">
                  {item.name} {item.price > 0 ? `(+$${item.price})` : ""}
                </option>
              ))}
            </select>
          </div>

          {/* Cheese Choice */}
          <div className="space-y-3">
            <label className="text-[11px] font-mono font-extrabold text-zinc-500 uppercase tracking-widest block text-left">4. Mozzarella Options</label>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(cheeses).map(([key, item]) => (
                <button
                  key={key}
                  onClick={() => setPizzaBuilder(prev => ({ ...prev, cheese: key as any }))}
                  className={`p-2.5 rounded-sm text-xs font-medium text-left transition-all border block cursor-pointer ${
                    pizzaBuilder.cheese === key
                      ? "border-[#C82333] bg-[#C82333]/5 text-[#C82333] font-bold"
                      : "border-zinc-200 bg-white hover:border-zinc-350 text-zinc-700"
                  }`}
                >
                  <div className="font-bold">{item.name.split(" ")[0]} Cheese</div>
                  <div className={`${pizzaBuilder.cheese === key ? "text-[#C82333]/80" : "text-zinc-400"} text-[10px] font-mono font-bold`}>
                    {item.price === 0 ? "+$0.00" : `+$${item.price}`}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Toppings Choice */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-[11px] font-mono font-extrabold text-zinc-500 uppercase tracking-widest block">5. Double Up Toppings</label>
              <span className="text-[10px] text-[#C82333] font-mono font-bold bg-[#C82333]/5 px-2.5 py-0.5 rounded-sm border border-[#C82333]/15">+$1.50 ea</span>
            </div>
            
            <div className="h-44 overflow-y-auto pr-1 border border-zinc-200 rounded-sm p-2 bg-white space-y-1.5 scrollbar">
              {availableToppings.map((topping) => {
                const isSelected = pizzaBuilder.toppings.includes(topping.name);
                return (
                  <button
                    key={topping.name}
                    onClick={() => handleToppingToggle(topping.name)}
                    className={`w-full flex justify-between items-center p-2 rounded-sm text-xs font-semibold transition-all cursor-pointer ${
                      isSelected
                        ? "bg-[#C82333]/5 border border-[#C82333]/50 text-[#C82333]"
                        : "border border-zinc-100 bg-zinc-50/50 text-zinc-500 hover:text-zinc-700"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className={`w-3.5 h-3.5 rounded-sm transition-colors flex items-center justify-center border ${isSelected ? "bg-[#C82333] border-[#C82333]" : "bg-white border-zinc-200"}`}>
                        {isSelected && <Check className="w-2.5 h-2.5 text-white stroke-[3.5px]" />}
                      </span>
                      <span>{topping.name}</span>
                    </div>
                    <span className="text-[9px] font-mono text-zinc-400 font-bold uppercase">
                      {topping.category}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Custom Notes */}
          <div className="space-y-2">
            <div className="flex items-center gap-1.5 text-zinc-400">
              <MessageSquare className="w-4 h-4 text-[#C82333]" />
              <label className="text-[10px] font-mono uppercase tracking-widest font-bold text-zinc-500">Preparation Requests</label>
            </div>
            <input
              type="text"
              placeholder="e.g. well done crust, sauce on the side, hot..."
              value={builderNotes}
              onChange={(e) => setBuilderNotes(e.target.value)}
              className="w-full bg-white border border-zinc-200 rounded-sm text-xs py-2 px-3 focus:outline-none focus:border-[#C82333] text-[#1A1A1A]"
            />
          </div>

          {/* Pricing Box and Action */}
          <div className="pt-4 border-t border-zinc-200 space-y-3">
            <div className="flex justify-between items-center px-2">
              <span className="text-zinc-400 text-xs font-semibold uppercase tracking-wider font-mono">Toppings: {pizzaBuilder.toppings.length}</span>
              <span className="text-2xl font-display font-extrabold text-[#C82333] font-mono">
                ${calculatedPizzaPrice}
              </span>
            </div>
            
            <button
              onClick={submitCustomPizza}
              className="w-full py-3.5 bg-[#C82333] hover:bg-[#b01e2c] text-white rounded-sm font-bold uppercase tracking-wider transition-all shadow-md text-xs flex items-center justify-center gap-2 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              Add Custom Masterpiece
            </button>
          </div>

        </div>

        {/* Menu Sheet - Col Span 7 */}
        <div className="lg:col-span-12 xl:col-span-7 space-y-6 text-left">
          
          {/* Menu Categories Nav bar */}
          <div className="flex flex-wrap gap-1.5 border-b border-zinc-200 pb-3">
            {menuCategories.map((c) => (
              <button
                key={c.id}
                onClick={() => setActiveCategory(c.id)}
                className={`px-3.5 py-2 rounded-sm text-xs font-bold uppercase tracking-wider transition-all border cursor-pointer ${
                  activeCategory === c.id
                    ? "bg-zinc-900 border-zinc-900 text-white shadow-sm"
                    : "text-zinc-500 hover:text-zinc-800 bg-white border-zinc-150"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          {/* Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredMenuItems.map((item) => (
              <div 
                key={item.id}
                className="glass-card p-5 border border-zinc-200/90 rounded-sm flex flex-col justify-between glass-card-hover relative group block"
              >
                {/* Accent Indicators */}
                <div className="absolute top-4 right-4 flex gap-1 items-center">
                  {item.popular && (
                    <span className="bg-[#C82333]/5 text-[#C82333] text-[9px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-sm border border-[#C82333]/15">
                      Popular
                    </span>
                  )}
                  {item.jerseyTradition && (
                    <span className="bg-emerald-50 text-emerald-700 text-[9px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-sm border border-emerald-100">
                      Jersey Legend
                    </span>
                  )}
                </div>

                <div className="space-y-2 pr-12">
                  <h3 className="font-display font-medium text-base text-[#1A1A1A] group-hover:text-[#C82333] transition-colors flex items-center gap-2">
                    {item.name}
                    {item.spicy && <span className="text-red-500 text-xs text-xs">🔥</span>}
                    {item.vegetarian && <span className="text-emerald-600 text-xs">🌱</span>}
                  </h3>
                  <p className="text-xs text-zinc-500 leading-relaxed font-sans font-medium line-clamp-3">
                    {item.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-zinc-100 flex flex-col gap-3">
                  {/* Notes for direct items */}
                  <div className="flex items-center gap-1.5 bg-zinc-50 border border-zinc-150 rounded-sm px-2 py-1.5">
                    <input
                      type="text"
                      placeholder="Add request (e.g., extra sauce)"
                      value={notes[item.id] || ""}
                      onChange={(e) => setNotes(prev => ({ ...prev, [item.id]: e.target.value }))}
                      className="w-full bg-transparent text-[11px] text-zinc-600 placeholder-zinc-400 focus:outline-none"
                    />
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="font-mono text-base font-extrabold text-[#1A1A1A]">
                      ${item.price.toFixed(2)}
                    </span>
                    <button
                      onClick={() => {
                        onAddToOrder(item, null, notes[item.id] || "");
                        setNotes(prev => ({ ...prev, [item.id]: "" }));
                      }}
                      className="flex items-center gap-1.5 bg-[#C82333]/5 hover:bg-[#C82333] hover:text-white text-[#C82333] border border-[#C82333]/25 px-3 py-1.5 rounded-sm text-[11px] font-bold uppercase tracking-wider transition-all cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      Add to Order
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-zinc-50 border border-zinc-200/80 p-5 rounded-sm flex items-start gap-3">
            <Info className="w-5 h-5 text-[#C82333] shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="text-xs font-mono uppercase tracking-wider font-extrabold text-zinc-600 block">Allergy & Dietary Information</span>
              <p className="text-xs text-zinc-500 leading-relaxed font-sans font-medium">
                Our kitchen process includes peanuts, tree nuts, gluten, milk, and eggs. We offer gluten-free dough choices and vegan milk alternative mozzarella cheeses. Please detail any severe allergies in item requests so our kitchen can provide surgical cross-contamination safety guidelines.
              </p>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}

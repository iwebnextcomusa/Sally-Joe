import { useState, useEffect, useRef, FormEvent } from "react";
import Navbar from "./components/Navbar";
import OrderOnline from "./components/OrderOnline";
import Catering from "./components/Catering";
import Contact from "./components/Contact";
import AboutUs from "./components/AboutUs";

import { MenuItem, CustomPizza, CartItem } from "./types";
import { REVIEWS } from "./data";

import { 
  Pizza, 
  Sparkles, 
  Trash2, 
  Plus, 
  Minus, 
  X, 
  Phone, 
  MapPin, 
  Mail, 
  MessageSquare, 
  ChevronUp, 
  Flame, 
  Cookie, 
  CheckCircle,
  HelpCircle,
  Clock,
  Menu,
  ShoppingBag
} from "lucide-react";

export default function App() {
  const [activeTab, setActiveTab] = useState<string>("home");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  // Checkout & receipt states
  const [checkoutStep, setCheckoutStep] = useState<"none" | "details" | "receipt">("none");
  const [checkoutForm, setCheckoutForm] = useState({
    name: "",
    phone: "",
    address: "",
    method: "delivery" as "delivery" | "pickup",
  });
  const [receipt, setReceipt] = useState<any | null>(null);

  // Chatbot state
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<Array<{ role: "user" | "assistant"; text: string }>>([
    { role: "assistant", text: "Hey! SallyBoy here! 🍕 Ready to chat about some tasty wood-fired pizza, delivery in Asbury Park, or corporate party catering?" }
  ]);
  const [userInput, setUserInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Sync SEO Dynamic Titles & Meta Descriptions
  useEffect(() => {
    let title = "iWebNext";
    let desc = "";

    switch (activeTab) {
      case "home":
        title = "Sally Joe Pizza | Fresh Wood-Fired Pizza in Asbury Park NJ";
        desc = "Authentic wood-fired Neapolitan & NY thin crust pizza, deep in Asbury Park NJ. Order online for swift hot delivery and premium catering services.";
        break;
      case "menu":
        title = "Wood-Fired Menu | Specialty Pies, Subs & Pastas | Sally Joe Pizza";
        desc = "Explore our premium selection of specialty brick-oven pies, fresh Caesar salads, Chicken Parm subs, baked ziti, and hot zeppoles.";
        break;
      case "about":
        title = "Our Story - Since 1982 | Sally Joe Pizza Asbury Park";
        desc = "Sal Boyd combined wood-fired ovens & rock-and-roll local heritage. Read our 40-year story of baking with Jersey tomatoes and hand-stretched mozzarella.";
        break;
      case "order":
        title = "Order Online - Dynamic Pizza Builder | Sally Joe Pizza";
        desc = "Use our high-heat interactive pizza customizer. Select your pie size, crust style, rich marinara or white mozzarella base, and fresh local toppings.";
        break;
      case "catering":
        title = "Pizza Catering Packages | Event Hosting in Asbury Park NJ";
        desc = "Catering packages for private events, concert backstage feeds, or beach picnics. Request custom pizza estimates for corporate & family parties.";
        break;
      case "contact":
        title = "Find Our Brick Oven - Hours & Map | Sally Joe Pizza";
        desc = "Check business hours, locate our restaurant just blocks from the beach, or message our staff for logistical support.";
        break;
    }

    // Set document title dynamically
    document.title = title;

    // Set meta description
    const descMeta = document.querySelector('meta[name="description"]');
    if (descMeta) {
      descMeta.setAttribute("content", desc);
    } else {
      const meta = document.createElement("meta");
      meta.name = "description";
      meta.content = desc;
      document.head.appendChild(meta);
    }

    // Scroll to top on page change
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeTab]);

  // Monitor scroll for Scroll-to-Top Button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Chat scroll sync
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages, isTyping, isChatOpen]);

  // --- CART OPERATIONS ---
  
  const cartCount = cart.reduce((sums, item) => sums + item.quantity, 0);
  
  const cartSubtotal = cart.reduce((sums, item) => sums + item.totalPrice, 0);

  const handleAddToOrder = (menuItem: MenuItem | null, customPizza: CustomPizza | null, notes: string) => {
    const itemPrice = menuItem ? menuItem.price : (customPizza ? customPizza.totalPrice : 0);
    const itemId = menuItem ? menuItem.id : "custom-" + Date.now();

    const existingIndex = cart.findIndex((c) => {
      if (menuItem && c.menuItem && c.menuItem.id === menuItem.id && c.notes === notes) return true;
      return false;
    });

    if (existingIndex > -1) {
      // Direct duplicates increments quantity
      setCart(prev => {
        const copy = [...prev];
        copy[existingIndex].quantity += 1;
        copy[existingIndex].totalPrice = parseFloat((copy[existingIndex].quantity * itemPrice).toFixed(2));
        return copy;
      });
    } else {
      const newCartItem: CartItem = {
        id: "cart-" + Date.now() + Math.random().toString(36).substr(2, 5),
        menuItem: menuItem || undefined,
        customPizza: customPizza || undefined,
        quantity: 1,
        notes: notes || undefined,
        totalPrice: itemPrice
      };
      setCart(prev => [...prev, newCartItem]);
    }

    setIsCartOpen(true);
  };

  const handleUpdateQty = (cartId: string, delta: number) => {
    setCart(prev => {
      const target = prev.find((c) => c.id === cartId);
      if (!target) return prev;
      
      const newQty = target.quantity + delta;
      if (newQty <= 0) {
        return prev.filter((c) => c.id !== cartId);
      } else {
        const itemPrice = target.menuItem ? target.menuItem.price : (target.customPizza ? target.customPizza.totalPrice : 0);
        return prev.map((c) => {
          if (c.id === cartId) {
            return {
              ...c,
              quantity: newQty,
              totalPrice: parseFloat((newQty * itemPrice).toFixed(2))
            };
          }
          return c;
        });
      }
    });
  };

  const handleRemoveItem = (cartId: string) => {
    setCart(prev => prev.filter((c) => c.id !== cartId));
  };

  // Submit Simulated Checkout Receipt
  const executeSimulatedCheckout = (e: FormEvent) => {
    e.preventDefault();
    if (!checkoutForm.name || !checkoutForm.phone || (checkoutForm.method === "delivery" && !checkoutForm.address)) {
      alert("Please fill in requirements!");
      return;
    }

    const receiptObj = {
      orderId: "SJP-" + Math.floor(Math.random() * 900000 + 100000),
      timestamp: new Date().toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" }),
      clientName: checkoutForm.name,
      clientPhone: checkoutForm.phone,
      clientAddress: checkoutForm.address || "Asbury Park Pickup counter",
      items: [...cart],
      subtotal: cartSubtotal,
      tax: parseFloat((cartSubtotal * 0.0725).toFixed(2)),
      deliveryFee: checkoutForm.method === "delivery" ? 2.99 : 0,
      total: parseFloat((cartSubtotal * 1.0725 + (checkoutForm.method === "delivery" ? 2.99 : 0)).toFixed(2)),
      method: checkoutForm.method
    };

    setReceipt(receiptObj);
    setCheckoutStep("receipt");
    setCart([]); // Clear cart upon successful simulation
  };

  // --- AI CHATBOT HANDLERS ---
  const handleSendMessage = async (e: FormEvent) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    const userText = userInput.trim();
    setUserInput("");
    setChatMessages(prev => [...prev, { role: "user", text: userText }]);
    setIsTyping(true);

    try {
      // Map simple message array to system guidelines endpoints
      const historyLog = chatMessages.slice(-6).map((msg) => ({
        role: msg.role,
        text: msg.text
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userText, history: historyLog })
      });
      const data = await res.json();
      
      setChatMessages(prev => [...prev, { role: "assistant", text: data.reply }]);
    } catch (err) {
      console.error("Chatbot Error:", err);
      setChatMessages(prev => [...prev, { 
        role: "assistant", 
        text: "My woodfired connection flickered! Shoot me another slice of text and let's bake again. 🍕" 
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleQuickQuestion = (question: string) => {
    setUserInput(question);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between selection:bg-[#C82333] selection:text-white">
      
      {/* 1. Header & Navigation */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        cartCount={cartCount} 
        openCart={() => setIsCartOpen(true)} 
      />

      {/* Spacing alignment for fixed Nav */}
      <div className="h-20"></div>

      {/* 2. Main Body Render Layer */}
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full relative">
        
        {/* TAB 1: HOME */}
        {activeTab === "home" && (
          <div className="space-y-20 animate-in fade-in duration-500 text-[#1A1A1A]">
            
            {/* HERO SECTION WITH DUAL CTAs */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-4 md:pt-10">
              
              <div className="lg:col-span-7 space-y-6 text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#C82333]/5 border border-[#C82333]/25 text-[#C82333] rounded-sm text-xs font-bold uppercase tracking-wider">
                  <Flame className="w-3.5 h-3.5 animate-pulse" />
                  Asbury's Finest Wood-Fired Pies
                </div>
                
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-medium tracking-tight leading-none text-[#1A1A1A]">
                  JERSEY GRIT. <br />
                  <span className="text-[#C82333] font-bold">BRICK-OVEN FLAMES.</span> <br />
                  PURE DEVOTION.
                </h1>
                
                <p className="text-zinc-600 text-base md:text-lg max-w-2xl leading-relaxed text-zinc-500">
                  Baking with 72-hour slow-fermented crusts, fresh hand-pulled local mozzarella, and sweet Jersey plum tomato sauce. Delivered sizzling fresh directly to your boardwalk blankets.
                </p>

                <div className="flex flex-wrap gap-4 pt-2">
                  <button 
                    onClick={() => setActiveTab("order")}
                    className="px-6 py-4 bg-[#C82333] hover:bg-[#b01e2c] text-white font-bold rounded-sm text-xs uppercase tracking-wider transition-all shadow-md flex items-center gap-2 cursor-pointer"
                  >
                    <Pizza className="w-4.5 h-4.5" />
                    Interactive Pizza Builder
                  </button>
                  <button 
                    onClick={() => setActiveTab("menu")}
                    className="px-6 py-4 bg-zinc-900 hover:bg-black text-white font-bold rounded-sm text-xs uppercase tracking-wider transition-all cursor-pointer"
                  >
                    Explore Local Menu
                  </button>
                </div>

                <div className="flex items-center gap-6 pt-4 text-xs font-mono text-zinc-500 uppercase">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#C82333]" />
                    <span>Asbury Park, NJ</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#C82333]" />
                    <span>Oven hot until 11pm</span>
                  </div>
                </div>
              </div>

              {/* Pizza Image Block - Col Span 5 */}
              <div className="lg:col-span-5 h-[400px] lg:h-[480px] bg-white rounded-sm border border-zinc-200/80 relative overflow-hidden shadow-sm group">
                <div className="absolute top-0 left-0 right-0 p-4 border-b border-zinc-100/50 flex justify-between items-center bg-white/80 backdrop-blur-sm z-20">
                  <div className="flex items-center gap-2 text-[#C82333] font-mono text-[10px] uppercase font-bold tracking-widest">
                    <span className="w-2 h-2 bg-[#C82333] rounded-full animate-pulse"></span>
                    Sally Boy's Signature Pie
                  </div>
                  <span className="text-[10px] font-mono text-zinc-500 font-bold">FRESH BAKED LIVE</span>
                </div>

                <img 
                  src="https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?auto=format&fit=crop&w=800&q=80" 
                  alt="Sally Boy's Artisanal Wood-Fired Pizza"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/85 via-black/45 to-transparent text-white z-10 flex flex-col justify-end text-left pt-20">
                  <span className="text-[10px] font-mono text-red-500 font-bold uppercase tracking-wider mb-1">Wood-fired heat at 850°f</span>
                  <h3 className="font-display font-bold text-lg text-white">Jersey Grit & Artisanal Crust</h3>
                  <p className="text-[11px] text-zinc-300 font-sans mt-1 leading-relaxed">
                    Our 100% natural 72-hour slow-fermented sourdough crust blistered to golden Neapolitan bubbly perfection.
                  </p>
                </div>
              </div>

            </div>

            {/* FEATURED SPECIALTIES SECTION */}
            <div className="space-y-10">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                <div className="space-y-2">
                  <span className="text-[#C82333] font-mono text-xs uppercase font-extrabold tracking-widest">Boardwalk Favorites</span>
                  <h2 className="font-display font-medium text-3xl text-[#1A1A1A]">Sally Boy's Specialty Bakes</h2>
                </div>
                <button 
                  onClick={() => setActiveTab("menu")}
                  className="text-xs font-bold uppercase tracking-wider text-[#C82333] hover:text-red-700 flex items-center gap-1 cursor-pointer"
                >
                  View All Categories <span>→</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    name: "Jersey Fire",
                    desc: "Spicy capicola, Calabrian chilis, hot honey drizzle, fresh mozzarella, signature tomato base, and fresh basil.",
                    price: 19.99,
                    spicy: true,
                    tradition: false,
                    id: "spec-3"
                  },
                  {
                    name: "Asbury Classic",
                    desc: "Double cured pepperoni slices, high-melt mozzarella, rich red marinara sauce over perfectly scorched crust.",
                    price: 16.99,
                    spicy: false,
                    tradition: true,
                    id: "spec-1"
                  },
                  {
                    name: "White Shore Beach",
                    desc: "Creamy whipped garlic-herb ricotta, premium mozzarella shredding, wild oregano, and virgin olive oil drizzle.",
                    price: 17.99,
                    spicy: false,
                    tradition: false,
                    id: "spec-5"
                  }
                ].map((item, i) => (
                  <div 
                    key={i} 
                    className="glass-card rounded-sm p-6 flex flex-col justify-between glass-card-hover group"
                  >
                    <div className="space-y-4">
                      <div className="flex justify-between items-start">
                        <div className="space-y-1">
                          <h3 className="font-display font-bold text-lg text-[#1A1A1A] group-hover:text-[#C82333] transition-all">
                            {item.name}
                            {item.spicy && " 🔥"}
                          </h3>
                          {item.tradition && (
                            <span className="inline-block bg-[#C82333]/5 border border-[#C82333]/25 text-[#C82333] text-[9px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-sm font-mono">
                              Legendary
                            </span>
                          )}
                        </div>
                        <span className="font-mono font-bold text-[#C82333] text-base">${item.price}</span>
                      </div>
                      <p className="text-xs text-zinc-500 leading-relaxed">{item.desc}</p>
                    </div>

                    <div className="pt-6 mt-6 border-t border-zinc-100 flex justify-between items-center">
                      <button 
                        onClick={() => setActiveTab("order")}
                        className="text-xs font-bold text-zinc-500 hover:text-[#1A1A1A] transition-colors cursor-pointer"
                      >
                        Customize Pie
                      </button>
                      <button
                        onClick={() => handleAddToOrder({
                          id: item.id,
                          name: item.name,
                          description: item.desc,
                          price: item.price,
                          category: "specialty"
                        }, null, "")}
                        className="bg-[#C82333] hover:bg-[#b01e2c] text-white text-[11px] font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-sm transition-all cursor-pointer"
                      >
                        + Hot Order
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* WHY CHOOSE SALLY JOE */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-zinc-50 border border-zinc-200/80 rounded-sm p-6 md:p-10 relative overflow-hidden">
              <div className="absolute -bottom-10 -left-10 w-44 h-44 bg-[#C82333]/5 rounded-full filter blur-2xl pointer-events-none"></div>

              <div className="lg:col-span-5 h-[300px] bg-white rounded-sm border border-zinc-200/80 p-6 flex flex-col justify-between relative overflow-hidden group">
                <div className="absolute top-4 right-4 text-[10px] font-mono text-zinc-400 font-bold tracking-wider">OVEN TEMPERATURE LOGGER</div>
                <div className="space-y-2">
                  <span className="text-xs font-mono uppercase tracking-widest text-[#C82333] font-bold">Live Temp Target</span>
                  <div className="text-5xl font-display font-medium text-[#1A1A1A] flex items-baseline">
                    850<span className="text-[#C82333] text-3xl font-bold">°F</span>
                  </div>
                </div>

                <div className="space-y-1 border-t border-zinc-150 pt-4">
                  <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest block font-bold">Core Baking Velocity</span>
                  <p className="text-[11px] text-zinc-600 leading-relaxed font-sans">
                    True Neapolitan heat seals surface moisture in 90 seconds. Golden blisters, moist toppings, woodfired ash notes.
                  </p>
                </div>
              </div>

              <div className="lg:col-span-7 space-y-6">
                <span className="text-[#C82333] font-mono text-xs uppercase font-extrabold tracking-widest">Fresh Shore Baking</span>
                <h2 className="font-display font-medium text-3xl text-[#1A1A1A]">Why Asbury Park Chooses Sally Boy</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <span className="text-[#1A1A1A] text-sm font-bold block">72-Hour Fermented Dough</span>
                    <p className="text-xs text-zinc-500 leading-relaxed">
                      Time builds intense flavor. Our slow dough process increases air bubbles, forming an exceptionally light and easy-to-digest crust.
                    </p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[#1A1A1A] text-sm font-bold block">Central Jersey Tomatoes</span>
                    <p className="text-xs text-zinc-500 leading-relaxed">
                      We crush pure sweet plum tomatoes. No synthetic sweeteners, no heavy drying pastes—just clean tomato sunbeams from regional farms.
                    </p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[#1A1A1A] text-sm font-bold block">Local Cedar & Cherry Wood</span>
                    <p className="text-xs text-zinc-500 leading-relaxed">
                      Proprietary smoking. Burning kiln-dried hard logs infuses each pizza slice with absolute woodsy aromatic notes.
                    </p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[#1A1A1A] text-sm font-bold block">Boardwalk Delivery Speed</span>
                    <p className="text-xs text-zinc-500 leading-relaxed">
                      Equipped with high-insulated warm bags, our quick vehicle operators lock temperature in transit. Blistering hot delivery guaranteed.
                    </p>
                  </div>
                </div>
              </div>

            </div>

            {/* CUSTOMER REVIEWS */}
            <div className="space-y-8">
              <div className="text-center space-y-2">
                <span className="text-[#C82333] font-mono text-xs uppercase font-extrabold tracking-widest">Jersey Testimonials</span>
                <h2 className="font-display font-medium text-3xl text-[#1A1A1A] text-center">Loved on the Boardwalk</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {REVIEWS.map((rev) => (
                  <div 
                    key={rev.id} 
                    className="glass-card rounded-sm p-6 flex flex-col justify-between glass-card-hover"
                  >
                    <div className="space-y-4">
                      {/* Radiating visual rating */}
                      <div className="flex gap-1 text-[#C82333]">
                        {Array.from({ length: rev.rating }).map((_, i) => (
                          <span key={i} className="text-xs">★</span>
                        ))}
                      </div>
                      <p className="text-xs text-zinc-650 leading-relaxed">{rev.comment}</p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-zinc-100 flex justify-between items-center text-[10px] text-zinc-500">
                      <div>
                        <span className="block font-bold text-[#1A1A1A]">{rev.author}</span>
                        <span>{rev.location}</span>
                      </div>
                      <span className="font-mono">{rev.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* MEDIA GALLERY SECTION & AUTO-PLAYING AMBIENT VIDEO BLOCK */}
            <div className="space-y-8">
              <div className="text-center space-y-2">
                <span className="text-[#C82333] font-mono text-xs uppercase font-extrabold tracking-widest">Behind The Scenes</span>
                <h2 className="font-display font-medium text-3xl text-[#1A1A1A]">Backstage Baking Live</h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                
                {/* Embedded atmospheric ambient "Video player" Container - Col Span 8 */}
                <div className="lg:col-span-8 bg-zinc-50 border border-zinc-200/80 rounded-sm p-6 relative overflow-hidden flex flex-col justify-between min-h-[340px] shadow-sm">
                  
                  {/* Subtle video glow effect behind */}
                  <div className="absolute inset-0 bg-radial-gradient from-[#C82333]/5 via-transparent to-transparent pointer-events-none"></div>

                  <div className="flex justify-between items-center z-10">
                    <span className="bg-[#C82333]/5 text-[#C82333] border border-[#C82333]/22 px-3 py-1 rounded-sm text-[10px] font-mono uppercase tracking-wider flex items-center gap-1.5 font-bold">
                      <span className="w-1.5 h-1.5 bg-[#C82333] rounded-full animate-ping"></span>
                      Oven Cam: Live Stream
                    </span>
                    <span className="text-[10px] font-mono text-zinc-400 font-bold">850° HIGH HEAT STEADY</span>
                  </div>

                  {/* Aesthetic visual illustration mimicking inside the brick oven */}
                  <div className="my-6 flex flex-col items-center justify-center space-y-3 z-10 select-none">
                    <div className="relative">
                      {/* Fire shape built procedurally */}
                      <div className="w-20 h-20 bg-gradient-to-t from-[#C82333] via-orange-500 to-yellow-400 rounded-full blur-md animate-bounce opacity-30"></div>
                      <Flame className="w-14 h-14 text-orange-500 absolute top-3 left-3 animate-pulse" />
                    </div>
                    <span className="font-display font-medium text-[#1A1A1A] text-lg tracking-wide text-center">Baking woodfired sourdough base live</span>
                    <p className="text-[11.5px] text-zinc-500 text-center max-w-sm font-sans leading-relaxed">Our high-hydration artisan sourdough base expands dynamically under cherry wood embers. Watch the crust pop in real-time!</p>
                  </div>

                  <div className="border-t border-zinc-150 pt-3 flex justify-between items-center text-[10px] font-mono text-zinc-400 font-semibold z-10">
                    <span>RECORDING ACTIVE</span>
                    <span>FPS: 60/60</span>
                  </div>
                </div>

                {/* Grid image cards representing process - Col Span 4 */}
                <div className="lg:col-span-4 flex flex-col gap-4">
                  <div className="glass-card p-5 rounded-sm flex-1 flex flex-col justify-between glass-card-hover border border-zinc-150">
                    <span className="text-3xl">🍅</span>
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono text-[#C82333] font-bold uppercase tracking-wider">Local Harvest</span>
                      <h4 className="font-display font-bold text-sm text-[#1A1A1A]">Jersey Tomato Picking</h4>
                      <p className="text-[11px] text-zinc-500 leading-relaxed">Direct relationships with organic farms in Central Jersey ensures zero storage decay.</p>
                    </div>
                  </div>

                  <div className="glass-card p-5 rounded-sm flex-1 flex flex-col justify-between glass-card-hover border border-zinc-150">
                    <span className="text-3xl">🎸</span>
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono text-[#C82333] font-bold uppercase tracking-wider">Music & Slices</span>
                      <h4 className="font-display font-bold text-sm text-[#1A1A1A]">The Backstage Support</h4>
                      <p className="text-[11px] text-zinc-500 leading-relaxed font-sans">Giada Boyd continues supporting regional sound engineers and musicians daily.</p>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* QUICK CONTACT HIGHLIGHT PLACE */}
            <div className="glass-card rounded-sm p-6 md:p-8 flex flex-col md:flex-row justify-between items-center gap-6 glass-card-hover border border-zinc-150/80">
              <div className="space-y-2 text-center md:text-left">
                <h3 className="font-display font-medium text-2xl text-[#1A1A1A]">Quick Phone Inquiries?</h3>
                <p className="text-xs text-zinc-500 max-w-lg">
                  Hungry right now? Call us directly for speedy 20-minute takeout pickup or fast boardwalk area pizza delivery!
                </p>
              </div>
              <a 
                href="tel:7325674009"
                className="px-6 py-4 bg-[#C82333] hover:bg-[#b01e2c] text-white font-bold rounded-sm text-xs uppercase tracking-wider transition-all flex items-center gap-2 font-mono shadow-md cursor-pointer"
              >
                <Phone className="w-4 h-4 animate-bounce" />
                (732) 567-4009
              </a>
            </div>

          </div>
        )}

        {/* TAB 2: MENU CATEGORIES PANEL */}
        {activeTab === "menu" && (
          <div className="animate-in fade-in duration-500">
            <OrderOnline onAddToOrder={handleAddToOrder} />
          </div>
        )}

        {/* TAB 3: ABOUT US */}
        {activeTab === "about" && (
          <div className="animate-in fade-in duration-500">
            <AboutUs />
          </div>
        )}

        {/* TAB 4: ORDER ONLINE DYNAMIC BUILDER */}
        {activeTab === "order" && (
          <div className="animate-in fade-in duration-500">
            <OrderOnline onAddToOrder={handleAddToOrder} />
          </div>
        )}

        {/* TAB 5: CATERING */}
        {activeTab === "catering" && (
          <div className="animate-in fade-in duration-500">
            <Catering />
          </div>
        )}

        {/* TAB 6: CONTACT */}
        {activeTab === "contact" && (
          <div className="animate-in fade-in duration-500">
            <Contact />
          </div>
        )}

      </main>

      {/* 3. Footer */}
      <footer className="border-t border-zinc-900 bg-zinc-950 py-12 select-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            
            <div className="space-y-4">
              <span className="font-display font-black text-2xl tracking-tight text-white flex items-center gap-2">
                SALLY <span className="text-red-500">JOE</span>
              </span>
              <p className="text-xs text-zinc-500 leading-relaxed max-w-xs">
                Authentic woodfired Neapolitan slices baking at 850° just blockages from the high-energy Asbury boardwalk. Since 1982.
              </p>
            </div>

            <div className="space-y-3">
              <span className="text-xs font-mono uppercase font-black tracking-wider text-red-500">Fast Navigation</span>
              <div className="flex flex-col gap-2 text-xs text-zinc-450 text-zinc-400">
                <button onClick={() => setActiveTab("home")} className="hover:text-white text-left cursor-pointer">Home</button>
                <button onClick={() => setActiveTab("menu")} className="hover:text-white text-left cursor-pointer">Menu List</button>
                <button onClick={() => setActiveTab("order")} className="hover:text-white text-left cursor-pointer">Pizza Builder</button>
                <button onClick={() => setActiveTab("catering")} className="hover:text-white text-left cursor-pointer">Event Catering</button>
              </div>
            </div>

            <div className="space-y-3">
              <span className="text-xs font-mono uppercase font-black tracking-wider text-red-500">Oven Details</span>
              <div className="space-y-2 text-xs text-zinc-400">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-zinc-600" />
                  <span>Asbury Park, NJ 07712</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-zinc-600" />
                  <span className="font-mono">(732) 567-4009</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-zinc-600" />
                  <span className="truncate">1800salboyd@gmail.com</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <span className="text-xs font-mono uppercase font-black tracking-wider text-red-500">Local Area Rules</span>
              <p className="text-xs text-zinc-550 text-zinc-500 leading-relaxed">
                We deliver inside Asbury Park, Ocean Grove, Neptune, and Bradley Beach. Over 21 identification log is required for craft can pickups.
              </p>
            </div>

          </div>

          <div className="border-t border-zinc-900 pt-8 text-center space-y-2 text-xs text-zinc-600">
            <p>© {new Date().getFullYear()} Sally Joe Pizza. All Rights Reserved. Fully ADA Accessible.</p>
            <p>
              Developed by <a href="https://iwebnext.com" target="_blank" rel="noopener noreferrer" className="text-red-500 hover:text-red-400 font-bold transition-colors">iWebNext</a>
            </p>
          </div>

        </div>
      </footer>

      {/* --- FLOATING SCROLL TO TOP BUTTON --- */}
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 left-6 z-40 p-3 bg-red-950/80 hover:bg-red-600 border border-red-500/30 text-red-400 hover:text-white rounded-full transition-all duration-300 shadow-xl cursor-pointer hover:scale-110"
          aria-label="Scroll to Top"
        >
          <ChevronUp className="w-5 h-5 animate-bounce" />
        </button>
      )}

      {/* --- STICKY MOBILE CALL BUTTON (linked to 7325674009) --- */}
      <div className="md:hidden fixed bottom-20 left-4 z-45">
        <a 
          href="tel:7325674009"
          className="bg-red-600 text-white font-bold p-3.5 rounded-full flex items-center justify-center shadow-2xl border border-red-500 focus:outline-none focus:ring-2 focus:ring-red-400 hover:bg-red-500 cursor-pointer"
        >
          <Phone className="w-5 h-5 animate-bounce" />
        </a>
      </div>

      {/* --- FLOATING AI CHATBOT SYSTEM (SallyBoy Mascot) --- */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
        
        {/* Expanded Chat window */}
        {isChatOpen && (
          <div className="w-[325px] sm:w-[360px] h-[450px] bg-zinc-950 border border-zinc-850 border-zinc-805 rounded-3xl overflow-hidden shadow-2xl flex flex-col justify-between mb-4 glass-card border border-red-500/10 animate-in slide-in-from-bottom duration-300">
            
            {/* Header */}
            <div className="bg-red-950/40 px-5 py-4 border-b border-zinc-900 flex justify-between items-center">
              <div className="flex items-center gap-2.5">
                <div className="relative">
                  <div className="w-9 h-9 rounded-full bg-red-600/20 text-red-500 flex items-center justify-center border border-red-500/30">
                    <Pizza className="w-5 h-5" />
                  </div>
                  <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border border-zinc-950"></div>
                </div>
                <div>
                  <h4 className="font-display font-extrabold text-sm text-white tracking-wide">SallyBoy Chat</h4>
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Digital Pizza Chef</span>
                </div>
              </div>
              <button 
                onClick={() => setIsChatOpen(false)}
                className="text-zinc-500 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Conversation Feed */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5 scrollbar bg-zinc-950/40">
              {chatMessages.map((msg, i) => (
                <div 
                  key={i} 
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} animate-in fade-in-50 duration-200`}
                >
                  <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs font-normal leading-relaxed ${
                    msg.role === "user"
                      ? "bg-red-600 text-white rounded-br-none"
                      : "bg-zinc-900 text-zinc-200 border border-zinc-850 border-zinc-800 rounded-bl-none"
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-zinc-900 text-zinc-400 rounded-2xl rounded-bl-none px-4 py-2.5 text-xs flex items-center gap-1.5 border border-zinc-800">
                    <span>SallyBoy is rolling dough</span>
                    <span className="flex gap-0.5 mt-1">
                      <span className="w-1 h-1 bg-red-500 rounded-full animate-bounce"></span>
                      <span className="w-1 h-1 bg-red-500 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                      <span className="w-1 h-1 bg-red-500 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                    </span>
                  </div>
                </div>
              )}
              
              <div ref={chatEndRef}></div>
            </div>

            {/* Quick Helper Prompts */}
            <div className="px-3 py-1.5 bg-zinc-950 border-t border-zinc-900 scrollbar overflow-x-auto flex gap-2 shrink-0 select-none">
              {[
                "Specialty Pizzas?",
                "Deliver to Neptune?",
                "Catering details?",
                "Oven temp?"
              ].map((q, i) => (
                <button
                  key={i}
                  onClick={() => handleQuickQuestion(q)}
                  className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-white px-2.5 py-1 rounded-full text-[10px] shrink-0 transition-all font-mono"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Footer Input Box */}
            <form onSubmit={handleSendMessage} className="p-3 bg-zinc-950 border-t border-zinc-900 flex gap-2 shrink-0">
              <input
                type="text"
                placeholder="Ask about slices, toppings, ingredients..."
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                className="flex-grow bg-zinc-900 border border-zinc-850 px-3.5 py-2 rounded-xl text-xs text-zinc-200 placeholder-zinc-650 focus:outline-none focus:border-red-500"
              />
              <button
                type="submit"
                className="bg-red-600 hover:bg-red-500 text-white px-3 py-2 rounded-xl flex items-center justify-center transition-colors cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
              </button>
            </form>

          </div>
        )}

        {/* Mascot Toggle Button Button */}
        <button
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="relative group p-4 bg-red-650 bg-red-600 hover:bg-red-500 text-white rounded-full shadow-2xl transition-all duration-300 border border-red-500 cursor-pointer hover:scale-105 z-55 flex items-center justify-center"
          aria-label="Toggle AI Mascot Chat"
        >
          {isChatOpen ? <X className="w-6 h-6 animate-spin [animation-duration:8s]" /> : <Pizza className="w-6 h-6 rotate-12 group-hover:rotate-45 transition-transform" />}
          {!isChatOpen && (
            <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full border border-zinc-950 font-bold uppercase tracking-wider animate-pulse font-mono">
              Ask SallyBoy
            </span>
          )}
        </button>

      </div>

      {/* --- CART DRAWER SLIDE OUT --- */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/75 backdrop-blur-sm">
          
          <div className="w-full max-w-md bg-zinc-950 border-l border-zinc-850 border-zinc-800 p-6 flex flex-col justify-between shadow-2xl animate-in slide-in-from-right duration-300">
            
            {/* Header */}
            <div className="flex justify-between items-center border-b border-zinc-900 pb-4 shrink-0">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-red-500" />
                <h3 className="font-display font-black text-xl text-white">Your Order Checkout</h3>
                <span className="bg-red-500/10 text-red-500 text-[10px] font-bold font-mono px-2 py-0.5 rounded-full">
                  {cartCount} items
                </span>
              </div>
              <button 
                onClick={() => {
                  setIsCartOpen(false);
                  setCheckoutStep("none");
                }}
                className="p-1 rounded-full text-zinc-500 hover:text-white hover:bg-zinc-900 transition-colors cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Body Feed / Checkout forms */}
            <div className="flex-1 overflow-y-auto py-4 scrollbar">
              
              {checkoutStep === "none" && (
                <>
                  {cart.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-20 select-none">
                      <div className="w-14 h-14 bg-zinc-900 text-zinc-650 text-zinc-500 rounded-full flex items-center justify-center border border-zinc-800">
                        <Pizza className="w-8 h-8" />
                      </div>
                      <div className="space-y-1">
                        <span className="font-display font-medium text-white text-sm block">Your Cart is Empty</span>
                        <p className="text-xs text-zinc-500 max-w-xs">
                          No items loaded yet. Explore our Menu or Pizza Builder and lock down a hot slice of Jersey!
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          setIsCartOpen(false);
                          setActiveTab("menu");
                        }}
                        className="px-4 py-2 bg-red-650 bg-red-600 hover:bg-red-500 text-white rounded-xl text-xs font-bold transition-transform cursor-pointer"
                      >
                        Explore Slices
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {cart.map((item) => (
                        <div 
                          key={item.id}
                          className="p-4 bg-zinc-900/40 rounded-2xl border border-zinc-900 flex justify-between gap-4"
                        >
                          <div className="space-y-1.5 flex-grow">
                            <div className="flex justify-between items-start gap-2">
                              <span className="font-display font-bold text-sm text-white">
                                {item.menuItem ? item.menuItem.name : `Custom ${item.customPizza?.size} Pizza`}
                              </span>
                              <span className="font-mono text-xs font-bold text-zinc-300">
                                ${item.totalPrice}
                              </span>
                            </div>

                            {/* Details for custom pizza */}
                            {item.customPizza && (
                              <div className="text-[10px] text-zinc-500 leading-relaxed space-y-0.5">
                                <span className="block capitalize font-semibold text-zinc-400">
                                  Crust: {item.customPizza.crust} | Sauce: {item.customPizza.sauce}
                                </span>
                                <span className="block text-red-400 font-bold">
                                  Toppings: {item.customPizza.toppings.join(", ")}
                                </span>
                              </div>
                            )}

                            {/* Preparations instructions notes */}
                            {item.notes && (
                              <div className="text-[10px] text-zinc-500 bg-zinc-950/40 py-1 px-2 rounded-lg border border-zinc-900 flex gap-1.5">
                                <span className="font-fold text-red-500 uppercase font-bold text-[9px] font-mono shrink-0">Req:</span>
                                <p className="italic truncate">{item.notes}</p>
                              </div>
                            )}

                            {/* Quantity Controls */}
                            <div className="flex justify-between items-center pt-2 gap-4">
                              <button 
                                onClick={() => handleRemoveItem(item.id)}
                                className="text-zinc-650 text-red-500/60 hover:text-red-500 p-1 rounded-lg text-[10px] font-bold flex items-center gap-1 cursor-pointer"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                                Remove
                              </button>

                              <div className="flex items-center gap-2 bg-zinc-950 border border-zinc-900 px-2 py-1 rounded-xl">
                                <button 
                                  onClick={() => handleUpdateQty(item.id, -1)}
                                  className="p-1 text-zinc-400 hover:text-white cursor-pointer"
                                  aria-label="Decrease quantity"
                                >
                                  <Minus className="w-3 h-3" />
                                </button>
                                <span className="font-mono text-xs text-white px-1.5">{item.quantity}</span>
                                <button 
                                  onClick={() => handleUpdateQty(item.id, 1)}
                                  className="p-1 text-zinc-400 hover:text-white cursor-pointer"
                                  aria-label="Increase quantity"
                                >
                                  <Plus className="w-3 h-3" />
                                </button>
                              </div>
                            </div>

                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}

              {checkoutStep === "details" && (
                <form id="checkoutForm" onSubmit={executeSimulatedCheckout} className="space-y-4 animate-in fade-in duration-200 text-left">
                  <div className="space-y-1 bg-zinc-950/40 p-4 border border-zinc-900 rounded-2xl">
                    <h4 className="font-display font-medium text-sm text-white">Simulate Delivery Receipt</h4>
                    <p className="text-[10px] text-zinc-500">
                      No credit card details required. Lock in your local pickup or delivery information to build an order receipt!
                    </p>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest block">Recipient Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sal Boyd"
                      value={checkoutForm.name}
                      onChange={(e) => setCheckoutForm(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl text-xs py-2.5 px-3 focus:outline-none focus:border-red-500 text-zinc-200"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest block">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="(732) 555-5555"
                      value={checkoutForm.phone}
                      onChange={(e) => setCheckoutForm(prev => ({ ...prev, phone: e.target.value }))}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl text-xs py-2.5 px-3 focus:outline-none focus:border-red-500 text-zinc-200"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest block">Delivery Method</label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setCheckoutForm(prev => ({ ...prev, method: "delivery" }))}
                        className={`p-2 rounded-xl text-xs font-bold font-mono transition-colors border ${
                          checkoutForm.method === "delivery"
                            ? "border-red-500 bg-red-950/20 text-white"
                            : "border-zinc-800 text-zinc-550 hover:text-zinc-300"
                        }`}
                      >
                        Delivery (+$2.99)
                      </button>
                      <button
                        type="button"
                        onClick={() => setCheckoutForm(prev => ({ ...prev, method: "pickup" }))}
                        className={`p-2 rounded-xl text-xs font-bold font-mono transition-colors border ${
                          checkoutForm.method === "pickup"
                            ? "border-red-500 bg-red-950/20 text-white"
                            : "border-zinc-800 text-zinc-550 hover:text-zinc-300"
                        }`}
                      >
                        Counter Pickup
                      </button>
                    </div>
                  </div>

                  {checkoutForm.method === "delivery" && (
                    <div className="space-y-2">
                      <label className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest block">Logistical Address *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. 5th Avenue Beach Lifeguard Chair, Asbury Park..."
                        value={checkoutForm.address}
                        onChange={(e) => setCheckoutForm(prev => ({ ...prev, address: e.target.value }))}
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-xl text-xs py-2.5 px-3 focus:outline-none focus:border-red-500 text-zinc-200"
                      />
                    </div>
                  )}

                </form>
              )}

              {checkoutStep === "receipt" && receipt && (
                <div className="space-y-4 text-center py-4 animate-in zoom-in-95 duration-200 text-left">
                  <div className="w-11 h-11 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto border border-green-500/20 mb-2">
                    <CheckCircle className="w-6 h-6 animate-pulse" />
                  </div>
                  
                  <div className="text-center space-y-1 mb-4">
                    <h3 className="font-display font-extrabold text-lg text-white">Order Receipt Generated!</h3>
                    <p className="text-[10px] text-zinc-400 leading-relaxed font-semibold">
                      Your woodfired slices have been locked into the baking queue!
                    </p>
                  </div>

                  {/* Receipt Paper */}
                  <div className="border border-zinc-800 bg-zinc-950 rounded-2xl p-5 space-y-4 font-mono text-xs relative overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-red-600"></div>

                    <div className="flex justify-between items-center text-[10px] text-zinc-500 border-b border-zinc-900 pb-2">
                      <span>ORDER ID: {receipt.orderId}</span>
                      <span>TIME: {receipt.timestamp}</span>
                    </div>

                    <div className="space-y-1 text-[11px] text-zinc-400 border-b border-zinc-900 pb-2">
                      <span className="block text-[10px] text-zinc-600 uppercase">RECIPIENT</span>
                      <span className="font-sans font-bold text-white text-sm block">{receipt.clientName}</span>
                      <span>{receipt.clientPhone}</span>
                      <p className="truncate mt-0.5">{receipt.clientAddress}</p>
                    </div>

                    <div className="space-y-2 border-b border-zinc-900 pb-2">
                      <span className="block text-[10px] text-zinc-600 uppercase">SPECIALTY PIES & DISHES</span>
                      {receipt.items.map((item: any, idx: number) => (
                        <div key={idx} className="flex justify-between text-[11px] text-zinc-300">
                          <span>{item.quantity}x {item.menuItem ? item.menuItem.name : `Custom ${item.customPizza?.size} Pie`}</span>
                          <span>${item.totalPrice}</span>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-1 text-zinc-400 border-b border-zinc-900 pb-2">
                      <div className="flex justify-between">
                        <span>Checkout Subtotal:</span>
                        <span>${receipt.subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>NJ State Tax (7.25%):</span>
                        <span>${receipt.tax.toFixed(2)}</span>
                      </div>
                      {receipt.deliveryFee > 0 && (
                        <div className="flex justify-between">
                          <span>Warm Transport:</span>
                          <span>${receipt.deliveryFee.toFixed(2)}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex justify-between items-baseline font-sans">
                      <span className="text-zinc-500 font-bold text-xs uppercase tracking-wider font-mono">Receipt Total Cash</span>
                      <span className="text-xl font-display font-extrabold text-red-500 font-mono">
                        ${receipt.total.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <p className="text-[10px] text-zinc-500 text-center leading-relaxed">
                    Giada Boyd or our delivery operators will contact you shortly if any specifications arise. For immediate status logs, call us at <span className="text-red-400">(732) 567-4009</span>.
                  </p>

                </div>
              )}

            </div>

            {/* Sticky Pricing and Submit in Drawer */}
            {cart.length > 0 && (
              <div className="pt-4 border-t border-zinc-900 space-y-3 shrink-0">
                <div className="flex justify-between items-baseline">
                  <span className="text-sm text-zinc-400">Total subtotal:</span>
                  <span className="text-xl font-display font-bold text-white font-mono">
                    ${cartSubtotal.toFixed(2)}
                  </span>
                </div>

                {checkoutStep === "none" && (
                  <button
                    onClick={() => setCheckoutStep("details")}
                    className="w-full py-3.5 bg-red-650 bg-red-600 hover:bg-red-550 hover:bg-red-500 text-white rounded-2xl text-xs font-bold uppercase tracking-widest font-mono transition-transform cursor-pointer flex justify-center items-center gap-1.5"
                  >
                    Proceed To Details <span>→</span>
                  </button>
                )}

                {checkoutStep === "details" && (
                  <button
                    type="submit"
                    form="checkoutForm"
                    className="w-full py-3.5 bg-red-650 bg-red-600 hover:bg-red-550 hover:bg-red-500 text-white rounded-2xl text-xs font-bold uppercase tracking-widest font-mono transition-transform cursor-pointer flex justify-center items-center gap-1.5"
                  >
                    Generate SJP Receipt
                  </button>
                )}
              </div>
            )}

            {checkoutStep === "receipt" && (
              <div className="pt-4 border-t border-zinc-900 shrink-0">
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    setCheckoutStep("none");
                    setReceipt(null);
                  }}
                  className="w-full py-3.5 bg-zinc-900 hover:bg-zinc-850 text-zinc-200 border border-zinc-800 rounded-2xl text-xs font-bold uppercase tracking-widest font-mono transition-transform cursor-pointer"
                >
                  Close Receipt Screen
                </button>
              </div>
            )}

          </div>

        </div>
      )}

    </div>
  );
}

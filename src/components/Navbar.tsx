import { useState } from "react";
import { Pizza, Phone, ShoppingBag, Menu, X } from "lucide-react";

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  cartCount: number;
  openCart: () => void;
}

export default function Navbar({ activeTab, setActiveTab, cartCount, openCart }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { id: "home", label: "Home" },
    { id: "menu", label: "Menu" },
    { id: "about", label: "About Us" },
    { id: "order", label: "Order Online" },
    { id: "catering", label: "Catering" },
    { id: "contact", label: "Contact" },
  ];

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-zinc-100 select-none shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          
          {/* Logo & Brand */}
          <div 
            onClick={() => handleTabChange("home")}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-[#C82333] flex items-center justify-center text-white transition-all duration-300">
                <span className="font-display font-bold text-xl italic">S</span>
              </div>
              <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#C82333] rounded-full animate-ping"></div>
            </div>
            
            <div className="flex flex-col">
              <span className="font-display font-black text-2xl tracking-tighter uppercase italic text-[#1A1A1A] flex items-center gap-1 leading-none">
                SALLY <span className="text-[#C82333]">JOE</span>
              </span>
              <span className="text-[9px] font-mono uppercase tracking-[0.22em] text-zinc-400 font-bold leading-none mt-1">
                Asbury Park, NJ
              </span>
            </div>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1.5">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleTabChange(link.id)}
                className={`px-4 py-2 rounded-sm text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                  activeTab === link.id
                    ? "bg-[#C82333] text-white shadow-md shadow-red-100"
                    : "text-zinc-700 hover:text-[#C82333] hover:bg-zinc-50"
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Action CTA */}
          <div className="flex items-center gap-3">
            {/* Call Button (Linked) */}
            <a
              href="tel:7325674009"
              className="hidden lg:flex items-center gap-2 bg-zinc-50 border border-zinc-200 text-zinc-800 px-4 py-2.5 rounded-sm text-xs font-bold uppercase tracking-wider transition-all duration-300 hover:bg-zinc-100"
            >
              <Phone className="w-3.5 h-3.5 text-[#C82333] animate-bounce" />
              <span className="font-mono text-xs">(732) 567-4009</span>
            </a>

            {/* Cart Button */}
            <button
              onClick={openCart}
              className="relative p-2.5 rounded-sm bg-zinc-50 hover:bg-zinc-100 border border-zinc-250 border-zinc-200 text-[#1A1A1A] transition-all duration-300 cursor-pointer"
              aria-label="View Cart"
            >
              <ShoppingBag className="w-5 h-5 text-zinc-700" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#C82333] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border border-white shadow-md animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-sm text-zinc-600 hover:text-[#C82333] hover:bg-zinc-50 transition-colors"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-zinc-100 py-4 px-6 space-y-2 shadow-lg animate-in slide-in-from-top duration-300">
          <div className="flex flex-col gap-1.5">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleTabChange(link.id)}
                className={`w-full text-left px-4 py-3 rounded-sm text-sm font-bold uppercase tracking-wider transition-all ${
                  activeTab === link.id
                    ? "bg-[#C82333] text-white"
                    : "text-zinc-700 hover:text-[#C82333] hover:bg-zinc-50"
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-4 border-t border-zinc-100 flex flex-col gap-2">
            <a
              href="tel:7325674009"
              className="flex items-center justify-center gap-2 bg-zinc-550 bg-zinc-100 border border-zinc-200 text-zinc-800 py-3 rounded-sm text-xs font-bold uppercase tracking-wider"
            >
              <Phone className="w-4 h-4 text-[#C82333]" />
              <span className="font-mono">(732) 567-4009</span>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}

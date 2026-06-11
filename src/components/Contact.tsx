import { useState, FormEvent } from "react";
import { Phone, Mail, MapPin, Clock, Send, MessageSquare, ShieldCheck } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "Ordering Inquiry",
    message: ""
  });

  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill in high-priority fields!");
      return;
    }

    setFormSubmitted(true);
  };

  const contactItems = [
    {
      icon: <Phone className="w-5 h-5 text-[#C82333]" />,
      title: "Call Us Direct",
      value: "(732) 567-4009",
      href: "tel:7325674009",
      desc: "For rapid phone orders, takeout status, or quick questions."
    },
    {
      icon: <Mail className="w-5 h-5 text-[#C82333]" />,
      title: "Shoot An Email",
      value: "1800salboyd@gmail.com",
      href: "mailto:1800salboyd@gmail.com",
      desc: "For administrative concerns, catering estimates, and general info."
    },
    {
      icon: <MapPin className="w-5 h-5 text-[#C82333]" />,
      title: "Locate The Oven",
      value: "Asbury Park, NJ",
      href: "https://maps.google.com/?q=Asbury+Park+Boardwalk,+NJ",
      desc: "Just blocks from the beach, close to the beautiful music venues."
    }
  ];

  return (
    <div className="space-y-16 py-4 text-[#1A1A1A]">
      
      {/* Title Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="inline-block px-3 py-1 bg-[#C82333]/5 border border-[#C82333]/25 text-[#C82333] rounded-sm text-xs font-mono uppercase tracking-widest font-bold">
          Find Sally Joe
        </span>
        <h1 className="text-4xl md:text-5xl font-display font-medium text-[#1A1A1A] tracking-tight">
          VISIT OR <span className="text-[#C82333] font-bold">PING US</span>
        </h1>
        <p className="text-zinc-650 text-zinc-500 text-base md:text-lg">
          Grab a piping hot wood-fired pie on your way back from the surf or order direct delivery to stay cozy inside. We represent Asbury Park flavor live.
        </p>
      </div>

      {/* Grid Layout: Map & Info Left, Form Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Contact Info & Map - Col Span 6 */}
        <div className="lg:col-span-6 space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {contactItems.map((item, index) => (
              <a 
                key={index}
                href={item.href}
                className="glass-card p-5 rounded-sm flex flex-col justify-between glass-card-hover border border-zinc-150"
              >
                <div className="p-2.5 bg-[#C82333]/5 text-[#C82333] rounded-sm w-10 h-10 flex items-center justify-center mb-4 transition-all group-hover:scale-110 border border-[#C82333]/15">
                  {item.icon}
                </div>
                <div className="text-left">
                  <h3 className="font-display font-medium text-sm text-[#1A1A1A]">{item.title}</h3>
                  <span className="text-xs text-[#C82333] font-mono font-bold mt-1 block truncate">
                    {item.value}
                  </span>
                  <p className="text-[10px] text-zinc-500 leading-relaxed mt-2 font-sans">
                    {item.desc}
                  </p>
                </div>
              </a>
            ))}
          </div>

          {/* Business Hours Panel */}
          <div className="glass-card rounded-sm p-6 relative overflow-hidden border border-zinc-150 text-left">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#C82333]/5 rounded-full filter blur-xl"></div>
            
            <div className="flex items-center gap-2.5 border-b border-zinc-100 pb-3 mb-4">
              <Clock className="w-5 h-5 text-[#C82333]" />
              <h3 className="font-display font-medium text-base text-[#1A1A1A]">Baking Schedule</h3>
            </div>

            <div className="grid grid-cols-2 gap-4 font-mono text-xs">
              <div className="space-y-1.5 p-2 bg-zinc-50 rounded-sm border border-zinc-150">
                <span className="text-zinc-500 font-bold block">SUN - THU</span>
                <span className="text-[#1A1A1A] block font-bold text-sm">11:00 AM - 10:00 PM</span>
              </div>
              <div className="space-y-1.5 p-2 bg-[#C82333]/5 rounded-sm border border-[#C82333]/15">
                <span className="text-[#C82333] font-bold block">FRI - SAT (Late Night)</span>
                <span className="text-[#1A1A1A] block font-bold text-sm">11:00 AM - 11:00 PM</span>
              </div>
            </div>

            <div className="text-[11px] text-zinc-500 leading-relaxed mt-4 font-sans">
              * Delivery operations start at 11:30 AM daily and conclude 30 minutes prior to oven shut-down. Available for delivery inside Asbury Park, Ocean Grove, Bradley Beach, and Neptune.
            </div>
          </div>

          {/* Embedded Custom Map Container */}
          <div className="glass-card rounded-sm p-2 relative overflow-hidden h-[245px] border border-zinc-150">
            <div className="map-container w-full h-full rounded-sm overflow-hidden bg-zinc-150 relative">
              <iframe
                title="Google Map location Asbury Park Boardwalk"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m13!1d3056.8123286017124!2d-74.0142!3d40.2204!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c227ae45f94ad3%3A0xe5a36329fe7924af!2sAsbury%20Park%20Boardwalk!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
                className="w-full h-full border-none opacity-90 hover:opacity-100 transition-opacity"
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

        </div>

        {/* Contact Form Block - Col Span 6 */}
        <div className="lg:col-span-6 bg-zinc-50 border border-zinc-150 rounded-sm p-6 md:p-8 space-y-6 shadow-sm">
          <div className="text-left">
            <h2 className="font-display font-medium text-2xl text-[#1A1A1A]">Direct Message</h2>
            <p className="text-xs text-zinc-500 mt-1">Shoot a message directly into our kitchen. We love customer logs.</p>
          </div>

          {formSubmitted ? (
            <div className="bg-green-50 border border-green-200 rounded-sm p-6 text-center space-y-4 py-8 animate-in zoom-in-95 duration-300">
              <div className="w-12 h-12 bg-green-100 text-green-700 rounded-full flex items-center justify-center mx-auto border border-green-200 shadow-sm">
                <ShieldCheck className="w-6 h-6 animate-pulse" />
              </div>
              <div className="space-y-1">
                <h3 className="font-display font-medium text-lg text-[#1A1A1A]">Message Log Dispatched</h3>
                <p className="text-xs text-zinc-500 max-w-sm mx-auto font-sans leading-relaxed">
                  We have logged your ping successfully. Our kitchen manager will review and email you back at <span className="text-[#C82333] font-bold">{formData.email}</span>.
                </p>
              </div>
              <button
                onClick={() => {
                  setFormSubmitted(false);
                  setFormData({ name: "", email: "", phone: "", subject: "Ordering Inquiry", message: "" });
                }}
                className="px-4 py-2 bg-zinc-950 hover:bg-black text-white rounded-sm text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
              >
                Send Another Log
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div className="space-y-2">
                <label className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest block text-left">Your Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sal Boyd"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full bg-white border border-zinc-200 rounded-sm text-sm py-2.5 px-4 focus:outline-none focus:border-[#C82333] text-[#1A1A1A]"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest block text-left">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="name@gmail.com"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full bg-white border border-zinc-200 rounded-sm text-sm py-2.5 px-4 focus:outline-none focus:border-[#C82333] text-[#1A1A1A]"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest block text-left">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="(732) 555-5555"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full bg-white border border-zinc-200 rounded-sm text-sm py-2.5 px-4 focus:outline-none focus:border-[#C82333] text-[#1A1A1A]"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest block text-left">Subject Log</label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                  className="w-full bg-white border border-zinc-200 rounded-sm text-sm py-2.5 px-4 focus:outline-none focus:border-[#C82333] text-[#1A1A1A]"
                >
                  <option value="Ordering Inquiry">Online Ordering Status</option>
                  <option value="Catering Package">Catering Custom Event Plan</option>
                  <option value="Feedback / Review">Pizza Customer Feedback</option>
                  <option value="Supplier / Partner">Fresh Ingredient Supplier partnership</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest block text-left">Write Message *</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Hey SallyBoy, what goes into the spicy vodka sauce...?"
                  value={formData.message}
                  onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  className="w-full bg-white border border-zinc-200 rounded-sm text-sm py-2.5 px-4 focus:outline-none focus:border-[#C82333] text-[#1A1A1A]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-[#C82333] hover:bg-[#b01e2c] text-white rounded-sm font-bold uppercase tracking-wider transition-all shadow-md text-xs flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                Dispatch Message Block
              </button>

            </form>
          )}

        </div>

      </div>

    </div>
  );
}

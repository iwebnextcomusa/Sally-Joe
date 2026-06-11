import { useState, useMemo, FormEvent } from "react";
import { CATERING_PACKAGES } from "../data";
import { Calendar, Users, Briefcase, Mail, Check, PartyPopper } from "lucide-react";

export default function Catering() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    guests: 20,
    packageId: "cat-1",
    venue: "",
    notes: ""
  });

  const [submittedTicket, setSubmittedTicket] = useState<any | null>(null);

  const selectedPackage = useMemo(() => {
    return CATERING_PACKAGES.find((pkg) => pkg.id === formData.packageId) || CATERING_PACKAGES[0];
  }, [formData.packageId]);

  // Calculate dynamic pricing estimate
  const pricingEstimate = useMemo(() => {
    const rate = selectedPackage.pricePerPerson;
    const baseTotal = rate * formData.guests;
    // Add 7% Jersey sales tax and 18% event service fee
    const tax = baseTotal * 0.0725;
    const fee = baseTotal * 0.18;
    const grandTotal = baseTotal + tax + fee;

    return {
      subtotal: parseFloat(baseTotal.toFixed(2)),
      tax: parseFloat(tax.toFixed(2)),
      serviceFee: parseFloat(fee.toFixed(2)),
      total: parseFloat(grandTotal.toFixed(2))
    };
  }, [selectedPackage, formData.guests]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.date) {
      alert("Please fill in all required fields!");
      return;
    }

    // Set submitted inquiry ticket
    setSubmittedTicket({
      id: "SJP-" + Math.floor(Math.random() * 90000 + 10000),
      clientName: formData.name,
      clientEmail: formData.email,
      clientPhone: formData.phone,
      eventDate: formData.date,
      guestCount: formData.guests,
      packageName: selectedPackage.name,
      estimatedTotal: pricingEstimate.total,
      notes: formData.notes
    });
  };

  return (
    <div className="space-y-16 py-4 text-[#1A1A1A]">
      
      {/* Title Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="inline-block px-3 py-1 bg-[#C82333]/5 border border-[#C82333]/25 text-[#C82333] rounded-sm text-xs font-mono uppercase tracking-widest font-bold">
          Asbury private catering
        </span>
        <h1 className="text-4xl md:text-5xl font-display font-medium text-[#1A1A1A] tracking-tight">
          CRAFT PIZZA FOR <span className="text-[#C82333] font-bold">LEGENDARY EVENTS</span>
        </h1>
        <p className="text-zinc-650 text-zinc-500 text-base md:text-lg">
          Whether backing up rock bands backstage at the Stone Pony, feeding corporate groups on beachside blankets, or celebrating with friends—we scale true NY pizza and Italian specialties for any crowd size.
        </p>
      </div>

      {/* Packages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {CATERING_PACKAGES.map((pkg) => (
          <div 
            key={pkg.id}
            className="glass-card rounded-sm p-6 flex flex-col justify-between glass-card-hover relative overflow-hidden border border-zinc-150"
          >
            {pkg.id === "cat-2" && (
              <div className="absolute top-0 right-0 bg-[#C82333] text-white font-mono uppercase tracking-wider text-[10px] font-bold px-4 py-1.5 rounded-bl-sm shadow-sm">
                Most Popular
              </div>
            )}

            <div className="space-y-6 text-left">
              <div>
                <h3 className="font-display font-medium text-xl text-[#1A1A1A]">{pkg.name}</h3>
                <p className="text-xs text-zinc-500 mt-1 min-h-[32px]">{pkg.description}</p>
              </div>

              {/* Pricing banner */}
              <div className="py-4 border-y border-zinc-100 flex justify-between items-baseline">
                <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 font-bold">Guest Rate</span>
                <div>
                  <span className="text-3xl font-display font-extrabold text-[#C82333] font-mono">${pkg.pricePerPerson}</span>
                  <span className="text-xs text-zinc-400 font-bold"> / guest</span>
                </div>
              </div>

              {/* Menu Inclusions */}
              <div className="space-y-3">
                <span className="text-xs font-mono uppercase font-black text-[#C82333] tracking-wider block">Package Inclusions:</span>
                <ul className="space-y-2">
                  {pkg.includes.map((inc, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-zinc-600">
                      <Check className="w-3.5 h-3.5 text-[#C82333] shrink-0 mt-0.5" />
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-zinc-100">
              <button
                onClick={() => setFormData(prev => ({ ...prev, packageId: pkg.id }))}
                className={`w-full py-2.5 rounded-sm text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  formData.packageId === pkg.id
                    ? "bg-[#C82333] text-white shadow-md"
                    : "bg-zinc-100 border border-zinc-200 text-zinc-700 hover:bg-zinc-200"
                }`}
              >
                Select Package
              </button>
              <span className="text-[10px] font-mono text-zinc-400 font-bold text-center block mt-2">
                Minimum guests requirement: {pkg.minimumGuests}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Inquiry Form Block */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Form Panel - Col Span 7 */}
        <div className="lg:col-span-7 bg-zinc-50 border border-zinc-150 rounded-sm p-6 md:p-8 space-y-6 shadow-sm">
          <div className="text-left">
            <h2 className="font-display font-medium text-2xl text-[#1A1A1A]">Event Catering Inquiry</h2>
            <p className="text-xs text-zinc-500 mt-1">Fill out your logistics below. Let's design a custom feed schedule!</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest block text-left">Phone Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="(732) 555-5555"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  className="w-full bg-white border border-zinc-200 rounded-sm text-sm py-2.5 px-4 focus:outline-none focus:border-[#C82333] text-[#1A1A1A]"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest block text-left">Event Date *</label>
                <input
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                  className="w-full bg-white border border-zinc-200 rounded-sm text-sm py-2.5 px-4 focus:outline-none focus:border-[#C82333] text-[#1A1A1A] font-mono"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest block text-left">Guests Estimate *</label>
                <input
                  type="number"
                  required
                  min={selectedPackage.minimumGuests}
                  max={500}
                  value={formData.guests}
                  onChange={(e) => setFormData(prev => ({ ...prev, guests: parseInt(e.target.value) || 20 }))}
                  className="w-full bg-white border border-zinc-200 rounded-sm text-sm py-2.5 px-4 focus:outline-none focus:border-[#C82333] text-[#1A1A1A] font-mono"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest block text-left">Event Venue & Address</label>
              <input
                type="text"
                placeholder="e.g. Asbury Boardwalk Pavilion, Backstage Stone Pony..."
                value={formData.venue}
                onChange={(e) => setFormData(prev => ({ ...prev, venue: e.target.value }))}
                className="w-full bg-white border border-zinc-200 rounded-sm text-sm py-2.5 px-4 focus:outline-none focus:border-[#C82333] text-[#1A1A1A]"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest block text-left">Special Instructions or Custom Dish Requests</label>
              <textarea
                rows={3}
                placeholder="List any severe allergies, special topping additions..."
                value={formData.notes}
                onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                className="w-full bg-white border border-zinc-200 rounded-sm text-sm py-2.5 px-4 focus:outline-none focus:border-[#C82333] text-[#1A1A1A]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-[#C82333] hover:bg-[#b01e2c] text-white rounded-sm font-bold uppercase tracking-wider transition-all shadow-md text-xs cursor-pointer"
            >
              Submit Live Logistical Plan
            </button>
          </form>
        </div>

        {/* Right Pricing Estimator - Col Span 5 */}
        <div className="lg:col-span-5 bg-[#FDFCFB] border border-zinc-200/80 rounded-sm p-6 space-y-6 shadow-sm text-left">
          <div className="border-b border-zinc-150 pb-3">
            <h3 className="font-display font-medium text-lg text-[#1A1A1A]">Live Cost Estimator</h3>
            <p className="text-xs text-zinc-400">Calculated instantly for selected package</p>
          </div>

          <div className="space-y-4 font-mono text-xs">
            
            <div className="flex justify-between items-center text-zinc-500 font-semibold">
              <span>Selected Plan:</span>
              <span className="font-sans font-bold text-[#1A1A1A] text-right">{selectedPackage.name}</span>
            </div>

            <div className="flex justify-between items-center text-zinc-500 font-semibold">
              <span>Guest Coverage:</span>
              <span className="text-[#1A1A1A] font-bold font-sans">{formData.guests} people</span>
            </div>

            <div className="flex justify-between items-center text-zinc-500 font-semibold">
              <span>Rate Per Guest:</span>
              <span className="text-[#1A1A1A] font-bold">${selectedPackage.pricePerPerson.toFixed(2)}</span>
            </div>

            <div className="border-t border-zinc-150 pt-3 flex justify-between items-center text-zinc-500 font-semibold">
              <span>Subtotal:</span>
              <span className="text-[#1A1A1A] font-bold">${pricingEstimate.subtotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between items-center text-zinc-500">
              <span>NJ Sales Tax (7.25%):</span>
              <span className="text-[#1A1A1A]">${pricingEstimate.tax.toFixed(2)}</span>
            </div>

            <div className="flex justify-between items-center text-zinc-500 font-semibold">
              <span>Operations Fee (18%):</span>
              <span className="text-[#1A1A1A]">${pricingEstimate.serviceFee.toFixed(2)}</span>
            </div>

            <div className="border-t border-zinc-150 pt-4 flex justify-between items-center">
              <span className="text-xs font-sans font-extrabold uppercase tracking-wider text-zinc-500">Total Estimated Cost:</span>
              <span className="text-2xl font-display font-bold text-[#C82333]">
                ${pricingEstimate.total.toFixed(2)}
              </span>
            </div>
          </div>

          <div className="p-4 bg-zinc-50 rounded-sm border border-zinc-150 text-[11px] text-zinc-500 leading-relaxed font-sans">
            * Estimates are subject to minor modifications based on weekend peak scheduling, holiday booking premiums, or extensive custom food selections. Inquiry submission reserves your schedule slot temporarily.
          </div>
        </div>

      </div>

      {/* Submitted Ticket Modal Overlay */}
      {submittedTicket && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="relative max-w-lg w-full bg-white border border-zinc-200 rounded-sm p-6 md:p-8 space-y-6 shadow-xl overflow-hidden text-left">
            
            {/* Background design line */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#C82333]"></div>
            
            <div className="text-center space-y-2">
              <div className="w-14 h-14 bg-green-50 text-green-700 rounded-full flex items-center justify-center mx-auto mb-2 border border-green-200">
                <PartyPopper className="w-8 h-8 animate-bounce" />
              </div>
              <h3 className="font-display font-medium text-2xl text-[#1A1A1A]">Event Log Block Locked!</h3>
              <p className="text-xs text-zinc-500">SallyBoy is spinning fresh dough for you already.</p>
            </div>

            {/* Simulated Printed Ticket */}
            <div className="border border-dashed border-zinc-200 bg-zinc-50 rounded-sm p-5 space-y-4 font-mono text-xs">
              <div className="flex justify-between text-[11px] text-zinc-400 border-b border-zinc-150 pb-2">
                <span>INQUIRY CODE: {submittedTicket.id}</span>
                <span>STATUS: QUEUED</span>
              </div>

              <div className="grid grid-cols-2 gap-y-3 gap-x-2 pt-2 text-zinc-600">
                <div>
                  <span className="text-zinc-400 text-[10px] block font-bold">CLIENT</span>
                  <span className="font-bold font-sans text-sm text-[#1A1A1A]">{submittedTicket.clientName}</span>
                </div>
                <div>
                  <span className="text-zinc-400 text-[10px] block font-bold">EVENT DATE</span>
                  <span className="font-bold text-[#1A1A1A]">{submittedTicket.eventDate}</span>
                </div>
                <div>
                  <span className="text-zinc-400 text-[10px] block font-bold">GUESTS COVERED</span>
                  <span className="font-bold text-[#1A1A1A]">{submittedTicket.guestCount} People</span>
                </div>
                <div>
                  <span className="text-zinc-400 text-[10px] block font-bold">PLAN PACK</span>
                  <span className="font-bold font-sans text-[#1A1A1A] truncate">{submittedTicket.packageName}</span>
                </div>
              </div>

              <div className="border-t border-zinc-200 pt-3 flex justify-between items-baseline">
                <span className="text-zinc-400 font-bold uppercase text-[10px]">ESTIMATED TOTAL</span>
                <span className="text-lg font-display font-bold text-green-750 font-sans text-emerald-700">
                  ${submittedTicket.estimatedTotal.toFixed(2)}
                </span>
              </div>
            </div>

            <p className="text-xs text-zinc-500 text-center leading-relaxed font-sans">
              We've dispatched a copy of this logistics blueprint to <span className="text-[#C82333] font-bold">{submittedTicket.clientEmail}</span>. Our event coordinator will ping you within 24 hours at <span className="text-[#C82333] font-bold">{submittedTicket.clientPhone}</span>.
            </p>

            <button
              onClick={() => setSubmittedTicket(null)}
              className="w-full py-3 bg-zinc-900 hover:bg-black text-white rounded-sm text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
            >
              Close Inquiry Portal
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

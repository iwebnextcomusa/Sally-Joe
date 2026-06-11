import { Pizza, Sparkles, Heart, Utensils } from "lucide-react";

export default function AboutUs() {
  const values = [
    {
      icon: <Sparkles className="w-5 h-5 text-[#C82333]" />,
      title: "Wood-Fired Mastery",
      description: "Our proprietary brick ovens burn seasoned local oak and cherry woods at intense 850° temperatures. This seals moisture rapidly, creating that legendary charred leopard-spotting, chewy bubble, and crispy bite."
    },
    {
      icon: <Heart className="w-5 h-5 text-[#C82333]" />,
      title: "Garden State Produce",
      description: "We are obsessed with local soil. During summer harvest, we source the absolute sweet plum tomatoes from family farms in Central Jersey, and hand-stretch mozzarella curd daily."
    },
    {
      icon: <Utensils className="w-5 h-5 text-[#C82333]" />,
      title: "Asbury Music Heritage",
      description: "We aren't just in Asbury Park—we are fueled by its rhythm. Over forty years of backstage deliveries, Late-night feeding for surfers and guitars, and support for local beach cleanups."
    }
  ];

  return (
    <div className="space-y-16 py-4 text-[#1A1A1A]">
      
      {/* Dynamic Title Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="inline-block px-3 py-1 bg-[#C82333]/5 border border-[#C82333]/25 text-[#C82333] rounded-sm text-xs font-mono uppercase tracking-widest font-bold leading-none">
          Est. 1982
        </span>
        <h1 className="text-4xl md:text-5xl font-display font-medium text-[#1A1A1A] tracking-tight">
          THE LEGEND OF <span className="text-[#C82333] font-bold">SALLY JOE</span>
        </h1>
        <p className="text-zinc-650 text-zinc-500 text-base md:text-lg">
          We bring Jersey Shore grit, wood-fired flames, and fresh garden tomatoes together just blocks from the legendary Asbury Park boardwalk.
        </p>
      </div>

      {/* Narrative grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-zinc-50 border border-zinc-200/85 rounded-sm p-6 md:p-10 relative overflow-hidden">
        
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#C82333]/5 rounded-full filter blur-3xl pointer-events-none"></div>

        {/* Narrative Copy - Col Span 7 */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center gap-1.5 text-[#C82333] font-mono text-xs uppercase font-extrabold tracking-widest">
            <Pizza className="w-4 h-4" />
            Decades of dough and devotion
          </div>

          <h2 className="font-display font-medium text-3xl text-[#1A1A1A]">Sal Boyd's Backstage Secret</h2>
          
          <div className="space-y-4 text-zinc-600 text-sm leading-relaxed font-sans">
            <p>
              In the late autumn of 1982, Salvatore "Sally Boy" Boyd combined his two life-long passions: high-octane Jersey Shore rock & roll and the generational art of authentic pizza making. Starting with a tiny converted cart parked outside late-night music clubs, Sal kept Asbury's legendary musicians and rowdy rock crowds fueled with crispy, charred crusts and boiling hot, sweet red sauce.
            </p>
            <p>
              Sal's secret lay in his slow-fermented, high-hydration dough process and simple, pure sauce made from local Jersey tomatoes, which he called "Garden State gold." By maintaining a scorching 850-degree brick oven, he realized he could bake a perfect wood-fired thin pie in under 90 seconds flat—perfect for immediate takeout.
            </p>
            <p>
              Today, Sally Joe Pizza is led by Sal's daughter Giada Boyd and his son Joe under the same exact directives. We have grown into a beautiful neighborhood meeting spot just blocks from the beach, but our legacy of fast, authentic, piping hot slices remains completely unchanged.
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row gap-6 shrink-0">
            <div>
              <span className="text-3xl font-display font-medium text-[#C82333] font-mono">40+</span>
              <span className="text-xs text-zinc-400 block font-mono uppercase tracking-wider font-bold mt-1">Years of baking</span>
            </div>
            <div>
              <span className="text-3xl font-display font-medium text-[#C82333] font-mono">850°</span>
              <span className="text-xs text-zinc-400 block font-mono uppercase tracking-wider font-bold mt-1">Woodfired ovens</span>
            </div>
            <div>
              <span className="text-3xl font-display font-medium text-[#C82333] font-mono">100%</span>
              <span className="text-xs text-zinc-400 block font-mono uppercase tracking-wider font-bold mt-1">Jersey Devotion</span>
            </div>
          </div>
        </div>

        {/* Graphic elements - Col Span 5 */}
        <div className="lg:col-span-5 space-y-4">
          <div className="glass-card rounded-sm p-6 flex items-start gap-4 glass-card-hover border border-zinc-150">
            <span className="text-3xl">🍅</span>
            <div className="space-y-1">
              <span className="text-xs font-mono uppercase tracking-widest font-extrabold text-[#C82333] block">Sweet Plum Tomatoes</span>
              <p className="text-xs text-zinc-500 leading-relaxed">
                Hand-crushed, sweet Jersey tomatoes—no thick tomato paste or artificial sweeteners. Just pure sun-ripened Garden State brightness.
              </p>
            </div>
          </div>

          <div className="glass-card rounded-sm p-6 flex items-start gap-4 glass-card-hover border border-zinc-150">
            <span className="text-3xl">🌾</span>
            <div className="space-y-1">
              <span className="text-xs font-mono uppercase tracking-widest font-extrabold text-[#C82333] block">72-Hour Fermented Dough</span>
              <p className="text-xs text-zinc-500 leading-relaxed">
                High-protein artisan flour slow-fermented at precise cool temperatures. Enhances digestability and deepens wheat aroma.
              </p>
            </div>
          </div>

          <div className="glass-card rounded-sm p-6 flex items-start gap-4 glass-card-hover border border-zinc-150">
            <span className="text-3xl">🧀</span>
            <div className="space-y-1">
              <span className="text-xs font-mono uppercase tracking-widest font-extrabold text-[#C82333] block">Hand-Stretched Curd</span>
              <p className="text-xs text-zinc-500 leading-relaxed">
                Fresh, moist whole milk curd hand-pulled within hours of baking. Creates that pristine milky melt and glorious cheese pull.
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* Values highlight */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {values.map((v, i) => (
          <div 
            key={i} 
            className="glass-card p-6 rounded-sm space-y-3 glass-card-hover border border-zinc-150"
          >
            <div className="p-3 bg-[#C82333]/5 text-[#C82333] border border-[#C82333]/15 rounded-sm w-11 h-11 flex items-center justify-center">
              {v.icon}
            </div>
            <h3 className="font-display font-medium text-lg text-[#1A1A1A]">{v.title}</h3>
            <p className="text-xs text-zinc-500 leading-relaxed">{v.description}</p>
          </div>
        ))}
      </div>

    </div>
  );
}

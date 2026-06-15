import React, { useState, useEffect, useRef } from 'react';

// --- Custom Hooks ---

// Hook for Intersection Observer (Scroll Reveal)
function useIntersectionObserver(options = { threshold: 0.1, rootMargin: "0px" }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const currentRef = ref.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
      }
    }, options);

    observer.observe(currentRef);
    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [options.threshold, options.rootMargin]);

  return [ref, isVisible];
}

// --- Reusable & Interactive Components ---

const RevealText = ({ text, className = "" }) => {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });
  const words = text.split(' ');

  return (
    <p ref={ref} className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden align-top">
          <span
            className={`inline-block transition-all duration-700 ease-out will-change-[transform,opacity] ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-10 translate-y-4'
            }`}
            style={{ transitionDelay: `${i * 12}ms` }}
          >
            {word}&nbsp;
          </span>
        </span>
      ))}
    </p>
  );
};

const GlowCard = ({ children, className = "" }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef(null);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={ref}
      className={`relative p-[1px] bg-gradient-to-b from-white/10 to-transparent group ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        '--x': `${mousePos.x}px`,
        '--y': `${mousePos.y}px`,
      }}
    >
      <div
        className="absolute inset-0 z-0 transition-opacity duration-300 pointer-events-none mix-blend-screen glow-card-bg"
        style={{ opacity: isHovered ? 1 : 0 }}
      />
      {children}
    </div>
  );
};

// --- Training Programs (blueprint data — Tara replaces with her own later) ---
const PROGRAMS = [
  {
    id: "TR-P01",
    title: "1:1 Private Coaching",
    category: "Karate",
    price: 75,
    rating: 5.0,
    stock: 3,
    colors: ["#E11D48", "#1E1E1E", "#E2E2E2"],
    desc: "Fully personalised coaching built around your body, your goals and your pace — karate, the sword, or both. Technical work, kata and conditioning in a focused one-on-one setting.",
    image: "https://images.unsplash.com/photo-1656653121931-fb0c1a239c09?q=80&w=800&auto=format&fit=crop",
    specs: { length: "60 min", level: "All levels", focus: "Technique & Precision", format: "Private 1:1" }
  },
  {
    id: "KA-02",
    title: "Karate Fundamentals",
    category: "Karate",
    price: 28,
    rating: 4.9,
    stock: 6,
    colors: ["#E11D48", "#111111"],
    desc: "Kihon, kata and kumite, broken down. Clean stances, sharp technique and the discipline of the form — taught with patience and intent.",
    image: "https://images.unsplash.com/photo-1525198104776-f6e8a873f9b7?q=80&w=800&auto=format&fit=crop",
    specs: { length: "75 min", level: "Beginner — Intermediate", focus: "Kihon & Kata", format: "Small group" }
  },
  {
    id: "IAI-03",
    title: "Iaido — The Drawn Sword",
    category: "Sword",
    price: 34,
    rating: 5.0,
    stock: 4,
    colors: ["#E11D48", "#3A3A3C"],
    desc: "The art of drawing, cutting and resheathing the katana in a single calm motion. Precision, posture and the meditative discipline of the blade.",
    image: "https://images.unsplash.com/photo-1569995617877-d845becc0d40?q=80&w=800&auto=format&fit=crop",
    specs: { length: "75 min", level: "All levels", focus: "The Draw & The Cut", format: "Small group" }
  },
  {
    id: "KEN-04",
    title: "Kenjutsu — Partnered Blade",
    category: "Sword",
    price: 36,
    rating: 4.9,
    stock: 5,
    colors: ["#E11D48", "#1E1E1E"],
    desc: "Two-person sword work with bokken and katana. Distance, timing and control under pressure — the living application of the sword arts.",
    image: "https://images.unsplash.com/photo-1754474541446-965c3e5d8f22?q=80&w=800&auto=format&fit=crop",
    specs: { length: "75 min", level: "Intermediate", focus: "Distance & Timing", format: "Paired drills" }
  },
  {
    id: "TR-S05",
    title: "Strength & Conditioning",
    category: "Conditioning",
    price: 30,
    rating: 4.8,
    stock: 8,
    colors: ["#E11D48", "#1E1E1E"],
    desc: "Martial-arts-built strength — compound movement, explosive power and core control that translate directly into sharper technique and a more resilient body.",
    image: "https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=800&auto=format&fit=crop",
    specs: { length: "60 min", level: "Intermediate", focus: "Strength & Power", format: "Small group" }
  },
  {
    id: "ZEN-06",
    title: "Breath & Stillness",
    category: "Mindset",
    price: 18,
    rating: 4.9,
    stock: 0, // Fully booked demo
    colors: ["#737373", "#1E1E1E"],
    desc: "Zanshin — composure under pressure is a skill. Breath control, focus drills and the meditative side of budō; train your nervous system the way you train your body.",
    image: "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?q=80&w=800&auto=format&fit=crop",
    specs: { length: "40 min", level: "All levels", focus: "Focus & Calm", format: "Group class" }
  }
];

const SLOTS = ["Mon 07:00", "Tue 18:30", "Wed 12:00", "Thu 18:30", "Fri 07:00", "Sat 09:00", "Sat 11:00"];

// --- Page Sections ---

const Navbar = ({ cartCount, onCartToggle }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <nav
      className={`relative z-40 flex items-center justify-between px-6 py-6 border-b border-line bg-base/90 backdrop-blur-md transition-all duration-1000 ease-expo-out ${
        mounted ? 'translate-y-0 opacity-100' : '-translate-y-8 opacity-0'
      }`}
    >
      {/* Structural Corner Marks */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-muted/30"></div>
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-muted/30"></div>

      <div className="flex items-center gap-4">
        <div className="w-2.5 h-2.5 bg-accent rounded-sm animate-pulse"></div>
        <div className="text-xs uppercase tracking-widest font-light text-primary">
          Tara Dijkstra <span className="text-muted ml-2">Karate &amp; Swordsmanship</span>
        </div>
      </div>

      <div className="hidden md:flex space-x-12">
        <a href="#vision" className="text-xs uppercase tracking-widest text-muted hover:text-primary transition-colors font-light">Philosophy</a>
        <a href="#collection" className="text-xs uppercase tracking-widest text-muted hover:text-primary transition-colors font-light text-accent">Programs</a>
        <a href="#protocols" className="text-xs uppercase tracking-widest text-muted hover:text-primary transition-colors font-light">The Method</a>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={onCartToggle}
          aria-label="Toggle Booking"
          className="relative flex items-center gap-2 text-xs uppercase tracking-widest border border-line px-4 py-2 hover:bg-surface hover:text-primary transition-all duration-300 font-light rounded-sm group"
        >
          <iconify-icon icon="solar:calendar-mark-linear" className="text-sm group-hover:text-accent transition-colors"></iconify-icon>
          <span>Book</span>
          <span className="ml-1 px-1.5 py-0.5 bg-accent/20 text-accent text-[10px] rounded-full font-medium">
            {cartCount}
          </span>
        </button>
      </div>
    </nav>
  );
};

const Hero = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-[85vh] flex flex-col justify-end p-6 md:p-12 border-b border-line overflow-hidden group">
      {/* Full-bleed hero media — kinetic katana loop, exactly like the original template's video background */}
      <div className="absolute inset-0 z-[-1] opacity-35">
        <video
          src="/hero-katana.mp4"
          poster="/hero-katana-poster.jpg"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover grayscale mix-blend-screen"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-base via-base/70 to-transparent"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end relative z-10">
        <div className="md:col-span-5 flex flex-col gap-10 pb-2">
          <div
            className={`space-y-4 max-w-[340px] transition-all duration-1000 delay-500 ease-expo-out ${
              mounted ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
          >
            <div className="text-xs uppercase tracking-widest font-light text-accent border-l border-accent pl-4">001 — Karateka · Swordswoman</div>
            <p className="text-xs tracking-widest uppercase font-light leading-relaxed text-primary/80">
              Traditional karate and the art of the Japanese sword. Kihon, kata and kumite meet iaido and kenjutsu — a practice built on precision, discipline and stillness.
            </p>
          </div>

          <div
            className={`transition-all duration-1000 delay-700 ease-expo-out ${
              mounted ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
          >
            <a
              href="#collection"
              className="inline-block relative p-[1px] bg-gradient-to-r from-accent/50 via-white/10 to-transparent overflow-hidden group hover:from-accent transition-all duration-500 rounded-sm"
            >
              <div className="relative bg-surface px-8 py-4 flex items-center gap-4 transition-colors group-hover:bg-black">
                <span className="w-1.5 h-1.5 bg-accent group-hover:bg-white transition-colors rounded-full animate-ping"></span>
                <span className="text-xs font-light uppercase tracking-widest text-primary">Enter The Dōjō</span>
              </div>
            </a>
          </div>
        </div>

        <div className="md:col-span-7 flex flex-col items-start md:items-end w-full">
          <h1 className="text-5xl md:text-[7.5vw] leading-[0.85] tracking-tighter font-light uppercase w-full md:text-right">
            <span className="block overflow-hidden align-top">
              <span className={`inline-block transition-all duration-[1.2s] ease-expo-out delay-200 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}>
                Steel
              </span>
            </span>
            <span className="block overflow-hidden align-top">
              <span className={`inline-block text-muted transition-all duration-[1.2s] ease-expo-out delay-300 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}>
                &amp; Spirit
              </span>
            </span>
          </h1>
        </div>
      </div>
    </section>
  );
};

const TrainingGallery = () => {
  const disciplines = [
    { name: "Karate", image: "https://images.unsplash.com/photo-1656653121931-fb0c1a239c09?q=80&w=800&auto=format&fit=crop" },
    { name: "Iaido", image: "https://images.unsplash.com/photo-1569995617877-d845becc0d40?q=80&w=800&auto=format&fit=crop" },
    { name: "Kenjutsu", image: "https://images.unsplash.com/photo-1754474541446-965c3e5d8f22?q=80&w=800&auto=format&fit=crop" },
    { name: "The Sword", image: "https://images.unsplash.com/photo-1754474517176-336e31a15e04?q=80&w=800&auto=format&fit=crop" },
    { name: "Discipline", image: "https://images.unsplash.com/photo-1525198104776-f6e8a873f9b7?q=80&w=800&auto=format&fit=crop" },
    { name: "Conditioning", image: "https://images.unsplash.com/photo-1521804906057-1df8fdb718b7?q=80&w=800&auto=format&fit=crop" }
  ];

  return (
    <section className="py-12 border-b border-line overflow-hidden relative flex flex-col gap-6 z-10 bg-base">
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-base to-transparent z-10 pointer-events-none"></div>
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-base to-transparent z-10 pointer-events-none"></div>

      <div className="px-6 md:px-12 flex justify-between items-center opacity-70">
        <div className="text-xs uppercase tracking-widest font-light text-muted flex items-center gap-2">
          <iconify-icon icon="solar:plain-linear" className="text-accent"></iconify-icon>
          002 — Inside The Dōjō
        </div>
        <div className="text-xs uppercase tracking-widest font-light text-muted hidden md:block">In Session</div>
      </div>

      <div className="flex gap-4 py-2 overflow-hidden relative">
        <div className="animate-marquee">
          {[...disciplines, ...disciplines].map((d, idx) => (
            <div key={idx} className="relative group p-[1px] bg-gradient-to-b from-white/10 to-transparent w-[260px] h-[150px] flex-shrink-0 mx-2 overflow-hidden">
              <img
                src={d.image}
                className="w-full h-full object-cover bg-surface grayscale hover-grayscale-0 transition-all duration-700 cursor-crosshair scale-110 group-hover:scale-100"
                alt={d.name}
              />
              <div className="absolute bottom-3 left-3 bg-base/80 backdrop-blur-sm px-2.5 py-1 border border-line rounded-sm">
                <span className="text-[10px] uppercase tracking-widest text-primary font-light">{d.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Vision = () => {
  return (
    <section id="vision" className="relative py-28 px-6 md:px-12 border-b border-line bg-base">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 w-full max-w-6xl mx-auto">
        <div className="md:col-span-4 flex flex-col justify-start border-l border-line pl-6 relative">
          <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-muted/50 -translate-x-[1px] -translate-y-[1px]"></div>

          <div className="text-xs uppercase tracking-widest font-light text-muted mb-8">003 — Training Philosophy</div>

          {/* Framed portrait */}
          <div className="p-[1px] bg-gradient-to-b from-white/15 to-transparent w-full aspect-[4/5] relative group">
            <div className="absolute top-2 left-2 w-1.5 h-1.5 bg-accent z-10"></div>
            <div className="absolute bottom-2 right-2 w-1.5 h-1.5 bg-accent z-10"></div>
            <div className="w-full h-full bg-surface relative overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=1000&auto=format&fit=crop"
                alt="Tara Dijkstra training"
                className="w-full h-full object-cover grayscale opacity-60 group-hover:scale-105 group-hover:opacity-100 transition-all duration-1000 ease-out"
              />
            </div>
          </div>
        </div>

        <div className="md:col-span-8 flex flex-col justify-center pt-8 md:pt-0 md:pl-12">
          <h2 className="text-3xl md:text-5xl font-light uppercase tracking-tighter leading-tight mb-8">
            Empty Hand. <span className="text-muted">Drawn</span><br/>Blade.
          </h2>
          <RevealText
            className="text-base md:text-lg font-light leading-relaxed text-muted max-w-2xl"
            text="I teach karate and the Japanese sword the way the old schools intended — with patience, precision and respect for the craft. Every session moves from kihon and kata to kumite, from the first silent draw of the blade to controlled partner work. This is budō: training that sharpens the body, steadies the breath and builds a mind that stays calm under pressure."
          />
        </div>
      </div>
    </section>
  );
};

const Protocols = () => {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });

  const systems = [
    {
      id: "SYS.01",
      title: "Karate — Kihon & Kata",
      desc: "Stance, footwork and clean technique come first. We drill the fundamentals of karate — kihon, kata and kumite — until form becomes instinct: not just harder, but sharper and more precise."
    },
    {
      id: "SYS.02",
      title: "The Sword — Iaido & Kenjutsu",
      desc: "The art of the Japanese blade. From the silent draw of iaido to controlled partner work in kenjutsu, you learn distance, timing and absolute command of the katana."
    },
    {
      id: "SYS.03",
      title: "Breath & Stillness",
      desc: "Zanshin — the calm, alert mind. Breathwork, mobility and the meditative side of budō that keeps you composed under pressure and training for the long game."
    }
  ];

  return (
    <section id="protocols" className="py-0 border-b border-line bg-base">
      <div className="px-6 md:px-12 py-10 border-b border-line flex justify-between items-center bg-surface/30">
        <div className="text-xs uppercase tracking-widest font-light text-muted flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-accent"></span>
          004 — The Method
        </div>
        <div className="w-2.5 h-2.5 border border-muted/50 rounded-xs"></div>
      </div>

      <div className="flex flex-col" ref={ref}>
        {systems.map((sys, idx) => (
          <div
            key={sys.id}
            className={`group border-b border-line hover:bg-surface transition-all duration-700 ease-out cursor-cell relative ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            }`}
            style={{ transitionDelay: `${idx * 120}ms` }}
          >
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-accent/0 group-hover:bg-accent transition-all duration-300"></div>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 py-10 px-6 md:px-12 items-start relative z-10">
              <div className="md:col-span-2 text-xs tracking-widest uppercase text-accent font-light mt-1">{sys.id}</div>
              <div className="md:col-span-4">
                <h3 className="text-xl md:text-2xl font-light uppercase tracking-tighter group-hover:text-white transition-colors">{sys.title}</h3>
              </div>
              <div className="md:col-span-6">
                <p className="text-sm text-muted font-light leading-relaxed group-hover:text-primary/90 transition-colors max-w-lg">{sys.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

// --- Training Programs Section ---
const ProgramCollection = ({ onAddToCart, onQuickView }) => {
  const [filter, setFilter] = useState("All");
  const [sortBy, setSortBy] = useState("default");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSlots, setSelectedSlots] = useState({});
  const [selectedColors, setSelectedColors] = useState({});

  const categories = ["All", "Karate", "Sword", "Conditioning", "Mindset"];

  const handleSlotSelect = (programId, slot) => {
    setSelectedSlots(prev => ({ ...prev, [programId]: slot }));
  };

  const handleColorSelect = (programId, color) => {
    setSelectedColors(prev => ({ ...prev, [programId]: color }));
  };

  // Filter & Search Logic
  let filteredPrograms = PROGRAMS.filter(p => {
    const matchesCategory = filter === "All" || p.category === filter;
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.specs.focus.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Sorting Logic
  if (sortBy === "price-asc") {
    filteredPrograms.sort((a, b) => a.price - b.price);
  } else if (sortBy === "price-desc") {
    filteredPrograms.sort((a, b) => b.price - a.price);
  } else if (sortBy === "rating") {
    filteredPrograms.sort((a, b) => b.rating - a.rating);
  }

  return (
    <section id="collection" className="py-24 px-6 md:px-12 bg-base relative border-b border-line">
      {/* Visual Anchor Corners */}
      <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-muted/20"></div>
      <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-muted/20"></div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 border-b border-line pb-10 gap-6">
        <div>
          <div className="text-xs uppercase tracking-widest font-light text-accent mb-4 flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-accent rounded-full"></span>
            005 — Current Programs
          </div>
          <h2 className="text-4xl md:text-6xl font-light uppercase tracking-tighter">Training Programs</h2>
          <p className="text-xs text-muted uppercase tracking-widest mt-2 font-light">Sessions for every level. Reserve your spot and start where you are.</p>
        </div>

        {/* Categories Controls */}
        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 text-xs uppercase tracking-widest transition-all duration-300 border ${
                filter === cat
                  ? "bg-accent text-white border-accent font-medium"
                  : "border-line text-muted hover:text-primary hover:border-muted"
              } rounded-sm`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Advanced Controls: Search & Sort Row */}
      <div className="w-full bg-[#080808] p-4 md:p-6 mb-10 rounded-2xl border border-line">
        <div className="mx-auto flex flex-col md:flex-row max-w-7xl items-center gap-4">

          {/* Search Input */}
          <div className="relative w-full md:flex-1">
            <svg
              className="pointer-events-none absolute left-6 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-300"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round"
                d="m21 21-4.35-4.35M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z" />
            </svg>

            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="SEARCH PROGRAMS, FOCUS, DISCIPLINE..."
              className="h-16 w-full rounded-2xl border border-white/10 bg-white/[0.04] pl-16 pr-16 text-sm uppercase tracking-[0.18em] text-zinc-100 placeholder:text-zinc-500 outline-none transition duration-300 focus:border-white/25 focus:bg-white/[0.07]"
            />

            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-6 top-1/2 -translate-y-1/2 text-[10px] uppercase tracking-widest text-zinc-500 hover:text-white transition-colors"
              >
                Clear
              </button>
            )}
          </div>

          {/* Dropdown */}
          <div className="relative w-full md:w-[380px]">
            <svg
              className="pointer-events-none absolute left-6 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-300"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M8 7V3m8 4V3M4 11h16M5 5h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z" />
            </svg>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="h-16 w-full appearance-none rounded-2xl border border-white/10 bg-white/[0.04] pl-16 pr-14 text-sm uppercase tracking-[0.18em] text-zinc-100 outline-none transition duration-300 focus:border-white/25 focus:bg-white/[0.07] cursor-pointer"
            >
              <option value="default" className="bg-[#080808]">Recommended</option>
              <option value="rating" className="bg-[#080808]">Highest Rated</option>
              <option value="price-asc" className="bg-[#080808]">Price Low to High</option>
              <option value="price-desc" className="bg-[#080808]">Price High to Low</option>
            </select>

            <svg
              className="pointer-events-none absolute right-6 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-300"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6" />
            </svg>
          </div>

        </div>
      </div>

      {/* Empty Search Result feedback */}
      {filteredPrograms.length === 0 && (
        <div className="text-center py-20 border border-line bg-surface/30">
          <iconify-icon icon="solar:box-broken" className="text-4xl text-muted/30 mb-4"></iconify-icon>
          <p className="text-xs uppercase tracking-widest text-muted">No programs match your search.</p>
          <button
            onClick={() => { setFilter("All"); setSearchQuery(""); }}
            className="mt-4 px-4 py-2 border border-line text-[10px] uppercase tracking-widest text-accent hover:bg-accent/10 transition-all rounded-sm"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Interactive Programs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {filteredPrograms.map((program) => {
          const currentSlot = selectedSlots[program.id] || "Thu 18:30";
          const currentColor = selectedColors[program.id] || program.colors[0];
          const isFullyBooked = program.stock === 0;

          return (
            <GlowCard key={program.id} className="h-full">
              <div className="relative z-10 bg-surface p-6 md:p-8 border border-line h-full flex flex-col justify-between">

                {/* Program Meta Header */}
                <div className="flex justify-between items-start border-b border-line pb-4 mb-6">
                  <div>
                    <h3 className="text-xl md:text-2xl font-light uppercase tracking-tight flex items-center gap-3">
                      {program.title}
                      {isFullyBooked && (
                        <span className="text-[10px] bg-red-950 text-red-400 border border-red-900 px-2 py-0.5 rounded-sm font-medium tracking-widest uppercase">
                          Fully Booked
                        </span>
                      )}
                      {program.stock > 0 && program.stock <= 3 && (
                        <span className="text-[10px] bg-yellow-950 text-yellow-400 border border-yellow-900 px-2 py-0.5 rounded-sm font-medium tracking-widest uppercase animate-pulse">
                          Few Spots
                        </span>
                      )}
                    </h3>
                    <p className="text-xs text-muted mt-1 uppercase tracking-widest font-light">
                      {program.category} — {program.id}
                    </p>
                  </div>
                  <div className="text-lg font-light text-primary border border-line px-3 py-1 bg-base">
                    €{program.price}
                  </div>
                </div>

                {/* Main Program Image Frame */}
                <div className="w-full aspect-[4/3] bg-base p-[1px] relative overflow-hidden group/img mb-6 rounded-sm">
                  <img
                    src={program.image}
                    className={`w-full h-full object-cover transition-all duration-[1s] scale-105 group-hover/img:scale-100 ${
                      isFullyBooked ? "grayscale opacity-30" : "grayscale opacity-70 group-hover/img:grayscale-0 group-hover/img:opacity-100"
                    }`}
                    alt={program.title}
                  />

                  {/* Visual UI Brackets */}
                  <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-white/50 z-20 pointer-events-none transition-opacity opacity-0 group-hover/img:opacity-100"></div>
                  <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-white/50 z-20 pointer-events-none transition-opacity opacity-0 group-hover/img:opacity-100"></div>

                  {/* Rating Tag */}
                  <div className="absolute top-4 right-4 bg-base/85 border border-line backdrop-blur-md px-2 py-1 text-[9px] uppercase tracking-widest text-accent font-medium z-10 flex items-center gap-1.5">
                    <iconify-icon icon="solar:star-bold" className="text-yellow-500 text-xs"></iconify-icon>
                    <span>{program.rating}</span>
                  </div>
                </div>

                <p className="text-xs text-muted font-light leading-relaxed mb-6">
                  {program.desc}
                </p>

                {/* Intensity Selector & Spots Tag */}
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-muted mb-2 block font-medium">Select Intensity:</span>
                    <div className="flex gap-2">
                      {program.colors.map((c) => (
                        <button
                          key={c}
                          onClick={() => handleColorSelect(program.id, c)}
                          style={{ backgroundColor: c }}
                          className={`w-5 h-5 rounded-full border-2 transition-all ${
                            currentColor === c ? "border-accent scale-110" : "border-transparent"
                          }`}
                          title={`Intensity ${c}`}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="text-right text-[10px] uppercase tracking-widest text-muted font-light">
                    {isFullyBooked ? "Join Waitlist" : `${program.stock} spots left`}
                  </div>
                </div>

                {/* Time Slot Interface */}
                <div className="mb-6">
                  <div className="text-[10px] uppercase tracking-widest text-muted mb-2 font-medium">Select Time Slot:</div>
                  <div className="flex flex-wrap gap-1.5">
                    {SLOTS.map(slot => (
                      <button
                        key={slot}
                        disabled={isFullyBooked}
                        onClick={() => handleSlotSelect(program.id, slot)}
                        className={`text-[10px] px-2 py-1 border transition-all duration-200 ${
                          currentSlot === slot
                            ? "border-accent bg-accent/10 text-primary font-medium"
                            : "border-line text-muted hover:text-primary hover:border-muted disabled:opacity-30 disabled:pointer-events-none"
                        } rounded-xs`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Action Controls */}
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-line">
                  <button
                    onClick={() => onQuickView(program)}
                    className="text-xs uppercase tracking-widest py-3 px-4 border border-line hover:border-muted text-muted hover:text-primary transition-all rounded-sm flex items-center justify-center gap-2 font-light"
                  >
                    <iconify-icon icon="solar:document-text-linear" className="text-sm"></iconify-icon>
                    View Details
                  </button>
                  <button
                    disabled={isFullyBooked}
                    onClick={() => onAddToCart(program, currentSlot, currentColor)}
                    className={`text-xs uppercase tracking-widest py-3 px-4 font-medium transition-all rounded-sm flex items-center justify-center gap-2 ${
                      isFullyBooked
                        ? "bg-muted/10 text-muted border border-line cursor-not-allowed"
                        : "bg-accent hover:bg-accent/80 text-white"
                    }`}
                  >
                    <iconify-icon icon="solar:calendar-add-linear" className="text-sm"></iconify-icon>
                    {isFullyBooked ? "Fully booked" : "Reserve Spot"}
                  </button>
                </div>

              </div>
            </GlowCard>
          );
        })}
      </div>
    </section>
  );
};

// --- Program Details Modal ---
const DetailsModal = ({ program, onClose }) => {
  if (!program) return null;

  return (
    <div className="fixed inset-0 bg-base/90 backdrop-blur-lg z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="relative bg-surface border border-line max-w-2xl w-full p-6 md:p-8 rounded-sm animate-fade-in shadow-2xl">

        {/* Corner Decorators */}
        <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-accent -translate-x-1 -translate-y-1"></div>
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-accent translate-x-1 translate-y-1"></div>

        <div className="flex justify-between items-start border-b border-line pb-4 mb-6">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-accent font-medium">PROGRAM DETAILS</span>
            <h3 className="text-2xl font-light uppercase tracking-tighter mt-1">{program.title}</h3>
          </div>
          <button
            onClick={onClose}
            className="text-muted hover:text-primary text-2xl transition-colors"
            aria-label="Close modal"
          >
            <iconify-icon icon="solar:close-square-linear"></iconify-icon>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="aspect-square bg-base p-1 border border-line rounded-sm overflow-hidden">
            <img src={program.image} className="w-full h-full object-cover grayscale opacity-90" alt={program.title} />
          </div>

          <div className="space-y-4 text-xs font-light">
            <div className="border-b border-line pb-2">
              <span className="text-muted uppercase tracking-widest">Session Length:</span>
              <p className="text-primary font-medium text-sm uppercase mt-0.5">{program.specs.length}</p>
            </div>
            <div className="border-b border-line pb-2">
              <span className="text-muted uppercase tracking-widest">Level:</span>
              <p className="text-primary font-medium text-sm uppercase mt-0.5">{program.specs.level}</p>
            </div>
            <div className="border-b border-line pb-2">
              <span className="text-muted uppercase tracking-widest">Focus:</span>
              <p className="text-primary font-medium text-sm uppercase mt-0.5">{program.specs.focus}</p>
            </div>
            <div className="border-b border-line pb-2">
              <span className="text-muted uppercase tracking-widest">Format:</span>
              <p className="text-primary font-medium text-sm uppercase mt-0.5">{program.specs.format}</p>
            </div>
            <div>
              <span className="text-muted uppercase tracking-widest">Good To Know:</span>
              <div className="flex gap-2 mt-2">
                <span className="px-2 py-1 bg-accent/10 border border-accent/20 text-accent rounded-xs text-[10px]">All Levels Welcome</span>
                <span className="px-2 py-1 bg-white/5 border border-line text-muted rounded-xs text-[10px]">Gi &amp; Bokken Provided</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-4 border-t border-line flex justify-between items-center text-[10px] uppercase tracking-widest text-muted">
          <span>Leeuwarden · Friesland</span>
          <button
            onClick={onClose}
            className="text-accent hover:text-white transition-colors"
          >
            Close details
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Interactive Booking Drawer & Checkout ---
const BookingDrawer = ({ isOpen, onClose, cart, onRemove, onUpdateQty, onCheckout, isCheckingOut }) => {
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", note: "" });
  const [errors, setErrors] = useState({});

  if (!isOpen) return null;

  const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const bookingFee = subtotal > 100 ? 0 : 5;
  const total = subtotal + bookingFee;

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const validateAndCheckout = (e) => {
    e.preventDefault();
    const tempErrors = {};
    if (!formData.name) tempErrors.name = "Your name is required";
    if (!formData.email || !formData.email.includes("@")) tempErrors.email = "Valid email is required";
    if (!formData.phone) tempErrors.phone = "Phone number is required";

    if (Object.keys(tempErrors).length > 0) {
      setErrors(tempErrors);
      return;
    }

    onCheckout();
  };

  return (
    <div className="fixed inset-0 z-50 bg-base/80 backdrop-blur-sm flex justify-end">
      {/* Tap out background */}
      <div className="absolute inset-0 cursor-pointer" onClick={onClose}></div>

      <div className="relative w-full max-w-md bg-surface border-l border-line h-full flex flex-col justify-between p-6 shadow-2xl animate-slide-left z-10 overflow-y-auto">
        <div>
          <div className="flex justify-between items-center border-b border-line pb-4 mb-6">
            <div className="flex items-center gap-3">
              <iconify-icon icon="solar:calendar-mark-linear" className="text-accent text-lg"></iconify-icon>
              <h3 className="text-lg uppercase tracking-widest font-light">Your Sessions</h3>
            </div>
            <button onClick={onClose} className="text-muted hover:text-primary transition-colors text-xl" aria-label="Close booking">
              <iconify-icon icon="solar:close-square-linear"></iconify-icon>
            </button>
          </div>

          {!showCheckoutForm ? (
            <>
              {cart.length === 0 ? (
                <div className="py-24 text-center space-y-4">
                  <iconify-icon icon="solar:calendar-minimalistic-linear" className="text-4xl text-muted/30"></iconify-icon>
                  <p className="text-xs uppercase tracking-widest text-muted font-light">No sessions reserved yet.</p>
                  <button
                    onClick={onClose}
                    className="text-xs uppercase tracking-widest text-accent font-medium hover:text-white transition-colors"
                  >
                    Browse Programs →
                  </button>
                </div>
              ) : (
                <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-2">
                  {cart.map((item) => (
                    <div key={`${item.id}-${item.size}-${item.color}`} className="flex gap-4 p-3 bg-base border border-line rounded-sm">
                      <img src={item.image} className="w-16 h-16 object-cover grayscale rounded-xs" alt={item.title} />
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start">
                            <h4 className="text-xs uppercase font-medium text-primary">{item.title}</h4>
                            <span className="text-xs font-light text-primary">€{item.price * item.quantity}</span>
                          </div>
                          <div className="flex gap-2 items-center text-[10px] text-muted uppercase tracking-widest mt-1">
                            <span>{item.size}</span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              Intensity
                              <span className="w-2.5 h-2.5 rounded-full border border-white/20" style={{ backgroundColor: item.color }} />
                            </span>
                          </div>
                        </div>

                        <div className="flex justify-between items-center mt-2">
                          <div className="flex items-center border border-line bg-surface rounded-xs">
                            <button
                              onClick={() => onUpdateQty(item.id, item.size, item.color, item.quantity - 1)}
                              className="px-2 py-0.5 text-xs text-muted hover:text-white"
                            >
                              -
                            </button>
                            <span className="px-2 text-xs text-primary font-medium">{item.quantity}</span>
                            <button
                              onClick={() => onUpdateQty(item.id, item.size, item.color, item.quantity + 1)}
                              className="px-2 py-0.5 text-xs text-muted hover:text-white"
                            >
                              +
                            </button>
                          </div>

                          <button
                            onClick={() => onRemove(item.id, item.size, item.color)}
                            className="text-[10px] uppercase tracking-widest text-muted hover:text-accent transition-colors"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : (
            // Checkout Form Step
            <form onSubmit={validateAndCheckout} className="space-y-4 animate-fade-in">
              <div className="flex justify-between items-center mb-4">
                <span className="text-[10px] uppercase tracking-widest text-accent font-medium">STEP 2: YOUR DETAILS</span>
                <button
                  type="button"
                  onClick={() => setShowCheckoutForm(false)}
                  className="text-[10px] uppercase tracking-widest text-muted hover:text-primary"
                >
                  ← Back
                </button>
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-widest text-muted block mb-1">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full bg-base border border-line text-xs py-2 px-3 text-primary uppercase tracking-widest focus:border-accent outline-none rounded-sm"
                />
                {errors.name && <span className="text-[10px] text-red-500 uppercase tracking-widest">{errors.name}</span>}
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-widest text-muted block mb-1">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full bg-base border border-line text-xs py-2 px-3 text-primary focus:border-accent outline-none rounded-sm"
                />
                {errors.email && <span className="text-[10px] text-red-500 uppercase tracking-widest">{errors.email}</span>}
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-widest text-muted block mb-1">Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full bg-base border border-line text-xs py-2 px-3 text-primary uppercase tracking-widest focus:border-accent outline-none rounded-sm"
                />
                {errors.phone && <span className="text-[10px] text-red-500 uppercase tracking-widest">{errors.phone}</span>}
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-widest text-muted block mb-1">Note (optional)</label>
                <input
                  type="text"
                  name="note"
                  value={formData.note}
                  onChange={handleInputChange}
                  placeholder="INJURIES, GOALS, EXPERIENCE..."
                  className="w-full bg-base border border-line text-xs py-2 px-3 text-primary uppercase tracking-widest placeholder:text-muted/60 focus:border-accent outline-none rounded-sm"
                />
              </div>

              <button
                type="submit"
                disabled={isCheckingOut}
                className="w-full py-4 bg-accent hover:bg-accent/80 transition-all text-white text-xs uppercase tracking-widest font-medium rounded-sm flex items-center justify-center gap-2"
              >
                {isCheckingOut ? (
                  <>
                    <iconify-icon icon="solar:refresh-linear" className="animate-spin"></iconify-icon>
                    Confirming...
                  </>
                ) : (
                  "Confirm Booking"
                )}
              </button>
            </form>
          )}
        </div>

        {cart.length > 0 && !showCheckoutForm && (
          <div className="border-t border-line pt-6 mt-6 space-y-4">
            <div className="space-y-2 text-xs font-light text-muted">
              <div className="flex justify-between">
                <span>Sessions Subtotal:</span>
                <span className="text-primary font-medium">€{subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Booking Fee:</span>
                <span className="text-primary font-medium">{bookingFee === 0 ? "Waived" : `€${bookingFee}`}</span>
              </div>
              <div className="flex justify-between border-t border-line pt-2 text-primary font-medium text-sm">
                <span>Total:</span>
                <span className="text-accent">€{total}</span>
              </div>
            </div>

            <button
              onClick={() => setShowCheckoutForm(true)}
              className="w-full relative p-[1px] bg-gradient-to-r from-accent via-blue-500 to-accent rounded-sm overflow-hidden group hover:opacity-90 transition-all duration-300"
            >
              <div className="bg-accent py-4 text-center text-xs uppercase tracking-widest font-medium text-white">
                Proceed to Booking
              </div>
            </button>
            <p className="text-[9px] uppercase tracking-widest text-center text-muted">
              No payment online — confirm your spot and pay at your first session.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

const Footer = () => (
  <footer className="border-t border-line bg-base pt-16 pb-8 px-6 md:px-12">
    <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
      <div className="md:col-span-5 space-y-6">
        <div className="flex items-center gap-4">
          <div className="w-2.5 h-2.5 bg-accent rounded-sm"></div>
          <div className="text-sm uppercase tracking-widest font-light text-primary">
            Tara Dijkstra <span className="text-muted ml-2">Karate &amp; Swordsmanship</span>
          </div>
        </div>
        <p className="text-xs tracking-widest uppercase font-light leading-relaxed text-muted max-w-sm">
          Traditional karate and Japanese swordsmanship for people who want to move with precision and stay calm under pressure. Kihon, kata, the blade and breath — taught with patience.
        </p>
      </div>

      <div className="md:col-span-3 space-y-4">
        <h4 className="text-[10px] uppercase tracking-widest text-accent font-medium mb-4">Explore</h4>
        <ul className="space-y-3">
          <li><a href="#vision" className="text-xs uppercase tracking-widest font-light text-muted hover:text-primary transition-colors">Philosophy</a></li>
          <li><a href="#protocols" className="text-xs uppercase tracking-widest font-light text-muted hover:text-primary transition-colors">The Method</a></li>
          <li><a href="#collection" className="text-xs uppercase tracking-widest font-light text-muted hover:text-primary transition-colors">Programs</a></li>
          <li><a href="#collection" className="text-xs uppercase tracking-widest font-light text-muted hover:text-primary transition-colors">Book a Session</a></li>
        </ul>
      </div>

      <div className="md:col-span-4 space-y-4">
        <h4 className="text-[10px] uppercase tracking-widest text-accent font-medium mb-4">Stay In Touch</h4>
        <p className="text-xs tracking-widest uppercase font-light text-muted mb-4">Training tips, new classes and open slots — straight to your inbox.</p>
        <div className="flex">
          <input
            type="email"
            placeholder="ENTER YOUR EMAIL"
            className="bg-surface border border-line text-xs py-3 px-4 text-primary uppercase tracking-widest focus:border-accent outline-none w-full rounded-l-sm"
          />
          <button className="bg-accent hover:bg-accent/80 transition-colors text-white px-4 border border-accent rounded-r-sm flex items-center justify-center">
            <iconify-icon icon="solar:arrow-right-linear" className="text-lg"></iconify-icon>
          </button>
        </div>
      </div>
    </div>

    <div className="border-t border-line pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
      <div className="flex gap-4 items-center">
        <div className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse"></div>
        <div className="text-[10px] md:text-xs uppercase tracking-widest font-light text-muted">
          © 2026 Tara Dijkstra · Leeuwarden, Friesland. All Rights Reserved.
        </div>
      </div>
      <div className="flex items-center gap-6 text-[10px] uppercase tracking-widest font-light">
        <a href="#" className="text-muted hover:text-primary transition-colors">Privacy</a>
        <a href="#" className="text-muted hover:text-primary transition-colors">Terms</a>
      </div>
      <div className="flex space-x-6">
        <a href="#" aria-label="Instagram" className="text-muted hover:text-accent transition-colors"><iconify-icon icon="solar:gallery-linear" className="text-lg"></iconify-icon></a>
        <a href="#" aria-label="Email" className="text-muted hover:text-accent transition-colors"><iconify-icon icon="solar:letter-linear" className="text-lg"></iconify-icon></a>
        <a href="#" aria-label="Location" className="text-muted hover:text-accent transition-colors"><iconify-icon icon="solar:map-arrow-square-linear" className="text-lg"></iconify-icon></a>
      </div>
    </div>
  </footer>
);

export default function App() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeDetails, setActiveDetails] = useState(null);
  const [toast, setToast] = useState(null);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  // Trigger temporary micro toasts
  const triggerToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3500);
  };

  const handleAddToCart = (program, slot, color) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === program.id && item.size === slot && item.color === color);
      if (existing) {
        return prev.map(item =>
          item.id === program.id && item.size === slot && item.color === color
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...program, size: slot, color, quantity: 1 }];
    });
    triggerToast(`Reserved: ${program.title} (${slot}) added to your sessions.`);
  };

  const handleRemoveFromCart = (id, size, color) => {
    setCart(prev => prev.filter(item => !(item.id === id && item.size === size && item.color === color)));
  };

  const handleUpdateQty = (id, size, color, qty) => {
    if (qty <= 0) {
      handleRemoveFromCart(id, size, color);
      return;
    }
    setCart(prev => prev.map(item =>
      item.id === id && item.size === size && item.color === color
        ? { ...item, quantity: qty }
        : item
    ));
  };

  const handleCheckoutSim = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setCart([]);
      setIsCartOpen(false);
      triggerToast("Booking confirmed. Tara will reach out to lock in your first session. Ref: TR-94819A.");
    }, 2000);
  };

  const totalCartItems = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <>
      <div className="bg-texture-overlay"></div>

      {/* Main Framed Container */}
      <div className="relative w-full max-w-[1440px] mx-auto min-h-screen flex flex-col z-0 border-x border-line">

        {/* Persistent Grid Guides */}
        <div className="absolute inset-0 pointer-events-none flex justify-evenly z-[-1] opacity-30">
          <div className="w-px h-full bg-line"></div>
          <div className="w-px h-full bg-line"></div>
          <div className="w-px h-full bg-line"></div>
        </div>

        {/* Structural Corner Markers */}
        <div className="fixed top-0 left-0 w-2 h-2 border border-accent bg-base -translate-x-[4px] -translate-y-[4px] z-50 xl:absolute xl:left-[calc(50%-720px)]"></div>
        <div className="fixed top-0 right-0 w-2 h-2 border border-accent bg-base translate-x-[4px] -translate-y-[4px] z-50 xl:absolute xl:right-[calc(50%-720px)]"></div>

        <Navbar cartCount={totalCartItems} onCartToggle={() => setIsCartOpen(!isCartOpen)} />

        <Hero />

        <TrainingGallery />

        <Vision />

        <Protocols />

        <ProgramCollection onAddToCart={handleAddToCart} onQuickView={setActiveDetails} />

        <Footer />

      </div>

      {/* Slide-over interactive Booking panel */}
      <BookingDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onRemove={handleRemoveFromCart}
        onUpdateQty={handleUpdateQty}
        onCheckout={handleCheckoutSim}
        isCheckingOut={isCheckingOut}
      />

      {/* Pop-up Program Details */}
      <DetailsModal
        program={activeDetails}
        onClose={() => setActiveDetails(null)}
      />

      {/* Toast Overlay */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 animate-slide-up max-w-sm">
          <div className="bg-surface border border-accent/40 text-primary text-xs uppercase tracking-widest py-3 px-5 rounded-sm shadow-2xl backdrop-blur-md flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-accent animate-ping"></span>
            <span>{toast}</span>
          </div>
        </div>
      )}
    </>
  );
}

import React, { useState, useEffect } from 'react';
import { 
  Sparkles, Smartphone, Eye, Send, Code, Layers, MessageSquare, 
  ThumbsUp, Volume2, Search, ArrowRight, Share2, Bell, ShieldCheck, 
  MapPin, RefreshCcw, Activity, Heart, ExternalLink, Moon, Sun, 
  ChevronRight, Calendar, User, Sliders, Menu, X, ArrowDown
} from 'lucide-react';
import { Product, StoreConfig, StoreType } from './types';
import { INITIAL_PRODUCTS, INITIAL_CONFIG } from './data';
import ProductVisual from './components/ProductVisual';
import AdminPanel from './components/AdminPanel';

export default function App() {
  // Theme state: 'bass' or 'clickpromo'
  const [activeTheme, setActiveTheme] = useState<'bass' | 'clickpromo'>('bass');
  
  // Products and config states (loaded from localStorage or fell-back to initial)
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('achadinho_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });
  
  const [config, setConfig] = useState<StoreConfig>(() => {
    const saved = localStorage.getItem('achadinho_config');
    return saved ? JSON.parse(saved) : INITIAL_CONFIG;
  });

  const [activeCategory, setActiveCategory] = useState<string>('Todos');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedPopularStore, setSelectedPopularStore] = useState<string>('Todos');
  
  // Admin panel open/close
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(true);
  
  // Real-time ticking clock for the scarcity countdown in Bass theme
  const [countdown, setCountdown] = useState({ hours: 12, minutes: 23, seconds: 25 });
  
  // Live click stream logs
  const [clickLogs, setClickLogs] = useState<string[]>([]);

  // Local site visitor count simulator
  const [visitorCount, setVisitorCount] = useState<number>(() => {
    return Math.floor(Math.random() * 450) + 1240;
  });

  // Keep track of countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          return { hours: 12, minutes: 23, seconds: 25 }; // Loop
        }
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Sync state to localStorage
  useEffect(() => {
    localStorage.setItem('achadinho_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('achadinho_config', JSON.stringify(config));
  }, [config]);

  const handleUpdateProducts = (newProducts: Product[]) => {
    setProducts(newProducts);
  };

  const handleUpdateConfig = (newConfig: StoreConfig) => {
    setConfig(newConfig);
  };

  const handleResetData = () => {
    if (confirm('Deseja mesmo redefinir todos os dados para os originais das imagens? Todas as suas alterações locais serão revertidas.')) {
      setProducts(INITIAL_PRODUCTS);
      setConfig(INITIAL_CONFIG);
      setClickLogs([]);
      localStorage.removeItem('achadinho_products');
      localStorage.removeItem('achadinho_config');
    }
  };

  // Click tracking simulation
  const handleProductClick = (p: Product) => {
    // Increment click logic state
    const updated = products.map(item => {
      if (item.id === p.id) {
        return { ...item, clickCount: item.clickCount + 1 };
      }
      return item;
    });
    setProducts(updated);

    // Add record to live click logger stream
    const timestamp = new Date().toLocaleTimeString('pt-BR', { hour12: false });
    const newLog = `[${timestamp}] Clicou em "${p.title.slice(0, 18)}..." -> ${p.store}`;
    setClickLogs(prev => [newLog, ...prev.slice(0, 19)]);

    // Simulate redirection alert
    alert(`💡 Simulador de Afiliado:\n\nVocê clicou para comprar: "${p.title}"\nPreço indicado: R$ ${p.price.toFixed(2).replace('.', ',')}\nPlataforma de destino: ${p.store}\nLink Original: ${p.affiliateLink}\n\nO clique foi computado nas estatísticas do painel do criador!`);
  };

  const categories = [
    'Todos', 
    'Celular', 
    'Fone Bluetooth', 
    'Acessórios Eletrônicos', 
    'Som Bluetooth', 
    'Informática', 
    'Video Game', 
    'Moda Feminina'
  ];

  // Weekly featured items in BASS hub (Tênis, Vestido, Fone, Semi Joia, Bolsa)
  const weeklyHighlights = [
    { id: 'h1', title: 'Tênis Esportivo Confort', price: 89.90, desc: 'Moda Masculina', imageType: 'sneaker', color: 'bg-blue-50 border-blue-100 text-blue-600' },
    { id: 'h2', title: 'Vestido Midi Casual', price: 57.00, desc: 'Moda Feminina', imageType: 'dress', color: 'bg-teal-50 border-teal-100 text-teal-600' },
    { id: 'h3', title: 'Fone Bluetooth Pro', price: 89.90, desc: 'Eletrônicos', imageType: 'phone', color: 'bg-purple-50 border-purple-100 text-purple-600' },
    { id: 'h4', title: 'Semi Joia de Luxo', price: 69.00, desc: 'Acessórios', imageType: 'diamond', color: 'bg-cyan-50 border-cyan-100 text-cyan-600' },
    { id: 'h5', title: 'Bolsa Fina Alça Corrente', price: 35.00, desc: 'Bolsas', imageType: 'bag', color: 'bg-amber-50 border-amber-100 text-amber-600' }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans select-none overflow-x-hidden antialiased">
      
      {/* Upper Global Navigation Header Desk */}
      <header className="bg-slate-900/90 backdrop-blur-md border-b border-slate-800 sticky top-0 z-50 px-4 md:px-8 py-3.5 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 bg-gradient-to-tr from-orange-500 to-red-650 rounded-xl flex items-center justify-center text-white shadow-md animate-pulse-slow">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-display font-extrabold text-base tracking-tight leading-none text-white">Plataforma de Achadinhos</h1>
              <span className="bg-orange-500/10 text-orange-400 font-mono text-[9px] px-2 py-0.5 rounded-full border border-orange-500/20 font-bold">PRODUTOR</span>
            </div>
            <p className="text-[11px] text-zinc-400 mt-1">Gere páginas de afiliados profissionais no padrão brasileiro</p>
          </div>
        </div>

        {/* Global Toolbar */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsAdminOpen(!isAdminOpen)}
            className={`cursor-pointer px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 border transition ${
              isAdminOpen 
                ? 'bg-amber-500/10 border-amber-500/30 text-amber-400 shadow-inner' 
                : 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-750'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            {isAdminOpen ? 'Ocultar Painel do Criador' : 'Mostrar Painel do Criador'}
          </button>
          
          <div className="hidden lg:flex items-center gap-1.5 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800/80">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-[10px] uppercase font-mono font-bold tracking-wider text-emerald-400">Canal Online</span>
          </div>
        </div>
      </header>

      {/* Main split work area */}
      <main className="flex-1 flex flex-col lg:flex-row min-h-0 bg-[#0d0e12]">
        
        {/* LEFT WORKSPACE PANELS: Admins Dashboard */}
        {isAdminOpen && (
          <div className="w-full lg:w-[410px] shrink-0 border-r border-slate-800 bg-slate-900/50 backdrop-blur-sm shadow-xl transition-all duration-300">
            <AdminPanel 
              products={products}
              config={config}
              onUpdateProducts={handleUpdateProducts}
              onUpdateConfig={handleUpdateConfig}
              onResetData={handleResetData}
              clickLogs={clickLogs}
              activeTheme={activeTheme}
              onChangeTheme={(theme) => setActiveTheme(theme)}
            />
          </div>
        )}

        {/* RIGHT AREA: Phone Device Emulator Showcase */}
        <div className="flex-1 p-4 md:p-8 flex flex-col items-center justify-center relative overflow-y-auto bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] bg-slate-950/60 transition-all duration-300">
          
          {/* Header switch indicators */}
          <div className="flex items-center gap-2 mb-6 bg-slate-900/90 border border-slate-800 px-4 py-2 rounded-full shadow-lg max-w-md text-center">
            <div className="text-[11px] text-zinc-400">
              Visualização ativa do usuário final: <span className="text-white font-extrabold uppercase mr-1.5">{activeTheme === 'bass' ? 'Bass Achadinho' : 'ClickPromo'}</span>
            </div>
            <div className="flex gap-1 bg-slate-950 p-1 rounded-full border border-slate-850">
              <button 
                onClick={() => setActiveTheme('bass')}
                className={`cursor-pointer px-2.5 py-1 rounded-full text-[10px] font-bold uppercase transition ${activeTheme === 'bass' ? 'bg-orange-600 text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
              >
                Dark
              </button>
              <button 
                onClick={() => setActiveTheme('clickpromo')}
                className={`cursor-pointer px-2.5 py-1 rounded-full text-[10px] font-bold uppercase transition ${activeTheme === 'clickpromo' ? 'bg-red-650 text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
              >
                Light
              </button>
            </div>
          </div>

          {/* Gorgeous Device frame */}
          <div className="relative w-full max-w-[390px] aspect-[9/19] rounded-[42px] border-[10px] border-slate-800 bg-black shadow-2xl flex flex-col overflow-hidden ring-1 ring-slate-700/50">
            
            {/* Phone Top ear piece and camera bar notch */}
            <div className="absolute top-0 inset-x-0 h-7 bg-black z-40 flex justify-between items-center px-6">
              {/* Time display: 11:35 exactly matched! */}
              <span className="text-white text-xs font-bold select-none tracking-tight">11:35</span>
              {/* Dynamic pill screen camera Notch */}
              <div className="w-20 h-4 bg-black rounded-full border border-zinc-900/30 shadow-inner flex items-center justify-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-zinc-800" />
                <div className="w-3 h-1 bg-zinc-900 rounded-full" />
              </div>
              {/* Device status icons: matched VoLTE and battery */}
              <div className="flex items-center gap-1.5 select-none text-white">
                <span className="text-[9px] font-extrabold leading-none tracking-tighter shrink-0 opacity-90">VoLTE</span>
                <span className="text-[9px] shrink-0 font-bold">5G</span>
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current opacity-90">
                  <path d="M12 3c-4.97 0-9 4.03-9 9 0 2.12.74 4.07 1.97 5.61L12 31l7.03-13.39A8.97 8.97 0 0 0 12 3z" />
                </svg>
                {/* Battery: 23% matched! */}
                <span className="text-[10px] font-mono leading-none font-bold">23%</span>
              </div>
            </div>

            {/* Simulated Address Browser Bar */}
            <div className="absolute top-7 inset-x-0 h-10 bg-slate-900 border-b border-slate-800/80 z-35 flex items-center px-4 select-none justify-between">
              <span className="text-[#a5b4fc] text-[10px] font-mono font-medium tracking-wide truncate w-[220px]">
                {activeTheme === 'bass' ? 'shope.ee/basscompremais' : 'clickpromo.app/topcenter25'}
              </span>
              <div className="flex items-center gap-2 text-zinc-400">
                <RefreshCcw className="w-3 h-3 cursor-pointer hover:text-white" />
                <div className="w-3.5 h-3.5 rounded border border-zinc-500 flex items-center justify-center text-[8px] font-bold">1</div>
              </div>
            </div>

            {/* Main Phone viewport */}
            <div className="flex-1 pt-17 pb-6 overflow-y-auto no-scrollbar scroll-smooth bg-[#fafafa]">
              
              {/* =================================_________ */}
              {/* VIEW 1: BASS COMPRE MAIS ACHADINHOS (DARK) */}
              {/* =================================_________ */}
              {activeTheme === 'bass' && (
                <div className="min-h-full bg-[#0a0b0d] text-slate-100 font-sans pb-8 select-none flex flex-col">
                  
                  {/* Dynamic scrolling top ticker marquee message */}
                  <div className="bg-zinc-950 text-amber-400 py-1.5 text-[9px] font-black tracking-wider uppercase border-y border-zinc-900 overflow-hidden relative select-none">
                    <div className="whitespace-nowrap flex gap-4 pr-4 animate-marquee">
                      <span>🚚 @topcenter25 — ofertas todo dia!</span>
                      <span>•</span>
                      <span>⚡ Pagamento via Pix com cashback na Shopee!</span>
                      <span>•</span>
                      <span>🔔 Novo: Álbum Copa 2026 com -59% de desconto!</span>
                    </div>
                  </div>

                  {/* Scarcity Countdown Banner */}
                  <div className="bg-red-650 text-white px-3 py-2 flex items-center justify-between border-b border-red-700/50">
                    <div className="flex items-center gap-1.5">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-300 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-400" />
                      </span>
                      <span className="text-[9px] font-black tracking-wide uppercase">Oferta Relâmpago acaba em:</span>
                    </div>
                    {/* Urgency Counter Tick - aligned precisely with first image */}
                    <div className="flex items-center gap-1 font-mono text-[10px] font-bold">
                      <span className="bg-yellow-400 text-zinc-950 px-1 py-0.5 rounded leading-none">{String(countdown.hours).padStart(2, '0')}</span>
                      <span>:</span>
                      <span className="bg-yellow-400 text-zinc-950 px-1 py-0.5 rounded leading-none">{String(countdown.minutes).padStart(2, '0')}</span>
                      <span>:</span>
                      <span className="bg-yellow-400 text-zinc-950 px-1 py-0.5 rounded leading-none">{String(countdown.seconds).padStart(2, '0')}</span>
                    </div>
                  </div>

                  {/* Hero banner card */}
                  <div className="mx-3 mt-3.5 bg-gradient-to-r from-red-600 via-orange-500 to-amber-500 rounded-2xl p-4 relative overflow-hidden shadow-lg border border-orange-400/20">
                    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:10px_10px]" />
                    <div className="relative flex flex-col h-full justify-between gap-1.5">
                      <div className="flex items-center gap-1 bg-yellow-400/25 border border-yellow-300/30 px-2 py-0.5 rounded-full w-fit">
                        <span className="text-[8px] font-black text-yellow-300 uppercase leading-none tracking-widest">💰 ECONOMIZE DE VERDADE</span>
                      </div>
                      <h2 className="font-display font-black text-xl italic tracking-tight text-white leading-tight">Produtos com até -59% de desconto!</h2>
                      <p className="text-[10px] text-zinc-100/90 font-medium">Garanta já as melhores achados das plataformas antes que os estoques esgotem!</p>
                      <button 
                        onClick={() => alert('🔥 Promoção Ativa!\nNavegue pelo catálogo e aproveite as melhores taxas de frete!')}
                        className="mt-2 text-[10px] font-bold uppercase tracking-wider bg-white text-orange-600 px-4 py-2 rounded-xl shadow hover:bg-slate-50 transition w-fit select-none"
                      >
                        APROVEITAR →
                      </button>
                    </div>
                  </div>

                  {/* App brand details */}
                  <div className="px-4 pt-4 pb-2 text-center select-none">
                    <span className="text-[10px] font-mono tracking-widest font-bold text-yellow-400 uppercase">{config.siteName === 'BASS Compre Mais' ? 'AFILIADO OFICIAL' : 'AFILIADO CERTIFICADO'}</span>
                    <h1 className="font-display font-black text-2xl tracking-tighter text-white mt-1 uppercase">
                      {config.siteName}
                    </h1>
                    <div className="flex items-center justify-center gap-2 mt-1">
                      <span className="h-0.5 w-6 bg-red-650" />
                      <span className="text-xs uppercase font-extrabold italic tracking-wider text-red-500">{config.siteSubtitle} 🚀</span>
                      <span className="h-0.5 w-6 bg-red-650" />
                    </div>
                  </div>

                  {/* Dynamic social buttons list row */}
                  <div className="px-3 py-2 grid grid-cols-4 gap-1.5">
                    <button 
                      onClick={() => alert('🚚 Cupons Shopee Frete Grátis ativados! Compre sem taxas de entrega.')}
                      className="cursor-pointer bg-slate-900 border border-slate-800 hover:border-slate-700 py-2.5 rounded-xl flex flex-col items-center justify-center text-center transition"
                    >
                      <span className="text-lg">🏷️</span>
                      <span className="text-[8px] font-bold text-zinc-300 mt-1 leading-none">Frete Grátis</span>
                    </button>
                    <button 
                      onClick={() => alert('🎥 Abrindo Coleções em Vídeo da Shopee para avaliação de produtos!')}
                      className="cursor-pointer bg-slate-900 border border-slate-800 hover:border-slate-700 py-2.5 rounded-xl flex flex-col items-center justify-center text-center transition"
                    >
                      <span className="text-lg">🎥</span>
                      <span className="text-[8px] font-bold text-zinc-300 mt-1 leading-none">Shopee Videos</span>
                    </button>
                    <button 
                      onClick={() => alert('🖼️ Filtrando para Vitrine de novidades semanais!')}
                      className="cursor-pointer bg-slate-900 border border-slate-800 hover:border-slate-700 py-2.5 rounded-xl flex flex-col items-center justify-center text-center transition"
                    >
                      <span className="text-lg">🖼️</span>
                      <span className="text-[8px] font-bold text-zinc-300 mt-1 leading-none">Vitrine</span>
                    </button>
                    <a 
                      href={config.telegramLink} 
                      target="_blank" 
                      onClick={(e) => { e.preventDefault(); alert(`Grupo do Telegram: ${config.telegramLink}`); }}
                      className="cursor-pointer bg-slate-900 border border-slate-800 hover:border-slate-700 py-2.5 rounded-xl flex flex-col items-center justify-center text-center transition"
                    >
                      <span className="text-lg">✈️</span>
                      <span className="text-[8px] font-bold text-zinc-300 mt-1 leading-none">Telegram</span>
                    </a>
                  </div>

                  <hr className="border-zinc-900 my-2 mx-4" />

                  {/* Highlights section inside image 1: Destaques da Semana */}
                  <div className="px-3 py-2 space-y-2">
                    <div className="flex items-center gap-1.5 text-zinc-300">
                      <span className="text-xs">👟</span>
                      <h3 className="text-xs font-black tracking-wide uppercase text-zinc-200">Destaques da Semana</h3>
                    </div>

                    <div className="flex gap-2.5 overflow-x-auto pb-2 no-scrollbar scroll-smooth pl-0.5 select-none">
                      {weeklyHighlights.map((hl) => (
                        <div key={hl.id} className="w-[110px] shrink-0 bg-slate-950 p-2 rounded-xl border border-slate-900 flex flex-col justify-between hover:border-slate-800 transition">
                          
                          {/* Colored backdrop layout for item preview */}
                          <div className="w-full aspect-square relative rounded-lg overflow-hidden mb-1.5 flex items-center justify-center">
                            <ProductVisual type={hl.imageType} className="w-full h-full" />
                          </div>

                          <div className="min-h-[46px] flex flex-col justify-between">
                            <span className="text-[7px] font-mono uppercase text-red-500 font-bold tracking-wide">{hl.desc}</span>
                            <h4 className="font-bold text-[9px] text-zinc-200 truncate-2L leading-snug tracking-tight mt-0.5">{hl.title}</h4>
                            <div className="text-[10px] text-zinc-100 font-extrabold mt-1">R$ {hl.price.toFixed(2).replace('.', ',')}</div>
                          </div>

                          <button 
                            onClick={() => alert(`🎉 Destaque comprado!\n\nVocê selecionou o item semanal: "${hl.title}" - R$ ${hl.price.toFixed(2).replace('.', ',')}`)}
                            className="mt-2 w-full bg-orange-650 hover:bg-orange-700 text-white py-1 rounded text-[8px] font-extrabold uppercase transition cursor-pointer"
                          >
                            Comprar
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Custom Search in site */}
                  <div className="mx-3 mt-3 mb-1 bg-slate-950 px-3 py-2 rounded-xl border border-slate-900 flex items-center gap-2">
                    <Search className="w-3.5 h-3.5 text-slate-400" />
                    <input 
                      type="text" 
                      placeholder="Buscar produto..." 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="bg-transparent text-slate-200 text-xs focus:outline-none w-full border-none"
                    />
                  </div>

                  {/* Categories Pills horizontally scrollable */}
                  <div className="flex gap-1.5 overflow-x-auto px-3 py-2 no-scrollbar">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => {
                          setActiveCategory(cat);
                          setSelectedPopularStore('Todos'); // Clear store filters when category selected
                        }}
                        className={`cursor-pointer whitespace-nowrap px-3 py-1.5 rounded-full text-[9px] font-bold tracking-wide uppercase transition ${
                          activeCategory === cat 
                            ? 'bg-orange-600 text-white' 
                            : 'bg-slate-900 text-zinc-400 hover:text-white border border-slate-850'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>

                  {/* Core Feed Grid */}
                  <div className="px-3 pt-3 flex-grow">
                    <div className="flex items-center justify-between mb-3 text-zinc-400">
                      <div className="flex items-center gap-1">
                        <span className="text-[11px] font-black text-white">Produtos</span>
                        <span className="text-[9px] font-mono bg-zinc-900 text-zinc-400 px-1.5 py-0.5 rounded">
                          {products.filter(p => (activeCategory === 'Todos' || p.category === activeCategory) && p.title.toLowerCase().includes(searchQuery.toLowerCase())).length} encontrados
                        </span>
                      </div>
                      <span className="text-[10px] font-bold">Ordenar: Padrão</span>
                    </div>

                    <div className="grid grid-cols-2 gap-3.5 pl-0.5">
                      {products
                        .filter(p => activeCategory === 'Todos' || p.category === activeCategory)
                        .filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase()))
                        .map((p) => (
                          <div 
                            key={p.id} 
                            className="bg-slate-950 p-2.5 rounded-2xl border border-slate-900 hover:border-slate-800 flex flex-col justify-between group transition relative"
                          >
                            {/* Badges in top custom cover */}
                            <div className="absolute top-4 left-4 z-10 flex flex-col gap-1">
                              {p.tags?.map((tg, i) => (
                                <span 
                                  key={i} 
                                  className={`px-1.5 py-0.5 rounded font-mono text-[6.5px] font-black uppercase tracking-widest text-white shadow-md ${
                                    tg.includes('-') || tg.includes('%') 
                                      ? 'bg-red-600' 
                                      : tg.toUpperCase() === 'DESTAQUE' 
                                      ? 'bg-orange-650' 
                                      : 'bg-blue-600'
                                  }`}
                                >
                                  {tg}
                                </span>
                              ))}
                            </div>

                            {/* Product Illustration */}
                            <div className="w-full aspect-square rounded-xl overflow-hidden mb-2.5 relative">
                              <ProductVisual type={p.imageType} customImageUrl={p.customImageUrl} className="w-full h-full" />
                            </div>

                            {/* Name & metadata */}
                            <div className="space-y-1">
                              <div className="text-[7.5px] font-mono tracking-wider text-orange-400 uppercase font-black">{p.category}</div>
                              <h4 className="font-bold text-[10px] text-zinc-150 leading-snug tracking-tight truncate-2L h-[28px] overflow-hidden group-hover:text-white transition">
                                {p.title}
                              </h4>
                              {p.rating && (
                                <div className="flex items-center gap-1 mt-1 font-mono text-[8px] text-yellow-500 font-extrabold">
                                  <div className="flex items-center">
                                    {[...Array(5)].map((_, i) => (
                                      <span key={i} className="text-[7.5px]">⭐</span>
                                    ))}
                                  </div>
                                  <span>({p.reviewsCount})</span>
                                </div>
                              )}
                            </div>

                            {/* Prices & Purchase button */}
                            <div className="mt-2">
                              <div className="flex items-baseline gap-1.5">
                                {p.oldPrice && (
                                  <span className="text-[8px] text-zinc-500 line-through">R$ {p.oldPrice.toFixed(2).replace('.', ',')}</span>
                                )}
                                <span className="text-[12px] font-black text-[#ff5722]">R$ {p.price.toFixed(2).replace('.', ',')}</span>
                              </div>

                              <div className="flex gap-1.5 mt-2.5">
                                <button
                                  onClick={() => handleProductClick(p)}
                                  className="flex-1 bg-[#ff5722] hover:bg-orange-700 text-white py-1.5 rounded-lg text-[9px] font-extrabold uppercase transition cursor-pointer flex items-center justify-center gap-1 shadow-sm"
                                >
                                  🛍️ Comprar
                                </button>
                                <button
                                  onClick={() => alert(`🔗 Link compartilhado!\n\nCopie o link desta oferta: ${p.affiliateLink}`)}
                                  className="p-1 px-1.5 bg-slate-900 border border-slate-850 text-slate-300 hover:text-white rounded-lg transition"
                                >
                                  <Share2 className="w-3 h-3" />
                                </button>
                              </div>
                            </div>

                          </div>
                      ))}
                    </div>
                  </div>

                  {/* Floating Contact chat bubble badges */}
                  <div className="fixed bottom-6 right-6 z-45 flex flex-col gap-2 pointer-events-auto">
                    <button 
                      onClick={() => {
                        setActiveCategory('Todos');
                        setSearchQuery('');
                        setIsAdminOpen(true);
                        alert('✨ Redirecionando para as Configurações de Administrador na lateral!');
                      }}
                      className="cursor-pointer h-10 w-10 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center shadow-lg transition-transform hover:scale-110 border border-blue-500"
                      title="Gerenciar Links"
                    >
                      <Sliders className="w-4 h-4" />
                    </button>
                    <a 
                      href={config.whatsappLink}
                      target="_blank"
                      onClick={(e) => { e.preventDefault(); alert(`Grupo WhatsApp: ${config.whatsappLink}`); }}
                      className="cursor-pointer h-10 w-10 rounded-full bg-emerald-600 hover:bg-[#128c7e] text-white flex items-center justify-center shadow-lg transition-transform hover:scale-110 border border-emerald-500"
                      title="Suporte WhatsApp"
                    >
                      <MessageSquare className="w-4.5 h-4.5" />
                    </a>
                  </div>

                  {/* Footer links */}
                  <footer className="mt-8 pt-6 pb-8 px-4 bg-zinc-950 border-t border-zinc-900 text-center space-y-4">
                    <h3 className="font-display font-black text-xs text-zinc-350 tracking-wider uppercase">⚡ {config.siteName} ⚡</h3>
                    <p className="text-[9px] text-zinc-500 leading-normal max-w-xs mx-auto">
                      Ofertas selecionadas da Shopee e parceiros com as melhores condições e descontos. Acesse os canais oficiais no rodapé!
                    </p>

                    {/* Footer Huge buttons */}
                    <div className="space-y-2">
                      <a 
                        href={config.whatsappLink}
                        target="_blank"
                        onClick={(e) => { e.preventDefault(); alert(`Entrar no Grupo WhatsApp: ${config.whatsappLink}`); }}
                        className="cursor-pointer w-full bg-emerald-600 hover:bg-[#128c7e] text-white font-extrabold py-2 px-4 rounded-xl text-[10px] uppercase flex items-center justify-center gap-1.5 shadow-md transition"
                      >
                        ⚡ CUPOM FRETE GRÁTIS — WhatsApp
                      </a>
                      <a 
                        href={config.facebookLink}
                        target="_blank"
                        onClick={(e) => { e.preventDefault(); alert(`Entrar no Canal Telegram: ${config.telegramLink}`); }}
                        className="cursor-pointer w-full bg-cyan-600 hover:bg-cyan-700 text-white font-extrabold py-2 px-4 rounded-xl text-[10px] uppercase flex items-center justify-center gap-1.5 shadow-md transition"
                      >
                        ✈️ CANAL TELEGRAM OFICIAL
                      </a>
                    </div>

                    <div className="py-2 flex items-center justify-center gap-2">
                      <span className="px-2 py-1 bg-slate-900 text-zinc-400 border border-slate-850 rounded font-mono text-[8px]">✔️ Shopee Afiliado</span>
                      <span className="px-2 py-1 bg-slate-900 text-zinc-400 border border-slate-850 rounded font-mono text-[8px]">⚡ Oferta Todo Dia</span>
                    </div>

                    <p className="text-[7.5px] font-mono text-zinc-650 leading-snug">
                      © 2026 — {config.siteName}. Todos os direitos reservados.
                    </p>

                    {/* Site metrics indicators */}
                    <div className="pt-4 border-t border-zinc-900 text-left space-y-2 select-none">
                      <div className="flex justify-between items-center text-[9px] text-zinc-500">
                        <span className="flex items-center gap-1">👥 Visitas ao site: <strong className="text-zinc-300">{visitorCount}</strong></span>
                        <button 
                          onClick={() => setIsAdminOpen(true)}
                          className="cursor-pointer text-orange-400 hover:underline font-bold"
                        >
                          🔐 Área do Administrador
                        </button>
                      </div>
                    </div>
                  </footer>

                </div>
              )}

              {/* =================================_________ */}
              {/* VIEW 2: CLICKPROMO DESIGN LAYOUT (LIGHT) */}
              {/* =================================_________ */}
              {activeTheme === 'clickpromo' && (
                <div className="min-h-full bg-slate-50 text-slate-800 font-sans pb-10 select-none">
                  
                  {/* clickpromo RED Header */}
                  <div className="bg-[#ea1d2c] text-white px-3.5 pt-3 pb-3.5 flex flex-col gap-3 shadow-md relative z-20">
                    <div className="flex items-center justify-between">
                      {/* Logo clickpromo */}
                      <div className="flex items-center gap-1">
                        <span className="text-xl">🛍️</span>
                        <span className="font-extrabold text-[15px] font-display uppercase tracking-tight">ClickPromo</span>
                      </div>
                      
                      {/* Categories picker */}
                      <button 
                        onClick={() => alert('Abriu Dropdown Categorias clickpromo!')}
                        className="bg-red-800/20 text-white border border-red-400/25 px-2 py-0.5 rounded text-[10px] font-extrabold tracking-wide uppercase transition hover:bg-red-800/40 select-none cursor-pointer"
                      >
                        Categorias ▾
                      </button>
                    </div>

                    {/* Search bar nested in header */}
                    <div className="bg-white rounded px-2.5 py-1.5 flex items-center gap-2 text-zinc-400 shadow-inner">
                      <Search className="w-3.5 h-3.5 text-zinc-400" />
                      <input 
                        type="text" 
                        placeholder="Pesquisar Produto..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="bg-transparent text-slate-800 text-xs focus:outline-none w-full border-none"
                      />
                    </div>

                    {/* Header action icons - lightbulb, user log, support chat */}
                    <div className="flex items-center gap-4 text-white text-[10px] font-medium justify-around pt-0.5 border-t border-red-500/20">
                      <button onClick={() => alert('Dica: Veja e compartilhe as melhores ofertas da Shopee abaixo!')} className="flex items-center gap-1 hover:opacity-95">💡 Dicas</button>
                      <button onClick={() => setIsAdminOpen(true)} className="flex items-center gap-1 hover:opacity-95">👤 Perfil</button>
                      <a href={config.whatsappLink} target="_blank" onClick={(e) => { e.preventDefault(); alert(`Telegram Canal: ${config.telegramLink}`); }} className="flex items-center gap-1 hover:opacity-95 text-yellow-300">💬 Suporte</a>
                    </div>
                  </div>

                  {/* Parceiro Registrado Shopee */}
                  <div className="px-3 pt-3.5 pb-1">
                    <div className="bg-orange-50 border border-orange-100 rounded-xl p-3 flex items-center justify-between shadow-sm">
                      <div className="flex items-center gap-2.5">
                        <div className="h-9 w-9 rounded-full bg-orange-500 flex items-center justify-center text-white text-lg">
                          🛍️
                        </div>
                        <div>
                          <h4 className="font-bold text-[10.5px] text-zinc-900 leading-none">Divulgador Shopee</h4>
                          <span className="text-[8px] text-zinc-500 font-medium font-mono">ID Parceiro: Oficial</span>
                        </div>
                      </div>
                      <span className="bg-emerald-50 text-emerald-700 font-mono text-[8px] px-2 py-0.5 rounded-full font-bold border border-emerald-100">CUPONS ATIVOS</span>
                    </div>
                  </div>

                  {/* SECTION 1: Ofertas da Shopee */}
                  <div className="px-3 py-3">
                    <div className="flex items-center justify-between border-b border-zinc-200 pb-1.5 mb-2">
                      <h3 className="font-display font-black text-xs text-zinc-800 uppercase flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 bg-orange-500 rounded-full animate-pulse" />
                        Ofertas Promocionais da Shopee
                      </h3>
                      <span className="text-[9px] text-zinc-450 font-bold shrink-0">FRETE GRÁTIS</span>
                    </div>

                    {/* Horizontal slider list for shopee deals */}
                    <div className="flex gap-3 overflow-x-auto pb-2 pl-0.5 no-scrollbar select-none">
                      {products
                        .filter(p => p.store === 'Shopee')
                        .filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase()))
                        .map((p) => (
                          <div key={p.id} className="w-[140px] shrink-0 bg-white rounded-xl border border-zinc-200 p-2.5 shadow-sm flex flex-col justify-between hover:border-zinc-350 transition relative">
                            {/* Ribbon bag badge */}
                            <div className="absolute top-2 right-2 bg-red-650 text-white rounded-full p-1 shadow-sm z-10">
                              <span className="text-[7px] leading-none block font-mono font-bold">OCASIÃO</span>
                            </div>
                            
                            <div className="w-full aspect-square rounded-lg overflow-hidden bg-zinc-50 mb-2 relative">
                              <ProductVisual type={p.imageType} customImageUrl={p.customImageUrl} className="w-full h-full" />
                            </div>

                            <div className="space-y-1 text-left min-h-[50px]">
                              <span className="text-[7.5px] font-mono text-zinc-500 font-semibold uppercase">{p.category}</span>
                              <h4 className="font-bold text-[9.5px] text-zinc-800 truncate-2L tracking-tight leading-normal mt-0.5">
                                {p.title}
                              </h4>
                            </div>

                            {p.rating && (
                              <div className="flex items-center gap-0.5 font-mono text-[7px] text-amber-500 my-1 font-bold">
                                <span>⭐</span>
                                <span>{p.rating.toFixed(1)}</span>
                                <span className="text-zinc-400">({p.reviewsCount})</span>
                              </div>
                            )}

                            <div className="mt-2.5 border-t border-zinc-100 pt-2 flex flex-col">
                              <span className="text-[11px] font-black text-rose-600">R$ {p.price.toFixed(2).replace('.', ',')}</span>
                              <button
                                onClick={() => handleProductClick(p)}
                                className="w-full bg-[#ea1d2c] hover:bg-rose-750 text-white py-1.5 rounded text-[8.5px] font-extrabold uppercase mt-2 tracking-wide transition flex items-center justify-center gap-1 cursor-pointer shadow-sm"
                              >
                                🏷️ PEGAR OFERTA
                              </button>
                            </div>
                          </div>
                      ))}
                    </div>
                  </div>

                  {/* SECTION 3: Últimas Ofertas Feed */}
                  <div className="px-3 py-4">
                    <div className="flex items-center justify-between border-b border-zinc-200 pb-1.5 mb-3.5">
                      <h3 className="font-display font-black text-xs text-zinc-800 uppercase flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 bg-zinc-400 rounded-full" />
                        Últimas Ofertas
                      </h3>
                      <span className="text-[9px] text-zinc-450 font-semibold">Tudo</span>
                    </div>

                    <div className="space-y-3 pl-0.5">
                      {products
                        .filter(p => selectedPopularStore === 'Todos' || p.store === selectedPopularStore)
                        .filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase()))
                        .slice(0, 8)
                        .map((p) => (
                          <div key={p.id} className="bg-white rounded-xl border border-zinc-200 p-3 shadow-sm flex gap-3 hover:border-zinc-350 transition group">
                            
                            {/* Small product visual shrink-0 */}
                            <div className="w-16 h-16 rounded-md overflow-hidden bg-zinc-50 shrink-0 relative">
                              <ProductVisual type={p.imageType} customImageUrl={p.customImageUrl} className="w-full h-full" />
                            </div>

                            {/* Info */}
                            <div className="min-w-0 flex-1 flex flex-col justify-between">
                              <div>
                                <div className="flex items-center gap-1.5 text-[8px] font-mono font-bold text-zinc-400">
                                  <span>{p.store.toUpperCase()}</span>
                                  <span>•</span>
                                  <span>{p.category.toUpperCase()}</span>
                                </div>
                                <h4 className="font-bold text-[10px] text-zinc-800 truncate leading-snug mt-1 group-hover:text-red-600 transition">
                                  {p.title}
                                </h4>
                              </div>

                              <div className="flex items-baseline gap-2 mt-1.5">
                                <span className="text-[12px] font-black text-red-600">R$ {p.price.toFixed(2).replace('.', ',')}</span>
                                {p.oldPrice && (
                                  <span className="text-[8.5px] text-zinc-450 line-through">R$ {p.oldPrice.toFixed(2).replace('.', ',')}</span>
                                )}
                              </div>
                            </div>

                            <div className="shrink-0 flex items-center">
                              <button
                                onClick={() => handleProductClick(p)}
                                className="bg-[#ea1d2c] hover:bg-rose-750 text-white px-3 py-2 rounded-lg text-[8.5px] font-extrabold uppercase transition cursor-pointer flex items-center gap-1 shadow"
                              >
                                PEGAR
                              </button>
                            </div>

                          </div>
                      ))}
                    </div>
                  </div>

                </div>
              )}

            </div>

            {/* Simulating Phone Home indicator bar */}
            <div className="absolute bottom-1 inset-x-0 h-1.5 bg-zinc-900 pointer-events-none flex justify-center z-40">
              <div className="w-28 h-1 bg-zinc-650 rounded-full" />
            </div>

          </div>

        </div>

      </main>

    </div>
  );
}

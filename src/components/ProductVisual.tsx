import React from 'react';
import { 
  Laptop, Phone, ShoppingBag, Eye, Star, Heart, Flame, Shield, 
  Home, Sparkles, Shirt, Music, Key, Gift, Coffee, Trash
} from 'lucide-react';

interface ProductVisualProps {
  type: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  customImageUrl?: string;
}

export default function ProductVisual({ type, size = 'md', className = '', customImageUrl }: ProductVisualProps) {
  const containerClasses = `relative flex items-center justify-center overflow-hidden rounded-xl transition-all duration-300 ${className}`;
  
  if (type === 'custom' || customImageUrl) {
    return (
      <div className={`${containerClasses} bg-white aspect-square w-full h-full border border-zinc-150 p-0`}>
        <img 
          src={customImageUrl || "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&auto=format&fit=crop&q=80"} 
          alt="Produto"
          className="w-full h-full object-cover rounded-xl"
          referrerPolicy="no-referrer"
        />
      </div>
    );
  }

  // Custom styled CSS vector mockups to look identical to professional assets
  switch (type) {
    case 'sneaker':
      return (
        <div className={`${containerClasses} bg-blue-50 text-blue-600 aspect-square w-full h-full border border-blue-100`}>
          <div className="absolute inset-0 bg-radial-gradient from-blue-100/50 to-transparent pointer-events-none" />
          <div className="relative group-hover:scale-110 transition-transform duration-300 flex flex-col items-center">
            {/* Sporty Shoe SVG */}
            <svg viewBox="0 0 100 100" className="w-16 h-16 drop-shadow-md fill-current">
              <path d="M15,65 L35,65 C35,65 42,48 55,48 L80,50 L85,60 L75,72 L20,72 L15,65 Z" className="text-blue-500" />
              <path d="M25,72 C25,76 29,80 34,80 C39,80 43,76 43,72 Z" className="text-blue-700" />
              <path d="M67,72 C67,76 71,80 76,80 C81,80 85,76 85,72 Z" className="text-blue-700" />
              <path d="M45,48 L55,30 L65,48 Z" className="text-blue-400" />
            </svg>
            <span className="text-[10px] font-mono tracking-widest text-blue-500/80 mt-1 uppercase font-semibold">TÊNIS SPORT</span>
          </div>
        </div>
      );

    case 'dress':
      return (
        <div className={`${containerClasses} bg-teal-50 text-teal-600 aspect-square w-full h-full border border-teal-100`}>
          <div className="absolute inset-0 bg-radial-gradient from-teal-150 to-transparent pointer-events-none" />
          <div className="relative group-hover:scale-110 transition-transform duration-300 flex flex-col items-center">
            {/* Elegant Midi Dress SVG */}
            <svg viewBox="0 0 100 100" className="w-16 h-16 drop-shadow-md fill-current">
              <path d="M40,25 C45,21 55,21 60,25 L65,35 L75,70 L25,70 L35,35 Z" className="text-teal-400" />
              <path d="M45,20 L55,20 L53,35 L47,35 Z" className="text-teal-600" />
              <path d="M25,70 Q50,65 75,70 L80,78 Q50,75 20,78 Z" className="text-teal-500" />
            </svg>
            <span className="text-[10px] font-mono tracking-widest text-teal-600/80 mt-1 uppercase font-semibold">VESTIDO MIDI</span>
          </div>
        </div>
      );

    case 'phone':
    case 'earbuds':
      return (
        <div className={`${containerClasses} bg-purple-50 text-purple-600 aspect-square w-full h-full border border-purple-100`}>
          <div className="absolute inset-0 bg-radial-gradient from-purple-150 to-transparent pointer-events-none" />
          <div className="relative group-hover:scale-110 transition-transform duration-300 flex flex-col items-center">
            {/* Headphones SVG */}
            <svg viewBox="0 0 100 100" className="w-14 h-14 drop-shadow-md fill-current">
              <path d="M20,60 C20,35 35,20 50,20 C65,20 80,35 80,60 L75,75 C70,75 65,70 65,65 L65,55 C65,50 70,45 75,45 L80,45" className="fill-none stroke-purple-500 stroke-8" />
              <rect x="15" y="50" width="14" height="22" rx="4" className="text-purple-600" />
              <rect x="71" y="50" width="14" height="22" rx="4" className="text-purple-600" />
            </svg>
            <span className="text-[10px] font-mono tracking-widest text-purple-600/80 mt-1 uppercase font-semibold">FONE PRO BLUETOOTH</span>
          </div>
        </div>
      );

    case 'diamond':
      return (
        <div className={`${containerClasses} bg-cyan-50 text-cyan-600 aspect-square w-full h-full border border-cyan-100`}>
          <div className="absolute inset-0 bg-radial-gradient from-cyan-150 to-transparent pointer-events-none" />
          <div className="relative group-hover:scale-110 transition-transform duration-300 flex flex-col items-center">
            {/* Diamond SVG */}
            <svg viewBox="0 0 100 100" className="w-14 h-14 drop-shadow-md fill-current text-cyan-500">
              <polygon points="50,15 78,40 50,85 22,40" />
              <polygon points="50,15 64,30 36,30" className="text-cyan-300" />
              <polygon points="36,30 50,85 22,40" className="text-cyan-600" />
              <polygon points="64,30 78,40 50,85" className="text-cyan-400" />
            </svg>
            <span className="text-[10px] font-mono tracking-widest text-cyan-500/80 mt-1 uppercase font-semibold">JOALHERIA</span>
          </div>
        </div>
      );

    case 'bag':
      return (
        <div className={`${containerClasses} bg-amber-50 text-amber-600 aspect-square w-full h-full border border-amber-100`}>
          <div className="relative group-hover:scale-110 transition-transform duration-300 flex flex-col items-center">
            {/* Smart Handbag SVG */}
            <svg viewBox="0 0 100 100" className="w-14 h-14 drop-shadow-md fill-current">
              <path d="M30,40 C30,30 40,20 50,20 C60,20 70,30 70,40" className="fill-none stroke-amber-700 stroke-6" />
              <rect x="20" y="38" width="60" height="42" rx="8" className="text-amber-500" />
              <rect x="35" y="44" width="30" height="8" rx="2" className="text-amber-600" />
              <circle cx="50" cy="58" r="5" className="text-amber-700" />
            </svg>
            <span className="text-[10px] font-mono tracking-widest text-amber-600/80 mt-1 uppercase font-semibold">BOLSA LUXO</span>
          </div>
        </div>
      );

    case 'kitchen':
      return (
        <div className={`${containerClasses} bg-rose-50 text-rose-600 aspect-square w-full h-full border border-rose-100`}>
          <div className="relative group-hover:scale-110 transition-transform duration-300 flex flex-col items-center">
            {/* Kitchen house/organizer SVG */}
            <svg viewBox="0 0 100 100" className="w-14 h-14 drop-shadow-md fill-current text-rose-400">
              <rect x="25" y="40" width="50" height="45" rx="6" />
              <polygon points="50,15 80,42 20,42" className="text-rose-500" />
              <rect x="42" y="55" width="16" height="30" className="text-rose-600" />
              <circle cx="46" cy="70" r="2" className="text-amber-300" />
            </svg>
            <span className="text-[10px] font-mono tracking-widest text-rose-500/80 mt-1 uppercase font-semibold">CASA & COZINHA</span>
          </div>
        </div>
      );

    case 'lipstick':
      return (
        <div className={`${containerClasses} bg-red-50 text-red-600 aspect-square w-full h-full border border-red-100`}>
          <div className="relative group-hover:scale-110 transition-transform duration-300 flex flex-col items-center">
            {/* Lipstick Vector SVG */}
            <svg viewBox="0 0 100 100" className="w-14 h-14 drop-shadow-md fill-current">
              <rect x="38" y="55" width="24" height="35" rx="3" className="text-zinc-800" />
              <rect x="42" y="38" width="16" height="17" className="text-zinc-400" />
              <path d="M42,38 L58,38 L55,15 L45,21 Z" className="text-red-500" />
            </svg>
            <span className="text-[10px] font-mono tracking-widest text-red-500/80 mt-1 uppercase font-semibold">BELEZA & SPA</span>
          </div>
        </div>
      );

    case 'sound':
      return (
        <div className={`${containerClasses} bg-zinc-900 border border-zinc-800 aspect-square w-full h-full relative`}>
          <div className="absolute inset-0 bg-gradient-to-tr from-lime-950/20 to-transparent" />
          <div className="relative group-hover:scale-105 transition-transform duration-300 flex flex-col items-center p-2 text-center h-full justify-between">
            <span className="text-[9px] font-mono tracking-wider text-lime-400 font-extrabold uppercase bg-lime-950/80 px-2 py-0.5 rounded border border-lime-800">BOB AUTOMOTIVO</span>
            
            <div className="flex gap-2 items-center justify-center my-1">
              {/* Speaker drawing */}
              <div className="w-12 h-20 bg-zinc-800 rounded-lg p-1 border-2 border-lime-500 flex flex-col items-center justify-around shadow-lg">
                <div className="w-8 h-8 rounded-full border border-zinc-600 bg-zinc-900 flex items-center justify-center">
                  <div className="w-4 h-4 rounded-full bg-lime-500 animate-pulse" />
                </div>
                <div className="w-10 h-10 rounded-full border-2 border-lime-400 bg-zinc-950 flex items-center justify-center shadow-inner">
                  <div className="w-6 h-6 rounded-full bg-zinc-800 border border-zinc-600" />
                </div>
              </div>
              <div className="text-left">
                <div className="text-[8px] text-zinc-400 leading-tight">POTÊNCIA</div>
                <div className="text-[11px] font-black text-lime-400 leading-none">1200W RMS</div>
                <div className="text-[7px] text-zinc-500 mt-1 font-mono">BIVOLT + BLUETOOTH</div>
              </div>
            </div>

            <span className="text-[8px] font-mono text-zinc-500">MDF 15MM REFORÇADO</span>
          </div>
        </div>
      );

    case 'keys':
      return (
        <div className={`${containerClasses} bg-zinc-50 border border-zinc-200 aspect-square w-full h-full p-2 relative`}>
          <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:8px_8px]" />
          <div className="relative group-hover:scale-105 transition-transform duration-300 flex flex-col h-full justify-between items-center text-center">
            <span className="text-[9px] font-bold text-zinc-700 bg-zinc-200/80 px-2 py-0.5 rounded uppercase tracking-wide">ORGANIZADOR MDF</span>
            
            <div className="relative w-12 h-10 border-2 border-zinc-800 bg-neutral-800 rounded-md p-1 shadow flex flex-col justify-between">
              <div className="text-[6px] text-zinc-300 font-bold overflow-hidden leading-none tracking-widest text-[#fff159]">DEUS TEM UM PROPÓSITO...</div>
              <div className="flex justify-around items-end pt-1">
                <Key className="w-3 h-3 text-yellow-500 stroke-[1.5]" />
                <Key className="w-3 h-3 text-zinc-400 stroke-[1.5]" />
                <Key className="w-3 h-3 text-zinc-500 stroke-[1.5]" />
              </div>
            </div>

            <span className="text-[8px] font-mono text-zinc-400">SUPORTE 5 GANCHOS</span>
          </div>
        </div>
      );

    case 'shirt':
      return (
        <div className={`${containerClasses} bg-emerald-950 text-emerald-400 border border-emerald-900 aspect-square w-full h-full`}>
          <div className="relative group-hover:scale-110 transition-transform duration-300 flex flex-col items-center">
            <Shirt className="w-14 h-14 text-yellow-400 drop-shadow-[0_4px_6px_rgba(251,191,36,0.3)] animate-pulse-slow" />
            <div className="flex gap-1 text-[8px] font-mono font-bold mt-1">
              <span className="text-yellow-400">BRASIL</span>
              <span className="text-emerald-400">CANARINHO</span>
            </div>
          </div>
        </div>
      );

    case 'netflix':
      return (
        <div className={`${containerClasses} bg-zinc-950 text-red-600 border border-zinc-900 aspect-square w-full h-full relative`}>
          <div className="absolute inset-0 bg-neutral-900/50 flex flex-col justify-center items-center p-2 text-center">
            <span className="text-[12px] font-black tracking-tighter text-red-600">LOVEFLIX</span>
            
            <div className="w-16 h-12 border border-zinc-800 rounded mt-1 bg-zinc-900 relative overflow-hidden flex flex-col justify-end p-1">
              <div className="absolute inset-x-0 top-0 bottom-3 flex items-center justify-center">
                <Heart className="w-5 h-5 text-red-500 fill-red-500 animate-pulse" />
              </div>
              <div className="w-full bg-red-600 h-1 rounded-full overflow-hidden">
                <div className="bg-white w-2/3 h-full" />
              </div>
              <div className="text-[5px] text-zinc-400 mt-0.5 font-mono text-left leading-none truncate">JOÃO & MARIA - DIA DOS NAMORADOS</div>
            </div>
            
            <span className="text-[7px] font-mono text-zinc-500 mt-1 uppercase">PLACA PERSONALIZADA</span>
          </div>
        </div>
      );

    case 'kettle':
      return (
        <div className={`${containerClasses} bg-slate-50 text-slate-700 border border-slate-200 aspect-square w-full h-full`}>
          <div className="relative group-hover:scale-110 transition-transform duration-300 flex flex-col items-center">
            <Coffee className="w-12 h-12 text-slate-500" />
            <div className="w-12 h-10 border-r-4 border-slate-300 rounded-l-md bg-slate-400/20 absolute mt-1" />
            <span className="text-[10px] font-bold text-slate-800 mt-2">CHALEIRA 1.8L</span>
            <span className="text-[7px] font-mono text-emerald-600 bg-emerald-50 px-1 rounded">FAST BOIL</span>
          </div>
        </div>
      );

    case 'bottle':
      return (
        <div className={`${containerClasses} bg-sky-50 text-sky-700 border border-sky-150 aspect-square w-full h-full`}>
          <div className="relative group-hover:scale-110 transition-transform duration-300 flex flex-col items-center">
            {/* Hydro Bottle vector */}
            <div className="w-6 h-14 bg-sky-600 rounded-lg p-1 relative flex flex-col justify-between items-center shadow-md">
              <div className="w-4 h-2 bg-zinc-800 rounded-t-sm absolute -top-1.5" />
              <div className="text-[6px] text-zinc-100 font-extrabold uppercase tracking-widest rotate-90 my-auto">GYM</div>
            </div>
            <span className="text-[9px] font-bold text-sky-900 mt-2">SQUEEZE INOX</span>
            <span className="text-[7px] font-mono text-sky-500">THERMOS 800ML</span>
          </div>
        </div>
      );

    case 'shaver':
      return (
        <div className={`${containerClasses} bg-neutral-900 text-zinc-300 border border-neutral-800 aspect-square w-full h-full`}>
          <div className="relative group-hover:scale-110 transition-transform duration-300 flex flex-col items-center">
            {/* Shaver head */}
            <div className="w-8 h-12 bg-zinc-800 rounded-md border border-zinc-700 relative flex flex-col items-center shadow-lg pt-1">
              <div className="w-9 h-3 bg-zinc-600 rounded-t-md border-b-2 border-zinc-950 flex justify-around">
                <div className="w-0.5 h-full bg-zinc-400" />
                <div className="w-0.5 h-full bg-zinc-400" />
                <div className="w-0.5 h-full bg-zinc-400" />
                <div className="w-0.5 h-full bg-zinc-400" />
              </div>
              <div className="w-1.5 h-1.5 rounded-full bg-zinc-950 my-1 animate-pulse" />
              <span className="text-[6px] font-mono text-amber-500 uppercase">KEMEI</span>
            </div>
            <span className="text-[9px] font-bold text-zinc-400 mt-2">MAQUINA 3EM1</span>
            <span className="text-[7px] font-mono text-zinc-500">BIVOLT INOX</span>
          </div>
        </div>
      );

    default:
      return (
        <div className={`${containerClasses} bg-zinc-50 text-zinc-450 aspect-square w-full h-full border border-zinc-150`}>
          <ShoppingBag className="w-8 h-8 text-zinc-400" />
          <span className="absolute bottom-2 text-[9px] text-zinc-400 font-mono">PRODUTO NOVO</span>
        </div>
      );
  }
}

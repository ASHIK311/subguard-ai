import React from 'react';
import { 
  Bot, 
  Film, 
  Sparkles, 
  Stars, 
  Headphones, 
  Youtube, 
  PenTool, 
  MousePointer2, 
  Shield, 
  MessageCircle, 
  BookOpen,
  Play
} from 'lucide-react';

const brands = [
  { name: 'ChatGPT', icon: Bot, color: '#10A37F' },
  { name: 'Netflix', icon: Film, color: '#E50914' },
  { name: 'Claude', icon: Sparkles, color: '#D97757' },
  { name: 'Gemini', icon: Stars, color: '#1A73E8' },
  { name: 'Spotify', icon: Headphones, color: '#1DB954' },
  { name: 'YouTube', icon: Play, color: '#FF0000' }, // Play is safer than Youtube in some lucide versions
  { name: 'Adobe', icon: PenTool, color: '#FF0000' },
  { name: 'Cursor', icon: MousePointer2, color: '#FFFFFF' },
  { name: 'NordVPN', icon: Shield, color: '#4687FF' },
  { name: 'Discord', icon: MessageCircle, color: '#5865F2' },
  { name: 'Notion', icon: BookOpen, color: '#FFFFFF' }
];

// Duplicate the array for seamless scrolling
const duplicatedBrands = [...brands, ...brands];

export default function BrandMarquee() {
  return (
    <div 
      className="w-[90%] md:w-[85%] mx-auto overflow-hidden relative"
      style={{
        maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
        WebkitMaskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)'
      }}
    >
      <div 
        className="flex items-center w-max hover:[animation-play-state:paused] transition-all"
        style={{ animation: 'marquee-scroll 8s linear infinite' }}
      >
        {duplicatedBrands.map((brand, idx) => {
          const Icon = brand.icon;
          return (
            <div 
              key={idx} 
              className="flex items-center gap-3 mx-6 md:mx-8 opacity-70 hover:opacity-100 transition-opacity duration-300"
            >
              <Icon size={32} color={brand.color} className="drop-shadow-md" />
              <span className="text-white/90 font-bold text-lg md:text-xl tracking-wide drop-shadow-md whitespace-nowrap">
                {brand.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

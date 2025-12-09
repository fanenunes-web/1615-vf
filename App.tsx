import React, { useState, useEffect } from 'react';
import { Play, Mic, Award, ShoppingCart, Mail, Heart, ArrowRight, Instagram, Youtube, User, Globe, MessageSquare, Send, Video, Mic2, Layout, Wifi, CheckCircle, MessageCircle, BarChart3, TrendingUp, Zap, Activity, Eye, Users, ExternalLink, AlertCircle, Scissors, Film, Bell, Briefcase, Target, Rocket, HandHeart, Smile, FileText, PieChart } from 'lucide-react';
import IntroGlobe from './components/IntroGlobe';
import { Navigation } from './components/Navigation';
import { PODCASTS, SPONSORS, TESTIMONIALS } from './constants';
import { generateVideoSummary, generateNetworkAnalysis } from './services/geminiService';
import { Podcast } from './types';

// --- Sub-components defined here for simplicity due to file limits ---

interface HeroProps {
    onNavigate: (tab: string) => void;
}

const HeroSection: React.FC<HeroProps> = ({ onNavigate }) => (
  <div className="relative h-screen flex items-center justify-center overflow-hidden">
    <div className="absolute inset-0 z-0">
      {/* Changed from <img> to <div> with background-image to prevent broken image icon on mobile if load fails */}
      <div 
        className="w-full h-full bg-cover bg-center opacity-30 transition-opacity duration-1000"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1478737270239-2f02b77ac6d5?q=80&w=2070&auto=format&fit=crop')` }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
    </div>
    <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
      <h1 className="text-5xl md:text-8xl font-futura font-black text-white mb-6 tracking-tighter drop-shadow-2xl">
        PO <span className="text-gold">LABS</span>
      </h1>
      <p className="text-lg md:text-2xl text-gray-300 font-light tracking-widest uppercase mb-12">
        A evolução do Podcast • Marcos 16:15
      </p>
      <div className="flex flex-col md:flex-row gap-6 justify-center">
        <button 
            onClick={() => onNavigate('studio')}
            className="px-8 py-4 bg-gold hover:bg-yellow-500 text-black font-bold rounded-none skew-x-[-10deg] transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(212,175,55,0.4)]"
        >
           <span className="skew-x-[10deg] inline-block">CONHEÇA O ESTÚDIO</span>
        </button>
        <button 
            onClick={() => {
                onNavigate('podcasts');
                const grid = document.getElementById('podcast-grid');
                if (grid) grid.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-8 py-4 border border-white text-white hover:bg-white/10 hover:text-white font-bold rounded-none skew-x-[-10deg] transition-all"
        >
           <span className="skew-x-[10deg] inline-block">NOSSOS CANAIS</span>
        </button>
      </div>
    </div>
    
    {/* Floating elements */}
    <div className="absolute bottom-10 left-0 right-0 flex justify-center animate-bounce cursor-pointer" onClick={() => {
         const grid = document.getElementById('podcast-grid');
         if (grid) grid.scrollIntoView({ behavior: 'smooth' });
    }}>
       <ArrowRight className="transform rotate-90 text-gold" />
    </div>
  </div>
);

const PodcastGrid = ({ onSelect }: { onSelect: (id: string) => void }) => (
  <section id="podcast-grid" className="py-24 bg-black relative">
    <div className="max-w-7xl mx-auto px-4">
      <div className="flex items-center justify-between mb-16">
         <h2 className="text-4xl font-futura font-bold text-white border-l-4 border-gold pl-6">NOSSOS <span className="text-gold">ORIGINAIS</span></h2>
         <div className="hidden md:flex gap-2 text-sm text-gray-400">
            <span>2024</span>
            <span className="text-gold">•</span>
            <span>2025 Collection</span>
         </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {PODCASTS.map((podcast) => (
          <div 
            key={podcast.id} 
            className="group relative h-[450px] overflow-hidden rounded-xl cursor-pointer border border-gray-800 hover:border-gray-600 transition-all duration-500 bg-gray-900 shadow-2xl"
            onClick={() => onSelect(podcast.id)}
          >
            {/* Background Image (blurred) - Added onError to hide if missing */}
            <div 
               className="absolute inset-0 w-full h-full bg-cover bg-center blur-2xl opacity-10 transition-opacity duration-500 group-hover:opacity-20"
               style={{ backgroundImage: `url('${podcast.image}')` }}
               onError={(e) => (e.currentTarget.style.display = 'none')}
            ></div>
            
            {/* Main Logo Image - ROUNDED DESIGN */}
            <div className="absolute inset-0 flex items-center justify-center pb-24 transition-all duration-500">
                {/* Dynamic Glow based on theme color */}
                <div 
                    className="absolute w-48 h-48 rounded-full blur-[60px] opacity-0 group-hover:opacity-60 transition-opacity duration-700"
                    style={{ backgroundColor: podcast.themeColor }}
                ></div>

                {/* Circular Container */}
                <div className="w-52 h-52 rounded-full overflow-hidden border-4 border-gray-800 group-hover:border-white/20 shadow-2xl relative z-10 bg-black flex items-center justify-center transform group-hover:scale-105 transition-all duration-500">
                    <img 
                      src={podcast.image} 
                      alt={`${podcast.name} Logo`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${podcast.name}&background=random&size=400`;
                      }}
                    />
                </div>
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/90 to-transparent opacity-90"></div>
            
            <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500 border-t border-gray-800/50 bg-black/40 backdrop-blur-sm">
              <span className="text-xs font-bold px-2 py-1 bg-gold text-black uppercase mb-3 inline-block shadow-lg">{podcast.category}</span>
              <h3 className="text-2xl font-bold font-futura mb-2 text-white group-hover:text-gold transition-colors drop-shadow-md">{podcast.name}</h3>
              <p className="text-gray-300 text-sm line-clamp-2 opacity-90 group-hover:opacity-100 transition-opacity duration-500 mb-4">{podcast.description}</p>
              
              <div className="flex items-center gap-4 text-sm text-gray-400 opacity-80 group-hover:opacity-100 transition-opacity delay-200">
                <span className="flex items-center gap-1"><User size={14} /> {podcast.host.split(' ')[0]}...</span>
                <span className="flex items-center gap-1"><Youtube size={14} /> {podcast.subscribers}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// --- Shop Image Component with Smart Extension Hunt ---
interface ShopImageProps {
    type: 'caneca' | 'camiseta' | 'whatsapp';
    podcastId: string;
    alt: string;
    fallbackUrl: string;
}

const ShopImage: React.FC<ShopImageProps> = ({ type, podcastId, alt, fallbackUrl }) => {
    // List of paths to try in order
    const candidatePaths = [
        `${type}-${podcastId}.png`,
        `${type}-${podcastId}.jpg`,
        `${type}-${podcastId}.jpeg`,
        `${type}.png`,
        `${type}.jpg`,
        fallbackUrl
    ];

    const [currentPathIndex, setCurrentPathIndex] = useState(0);
    const [finalFallback, setFinalFallback] = useState(false);

    const handleError = () => {
        const nextIndex = currentPathIndex + 1;
        if (nextIndex < candidatePaths.length) {
            setCurrentPathIndex(nextIndex);
        } else {
            setFinalFallback(true);
        }
    };

    return (
        <div className="relative w-full h-full">
            <img 
                src={candidatePaths[currentPathIndex]}
                alt={alt}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform" 
                onError={handleError}
            />
            
            {/* Debug Hint for User - Only show if we fell back to web URL and user is developer */}
            {currentPathIndex === candidatePaths.length - 1 && (
                <div className="absolute bottom-0 left-0 right-0 bg-black/90 p-1 text-center border-t border-red-500/50 z-10">
                     <div className="text-[9px] text-red-400 font-mono leading-tight flex flex-col items-center">
                        <span className="flex items-center gap-1"><AlertCircle size={8} /> Arquivo local não achado</span>
                        <span className="text-gray-500">Tentei: .png, .jpg, .jpeg</span>
                        <span className="text-white font-bold bg-red-900/30 px-1 rounded mt-0.5 select-all">{type}-{podcastId}.png</span>
                     </div>
                </div>
            )}
        </div>
    );
};

const PodcastDetail = ({ podcast, onBack }: { podcast: Podcast; onBack: () => void }) => {
  const [summary, setSummary] = useState<string>('');
  const [loadingSummary, setLoadingSummary] = useState(false);

  useEffect(() => {
    // Simulate fetching latest video and summarizing
    const fetchLatest = async () => {
      setLoadingSummary(true);
      // In real app, fetch from YouTube API here.
      // Mocking a delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      const mockTitle = `Novo Episódio: O Futuro de ${podcast.category}`;
      const genSummary = await generateVideoSummary(mockTitle, podcast.name);
      setSummary(genSummary);
      setLoadingSummary(false);
    };
    fetchLatest();
  }, [podcast]);

  return (
    <div className="min-h-screen bg-black pt-20 animate-fade-in">
      <button onClick={onBack} className="fixed top-24 left-4 z-50 flex items-center gap-2 text-white bg-black/50 px-4 py-2 rounded-full hover:bg-gold hover:text-black transition-all">
        ← Voltar
      </button>

      {/* Hero Header */}
      <div className="relative h-[60vh]">
        {/* Background Image - Added onError to prevent broken icon on mobile */}
        <div 
           className="w-full h-full bg-cover bg-center opacity-20 blur-sm fixed top-0 left-0 -z-10"
           style={{ backgroundImage: `url('${podcast.image}')` }} 
           onError={(e) => (e.currentTarget.style.display = 'none')}
        ></div>
        
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/80 to-black"></div>
        <div className="absolute bottom-0 w-full p-8 md:p-16 max-w-7xl mx-auto flex flex-col md:flex-row items-end gap-8">
          {/* Circular Logo in Detail Page */}
          <div className="w-48 h-48 rounded-full overflow-hidden shadow-[0_0_50px_rgba(212,175,55,0.3)] border-4 border-gray-800 bg-black shrink-0 hidden md:block group hover:border-gold/50 transition-colors">
             <img 
                src={podcast.image} 
                className="w-full h-full object-cover" 
                onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${podcast.name}&background=random&size=400`;
                }}
             />
          </div>
          <div>
              <h1 className="text-5xl md:text-7xl font-futura font-bold text-white mb-4 drop-shadow-lg" style={{ color: podcast.themeColor }}>{podcast.name}</h1>
              <p className="text-xl md:text-2xl text-gray-300 max-w-2xl">{podcast.description}</p>
              
              <div className="flex gap-4 mt-8">
                <a href={podcast.youtubeUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-bold transition-all">
                  <Play fill="currentColor" /> Assistir no YouTube
                </a>
                {podcast.id === '1615' && (
                  <a 
                    href="https://wa.me/5511975557317?text=Oração"
                    target="_blank" 
                    rel="noreferrer"
                    className="flex items-center gap-2 border border-gold text-gold hover:bg-gold hover:text-black px-6 py-3 rounded-lg font-bold transition-all"
                  >
                    <Heart size={20} /> Pedido de Oração
                  </a>
                )}
              </div>
          </div>
        </div>
      </div>

      {/* Content Columns */}
      <div className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* Left: Stats & Awards */}
        <div className="space-y-8">
           <div className="glass-panel p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-gold"><Globe size={20}/> Impacto</h3>
              <div className="space-y-4">
                 {podcast.stats.map((stat, i) => (
                   <div key={i} className="flex justify-between border-b border-gray-800 pb-2">
                      <span className="text-gray-400">{stat.label}</span>
                      <span className="font-mono font-bold">{stat.value}</span>
                   </div>
                 ))}
                 <div className="flex justify-between pt-2">
                    <span className="text-gray-400">Views Totais</span>
                    <span className="font-mono font-bold text-white">{podcast.views}</span>
                 </div>
              </div>
           </div>

           {podcast.awards.length > 0 && (
             <div className="glass-panel p-6 rounded-xl border-gold/20">
               <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-gold"><Award size={20}/> Premiações</h3>
               {podcast.awards.map((award, i) => (
                 <div key={i} className="mb-4 last:mb-0">
                    <div className="text-xs text-gray-500">{award.year}</div>
                    <div className="font-bold text-lg">{award.position} Lugar - {award.category}</div>
                    <div className="text-sm text-gray-400">{award.title}</div>
                 </div>
               ))}
               <a href="https://premiompb.com.br/" target="_blank" className="text-xs text-gold underline mt-4 block">Ver site oficial do prêmio</a>
             </div>
           )}
        </div>

        {/* Center: Latest Content & AI Summary */}
        <div className="lg:col-span-2 space-y-12">
           
           {/* AI Feature */}
           <div className="border border-gray-800 bg-gray-900/50 p-8 rounded-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                 <Mic size={120} />
              </div>
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                 Último Episódio <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded">AI POWERED</span>
              </h3>
              
              {loadingSummary ? (
                 <div className="h-24 flex items-center justify-center text-gold animate-pulse">Gerando resumo com Gemini AI...</div>
              ) : (
                 <div className="space-y-4">
                    <p className="text-lg italic text-gray-300">"{summary}"</p>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                       <span>Resumo gerado automaticamente</span>
                    </div>
                 </div>
              )}
           </div>

           {/* Host Column */}
           <div className="prose prose-invert max-w-none">
              <h3 className="text-2xl font-bold text-gold mb-4">Coluna do Host: {podcast.host}</h3>
              <p className="text-gray-300 leading-relaxed">
                 Bem-vindos ao nosso espaço digital. Aqui na 16.15 Studios, acreditamos que cada voz tem o poder de ecoar pela eternidade. 
                 Neste projeto, buscamos trazer não apenas entretenimento, mas transformação. Fiquem ligados nas novidades desta temporada!
              </p>
              <div className="mt-6 flex items-center gap-4">
                 <div className="w-12 h-12 bg-gray-700 rounded-full overflow-hidden">
                    <img src={`https://ui-avatars.com/api/?name=${podcast.host}&background=random`} alt={podcast.host} />
                 </div>
                 <div>
                    <div className="font-bold">{podcast.host}</div>
                    <div className="text-sm text-gray-500">Host & Creator</div>
                 </div>
              </div>
           </div>

           {/* Shop Teaser */}
           <div className="mt-12 border-t border-gray-800 pt-12">
              <h3 className="text-2xl font-bold mb-6">Loja & Comunidade {podcast.name}</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                 
                 {/* Produto 1: Caneca - LINK WPP */}
                 <a 
                    href={`https://wa.me/5511975557317?text=${encodeURIComponent(`Olá! Gostaria de comprar a Caneca do ${podcast.name}.`)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-gray-900 rounded-lg p-4 group hover:bg-gray-800 transition-colors cursor-pointer border border-transparent hover:border-gold/30 block"
                 >
                    <div className="aspect-square bg-gray-800 rounded mb-3 overflow-hidden relative">
                        <ShopImage 
                            type="caneca" 
                            podcastId={podcast.id} 
                            alt={`Caneca ${podcast.name}`}
                            fallbackUrl="https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&q=80&w=400"
                        />
                        <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">Oficial</div>
                    </div>
                    <div className="font-bold text-sm text-white">Caneca {podcast.name}</div>
                    <div className="text-gold mt-1 font-mono">R$ 29,19</div>
                 </a>

                 {/* Produto 2: Camiseta - LINK WPP */}
                 <a 
                    href={`https://wa.me/5511975557317?text=${encodeURIComponent(`Olá! Gostaria de comprar a Camiseta Collection do ${podcast.name}.`)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-gray-900 rounded-lg p-4 group hover:bg-gray-800 transition-colors cursor-pointer border border-transparent hover:border-gold/30 block"
                 >
                    <div className="aspect-square bg-gray-800 rounded mb-3 overflow-hidden relative">
                        <ShopImage 
                            type="camiseta" 
                            podcastId={podcast.id} 
                            alt={`Camiseta ${podcast.name}`}
                            fallbackUrl="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=400"
                        />
                    </div>
                    <div className="font-bold text-sm text-white">Camiseta Collection</div>
                    <div className="text-gold mt-1 font-mono">R$ 50,00</div>
                 </a>

                 {/* Produto 3: Whatsapp / Grupo - LINK WPP */}
                 <a 
                    href={`https://wa.me/5511975557317?text=${encodeURIComponent(`Olá, gostaria de entrar no grupo do ${podcast.name}`)}`}
                    target="_blank" 
                    rel="noreferrer"
                    className="bg-gray-900 rounded-lg p-4 group hover:bg-gray-800 transition-all cursor-pointer border border-green-900 hover:border-green-500 relative block"
                 >
                    <div className="aspect-square bg-gray-800 rounded mb-3 overflow-hidden relative flex items-center justify-center">
                        <ShopImage 
                            type="whatsapp" 
                            podcastId={podcast.id} 
                            alt={`Grupo ${podcast.name}`}
                            fallbackUrl="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=400&auto=format&fit=crop"
                        />
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors pointer-events-none flex items-center justify-center">
                            <ExternalLink size={32} className="text-white opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0" />
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                         <div className="font-bold text-sm text-white">Grupo {podcast.name}</div>
                         <MessageCircle size={16} className="text-green-500" />
                    </div>
                    <div className="text-green-400 mt-1 font-mono font-bold text-xs uppercase tracking-wider">Acesso Gratuito</div>
                 </a>

              </div>
           </div>

        </div>
      </div>
    </div>
  );
};

// --- ANALYTICS PAGE ---
const AnalyticsPage = () => {
    const [aiInsight, setAiInsight] = useState("Inicializando análise de ecossistema...");
    const [loading, setLoading] = useState(true);

    // Helpers to parse the rough view strings more robustly
    const parseViews = (str: string) => {
        if (!str) return 0;
        const clean = str.toLowerCase().replace(/[^0-9.k]/g, ''); // keep . and k
        if (clean.includes('k')) {
            return parseFloat(clean.replace('k', '')) * 1000;
        }
        // Remove dots for parsing standard numbers (PT-BR format 600.000 -> 600000)
        return parseFloat(clean.replace(/\./g, '')) || 0;
    };

    const totalViews = PODCASTS.reduce((acc, curr) => acc + parseViews(curr.views), 0);
    const topPodcasts = [...PODCASTS].sort((a, b) => parseViews(b.views) - parseViews(a.views)).slice(0, 5);

    useEffect(() => {
        const getAnalysis = async () => {
            setLoading(true);
            const dataSummary = PODCASTS.map(p => `${p.name} (${p.category}): ${p.views} views, ${p.subscribers} subs.`).join('\n');
            const insight = await generateNetworkAnalysis(dataSummary);
            setAiInsight(insight);
            setLoading(false);
        };
        getAnalysis();
    }, []);

    const currentDate = new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });

    return (
        <div className="min-h-screen pt-24 px-4 pb-12 bg-[#080808]">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <header className="mb-12 flex flex-col md:flex-row items-end justify-between border-b border-gray-800 pb-8 gap-6">
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                             <div className="px-2 py-0.5 bg-gold/20 text-gold border border-gold/30 text-[10px] font-bold uppercase tracking-widest rounded">
                                 Relatório Corporativo
                             </div>
                             <span className="text-gray-500 text-xs font-mono">{currentDate}</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-futura font-bold text-white mb-2">
                           MARKET <span className="text-gold">INTELLIGENCE</span>
                        </h1>
                        <p className="text-gray-400 max-w-xl">
                            Dashboard executivo de performance, alcance e valuation do ecossistema 16.15 Studios.
                        </p>
                    </div>
                    <div className="flex gap-3">
                        <button className="flex items-center gap-2 px-4 py-2 bg-gray-900 border border-gray-700 hover:border-white text-white rounded text-sm transition-all">
                            <FileText size={16} /> Exportar PDF
                        </button>
                        <a href="https://wa.me/5511975557317?text=Quero anunciar no ecossistema 16.15" target="_blank" className="flex items-center gap-2 px-4 py-2 bg-gold text-black font-bold rounded text-sm hover:bg-yellow-500 transition-all shadow-lg shadow-gold/10">
                            <Briefcase size={16} /> Media Kit
                        </a>
                    </div>
                </header>

                {/* KPI ROW */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="glass-panel p-6 rounded-xl border border-gray-800 hover:border-gold/30 transition-colors">
                        <div className="flex justify-between items-start mb-4">
                             <div className="p-2 bg-blue-500/10 rounded-lg text-blue-500"><Eye size={20} /></div>
                             <span className="text-green-500 text-xs font-bold bg-green-900/20 px-2 py-1 rounded">+14.2%</span>
                        </div>
                        <div className="text-3xl font-mono font-bold text-white mb-1">{totalViews.toLocaleString('pt-BR')}</div>
                        <div className="text-gray-500 text-xs uppercase tracking-wider font-bold">Views Totais</div>
                    </div>
                    
                    <div className="glass-panel p-6 rounded-xl border border-gray-800 hover:border-gold/30 transition-colors">
                        <div className="flex justify-between items-start mb-4">
                             <div className="p-2 bg-purple-500/10 rounded-lg text-purple-500"><Users size={20} /></div>
                             <span className="text-green-500 text-xs font-bold bg-green-900/20 px-2 py-1 rounded">+5.8%</span>
                        </div>
                        <div className="text-3xl font-mono font-bold text-white mb-1">9</div>
                        <div className="text-gray-500 text-xs uppercase tracking-wider font-bold">Canais Ativos</div>
                    </div>

                    <div className="glass-panel p-6 rounded-xl border border-gray-800 hover:border-gold/30 transition-colors">
                        <div className="flex justify-between items-start mb-4">
                             <div className="p-2 bg-gold/10 rounded-lg text-gold"><PieChart size={20} /></div>
                             <span className="text-gray-500 text-xs font-bold">Est.</span>
                        </div>
                        <div className="text-3xl font-mono font-bold text-white mb-1">68%</div>
                        <div className="text-gray-500 text-xs uppercase tracking-wider font-bold">Retenção Média</div>
                    </div>

                    <div className="glass-panel p-6 rounded-xl border border-gray-800 hover:border-gold/30 transition-colors">
                        <div className="flex justify-between items-start mb-4">
                             <div className="p-2 bg-green-500/10 rounded-lg text-green-500"><Target size={20} /></div>
                        </div>
                        <div className="text-3xl font-mono font-bold text-white mb-1">Multi-Nicho</div>
                        <div className="text-gray-500 text-xs uppercase tracking-wider font-bold">Segmentação</div>
                    </div>
                </div>

                {/* MAIN CONTENT GRID */}
                <div className="grid lg:grid-cols-3 gap-8">
                    
                    {/* Left Column: Analysis & Channels */}
                    <div className="lg:col-span-2 space-y-8">
                        
                        {/* Gemini Strategic Report */}
                        <div className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-2xl border border-gray-800 relative overflow-hidden">
                             <div className="absolute top-0 right-0 p-6 opacity-5">
                                 <Briefcase size={140} />
                             </div>
                             <div className="flex items-center gap-3 mb-6">
                                 <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center border border-gold/50">
                                     <Zap size={20} className="text-gold" />
                                 </div>
                                 <div>
                                     <h3 className="text-lg font-bold text-white">Strategic AI Report</h3>
                                     <p className="text-xs text-gold">Powered by Gemini 2.5 Business Intelligence</p>
                                 </div>
                             </div>
                             
                             <div className="min-h-[100px] text-gray-300 leading-relaxed font-light border-l-2 border-gold/30 pl-6 relative">
                                {loading ? (
                                    <div className="flex items-center gap-3 text-gray-500">
                                        <div className="w-4 h-4 border-2 border-gold border-t-transparent rounded-full animate-spin"></div>
                                        Processando dados do mercado...
                                    </div>
                                ) : (
                                    <p className="animate-fade-in">{aiInsight}</p>
                                )}
                             </div>
                        </div>

                        {/* Monitored Channels List */}
                        <div className="glass-panel rounded-2xl border border-gray-800 overflow-hidden">
                            <div className="p-6 border-b border-gray-800 flex justify-between items-center">
                                <h3 className="font-bold flex items-center gap-2"><Activity size={18} className="text-blue-500"/> Canais Monitorados</h3>
                                <span className="text-xs text-green-500 flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div> Live Tracking</span>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-sm text-gray-400">
                                    <thead className="bg-gray-900/50 uppercase tracking-wider text-xs font-bold text-gray-500">
                                        <tr>
                                            <th className="p-4">Canal</th>
                                            <th className="p-4">Categoria</th>
                                            <th className="p-4">Views Totais</th>
                                            <th className="p-4">Inscritos</th>
                                            <th className="p-4 text-right">Ação</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-800">
                                        {PODCASTS.map((p) => (
                                            <tr key={p.id} className="hover:bg-gray-900/30 transition-colors">
                                                <td className="p-4 font-bold text-white flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-gray-800 overflow-hidden">
                                                        <img src={p.image} className="w-full h-full object-cover" onError={(e) => (e.currentTarget.style.display = 'none')} />
                                                    </div>
                                                    {p.name}
                                                </td>
                                                <td className="p-4"><span className="bg-gray-800 px-2 py-1 rounded text-xs">{p.category}</span></td>
                                                <td className="p-4 font-mono text-gray-300">{p.views}</td>
                                                <td className="p-4 font-mono">{p.subscribers}</td>
                                                <td className="p-4 text-right">
                                                    <a href={p.youtubeUrl} target="_blank" className="text-gold hover:underline text-xs flex items-center justify-end gap-1">
                                                        Ver Canal <ExternalLink size={10} />
                                                    </a>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Share & Demographics */}
                    <div className="space-y-8">
                        <div className="glass-panel p-8 rounded-2xl border border-gray-800">
                            <h3 className="font-bold mb-6 flex items-center gap-2"><BarChart3 size={20} className="text-gold" /> Share of Voice</h3>
                            <div className="space-y-6">
                                {topPodcasts.map((p, i) => {
                                    const percentage = (parseViews(p.views) / totalViews) * 100;
                                    return (
                                        <div key={p.id}>
                                            <div className="flex justify-between mb-2 text-xs">
                                                <span className="font-bold text-gray-300 truncate w-32">{p.name}</span>
                                                <span className="text-gold font-mono">{percentage.toFixed(1)}%</span>
                                            </div>
                                            <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                                                <div 
                                                    className="h-full bg-gold transition-all duration-1000 ease-out"
                                                    style={{ width: `${percentage}%`, opacity: 1 - (i * 0.15) }}
                                                ></div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>

                        <div className="glass-panel p-8 rounded-2xl border border-gray-800 bg-gradient-to-b from-blue-900/10 to-transparent">
                            <h3 className="font-bold mb-4">Investimento</h3>
                            <p className="text-sm text-gray-400 mb-6">
                                O 16.15 Studios oferece pacotes de patrocínio 360º, inserindo sua marca em múltiplos nichos simultaneamente.
                            </p>
                            <a 
                                href="https://wa.me/5511975557317?text=Gostaria de agendar uma reunião comercial"
                                target="_blank"
                                className="block w-full text-center py-3 bg-white text-black font-bold rounded hover:bg-gray-200 transition-colors"
                            >
                                Falar com Comercial
                            </a>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

const FounderPage = () => {
   const [imgError, setImgError] = useState(false);

   return (
      <div className="min-h-screen pt-20 pb-12 bg-black relative overflow-hidden">
         {/* Background Effects */}
         <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/10 rounded-full blur-[120px] pointer-events-none"></div>
         <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[120px] pointer-events-none"></div>

         <div className="max-w-7xl mx-auto px-4 relative z-10 pt-8">
             
             {/* Hero Section Split */}
             <div className="flex flex-col md:flex-row items-center gap-12 mb-24">
                 
                 {/* Left: Image (Magazine Cover Style) */}
                 <div className="w-full md:w-1/2 relative group">
                     <div className="aspect-[3/4] rounded-2xl overflow-hidden border border-gray-800 shadow-2xl relative">
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 z-10"></div>
                        {!imgError ? (
                           <img 
                              src="founder.jpg" 
                              alt="Rafael Soares" 
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                              onError={() => setImgError(true)}
                           />
                        ) : (
                           <div className="w-full h-full flex flex-col items-center justify-center bg-gray-900 text-gray-400 p-8 text-center">
                              <User size={64} className="mb-4 text-gold opacity-50" />
                              <span className="text-sm uppercase tracking-widest">
                                 Rafael Soares
                              </span>
                           </div>
                        )}
                     </div>
                     
                     {/* Badge of Authority */}
                     <div className="absolute -bottom-6 -right-6 bg-gold text-black p-6 rounded-xl shadow-[0_0_30px_rgba(212,175,55,0.3)] hidden md:block transform group-hover:translate-y-2 transition-transform">
                        <div className="font-futura font-bold text-3xl leading-none">CEO</div>
                        <div className="text-xs uppercase tracking-widest font-bold opacity-80 mt-1">& Founder</div>
                     </div>
                 </div>

                 {/* Right: The Pitch */}
                 <div className="w-full md:w-1/2 space-y-8">
                     <div>
                        <h2 className="text-gold font-mono text-sm tracking-[0.3em] uppercase mb-4 flex items-center gap-2">
                           <div className="w-8 h-[1px] bg-gold"></div>
                           The Visionary
                        </h2>
                        <h1 className="text-5xl md:text-7xl font-futura font-bold leading-none text-white mb-2">
                           RAFAEL <br/>
                           <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-600">SOARES</span>
                        </h1>
                     </div>

                     <div className="border-l-4 border-gold pl-6 py-2">
                        <p className="text-xl md:text-2xl text-gray-300 leading-relaxed font-light italic">
                           "O 16.15 Studios não é apenas uma produtora; é um <span className="text-white font-bold">ecossistema de influência</span> de alta performance. Construímos pontes entre marcas visionárias e audiências leais."
                        </p>
                     </div>

                     <p className="text-gray-400 leading-relaxed">
                        Com uma trajetória marcada pela inovação e pelo impacto social, Rafael Soares transformou o 16.15 Studios em referência no mercado de áudio digital. Sua expertise vai além da técnica: ele desenha estratégias que convertem ouvintes em comunidades e conteúdo em retorno sobre investimento (ROI).
                     </p>

                     <div className="flex gap-4 pt-4">
                        <a href="https://instagram.com/rsoares16.15" target="_blank" className="bg-gold text-black px-8 py-3 rounded font-bold uppercase tracking-wider hover:bg-yellow-500 transition-colors flex items-center gap-2">
                           <Briefcase size={18} /> Conectar
                        </a>
                        <button className="border border-gray-700 hover:border-white text-gray-300 hover:text-white px-8 py-3 rounded font-bold uppercase tracking-wider transition-colors">
                           Ver Press Kit
                        </button>
                     </div>
                 </div>
             </div>

             {/* The "Why Invest" Grid */}
             <div className="grid md:grid-cols-3 gap-6 mb-24">
                 <div className="glass-panel p-8 rounded-2xl hover:bg-white/5 transition-colors group">
                     <Target className="w-10 h-10 text-gold mb-6 group-hover:scale-110 transition-transform" />
                     <h3 className="text-xl font-bold text-white mb-3">Visão Estratégica</h3>
                     <p className="text-gray-400 text-sm leading-relaxed">
                        Entendemos o algoritmo, mas focamos em pessoas. Criamos narrativas que retêm atenção e geram autoridade instantânea para sua marca.
                     </p>
                 </div>
                 <div className="glass-panel p-8 rounded-2xl hover:bg-white/5 transition-colors group">
                     <Rocket className="w-10 h-10 text-blue-500 mb-6 group-hover:scale-110 transition-transform" />
                     <h3 className="text-xl font-bold text-white mb-3">Aceleração de Negócios</h3>
                     <p className="text-gray-400 text-sm leading-relaxed">
                        Nossos podcasts não são apenas programas; são ferramentas de vendas e networking. Sua empresa inserida em conversas que moldam o mercado.
                     </p>
                 </div>
                 <div className="glass-panel p-8 rounded-2xl hover:bg-white/5 transition-colors group">
                     <TrendingUp className="w-10 h-10 text-green-500 mb-6 group-hover:scale-110 transition-transform" />
                     <h3 className="text-xl font-bold text-white mb-3">ROI & Impacto</h3>
                     <p className="text-gray-400 text-sm leading-relaxed">
                        Números auditáveis e engajamento real. Transformamos views em leads qualificados e brand awareness em valor de mercado.
                     </p>
                 </div>
             </div>

         </div>
      </div>
   );
};

const SocialPage = () => (
   <div className="min-h-screen pt-24 px-4 bg-gradient-to-b from-blue-950/20 to-black">
      <div className="max-w-6xl mx-auto">
         
         <div className="text-center mb-16 relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gold/5 rounded-full blur-[80px]"></div>
            <HandHeart className="w-20 h-20 text-gold mx-auto mb-6 relative z-10" />
            <h1 className="text-4xl md:text-5xl font-futura font-bold mb-4">RESPONSABILIDADE SOCIAL & <span className="text-gold">IMPACTO</span></h1>
            <p className="text-xl text-gray-300">Instituto 16.15 • Compartilhadores de Sorriso</p>
         </div>

         <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div className="order-2 md:order-1 space-y-8">
               
               <div className="border-l-4 border-gold pl-6">
                  <h2 className="text-2xl font-bold mb-4 text-white">Transformando Vidas, Construindo o Futuro.</h2>
                  <p className="text-gray-300 leading-relaxed text-lg">
                    O 16.15 Studios acredita que o sucesso corporativo deve caminhar junto com o desenvolvimento humano. Através do nosso Instituto, conectamos recursos a quem precisa, criando um ciclo virtuoso de prosperidade e dignidade.
                  </p>
               </div>

               <div className="grid grid-cols-2 gap-4 my-8">
                  <div className="glass-panel p-4 rounded-xl text-center">
                      <div className="text-3xl font-bold text-gold mb-1">5k+</div>
                      <div className="text-xs text-gray-400 uppercase tracking-widest">Cestas Básicas</div>
                  </div>
                  <div className="glass-panel p-4 rounded-xl text-center">
                      <div className="text-3xl font-bold text-blue-500 mb-1">12</div>
                      <div className="text-xs text-gray-400 uppercase tracking-widest">Comunidades</div>
                  </div>
               </div>

               <div className="flex flex-col sm:flex-row gap-4">
                  <a 
                     href="https://wa.me/5511975557317?text=Olá! Gostaria de saber como posso apoiar o Instituto 16.15." 
                     target="_blank" 
                     rel="noreferrer"
                     className="bg-gold hover:bg-yellow-500 text-black px-8 py-4 rounded-lg font-bold transition-all shadow-lg shadow-gold/20 flex items-center justify-center gap-2"
                  >
                     <Smile size={20} />
                     Quero Ajudar
                  </a>
                  <a href="https://www.instagram.com/instituto16.15" target="_blank" className="border border-gray-700 hover:border-white hover:bg-white/5 px-8 py-4 rounded-lg font-bold transition-colors flex items-center justify-center gap-2">
                     <Instagram size={20} />
                     Ver Projetos
                  </a>
               </div>
            </div>
            
            <div className="order-1 md:order-2 relative group">
                <div className="absolute inset-0 bg-gold/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <div className="grid grid-cols-2 gap-4 relative z-10">
                  <img 
                     src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?q=80&w=800&auto=format&fit=crop" 
                     className="rounded-2xl transform translate-y-8 shadow-2xl border border-gray-800" 
                     alt="Comunidade unida"
                  />
                  <img 
                     src="https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?q=80&w=800&auto=format&fit=crop" 
                     className="rounded-2xl shadow-2xl border border-gray-800" 
                     alt="Ação social"
                  />
               </div>
            </div>
         </div>

         {/* Corporate Partnership Section */}
         <div className="glass-panel p-12 rounded-3xl text-center border border-gray-800 relative overflow-hidden">
             <div className="absolute top-0 right-0 p-8 opacity-5">
                <Briefcase size={120} />
             </div>
             <h3 className="text-2xl font-bold mb-4">Parceria Corporativa & ESG</h3>
             <p className="text-gray-400 max-w-2xl mx-auto mb-8">
                Sua empresa pode ser um agente de transformação. Alinhe sua marca aos valores de responsabilidade social e impacte positivamente o ecossistema.
             </p>
             <button className="text-gold border-b border-gold pb-1 hover:text-white hover:border-white transition-colors uppercase tracking-widest text-sm font-bold">
                Solicitar Apresentação Institucional
             </button>
         </div>
      </div>
   </div>
);

const AwardsPage = () => (
   <div className="min-h-screen pt-24 px-4 max-w-7xl mx-auto">
      <h1 className="text-5xl font-futura text-center mb-16">HALL OF <span className="text-gold">FAME</span></h1>
      
      <div className="grid md:grid-cols-2 gap-16">
         <div>
            <h2 className="text-3xl font-bold mb-8 border-b border-gray-800 pb-4">Conquistas 2024</h2>
            <div className="space-y-6">
               {PODCASTS.filter(p => p.awards.some(a => a.year === '2024')).map(p => (
                  <div key={p.id} className="flex items-center gap-4 bg-gray-900/50 p-4 rounded-xl border border-gray-800">
                     <div className="w-16 h-16 rounded-full overflow-hidden shrink-0">
                        <img src={p.image} className="w-full h-full object-cover" />
                     </div>
                     <div>
                        <div className="text-gold font-bold">{p.awards.find(a => a.year === '2024')?.position} Lugar</div>
                        <div className="font-bold text-xl">{p.name}</div>
                        <div className="text-gray-400 text-sm">{p.awards.find(a => a.year === '2024')?.category}</div>
                     </div>
                  </div>
               ))}
            </div>
         </div>
         <div>
            <h2 className="text-3xl font-bold mb-8 border-b border-gray-800 pb-4">Conquistas 2025</h2>
            <div className="space-y-6">
               {PODCASTS.filter(p => p.awards.some(a => a.year === '2025')).map(p => (
                  <div key={p.id} className="flex items-center gap-4 bg-gray-900/50 p-4 rounded-xl border border-gray-800">
                     <div className="w-16 h-16 rounded-full overflow-hidden shrink-0">
                        <img src={p.image} className="w-full h-full object-cover" />
                     </div>
                     <div>
                        <div className="text-gold font-bold">{p.awards.find(a => a.year === '2025')?.position} Lugar</div>
                        <div className="font-bold text-xl">{p.name}</div>
                        <div className="text-gray-400 text-sm">{p.awards.find(a => a.year === '2025')?.category}</div>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </div>
   </div>
);

const StudioPage = () => {
    const editTeam = [
        { name: "Natalia Gomes", role: "Head de Edição", insta: "@ntpgomes" },
        { name: "Thays Jurado", role: "Editora Criativa", insta: "@thaysjurado" },
        { name: "Pedro Ariel", role: "Filmmaker & Editor", insta: "@pedrofotografo2" }
    ];

    return (
        <div className="min-h-screen pt-20 bg-black">
            {/* Hero */}
            <div className="relative h-[50vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=2074&auto=format&fit=crop')] bg-cover bg-center opacity-40"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/80 to-black"></div>
                <div className="relative z-10 text-center px-4 max-w-4xl">
                    <h1 className="text-5xl md:text-7xl font-futura font-bold mb-6">PO <span className="text-gold">LABS</span></h1>
                    <p className="text-xl text-gray-300 tracking-widest uppercase">O Futuro da Sua Produção Começa Aqui</p>
                </div>
            </div>

            {/* Features */}
            <div className="max-w-7xl mx-auto px-4 py-16">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div className="glass-panel p-6 rounded-xl border-t border-gold/30 hover:border-gold transition-colors group">
                        <div className="bg-gold/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-gold/20 transition-colors">
                            <Video className="text-gold" size={24} />
                        </div>
                        <h3 className="text-xl font-bold mb-2">Imagem 4K</h3>
                        <p className="text-gray-400 text-sm">Câmeras de cinema digital para uma qualidade de imagem cristalina e cinematográfica.</p>
                    </div>
                    <div className="glass-panel p-6 rounded-xl border-t border-gold/30 hover:border-gold transition-colors group">
                        <div className="bg-gold/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-gold/20 transition-colors">
                            <Mic2 className="text-gold" size={24} />
                        </div>
                        <h3 className="text-xl font-bold mb-2">Áudio Premium</h3>
                        <p className="text-gray-400 text-sm">Microfones Shure e processamento de áudio em tempo real para voz limpa e presente.</p>
                    </div>
                    <div className="glass-panel p-6 rounded-xl border-t border-gold/30 hover:border-gold transition-colors group">
                        <div className="bg-gold/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-gold/20 transition-colors">
                            <Layout className="text-gold" size={24} />
                        </div>
                        <h3 className="text-xl font-bold mb-2">Cenografia</h3>
                        <p className="text-gray-400 text-sm">Cenários modulares e personalizados que refletem a identidade única do seu projeto.</p>
                    </div>
                    <div className="glass-panel p-6 rounded-xl border-t border-gold/30 hover:border-gold transition-colors group">
                        <div className="bg-gold/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-gold/20 transition-colors">
                            <Wifi className="text-gold" size={24} />
                        </div>
                        <h3 className="text-xl font-bold mb-2">Streaming</h3>
                        <p className="text-gray-400 text-sm">Transmissão ao vivo com baixa latência e integração multi-plataforma simultânea.</p>
                    </div>
                </div>
            </div>

            {/* Editing Team */}
            <div className="bg-gray-900/30 py-24 border-y border-gray-900">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                         <h2 className="text-3xl md:text-5xl font-futura font-bold mb-4">SQUAD DE <span className="text-gold">EDIÇÃO</span></h2>
                         <p className="text-gray-400">Os gênios da pós-produção que transformam brutos em obras de arte.</p>
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-8">
                        {editTeam.map((member, i) => (
                            <div key={i} className="glass-panel p-8 rounded-2xl flex flex-col items-center text-center group hover:border-gold/50 transition-colors">
                                <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gray-700 mb-6 group-hover:border-gold transition-colors">
                                     <img src={`https://ui-avatars.com/api/?name=${member.name}&background=111&color=D4AF37`} className="w-full h-full object-cover" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                                <div className="text-sm text-gold mb-4 uppercase tracking-widest">{member.role}</div>
                                <a href={`https://instagram.com/${member.insta.replace('@', '')}`} target="_blank" className="text-gray-500 hover:text-white flex items-center gap-1 text-sm transition-colors">
                                    <Instagram size={14} /> {member.insta}
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Pricing / Cortes */}
            <div className="py-24 max-w-5xl mx-auto px-4">
                <div className="text-center mb-16">
                    <Scissors className="w-16 h-16 text-gold mx-auto mb-6" />
                    <h2 className="text-3xl md:text-5xl font-futura font-bold mb-4">PACOTES DE <span className="text-gold">CORTES</span></h2>
                    <p className="text-gray-400">Viralize seu conteúdo com edição profissional dinâmica.</p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 items-center">
                    {/* Standard Pack */}
                    <div className="glass-panel p-8 rounded-2xl border border-gray-800">
                        <div className="text-gray-400 font-bold tracking-widest uppercase mb-4">Corte Avulso</div>
                        <div className="text-4xl font-bold text-white mb-6">R$ 50,00<span className="text-lg font-normal text-gray-500">/unid</span></div>
                        <ul className="space-y-4 mb-8 text-gray-300">
                             <li className="flex gap-3"><CheckCircle size={18} className="text-gray-600" /> Edição Dinâmica</li>
                             <li className="flex gap-3"><CheckCircle size={18} className="text-gray-600" /> Legendas Automáticas</li>
                             <li className="flex gap-3"><CheckCircle size={18} className="text-gray-600" /> Formato Vertical (Reels/TikTok)</li>
                        </ul>
                        <a href="https://wa.me/5511975557317?text=Gostaria%20de%20saber%20mais%20sobre%20o%20corte%20avulso" target="_blank" className="block w-full text-center py-3 border border-gray-600 rounded-lg font-bold hover:bg-gray-800 transition-colors">
                            Contratar
                        </a>
                    </div>

                    {/* Promo Pack */}
                    <div className="glass-panel p-8 rounded-2xl border border-gold relative transform md:scale-105 bg-gray-900/80">
                        <div className="absolute top-0 right-0 bg-gold text-black font-bold text-xs px-3 py-1 rounded-bl-lg uppercase">Melhor Escolha</div>
                        <div className="text-gold font-bold tracking-widest uppercase mb-4">Pack Promo</div>
                        <div className="text-5xl font-bold text-white mb-2">R$ 200,00</div>
                        <div className="text-sm text-gray-400 mb-6">Pacote com 5 Cortes (R$ 40/unid)</div>
                        
                        <ul className="space-y-4 mb-8 text-white">
                             <li className="flex gap-3"><CheckCircle size={18} className="text-gold" /> 5 Cortes Profissionais</li>
                             <li className="flex gap-3"><CheckCircle size={18} className="text-gold" /> Legendas Criativas</li>
                             <li className="flex gap-3"><CheckCircle size={18} className="text-gold" /> Color Grading Básico</li>
                             <li className="flex gap-3"><CheckCircle size={18} className="text-gold" /> Entrega Prioritária</li>
                        </ul>
                        <a 
                            href="https://wa.me/5511975557317?text=quero%20a%20promoção%20de%20cortes" 
                            target="_blank" 
                            className="flex items-center justify-center gap-2 w-full py-4 bg-gold text-black rounded-lg font-bold hover:bg-yellow-500 transition-colors shadow-lg shadow-gold/20"
                        >
                            <MessageCircle size={20} />
                            Quero a Promoção
                        </a>
                    </div>
                </div>
            </div>

            {/* Detail Section */}
            <div className="bg-brand-panel py-24 relative overflow-hidden">
                <div className="max-w-5xl mx-auto px-4 relative z-10 grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-futura font-bold mb-6">O PADRÃO <span className="text-gold">16.15</span></h2>
                        <p className="text-gray-300 mb-6 leading-relaxed">
                            O PO Labs (P=16, O=15) nasceu da necessidade de elevar o nível das produções digitais. Não somos apenas um estúdio de aluguel; somos parceiros estratégicos na construção da sua autoridade digital.
                        </p>
                        <ul className="space-y-4 mb-8">
                            <li className="flex items-center gap-3 text-gray-300">
                                <CheckCircle className="text-gold" size={18} /> Produção e Edição completa
                            </li>
                            <li className="flex items-center gap-3 text-gray-300">
                                <CheckCircle className="text-gold" size={18} /> Consultoria de Conteúdo
                            </li>
                            <li className="flex items-center gap-3 text-gray-300">
                                <CheckCircle className="text-gold" size={18} /> Gestão de Cortes e Social Media
                            </li>
                        </ul>
                    </div>
                    <div className="relative">
                        <div className="absolute inset-0 bg-gold blur-[100px] opacity-20"></div>
                        <img src="https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=2070&auto=format&fit=crop" className="relative rounded-2xl border border-gray-700 shadow-2xl z-10" alt="Studio Interior" />
                    </div>
                </div>
            </div>

            {/* CTA WhatsApp */}
            <div className="py-24 text-center px-4">
                <h2 className="text-3xl font-bold mb-8">Pronto para elevar o nível?</h2>
                <a 
                    href="https://wa.me/5511975557317" 
                    target="_blank" 
                    rel="noreferrer"
                    className="inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#128C7E] text-white px-8 py-4 rounded-full text-lg font-bold transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(37,211,102,0.3)]"
                >
                    <MessageCircle size={24} />
                    Agendar Visita via WhatsApp
                </a>
                <p className="mt-4 text-gray-500 text-sm">Ou ligue: +55 11 97555-7317</p>
            </div>
        </div>
    );
};

const Footer = () => {
   const [visits, setVisits] = useState(10000);
   const [email, setEmail] = useState('');
   const [showNotification, setShowNotification] = useState(false);

   useEffect(() => {
      const stored = localStorage.getItem('site_visits');
      let current = stored ? parseInt(stored) : 10000;
      if (current < 10000) current = 10000;
      const newCount = current + 1;
      localStorage.setItem('site_visits', newCount.toString());
      setVisits(newCount);
   }, []);

   const handleSubscribe = () => {
      if (!email) return;
      
      // Show notification
      setShowNotification(true);
      
      // Create mailto link
      const subject = encodeURIComponent("Inscrição na Newsletter PO Labs");
      const body = encodeURIComponent(`Olá, gostaria de receber as novidades do 16.15 Studios.\n\nMeu e-mail para cadastro é: ${email}`);
      window.location.href = `mailto:podcast1615@gmail.com?subject=${subject}&body=${body}`;
      
      setEmail('');

      // Hide notification after a few seconds
      setTimeout(() => setShowNotification(false), 4000);
   };

   return (
      <footer className="bg-black border-t border-gray-900 pt-16 pb-8 relative">
         {/* Toast Notification */}
         {showNotification && (
             <div className="fixed bottom-8 right-8 z-50 animate-float">
                 <div className="bg-gray-900 border border-gold text-white px-6 py-4 rounded-xl shadow-[0_0_30px_rgba(212,175,55,0.2)] flex items-center gap-4 max-w-sm">
                     <div className="bg-gold/20 p-2 rounded-full">
                         <CheckCircle className="text-gold" size={24} />
                     </div>
                     <div>
                         <h4 className="font-bold text-sm text-gold">Inscrição Iniciada!</h4>
                         <p className="text-xs text-gray-400 mt-1">Redirecionando para seu app de e-mail...</p>
                     </div>
                 </div>
             </div>
         )}

         <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-2">
               <h2 className="text-3xl font-futura font-bold text-white mb-6">PO <span className="text-gold">LABS</span></h2>
               <p className="text-gray-400 max-w-md mb-8">
                  Estrutura personalizada, tecnologia de ponta e propósito inabalável. O lugar onde grandes histórias ganham vida.
               </p>
               <div className="flex gap-4">
                  <Instagram className="text-gray-400 hover:text-white cursor-pointer" />
                  <Youtube className="text-gray-400 hover:text-white cursor-pointer" />
                  <Mail className="text-gray-400 hover:text-white cursor-pointer" />
               </div>
            </div>
            
            <div>
               <h3 className="font-bold text-white mb-4">Menu</h3>
               <ul className="space-y-2 text-gray-400 text-sm">
                  <li><a href="#" className="hover:text-gold">Home</a></li>
                  <li><a href="#" className="hover:text-gold">Podcasts</a></li>
                  <li><a href="#" className="hover:text-gold">Loja</a></li>
                  <li><a href="#" className="hover:text-gold">Contato</a></li>
               </ul>
            </div>

            <div id="newsletter">
               <h3 className="font-bold text-white mb-4">Newsletter</h3>
               <p className="text-xs text-gray-500 mb-4">Receba novidades mensais.</p>
               <div className="flex">
                  <input 
                     type="email" 
                     placeholder="Seu e-mail" 
                     className="bg-gray-900 border border-gray-800 rounded-l px-4 py-2 text-sm w-full focus:outline-none focus:border-gold"
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                     onKeyDown={(e) => e.key === 'Enter' && handleSubscribe()}
                  />
                  <button 
                     onClick={handleSubscribe}
                     className="bg-gold text-black px-4 py-2 rounded-r font-bold hover:bg-yellow-500"
                  >
                     OK
                  </button>
               </div>
            </div>
         </div>
         
         {/* Sponsors */}
         <div className="max-w-7xl mx-auto px-4 border-t border-gray-900 pt-8">
            <p className="text-center text-gray-600 text-xs uppercase tracking-widest mb-6">Nossos Parceiros</p>
            <div className="flex flex-wrap justify-center gap-8 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
               {SPONSORS.map((sponsor, i) => (
                  <span key={i} className="text-lg font-bold text-gray-500">{sponsor.name}</span>
               ))}
            </div>
         </div>
         
         <div className="flex flex-col items-center justify-center mt-12 border-t border-gray-900/50 pt-8">
            <div className="text-center text-gray-700 text-xs mb-4">
               © 2025 16.15 Studios. Todos os direitos reservados. podcast1615@gmail.com
            </div>
            
            <div className="flex items-center gap-2 px-4 py-2 bg-gray-900/30 rounded-full border border-gray-800/50">
               <div className="flex gap-1">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
               </div>
               <span className="font-mono text-xs text-gray-400 uppercase tracking-widest">
                  <span className="text-gold font-bold text-sm mr-1">{visits.toLocaleString('pt-BR')}</span> Acessos
               </span>
            </div>
         </div>
      </footer>
   );
};

const App = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [activeTab, setActiveTab] = useState('home');
  const [selectedPodcastId, setSelectedPodcastId] = useState<string | null>(null);

  const handlePodcastSelect = (id: string) => {
    setSelectedPodcastId(id);
    window.scrollTo(0, 0);
  };

  const handleNavigation = (tab: string) => {
      setActiveTab(tab);
      setSelectedPodcastId(null);
      window.scrollTo(0, 0);
  };

  return (
    <div className="bg-black min-h-screen text-white font-sans selection:bg-gold selection:text-black">
      {showIntro && <IntroGlobe onComplete={() => setShowIntro(false)} />}
      
      {!showIntro && (
        <div className="animate-fade-in">
          <Navigation 
            activeTab={activeTab} 
            setActiveTab={handleNavigation} 
          />
          
          <main>
            {selectedPodcastId ? (
               <PodcastDetail 
                 podcast={PODCASTS.find(p => p.id === selectedPodcastId)!} 
                 onBack={() => setSelectedPodcastId(null)} 
               />
            ) : (
               <>
                  {activeTab === 'home' && (
                     <>
                        <HeroSection onNavigate={handleNavigation} />
                        <PodcastGrid onSelect={handlePodcastSelect} />
                        <div className="max-w-7xl mx-auto px-4 py-24">
                          <h2 className="text-4xl font-futura font-bold text-center mb-16 text-white">DEPOIMENTOS</h2>
                          <div className="grid md:grid-cols-3 gap-8">
                            {TESTIMONIALS.map((t) => (
                              <div key={t.id} className="glass-panel p-8 rounded-xl relative">
                                <div className="text-gold text-4xl font-serif absolute top-4 left-4">"</div>
                                <p className="text-gray-300 italic mb-6 relative z-10">{t.text}</p>
                                <div>
                                  <div className="font-bold text-white">{t.author}</div>
                                  <div className="text-xs text-gray-500">{t.role}</div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                     </>
                  )}
                  {activeTab === 'podcasts' && <PodcastGrid onSelect={handlePodcastSelect} />}
                  {activeTab === 'analytics' && <AnalyticsPage />}
                  {activeTab === 'studio' && <StudioPage />}
                  {activeTab === 'founder' && <FounderPage />}
                  {activeTab === 'social' && <SocialPage />}
                  {activeTab === 'awards' && <AwardsPage />}
               </>
            )}
          </main>

          <Footer />
        </div>
      )}
    </div>
  );
};

export default App;
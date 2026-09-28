import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { Search, Filter, Droplets, Sun, Activity, TrendingUp, AlertTriangle, CheckCircle2, Sprout, Wind, Zap, X } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { AreaChart, Area, XAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';
import { cn } from '../../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

const plants = [
  {
    id: 1,
    name: 'Cherry Tomatoes',
    variety: 'Triticum Aestivum',
    image: 'https://images.unsplash.com/photo-1663310549878-eef93874df6f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGVycnklMjB0b21hdG9lcyUyMHBsYW50fGVufDF8fHx8MTc3MzAyMTY4Nnww&ixlib=rb-4.1.0&q=80&w=1080',
    health: 98,
    moisture: 65,
    light: 80,
    age: '45 Days',
    stage: 'Fruiting',
    status: 'Optimal',
    ph: 6.2,
    yieldEst: 'High',
    recommendation: 'Tomato soil moisture is dropping faster than usual. Consider running an extra 5-minute irrigation cycle tonight.',
    chartData: [
      { day: 'Mon', growth: 40 }, { day: 'Tue', growth: 45 }, { day: 'Wed', growth: 50 },
      { day: 'Thu', growth: 58 }, { day: 'Fri', growth: 65 }, { day: 'Sat', growth: 72 }, { day: 'Sun', growth: 80 }
    ]
  },
  {
    id: 2,
    name: 'Sweet Basil',
    variety: 'Ocimum Basilicum',
    image: 'https://images.unsplash.com/photo-1662422325326-19089df23d98?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMGJhc2lsJTIwcGxhbnR8ZW58MXx8fHwxNzcyOTk3MjYyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    health: 32,
    moisture: 30,
    light: 60,
    age: '28 Days',
    stage: 'Vegetative',
    status: 'Needs Water',
    ph: 6.8,
    yieldEst: 'Medium',
    recommendation: 'Soil moisture is critically low. Recommend triggering an immediate irrigation cycle. Expected sunny afternoon.',
    chartData: [
      { day: 'Mon', growth: 30 }, { day: 'Tue', growth: 25 }, { day: 'Wed', growth: 30 },
      { day: 'Thu', growth: 32 }, { day: 'Fri', growth: 34 }, { day: 'Sat', growth: 35 }, { day: 'Sun', growth: 36 }
    ]
  },
  {
    id: 3,
    name: 'Romaine Lettuce',
    variety: 'Lactuca Sativa',
    image: 'https://images.unsplash.com/photo-1579862715696-01a0aba3eb6c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZXR0dWNlJTIwZ3Jvd2luZ3xlbnwxfHx8fDE3NzMwMjE2ODZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    health: 85,
    moisture: 72,
    light: 45,
    age: '35 Days',
    stage: 'Harvest Ready',
    status: 'Ready',
    ph: 6.5,
    yieldEst: 'Excellent',
    recommendation: 'Plant has reached optimal maturity. Harvest within the next 48 hours to prevent bolting and bitterness.',
    chartData: [
      { day: 'Mon', growth: 80 }, { day: 'Tue', growth: 85 }, { day: 'Wed', growth: 90 },
      { day: 'Thu', growth: 95 }, { day: 'Fri', growth: 98 }, { day: 'Sat', growth: 99 }, { day: 'Sun', growth: 100 }
    ]
  }
];

export default function PlantMonitoringScreen() {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState(plants[1].id); // Default to Sweet Basil to match image
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (location.state && typeof location.state.selectedPlantId === 'number') {
      setSelectedId(location.state.selectedPlantId);
    }
  }, [location.state]);

  const activePlant = plants.find(p => p.id === selectedId) || plants[0];

  return (
    <div className="min-h-full bg-[#f4f4f4] -m-4 p-4 sm:-m-6 sm:p-6 lg:-m-8 lg:p-8 rounded-[40px] font-sans text-stone-800 selection:bg-[#d4ff00] selection:text-black">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 mb-8">
        <div className="relative max-w-md w-full">
          <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
          <input 
            type="text" 
            placeholder="Search your field..." 
            className="w-full bg-white/60 backdrop-blur-md border border-white/40 shadow-sm rounded-full pl-12 pr-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#d4ff00] transition-shadow placeholder:text-stone-400"
          />
        </div>
        <div className="flex gap-3">
          <button className="bg-white/60 backdrop-blur-md border border-white/40 shadow-sm hover:bg-white/80 text-stone-600 px-6 py-3.5 rounded-full flex items-center gap-2 text-sm font-medium transition-colors">
            <Filter className="w-4 h-4" /> Filter
          </button>
          <button className="bg-[#d4ff00] hover:bg-[#cbf200] text-stone-900 px-6 py-3.5 rounded-full flex items-center gap-2 text-sm font-medium transition-colors shadow-sm">
            <Sprout className="w-4 h-4" /> Add Profile
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
        
        {/* Left List Column */}
        <div className="col-span-1 lg:col-span-4 flex flex-col gap-5">
          {plants.map(plant => (
            <div 
              key={plant.id} 
              onClick={() => setSelectedId(plant.id)}
              className={cn(
                "p-4 cursor-pointer transition-all duration-300 rounded-[36px] relative overflow-hidden group border shadow-sm",
                selectedId === plant.id 
                  ? "bg-white/80 border-white/60 shadow-[0_8px_30px_rgba(0,0,0,0.04)] scale-[1.02]" 
                  : "bg-[#e5e5e5]/80 border-transparent hover:bg-white/50"
              )}
            >
              <div className="flex gap-5 relative z-10 items-center">
                <div className="w-[100px] h-[100px] rounded-[28px] overflow-hidden shrink-0 relative shadow-inner">
                  <ImageWithFallback src={plant.image} alt={plant.name} className="w-full h-full object-cover" />
                  
                  {/* Risk Tag directly inside image top-left */}
                  {plant.status === 'Needs Water' && (
                    <div className="absolute top-2 left-2 bg-[#f05252] text-white text-[10px] font-medium px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
                      <AlertTriangle className="w-3 h-3" /> Risk
                    </div>
                  )}
                </div>
                
                <div className="flex-1 py-1 flex flex-col justify-center">
                  <h4 className="font-normal text-xl leading-tight text-stone-800 tracking-tight">
                    {plant.name}
                  </h4>
                  <p className="text-sm mt-0.5 text-stone-500 font-light">
                    {plant.variety}
                  </p>
                  
                  <div className="mt-3">
                    <span className={cn(
                      "text-[12px] px-3 py-1.5 rounded-full font-medium inline-flex items-center gap-1.5 shadow-sm transition-colors",
                      plant.status === 'Needs Water' ? "bg-[#f05252] text-white" : "bg-[#f4f4f4] text-stone-600 border border-black/5"
                    )}>
                      {plant.status === 'Needs Water' && <Wind className="w-3.5 h-3.5" />}
                      {plant.status === 'Ready' && <CheckCircle2 className="w-3.5 h-3.5" />}
                      {plant.status === 'Optimal' && <Activity className="w-3.5 h-3.5" />}
                      {plant.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Detail Panel */}
        <div className="col-span-1 lg:col-span-8 flex flex-col gap-6 lg:gap-8">
          
          {/* Top Gradient Health Bar */}
          <div className="bg-[#cdcdcd]/80 backdrop-blur-xl rounded-[40px] p-8 shadow-[inset_0_2px_20px_rgba(255,255,255,0.2)] relative overflow-hidden flex flex-col justify-end min-h-[160px]">
            {/* The blurred gradient bar from image */}
            <div className="relative z-10 w-full px-4 mb-2">
              <div className="relative h-20 w-full flex items-center">
                <div className="absolute inset-0 blur-[30px] opacity-90 bg-gradient-to-r from-[#eb6c6c] via-[#f7d67f] to-[#b3e8b3] rounded-full"></div>
                <div className="relative z-10 w-full h-12 bg-gradient-to-r from-[#e06666]/90 via-[#eed285]/90 to-[#b8ebb8]/90 rounded-full shadow-[inset_0_2px_4px_rgba(255,255,255,0.4)] border border-white/30">
                  {/* Current Value Indicator */}
                  <div
                    className="absolute top-1/2 -translate-y-1/2 w-5 h-5 bg-white rounded-full shadow-[0_2px_10px_rgba(0,0,0,0.2)] border-[1.5px] border-white z-20 transition-all duration-500 ease-out flex items-center justify-center"
                    style={{ left: `calc(${activePlant.health}% - 10px)` }}
                  >
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: activePlant.health > 80 ? '#99e599' : activePlant.health > 40 ? '#e5c175' : '#d96570' }}></div>
                  </div>
                </div>
              </div>

              {/* Bottom Scale exactly like image */}
              <div className="w-full flex justify-between text-[11px] text-stone-500 font-medium px-6 mt-2">
                <span>0</span><span>10</span><span>20</span><span>30</span><span>40</span><span>50</span><span>60</span><span>70</span><span>80</span><span>90</span><span>100</span>
              </div>
            </div>
          </div>
          
          {/* Conditions Grid - 4 squares */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 lg:gap-6">
            {/* Moisture */}
            <div className="bg-[#e2e2e2]/80 backdrop-blur-md rounded-[36px] p-6 relative shadow-[inset_0_1px_0_rgba(255,255,255,0.4),0_4px_20px_rgba(0,0,0,0.03)] flex flex-col justify-between aspect-square hover:scale-[1.02] transition-transform">
              <div className="flex flex-col items-start gap-3">
                <Droplets className="w-6 h-6 text-stone-700 stroke-[1.5]" />
                <p className="text-stone-500 font-medium text-sm">Moisture</p>
              </div>
              <div className="mt-auto">
                <p className="text-stone-800 text-[2.75rem] leading-none font-light tracking-tight">{activePlant.moisture}<span className="text-2xl text-stone-400 font-light">%</span></p>
              </div>
            </div>
            
            {/* Light */}
            <div className="bg-[#e2e2e2]/80 backdrop-blur-md rounded-[36px] p-6 relative shadow-[inset_0_1px_0_rgba(255,255,255,0.4),0_4px_20px_rgba(0,0,0,0.03)] flex flex-col justify-between aspect-square hover:scale-[1.02] transition-transform">
              <div className="flex flex-col items-start gap-3">
                <Sun className="w-6 h-6 text-stone-700 stroke-[1.5]" />
                <p className="text-stone-500 font-medium text-sm">Sunlight</p>
              </div>
              <div className="mt-auto">
                <p className="text-stone-800 text-[2.75rem] leading-none font-light tracking-tight">{activePlant.light}<span className="text-2xl text-stone-400 font-light">%</span></p>
              </div>
            </div>

            {/* Soil pH */}
            <div className="bg-[#e2e2e2]/80 backdrop-blur-md rounded-[36px] p-6 relative shadow-[inset_0_1px_0_rgba(255,255,255,0.4),0_4px_20px_rgba(0,0,0,0.03)] flex flex-col justify-between aspect-square hover:scale-[1.02] transition-transform">
              <div className="flex flex-col items-start gap-3">
                <Activity className="w-6 h-6 text-stone-700 stroke-[1.5]" />
                <p className="text-stone-500 font-medium text-sm">Soil pH</p>
              </div>
              <div className="mt-auto">
                <p className="text-stone-800 text-[2.75rem] leading-none font-light tracking-tight">{activePlant.ph}</p>
              </div>
            </div>

            {/* Yield */}
            <div className="bg-[#e2e2e2]/80 backdrop-blur-md rounded-[36px] p-6 relative shadow-[inset_0_1px_0_rgba(255,255,255,0.4),0_4px_20px_rgba(0,0,0,0.03)] flex flex-col justify-between aspect-square hover:scale-[1.02] transition-transform">
              <div className="flex flex-col items-start gap-3">
                <TrendingUp className="w-6 h-6 text-stone-700 stroke-[1.5]" />
                <p className="text-stone-500 font-medium text-sm">Yield Est.</p>
              </div>
              <div className="mt-auto">
                <p className="text-stone-800 text-3xl leading-none font-light tracking-tight">{activePlant.yieldEst}</p>
              </div>
            </div>
          </div>

          {/* Bottom Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 items-stretch">
            {/* AI Action Plan */}
            <div className="bg-[#e2e2e2]/80 backdrop-blur-md rounded-[40px] p-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.4),0_4px_20px_rgba(0,0,0,0.03)] flex flex-col min-h-[260px]">
              <div className="flex items-center gap-2 text-stone-800 mb-6 font-medium text-lg">
                <Sprout className="w-6 h-6 text-[#8ac700]" /> AI Action Plan
              </div>
              <p className="text-stone-500 text-base leading-relaxed font-light mb-8 flex-1">
                {activePlant.recommendation}
              </p>
              
              <button 
                onClick={() => setIsModalOpen(true)}
                className="w-full bg-[#d4ff00] hover:bg-[#cbf200] text-stone-900 font-medium py-4 rounded-full flex items-center justify-center gap-2 transition-transform active:scale-[0.98] shadow-sm text-base mt-auto"
              >
                <CheckCircle2 className="w-5 h-5" />
                Apply Action
              </button>
            </div>

            {/* Growth Trajectory */}
            <div className="bg-[#e2e2e2]/80 backdrop-blur-md rounded-[40px] p-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.4),0_4px_20px_rgba(0,0,0,0.03)] flex flex-col min-h-[260px]">
              <div className="flex items-center gap-2 text-stone-800 mb-6 font-medium text-lg">
                <TrendingUp className="w-6 h-6 text-[#8ac700]" /> Growth Trajectory
              </div>
              
              <div className="flex-1 w-full min-h-[140px] h-[140px] mt-2 relative">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={activePlant.chartData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id={`colorGrowthLime-${activePlant.id}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8ac700" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#8ac700" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.04)" />
                    <XAxis 
                      dataKey="day" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fontSize: 11, fill: '#888' }} 
                      dy={10}
                    />
                    <RechartsTooltip 
                      contentStyle={{ borderRadius: '16px', border: 'none', backgroundColor: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(8px)', color: '#1a1a1a', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
                      itemStyle={{ fontSize: '12px', fontWeight: 'bold', color: '#1a1a1a' }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="growth" 
                      stroke="#8ac700" 
                      strokeWidth={3}
                      fillOpacity={1} 
                      fill={`url(#colorGrowthLime-${activePlant.id})`} 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Action Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/20 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-sm bg-[#e2e2e2] rounded-[40px] p-8 shadow-2xl flex flex-col gap-8"
            >
              {/* Header */}
              <div className="flex items-center gap-3 text-stone-800">
                <svg width="20" height="24" viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#d4ff00] w-6 h-6">
                  <path d="M12.5 0L0 13.5H9.5V24L20 9.5H11L12.5 0Z" fill="currentColor" />
                </svg>
                <h3 className="text-xl font-medium">AI Assistant</h3>
              </div>
              
              {/* Body */}
              <p className="text-stone-500 text-lg leading-relaxed font-light">
                {activePlant.recommendation}
              </p>
              
              {/* Button */}
              <button 
                onClick={() => {
                  setIsModalOpen(false);
                  navigate('/chat', { state: { plantId: activePlant.id } });
                }}
                className="w-full bg-[#d4ff00] hover:bg-[#cbf200] text-stone-900 font-medium py-4 rounded-full flex items-center justify-center transition-transform active:scale-[0.98] shadow-sm text-lg"
              >
                Apply Action
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
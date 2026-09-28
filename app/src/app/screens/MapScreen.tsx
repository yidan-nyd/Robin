import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Layers, MapPin, Maximize2, Search, Droplets, Plus, Minus, Compass, Activity, AlertTriangle } from 'lucide-react';
import { Button } from '../components/ui/AppButton';
import { cn } from '../../lib/utils';

interface Zone {
  id: string;
  name: string;
  area: string;
  health: number;
  status: string;
  path: string;
  center: { x: number; y: number };
  color: string;
  borderColor: string;
  textColor: string;
  pattern: string;
  icon: React.ElementType;
}

export default function MapScreen() {
  const [activeZone, setActiveZone] = useState<string | null>('Z1');

  const zones: Zone[] = [
    { 
      id: 'Z1', 
      name: 'Cherry Tomatoes', 
      area: '12m²', 
      health: 98, 
      status: 'Optimal', 
      path: 'M 100,200 L 200,80 L 550,150 L 500,500 L 150,450 Z',
      center: { x: 325, y: 275 },
      color: 'rgba(212, 255, 0, 0.15)', // neon lime
      borderColor: '#d4ff00',
      textColor: 'text-stone-800',
      pattern: 'url(#pattern-optimal)',
      icon: Activity
    },
    { 
      id: 'Z2', 
      name: 'Sweet Basil', 
      area: '4m²', 
      health: 85, 
      status: 'Needs Water', 
      path: 'M 600,160 L 900,200 L 850,450 L 550,380 Z',
      center: { x: 725, y: 300 },
      color: 'rgba(229, 193, 117, 0.25)', // e5c175
      borderColor: '#e5c175',
      textColor: 'text-stone-800',
      pattern: 'url(#pattern-water)',
      icon: Droplets
    },
    { 
      id: 'Z3', 
      name: 'Romaine Lettuce', 
      area: '8m²', 
      health: 100, 
      status: 'Ready to Harvest', 
      path: 'M 560,450 L 820,500 L 750,850 L 450,800 L 480,600 Z',
      center: { x: 645, y: 650 },
      color: 'rgba(153, 229, 153, 0.25)', // 99e599
      borderColor: '#99e599',
      textColor: 'text-stone-800',
      pattern: 'url(#pattern-optimal)',
      icon: Layers
    },
    {
      id: 'Z4',
      name: 'Empty Field',
      area: '6m²',
      health: 0,
      status: 'Preparing Soil',
      path: 'M 170,520 L 420,540 L 400,850 L 100,750 Z',
      center: { x: 270, y: 680 },
      color: 'rgba(220, 220, 220, 0.4)', // dcdcdc
      borderColor: '#bebebe',
      textColor: 'text-stone-400',
      pattern: 'url(#pattern-empty)',
      icon: MapPin
    }
  ];

  return (
    <div className="h-[calc(100vh-8rem)] min-h-[700px] flex flex-col space-y-6">
      {/* Top Toolbar */}
      <div className="flex justify-between items-center bg-[#b5b5b5]/30 backdrop-blur-md px-6 py-4 rounded-[36px] shadow-sm flex-shrink-0">
        <div className="flex gap-3">
          <Button className="bg-[#d4ff00] text-stone-900 rounded-full px-6">
            <Layers className="w-4 h-4 mr-2" /> View: Crop Type
          </Button>
          <Button variant="soft" className="rounded-full px-6 text-stone-600 bg-white/40">Health</Button>
          <Button variant="soft" className="rounded-full px-6 text-stone-600 bg-white/40">Moisture</Button>
        </div>
        <div className="flex gap-2">
          <Button variant="soft" size="icon" className="rounded-full bg-white/40"><Search className="w-4 h-4 text-stone-600" /></Button>
          <Button variant="soft" size="icon" className="rounded-full bg-white/40"><Maximize2 className="w-4 h-4 text-stone-600" /></Button>
        </div>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row gap-6 overflow-hidden">
        
        {/* Main Map Area */}
        <div className="flex-1 relative bg-[#e4e4e4]/40 rounded-[40px] overflow-hidden group">
          {/* Dotted Background Grid */}
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#808080_1.5px,transparent_1.5px)] [background-size:24px_24px]"></div>
          
          {/* Map Controls */}
          <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-20">
            <div className="bg-[#e4e4e4]/80 backdrop-blur-md p-1.5 rounded-full shadow-sm flex flex-col gap-1.5 border border-white/20">
              <Button variant="ghost" size="icon" className="w-10 h-10 rounded-full hover:bg-white/50"><Plus className="w-5 h-5 text-stone-600" /></Button>
              <Button variant="ghost" size="icon" className="w-10 h-10 rounded-full hover:bg-white/50"><Minus className="w-5 h-5 text-stone-600" /></Button>
            </div>
            <div className="bg-[#e4e4e4]/80 backdrop-blur-md p-1.5 rounded-full shadow-sm border border-white/20">
              <Button variant="ghost" size="icon" className="w-10 h-10 rounded-full hover:bg-white/50"><Compass className="w-5 h-5 text-stone-600" /></Button>
            </div>
          </div>

          {/* SVG Map Container */}
          <div className="absolute inset-0 w-full h-full p-8 lg:p-12 transition-transform duration-700 ease-out group-hover:scale-[1.02]">
            <svg 
              viewBox="0 0 1000 1000" 
              className="w-full h-full drop-shadow-sm" 
              style={{ overflow: 'visible' }}
            >
              <defs>
                {/* Patterns */}
                <pattern id="pattern-optimal" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                  <path d="M 15 5 L 15 25 M 5 15 L 25 15" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="text-stone-400/20" />
                </pattern>
                <pattern id="pattern-water" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                  <circle cx="10" cy="10" r="2.5" fill="currentColor" className="text-[#e5c175]/30" />
                </pattern>
                <pattern id="pattern-empty" x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                  <path d="M 0 16 L 16 0" stroke="currentColor" strokeWidth="1" className="text-stone-300/60" />
                </pattern>
                
                {/* Glow Filter */}
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="12" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Draw Paths */}
              {zones.map((zone) => {
                const isActive = activeZone === zone.id;
                return (
                  <g 
                    key={`path-${zone.id}`}
                    onClick={() => setActiveZone(zone.id)}
                    className="cursor-pointer transition-all duration-300 origin-center"
                    style={{
                      transformOrigin: `${zone.center.x}px ${zone.center.y}px`,
                      transform: isActive ? 'scale(1.02)' : 'scale(1)'
                    }}
                  >
                    {/* Background shadow/glow for active */}
                    {isActive && (
                      <path 
                        d={zone.path} 
                        fill="none" 
                        stroke={zone.borderColor} 
                        strokeWidth="40" 
                        strokeLinejoin="round" 
                        className="opacity-40"
                        filter="url(#glow)"
                      />
                    )}
                    
                    {/* Main Polygon */}
                    <path 
                      d={zone.path} 
                      fill={zone.color} 
                      stroke={isActive ? zone.borderColor : `${zone.borderColor}80`} 
                      strokeWidth={isActive ? "6" : "3"} 
                      strokeLinejoin="round"
                      className="transition-all duration-300"
                    />
                    
                    {/* Pattern Overlay */}
                    <path 
                      d={zone.path} 
                      fill={zone.pattern} 
                      className="pointer-events-none"
                    />
                  </g>
                );
              })}
            </svg>
          </div>

          {/* HTML Overlay Tooltips (Positioned absolutely over the SVG) */}
          <div className="absolute inset-0 p-8 lg:p-12 pointer-events-none">
            <div className="relative w-full h-full">
              {zones.map((zone) => {
                const isActive = activeZone === zone.id;
                
                return (
                  <div 
                    key={`tooltip-${zone.id}`}
                    className={cn(
                      "absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center transition-all duration-500",
                      isActive ? "scale-100 opacity-100 z-30" : "scale-90 opacity-80 hover:opacity-100 hover:scale-95 z-10"
                    )}
                    style={{ left: `${zone.center.x / 10}%`, top: `${zone.center.y / 10}%` }}
                  >
                    {isActive ? (
                      <div className="bg-[#f4f4f4]/90 backdrop-blur-xl px-4 py-3 rounded-full shadow-lg border border-white/40 pointer-events-auto flex items-center gap-3">
                        <div className={cn("p-2 rounded-full bg-white text-stone-800 shadow-sm")}>
                          <zone.icon className="w-4 h-4" />
                        </div>
                        <div className="text-left pr-2">
                          <p className="text-stone-800 font-medium text-sm whitespace-nowrap">{zone.name}</p>
                          {zone.health > 0 && (
                            <div className="flex items-center gap-1.5 mt-0.5">
                              <div className="w-1.5 h-1.5 rounded-full bg-[#d4ff00]"></div>
                              <span className="text-stone-500 text-[10px] font-medium uppercase tracking-wider">{zone.health}% Health</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="bg-[#f4f4f4]/60 backdrop-blur-md p-2.5 rounded-full shadow-sm border border-white/20 pointer-events-auto cursor-pointer hover:bg-white transition-colors" onClick={() => setActiveZone(zone.id)}>
                        <MapPin className={cn("w-5 h-5", zone.textColor)} />
                      </div>
                    )}
                  </div>
                );
              })}
              
              {/* Robot Indicator */}
              <div className="absolute top-[40%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center relative shadow-lg">
                  <div className="absolute inset-0 rounded-full border-2 border-[#d4ff00] animate-ping opacity-60 scale-150"></div>
                  <div className="w-5 h-5 bg-[#d4ff00] rounded-full border-2 border-white"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar - Zone Details */}
        <Card className="w-full lg:w-80 lg:flex-shrink-0 flex flex-col h-full">
          <CardHeader className="pb-4">
            <CardTitle>Zone Details</CardTitle>
            <CardDescription>Select a zone on the map</CardDescription>
          </CardHeader>
          <div className="p-0 space-y-3 overflow-y-auto flex-1">
            {zones.map(zone => (
              <div 
                key={`list-${zone.id}`} 
                onClick={() => setActiveZone(zone.id)}
                className={cn(
                  "p-4 rounded-[28px] transition-all cursor-pointer border border-transparent",
                  activeZone === zone.id 
                    ? "bg-[#e4e4e4]/80 shadow-sm scale-[1.02]" 
                    : "hover:bg-[#e4e4e4]/40"
                )}
              >
                <div className="flex justify-between items-center mb-3">
                  <h4 className={cn(
                    "font-medium text-[15px]",
                    activeZone === zone.id ? "text-stone-900" : "text-stone-700"
                  )}>
                    {zone.name}
                  </h4>
                  {zone.health > 0 ? (
                    <Badge variant={zone.health === 100 ? 'success' : zone.health > 90 ? 'default' : 'warning'}>
                      {zone.health}%
                    </Badge>
                  ) : (
                    <Badge variant="outline">Empty</Badge>
                  )}
                </div>
                
                <div className="space-y-2 text-[12px]">
                  <div className="flex text-stone-500">
                    <span className="w-16">Zone ID:</span>
                    <span className="text-stone-800 font-medium">{zone.id}</span>
                  </div>
                  <div className="flex text-stone-500">
                    <span className="w-16">Area:</span>
                    <span className="text-stone-800 font-medium">{zone.area}</span>
                  </div>
                  <div className="flex text-stone-500">
                    <span className="w-16">Status:</span>
                    <span className={cn(
                      "font-medium px-2 py-0.5 rounded-full inline-flex items-center -ml-2",
                      zone.status.includes('Water') ? "bg-[#ff4d4d]/20 text-red-600" : 
                      zone.health === 0 ? "bg-[#dcdcdc] text-stone-600" : "bg-white/50 text-stone-800"
                    )}>
                      {zone.status.includes('Water') && <AlertTriangle className="w-3 h-3 mr-1" />}
                      {zone.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

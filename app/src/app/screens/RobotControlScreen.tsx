import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Battery, Power, Pause, RefreshCw, Crosshair, Map as MapIcon, Video, Signal, Droplets } from 'lucide-react';
import { motion } from 'motion/react';

export default function RobotControlScreen() {
  const [detections] = React.useState([
    { id: 1, x: 10, y: 40, size: 200, status: 'unripe', label: 'UNRIPE', confidence: 89 },
    { id: 2, x: 35, y: 35, size: 230, status: 'ripening', label: 'RIPENING', confidence: 92 },
    { id: 3, x: 65, y: 47, size: 220, status: 'ripe', label: 'RIPE', confidence: 96 },
  ]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
      
      {/* Left Column - Live View */}
      <div className="lg:col-span-2 flex flex-col gap-6">
        <div className="p-2 overflow-hidden bg-stone-900 rounded-[40px] relative shadow-lg shrink-0">
          {/* Main camera feed - Tomato Detection View */}
          <div className="aspect-video bg-stone-800 rounded-[32px] overflow-hidden relative group">
            <img 
              src="https://images.unsplash.com/photo-1642344760227-516237e4b7dc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b21hdG8lMjBwbGFudCUyMGdyb3dpbmclMjBnYXJkZW4lMjBjbG9zZSUyMHVwfGVufDF8fHx8MTc3MzIxNjM2MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" 
              alt="Robot Vision - Tomato Detection" 
              className="w-full h-full object-cover"
            />
            
            {/* Detection Overlays */}
            <div className="absolute inset-0">
              {detections.map((detection) => (
                <motion.div
                  key={detection.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ 
                    delay: detection.id * 0.2,
                    duration: 0.5,
                    repeat: Infinity,
                    repeatDelay: 3
                  }}
                  className="absolute"
                  style={{
                    left: `${detection.x}%`,
                    top: `${detection.y}%`,
                    width: `${detection.size}px`,
                    height: `${detection.size}px`,
                  }}
                >
                  {/* Detection Circle */}
                  <div 
                    className={`w-full h-full rounded-lg border-[3px] ${
                      detection.status === 'ripe' 
                        ? 'border-[#d4ff00]' 
                        : detection.status === 'ripening'
                        ? 'border-[#ffaa00]'
                        : 'border-[#ff6b6b]'
                    }`}
                    style={{
                      boxShadow: `0 0 20px ${
                        detection.status === 'ripe' 
                          ? 'rgba(212, 255, 0, 0.6)' 
                          : detection.status === 'ripening'
                          ? 'rgba(255, 170, 0, 0.6)'
                          : 'rgba(255, 107, 107, 0.6)'
                      }`
                    }}
                  />
                  
                  {/* Detection Label */}
                  <div 
                    className={`absolute -top-8 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-full text-[11px] font-bold tracking-wider whitespace-nowrap backdrop-blur-md ${
                      detection.status === 'ripe' 
                        ? 'bg-[#d4ff00]/90 text-stone-900' 
                        : detection.status === 'ripening'
                        ? 'bg-[#ffaa00]/90 text-white'
                        : 'bg-[#ff6b6b]/90 text-white'
                    }`}
                  >
                    {detection.label}
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* HUD Overlay */}
            <div className="absolute inset-0 p-6 flex flex-col justify-between pointer-events-none text-[#d4ff00] font-mono text-[11px] tracking-wider">
              <div className="flex justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#ff4d4d] animate-pulse"></div>
                  REC • 00:14:32
                </div>
                <div className="flex items-center"><Signal className="w-3.5 h-3.5 mr-1.5" /> 120ms</div>
              </div>
              
              <div className="flex justify-between items-end">
                <div className="space-y-1">
                  <p>COORD: 45.12N 12.44E</p>
                  <p>ALT: 1.2m</p>
                </div>
                <div className="text-right space-y-1">
                  <p>MODE: AUTONOMOUS</p>
                  <p className="text-[#d4ff00]">OBJ_DETECT: 3 TOMATOES</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Quick Controls */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center space-x-2 bg-[#f4f4f4]/10 backdrop-blur-xl px-6 py-3 rounded-full border border-white/10 shadow-2xl">
            <button className="text-stone-300 hover:text-white transition-colors p-2.5 rounded-full hover:bg-white/10"><Power className="w-5 h-5" /></button>
            <div className="w-px h-6 bg-white/20 mx-2"></div>
            <button className="text-stone-900 bg-[#d4ff00] hover:bg-[#cbf200] transition-colors p-3.5 rounded-full shadow-[0_0_20px_rgba(212,255,0,0.4)] scale-110"><Pause className="w-5 h-5 fill-current" /></button>
            <div className="w-px h-6 bg-white/20 mx-2"></div>
            <button className="text-stone-300 hover:text-white transition-colors p-2.5 rounded-full hover:bg-white/10"><RefreshCw className="w-5 h-5" /></button>
          </div>
        </div>

        {/* Detection Stats Card */}
        <Card className="bg-gradient-to-br from-[#d4ff00] to-[#8ac700] text-stone-900 border-none">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-stone-900 text-xl font-medium">Vision Analysis</CardTitle>
              <Badge className="bg-white/30 text-stone-900 border-none">Real-time</Badge>
            </div>
          </CardHeader>
          
          <div className="grid grid-cols-3 gap-4 mt-2">
            <div className="bg-white/20 backdrop-blur-sm rounded-[20px] p-4 text-center">
              <div className="text-3xl font-semibold">{detections.filter(d => d.status === 'ripe').length}</div>
              <div className="text-[12px] font-medium mt-1 uppercase tracking-wide">Ripe</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-[20px] p-4 text-center">
              <div className="text-3xl font-semibold">{detections.filter(d => d.status === 'ripening').length}</div>
              <div className="text-[12px] font-medium mt-1 uppercase tracking-wide">Ripening</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-[20px] p-4 text-center">
              <div className="text-3xl font-semibold">{detections.filter(d => d.status === 'unripe').length}</div>
              <div className="text-[12px] font-medium mt-1 uppercase tracking-wide">Unripe</div>
            </div>
          </div>
        </Card>

        {/* Action Logs */}
        <Card className="flex-1 flex flex-col">
          <CardHeader>
            <CardTitle>System Logs</CardTitle>
          </CardHeader>
          <div className="space-y-3 mt-2 font-mono text-xs p-5 bg-[#e4e4e4]/50 rounded-[28px] flex-1 flex flex-col justify-center">
            <div className="flex text-stone-600"><span className="text-[#a3c900] mr-4 font-bold">10:45:02</span> [VISION] Detected 3 tomatoes: 1 ripe, 1 ripening, 1 unripe.</div>
            <div className="flex text-stone-600"><span className="text-[#a3c900] mr-4 font-bold">10:44:15</span> [NAV] Path calculation complete. Proceeding to coordinates.</div>
            <div className="flex text-amber-600"><span className="text-amber-500 mr-4 font-bold">10:42:01</span> [SENS] Minor obstacle detected on path. Rerouting.</div>
            <div className="flex text-stone-600"><span className="text-[#a3c900] mr-4 font-bold">10:40:00</span> [SYS] Routine diagnostic complete. All systems nominal.</div>
          </div>
        </Card>
      </div>

      {/* Right Column - Status & Manual Controls */}
      <div className="flex flex-col gap-6">
        
        {/* Status Dashboard */}
        <Card className="bg-[#a8a8a8] text-white border-none relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#d4ff00] blur-[60px] opacity-20 rounded-full pointer-events-none"></div>
          
          <CardHeader className="pb-4 relative z-10">
            <div className="flex justify-between items-center">
              <CardTitle className="text-white text-2xl font-light tracking-tight">AgroBot-01</CardTitle>
              <Badge variant="success" className="bg-[#d4ff00]/20 text-[#d4ff00] border border-[#d4ff00]/30 backdrop-blur-md">Online</Badge>
            </div>
          </CardHeader>
          
          <div className="mt-4 space-y-6 relative z-10">
            <div>
              <div className="flex justify-between text-[13px] mb-2 font-medium">
                <span className="text-white/80 flex items-center"><Battery className="w-4 h-4 mr-2 text-[#d4ff00]" /> Battery</span>
                <span className="text-white">78% (3h 15m left)</span>
              </div>
              <div className="h-2.5 w-full bg-black/20 rounded-full overflow-hidden border border-white/10">
                <div className="h-full bg-[#d4ff00] rounded-full shadow-[0_0_10px_rgba(212,255,0,0.5)]" style={{ width: '78%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[13px] mb-2 font-medium">
                <span className="text-white/80 flex items-center"><Droplets className="w-4 h-4 mr-2 text-[#8bc1ff]" /> Water Tank</span>
                <span className="text-white">45% (1.2L left)</span>
              </div>
              <div className="h-2.5 w-full bg-black/20 rounded-full overflow-hidden border border-white/10">
                <div className="h-full bg-[#8bc1ff] rounded-full shadow-[0_0_10px_rgba(139,193,255,0.5)]" style={{ width: '45%' }}></div>
              </div>
            </div>
          </div>
        </Card>

        {/* Mission Control */}
        <Card>
          <CardHeader>
            <CardTitle>Current Mission</CardTitle>
            <CardDescription>Zone Z2 • Crop Monitoring</CardDescription>
          </CardHeader>
          
          <div className="mt-4 p-5 rounded-[28px] bg-[#e4e4e4]/60 border border-white/20">
            <div className="flex items-center justify-between mb-5">
              <div className="flex space-x-3">
                <div className="w-2.5 h-2.5 rounded-full bg-[#d4ff00] animate-pulse mt-1.5 shadow-[0_0_8px_rgba(212,255,0,0.6)]"></div>
                <div>
                  <p className="text-[15px] font-medium text-stone-800">Tomato Inspection</p>
                  <p className="text-xs text-stone-500 mt-0.5">Target: Raised bed #3</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-light text-stone-800">42%</p>
              </div>
            </div>
            <Button variant="outline" className="w-full text-[#ff4d4d] border-[#ff4d4d]/30 hover:bg-[#ff4d4d]/10 hover:border-[#ff4d4d]/50 bg-white/50">
              Abort Mission
            </Button>
          </div>
        </Card>

        {/* Manual Directives */}
        <Card className="flex-1 flex flex-col">
          <CardHeader>
            <CardTitle>Manual Directives</CardTitle>
          </CardHeader>
          <div className="mt-4 grid grid-cols-2 gap-3 flex-1 items-stretch">
            <Button variant="soft" className="h-24 flex-col gap-2.5 bg-[#8bc1ff]/20 text-blue-800 hover:bg-[#8bc1ff]/30 rounded-[24px]">
              <MapIcon className="w-6 h-6" /> Return to Base
            </Button>
            <Button variant="soft" className="h-24 flex-col gap-2.5 bg-white/60 text-stone-700 hover:bg-white rounded-[24px]">
              <Video className="w-6 h-6" /> Take Snapshot
            </Button>
            <Button variant="soft" className="h-24 flex-col gap-2.5 bg-[#e08bff]/20 text-purple-800 hover:bg-[#e08bff]/30 rounded-[24px]">
              <Crosshair className="w-6 h-6" /> Spot Treatment
            </Button>
            <Button variant="soft" className="h-24 flex-col gap-2.5 bg-[#ffcc80]/20 text-orange-800 hover:bg-[#ffcc80]/30 rounded-[24px]">
              <Droplets className="w-6 h-6" /> Flush Lines
            </Button>
          </div>
        </Card>

      </div>
    </div>
  );
}
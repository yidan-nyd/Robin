import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { Button } from '../components/ui/AppButton';
import { Badge } from '../components/ui/Badge';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, BarChart, Bar, Legend, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { Download, Share2, Calendar as CalendarIcon, TrendingUp, TrendingDown, Droplets, Zap, Clock, Bot } from 'lucide-react';
import { motion } from 'motion/react';

const moistureData = [
  { time: '00:00', tomatoes: 65, basil: 45, lettuce: 80 },
  { time: '04:00', tomatoes: 60, basil: 42, lettuce: 75 },
  { time: '08:00', tomatoes: 55, basil: 38, lettuce: 70 },
  { time: '12:00', tomatoes: 50, basil: 35, lettuce: 65 },
  { time: '16:00', tomatoes: 85, basil: 75, lettuce: 90 },
  { time: '20:00', tomatoes: 80, basil: 70, lettuce: 85 },
  { time: '24:00', tomatoes: 75, basil: 65, lettuce: 80 },
];

const yieldData = [
  { month: 'May', tomatoes: 12, lettuce: 20, basil: 5 },
  { month: 'Jun', tomatoes: 18, lettuce: 22, basil: 7 },
  { month: 'Jul', tomatoes: 25, lettuce: 18, basil: 8 },
  { month: 'Aug', tomatoes: 30, lettuce: 15, basil: 10 },
  { month: 'Sep', tomatoes: 22, lettuce: 25, basil: 6 },
  { month: 'Oct', tomatoes: 15, lettuce: 28, basil: 5 },
];

const efficiencyData = [
  { category: 'Water', value: 92, fullMark: 100 },
  { category: 'Energy', value: 78, fullMark: 100 },
  { category: 'Yield', value: 88, fullMark: 100 },
  { category: 'Time', value: 85, fullMark: 100 },
  { category: 'Health', value: 95, fullMark: 100 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-stone-900/95 backdrop-blur-xl px-4 py-3 rounded-[20px] border border-[#d4ff00]/20 shadow-[0_0_30px_rgba(212,255,0,0.2)]">
        <p className="text-[#d4ff00] font-mono text-xs font-bold mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-white text-xs font-medium" style={{ color: entry.color }}>
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function DataReportsScreen() {
  return (
    <div className="space-y-6">
      
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-3xl font-light text-stone-800 tracking-tight">Analytics & Reports</h2>
        <div className="flex gap-2">
          <Button variant="soft" className="border border-stone-200 hover:border-[#d4ff00]/30 transition-colors">
            <CalendarIcon className="w-4 h-4 mr-2" /> Last 30 Days
          </Button>
          <Button variant="soft" className="border border-stone-200 hover:border-[#d4ff00]/30 transition-colors">
            <Share2 className="w-4 h-4 mr-2" /> Share
          </Button>
          <Button className="bg-[#d4ff00] text-stone-900 hover:bg-[#cbf200] shadow-[0_0_20px_rgba(212,255,0,0.3)] hover:shadow-[0_0_30px_rgba(212,255,0,0.5)] transition-all">
            <Download className="w-4 h-4 mr-2" /> Export PDF
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Yield', value: '142', unit: 'kg', trend: '+12%', isPositive: true, icon: TrendingUp, color: 'from-[#d4ff00] to-[#8ac700]' },
          { label: 'Water Usage', value: '450', unit: 'L', trend: '-5%', isPositive: true, icon: Droplets, color: 'from-[#8bc1ff] to-[#5a9cdb]' },
          { label: 'Energy Consumed', value: '124', unit: 'kWh', trend: '+2%', isPositive: false, icon: Zap, color: 'from-[#ffaa00] to-[#ff8800]' },
          { label: 'Robot Active Hours', value: '86', unit: 'h', trend: '+15%', isPositive: true, icon: Clock, color: 'from-[#e08bff] to-[#c45fff]' },
        ].map((kpi, i) => {
          const Icon = kpi.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="group relative overflow-hidden hover:border-[#d4ff00]/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(212,255,0,0.15)]">
                {/* Gradient Background Glow */}
                <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${kpi.color} blur-[40px] opacity-20 group-hover:opacity-30 transition-opacity rounded-full`}></div>
                
                <div className="p-6 relative z-10">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-sm font-medium text-stone-500">{kpi.label}</p>
                    <Icon className="w-4 h-4 text-stone-400 group-hover:text-[#8ac700] transition-colors" />
                  </div>
                  
                  <div className="flex items-baseline gap-1 mb-3">
                    <h4 className="text-5xl font-light text-stone-800 tracking-tighter">{kpi.value}</h4>
                    <span className="text-2xl font-light text-stone-400">{kpi.unit}</span>
                  </div>
                  
                  <Badge 
                    className={`${
                      kpi.isPositive 
                        ? 'bg-[#d4ff00]/20 text-[#8ac700] border-[#d4ff00]/30' 
                        : 'bg-[#ff6b6b]/20 text-[#ff4d4d] border-[#ff6b6b]/30'
                    } border backdrop-blur-sm`}
                  >
                    {kpi.isPositive ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                    {kpi.trend}
                  </Badge>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Bento Box Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Soil Moisture Chart - Large */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2"
        >
          <Card className="group hover:border-[#d4ff00]/40 transition-all duration-300 hover:shadow-[0_0_40px_rgba(212,255,0,0.1)] relative overflow-hidden">
            
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl">Soil Moisture Trends</CardTitle>
                  <CardDescription className="mt-1">24-hour monitoring across main planting zones</CardDescription>
                </div>
                <Badge className="bg-[#d4ff00]/10 text-[#8ac700] border-[#d4ff00]/20 border">Live</Badge>
              </div>
            </CardHeader>
            
            <div className="h-[360px] w-full min-w-0 mt-4 px-6 pb-6">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={moistureData} margin={{ top: 10, right: 20, bottom: 30, left: -20 }}>
                  <defs>
                    <linearGradient id="colorTomatoes" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#d4ff00" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#d4ff00" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorBasil" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ffaa00" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#ffaa00" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorLettuce" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8bc1ff" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#8bc1ff" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                  <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fill: '#888', fontSize: 12}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#888', fontSize: 12}} domain={[0, 100]} />
                  <RechartsTooltip content={<CustomTooltip />} />
                  <Legend iconType="circle" wrapperStyle={{ paddingTop: '10px', fontSize: '13px', fontWeight: '500' }} />
                  <Area type="monotone" name="Tomatoes (Z1)" dataKey="tomatoes" stroke="#d4ff00" strokeWidth={3} fill="url(#colorTomatoes)" />
                  <Area type="monotone" name="Basil (Z2)" dataKey="basil" stroke="#ffaa00" strokeWidth={3} fill="url(#colorBasil)" />
                  <Area type="monotone" name="Lettuce (Z3)" dataKey="lettuce" stroke="#8bc1ff" strokeWidth={3} fill="url(#colorLettuce)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </motion.div>

        {/* System Efficiency Radar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="group hover:border-[#d4ff00]/40 transition-all duration-300 hover:shadow-[0_0_40px_rgba(212,255,0,0.1)] h-full relative">
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-[#d4ff00] blur-[60px] opacity-10 group-hover:opacity-20 transition-opacity rounded-full"></div>
            
            <CardHeader>
              <CardTitle>System Efficiency</CardTitle>
              <CardDescription>Overall performance metrics</CardDescription>
            </CardHeader>
            
            <div className="h-[340px] w-full min-w-0 mt-4 px-6 pb-6 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={efficiencyData} margin={{ top: 20, right: 30, bottom: 20, left: 30 }}>
                  <PolarGrid stroke="rgba(0,0,0,0.1)" />
                  <PolarAngleAxis dataKey="category" tick={{fill: '#666', fontSize: 12, fontWeight: '500'}} />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} tick={false} />
                  <Radar name="Efficiency" dataKey="value" stroke="#d4ff00" fill="#d4ff00" fillOpacity={0.3} strokeWidth={3} />
                  <RechartsTooltip content={<CustomTooltip />} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </motion.div>

        {/* Monthly Yield */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 flex"
        >
          <Card className="group hover:border-[#d4ff00]/40 transition-all duration-300 hover:shadow-[0_0_40px_rgba(212,255,0,0.1)] w-full flex flex-col">
            <CardHeader>
              <CardTitle className="text-2xl">Monthly Yield</CardTitle>
              <CardDescription>Harvest comparison over last 6 months</CardDescription>
            </CardHeader>
            
            <div className="h-80 w-full min-w-0 mt-4 px-6 pb-6 flex-1">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={yieldData} margin={{ top: 10, right: 20, bottom: 5, left: -25 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#888', fontSize: 12}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#888', fontSize: 12}} />
                  <RechartsTooltip content={<CustomTooltip />} cursor={{fill: 'rgba(212,255,0,0.05)'}} />
                  <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px', fontSize: '13px', fontWeight: '500' }} />
                  <Bar dataKey="tomatoes" name="Tomatoes (kg)" fill="#ff6b6b" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="lettuce" name="Lettuce (kg)" fill="#d4ff00" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="basil" name="Basil (kg)" fill="#ffaa00" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="flex"
        >
          <Card className="group hover:border-[#d4ff00]/40 transition-all duration-300 hover:shadow-[0_0_40px_rgba(212,255,0,0.1)] w-full flex flex-col">
            <CardHeader>
              <CardTitle>Quick Insights</CardTitle>
              <CardDescription>Key performance indicators</CardDescription>
            </CardHeader>
            
            <div className="px-6 pb-6 space-y-4 mt-2 flex-1 flex flex-col justify-center">
              {[
                { label: 'Avg. Daily Water', value: '15L', color: '#8bc1ff', bgColor: 'bg-[#8bc1ff]/10' },
                { label: 'Peak Yield Month', value: 'August', color: '#d4ff00', bgColor: 'bg-[#d4ff00]/10' },
                { label: 'Optimal Zones', value: '3/3', color: '#8ac700', bgColor: 'bg-[#8ac700]/10' },
                { label: 'Robot Uptime', value: '99.2%', color: '#e08bff', bgColor: 'bg-[#e08bff]/10' },
                { label: 'Energy Savings', value: '12%', color: '#ffaa00', bgColor: 'bg-[#ffaa00]/10' },
              ].map((stat, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-[20px] bg-white/50 border border-stone-200/50 hover:border-[#d4ff00]/30 transition-all group/stat">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${stat.bgColor}`} style={{ backgroundColor: stat.color }}></div>
                    <span className="text-sm font-medium text-stone-600">{stat.label}</span>
                  </div>
                  <span className="text-lg font-semibold text-stone-800">{stat.value}</span>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

      </div>
    </div>
  );
}

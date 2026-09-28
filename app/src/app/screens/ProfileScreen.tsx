import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  Settings, 
  MapPin, 
  Calendar,
  Award,
  TrendingUp,
  Users,
  Image as ImageIcon,
  Grid3x3,
  List,
  Edit,
  Mail,
  Link as LinkIcon
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { Button } from '../components/ui/AppButton';
import { Badge } from '../components/ui/Badge';

// Mock user data
const USER_DATA = {
  name: 'Alex Chen',
  handle: '@alexgrows',
  bio: 'Passionate urban gardener 🌱 | Robotics enthusiast 🤖 | Growing organic vegetables in my backyard since 2024',
  location: 'San Francisco, CA',
  joinDate: 'March 2024',
  website: 'alexgrows.garden',
  email: 'alex@example.com',
  avatar: 'https://images.unsplash.com/photo-1622812947502-0a643f17387e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWlsaW5nJTIwbWFuJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzczMDcxMzM0fDA&ixlib=rb-4.1.0&q=80&w=1080',
  coverImage: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWNreWFyZCUyMGdhcmRlbiUyMGxhbmRzY2FwZXxlbnwxfHx8fDE3NzMwOTA1MjF8MA&ixlib=rb-4.1.0&q=80&w=1080',
  stats: {
    posts: 12,
    followers: 84,
    following: 156,
    totalLikes: 1243
  },
  achievements: [
    { id: 1, name: 'First Harvest', icon: '🌾', earnedDate: 'Apr 2024' },
    { id: 2, name: 'Green Thumb', icon: '👍', earnedDate: 'May 2024' },
    { id: 3, name: 'Community Helper', icon: '🤝', earnedDate: 'Jun 2024' },
  ]
};

const USER_POSTS = [
  {
    id: 1,
    content: "Amazing tomato harvest this week! The AgroFlow robot's automated nutrient monitoring really made a difference. 🍅✨",
    image: 'https://images.unsplash.com/photo-1657411658702-7936cd6e59f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWNreWFyZCUyMHZlZ2V0YWJsZSUyMGdhcmRlbiUyMHRvbWF0b2VzfGVufDF8fHx8MTc3MzA5MDUwNXww&ixlib=rb-4.1.0&q=80&w=1080',
    likes: 342,
    comments: 28,
    timeAgo: '2 days ago',
    tags: ['Tomatoes', 'Harvest']
  },
  {
    id: 2,
    content: "Setting up my new raised bed for winter greens. The robot helped me calculate the perfect soil composition!",
    image: 'https://images.unsplash.com/photo-1478234257436-737de3109aca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob21lJTIwZ2FyZGVuJTIwaGFydmVzdCUyMGJhc2tldHxlbnwxfHx8fDE3NzMwOTA1MDl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    likes: 218,
    comments: 15,
    timeAgo: '5 days ago',
    tags: ['Winter Garden', 'Tips & Tricks']
  },
  {
    id: 3,
    content: "First time growing carrots and they turned out perfect! Thanks to everyone in the community for the helpful advice.",
    image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMGNhcnJvdHMlMjBoYXJ2ZXN0fGVufDF8fHx8MTc0MTk0NTk0NXww&ixlib=rb-4.1.0&q=80&w=1080',
    likes: 476,
    comments: 52,
    timeAgo: '1 week ago',
    tags: ['Carrots', 'First Time']
  },
  {
    id: 4,
    content: "My herb garden is thriving! Basil, rosemary, and thyme all growing strong in the courtyard.",
    image: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMGhlcmJzJTIwZ2FyZGVufGVufDF8fHx8MTc0MTk0NTk0NXww&ixlib=rb-4.1.0&q=80&w=1080',
    likes: 189,
    comments: 21,
    timeAgo: '2 weeks ago',
    tags: ['Herbs', 'Outdoor Garden']
  },
  {
    id: 5,
    content: "Just installed a new drip irrigation system with the robot's help. Perfectly optimized water distribution!",
    image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYXJkZW4lMjBpcnJpZ2F0aW9ufGVufDF8fHx8MTc0MTk0NTk0NXww&ixlib=rb-4.1.0&q=80&w=1080',
    likes: 294,
    comments: 38,
    timeAgo: '3 weeks ago',
    tags: ['Irrigation', 'AgroBotHacks']
  },
  {
    id: 6,
    content: "Companion planting success! Marigolds are keeping pests away from my vegetables naturally.",
    image: 'https://images.unsplash.com/photo-1592419044706-39796d40f98c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXJpZ29sZCUyMGZsb3dlcnMlMjBnYXJkZW58ZW58MXx8fHwxNzQxOTQ1OTQ1fDA&ixlib=rb-4.1.0&q=80&w=1080',
    likes: 367,
    comments: 43,
    timeAgo: '1 month ago',
    tags: ['Companion Planting', 'Pest Control']
  }
];

const ACTIVITY_DATA = [
  { id: 1, type: 'harvest', crop: 'Tomatoes', amount: '2.5 kg', date: 'Mar 8, 2026' },
  { id: 2, type: 'planted', crop: 'Lettuce', amount: '12 plants', date: 'Mar 6, 2026' },
  { id: 3, type: 'harvest', crop: 'Carrots', amount: '1.8 kg', date: 'Mar 3, 2026' },
  { id: 4, type: 'watered', crop: 'Herb Garden', amount: 'Auto', date: 'Mar 1, 2026' },
];

export default function ProfileScreen() {
  const [activeView, setActiveView] = useState<'grid' | 'list'>('grid');
  const [activeTab, setActiveTab] = useState<'posts' | 'activity' | 'achievements'>('posts');

  return (
    <div className="space-y-6">
      
      {/* Cover Image & Profile Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-[32px] overflow-hidden shadow-sm border-2 border-transparent hover:border-[#d4ff00] hover:shadow-[0_0_20px_rgba(212,255,0,0.15)] transition-all duration-300"
      >
        {/* Cover Image */}
        <div className="relative h-[240px] overflow-hidden">
          <img 
            src={USER_DATA.coverImage} 
            alt="Cover" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
          
          {/* Edit Cover Button */}
          <button className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm hover:bg-white text-stone-700 px-4 py-2 rounded-full text-[13px] font-medium transition-all flex items-center gap-2 shadow-sm">
            <Edit className="w-4 h-4" />
            Edit Cover
          </button>
        </div>

        {/* Profile Info */}
        <div className="px-8 pb-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 -mt-16 relative z-10">
            
            {/* Avatar & Basic Info */}
            <div className="flex flex-col md:flex-row items-start md:items-end gap-6">
              <div className="relative">
                <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg overflow-hidden bg-[#d4ff00]">
                  <img 
                    src={USER_DATA.avatar} 
                    alt={USER_DATA.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <button className="absolute bottom-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-[#d4ff00] transition-colors">
                  <Edit className="w-4 h-4 text-stone-700" />
                </button>
              </div>

              <div className="space-y-2">
                <div>
                  <h1 className="text-2xl font-semibold text-stone-900">{USER_DATA.name}</h1>
                  <p className="text-[15px] text-stone-500">{USER_DATA.handle}</p>
                </div>
                
                <p className="text-stone-700 text-[15px] leading-relaxed max-w-2xl">
                  {USER_DATA.bio}
                </p>

                <div className="flex flex-wrap items-center gap-4 text-[13px] text-stone-500">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4" />
                    {USER_DATA.location}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    Joined {USER_DATA.joinDate}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <LinkIcon className="w-4 h-4" />
                    <a href={`https://${USER_DATA.website}`} className="text-[#8ac700] hover:underline">
                      {USER_DATA.website}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 shrink-0">
              <Button variant="outline" className="rounded-full border-stone-200 text-stone-700 hover:bg-stone-50">
                <Mail className="w-4 h-4 mr-2" />
                Message
              </Button>
              <Button className="rounded-full bg-stone-900 text-white hover:bg-stone-800">
                <Settings className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-4 gap-4 mt-8 pt-6 border-t border-stone-200">
            <div className="text-center">
              <div className="text-2xl font-semibold text-stone-900">{USER_DATA.stats.posts}</div>
              <div className="text-[13px] text-stone-500 font-medium mt-1">Posts</div>
            </div>
            <div className="text-center cursor-pointer hover:bg-stone-50 rounded-2xl py-2 transition-colors">
              <div className="text-2xl font-semibold text-stone-900">{USER_DATA.stats.followers}</div>
              <div className="text-[13px] text-stone-500 font-medium mt-1">Followers</div>
            </div>
            <div className="text-center cursor-pointer hover:bg-stone-50 rounded-2xl py-2 transition-colors">
              <div className="text-2xl font-semibold text-stone-900">{USER_DATA.stats.following}</div>
              <div className="text-[13px] text-stone-500 font-medium mt-1">Following</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-semibold text-[#8ac700]">{USER_DATA.stats.totalLikes}</div>
              <div className="text-[13px] text-stone-500 font-medium mt-1">Total Likes</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Content Tabs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Main Content */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Tab Navigation */}
          <div className="flex items-center justify-between">
            <div className="bg-[#e4e4e4]/80 backdrop-blur-md rounded-full p-1.5 flex shadow-sm border border-white/20">
              {[
                { id: 'posts', label: 'Posts', icon: Grid3x3 },
                { id: 'activity', label: 'Activity', icon: TrendingUp },
                { id: 'achievements', label: 'Achievements', icon: Award }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={cn(
                    "px-5 py-2.5 rounded-full text-[14px] font-medium transition-all duration-300 flex items-center gap-2",
                    activeTab === tab.id 
                      ? "bg-white text-stone-900 shadow-sm" 
                      : "text-stone-500 hover:text-stone-800 hover:bg-white/40"
                  )}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </div>

            {activeTab === 'posts' && (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveView('grid')}
                  className={cn(
                    "p-2 rounded-xl transition-all",
                    activeView === 'grid' 
                      ? "bg-[#d4ff00] text-stone-900" 
                      : "bg-white text-stone-400 hover:text-stone-700"
                  )}
                >
                  <Grid3x3 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setActiveView('list')}
                  className={cn(
                    "p-2 rounded-xl transition-all",
                    activeView === 'list' 
                      ? "bg-[#d4ff00] text-stone-900" 
                      : "bg-white text-stone-400 hover:text-stone-700"
                  )}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>

          {/* Posts Grid View */}
          {activeTab === 'posts' && activeView === 'grid' && (
            <div className="grid grid-cols-2 gap-4 items-stretch">
              {USER_POSTS.map((post) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="aspect-square rounded-[24px] overflow-hidden bg-white shadow-sm border-2 border-transparent hover:border-[#d4ff00] hover:shadow-[0_0_20px_rgba(212,255,0,0.15)] transition-all duration-300 cursor-pointer group relative"
                >
                  <img 
                    src={post.image} 
                    alt={post.content} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                      <div className="flex items-center gap-4 text-[14px] font-medium">
                        <div className="flex items-center gap-1.5">
                          <Heart className="w-5 h-5" />
                          {post.likes}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <MessageCircle className="w-5 h-5" />
                          {post.comments}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Posts List View */}
          {activeTab === 'posts' && activeView === 'list' && (
            <div className="space-y-6">
              {USER_POSTS.map((post) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-[32px] p-6 shadow-sm border-2 border-transparent hover:border-[#d4ff00] hover:shadow-[0_0_20px_rgba(212,255,0,0.15)] transition-all duration-300 group"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <img src={USER_DATA.avatar} alt={USER_DATA.name} className="w-10 h-10 rounded-full object-cover" />
                    <div>
                      <div className="font-medium text-stone-900 text-[14px]">{USER_DATA.name}</div>
                      <div className="text-stone-500 text-[12px]">{post.timeAgo}</div>
                    </div>
                  </div>

                  <p className="text-stone-700 text-[15px] leading-relaxed mb-4">
                    {post.content}
                  </p>

                  <div className="w-full h-[280px] rounded-[24px] overflow-hidden mb-5">
                    <img 
                      src={post.image} 
                      alt="Post content" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      {post.tags.map(tag => (
                        <Badge key={tag} variant="secondary" className="bg-[#f0f0f0] text-stone-600 hover:bg-[#e8e8e8] font-medium px-3">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <button className="flex items-center gap-1.5 text-[14px] font-medium text-stone-500 hover:text-[#8ac700] transition-colors group/btn">
                        <Heart className="w-5 h-5 transition-transform group-hover/btn:scale-110" />
                        {post.likes}
                      </button>
                      <button className="flex items-center gap-1.5 text-[14px] font-medium text-stone-500 hover:text-stone-800 transition-colors group/btn">
                        <MessageCircle className="w-5 h-5 transition-transform group-hover/btn:scale-110" />
                        {post.comments}
                      </button>
                      <button className="flex items-center gap-1.5 text-[14px] font-medium text-stone-500 hover:text-stone-800 transition-colors group/btn">
                        <Share2 className="w-5 h-5 transition-transform group-hover/btn:scale-110" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Activity Tab */}
          {activeTab === 'activity' && (
            <div className="bg-white rounded-[32px] p-6 shadow-sm border-2 border-transparent hover:border-[#d4ff00] hover:shadow-[0_0_20px_rgba(212,255,0,0.15)] transition-all duration-300">
              <h3 className="text-[17px] font-medium text-stone-900 mb-6">Recent Garden Activity</h3>
              <div className="space-y-4">
                {ACTIVITY_DATA.map((activity) => (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center justify-between p-4 rounded-[20px] bg-[#f8f9f5] hover:bg-[#f0f2ed] transition-colors border border-[#8ac700]/10"
                  >
                    <div className="flex items-center gap-4">
                      <div className={cn(
                        "w-12 h-12 rounded-full flex items-center justify-center text-2xl",
                        activity.type === 'harvest' && "bg-[#d4ff00]/20",
                        activity.type === 'planted' && "bg-[#8ac700]/20",
                        activity.type === 'watered' && "bg-blue-100"
                      )}>
                        {activity.type === 'harvest' && '🌾'}
                        {activity.type === 'planted' && '🌱'}
                        {activity.type === 'watered' && '💧'}
                      </div>
                      <div>
                        <div className="font-medium text-stone-900 text-[15px] capitalize">
                          {activity.type} {activity.crop}
                        </div>
                        <div className="text-stone-500 text-[13px]">{activity.amount}</div>
                      </div>
                    </div>
                    <div className="text-stone-400 text-[13px] font-medium">{activity.date}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Achievements Tab */}
          {activeTab === 'achievements' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {USER_DATA.achievements.map((achievement) => (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white rounded-[24px] p-6 shadow-sm border-2 border-transparent hover:border-[#d4ff00] hover:shadow-[0_0_20px_rgba(212,255,0,0.15)] transition-all duration-300 text-center"
                >
                  <div className="text-6xl mb-3">{achievement.icon}</div>
                  <h4 className="text-[16px] font-semibold text-stone-900 mb-1">{achievement.name}</h4>
                  <p className="text-[13px] text-stone-500">Earned {achievement.earnedDate}</p>
                </motion.div>
              ))}
              
              {/* Locked Achievements */}
              {[1, 2, 3].map((i) => (
                <div
                  key={`locked-${i}`}
                  className="bg-[#e4e4e4] rounded-[24px] p-6 shadow-sm border-2 border-transparent opacity-60 text-center"
                >
                  <div className="text-6xl mb-3 filter grayscale">🔒</div>
                  <h4 className="text-[16px] font-semibold text-stone-500 mb-1">Locked</h4>
                  <p className="text-[13px] text-stone-400">Keep growing to unlock</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Quick Stats Bento */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#1c1c1c] text-white rounded-[32px] p-6 relative overflow-hidden border-2 border-transparent hover:border-[#d4ff00] hover:shadow-[0_0_20px_rgba(212,255,0,0.15)] transition-all duration-300"
          >
            {/* Decorative blurs */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#d4ff00] blur-[60px] rounded-full opacity-20 pointer-events-none"></div>
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-[#8ac700] blur-[60px] rounded-full opacity-20 pointer-events-none"></div>
            
            <div className="relative z-10 space-y-4">
              <h3 className="text-[17px] font-medium flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-[#d4ff00]" /> Garden Stats
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between py-3 border-b border-white/10">
                  <span className="text-[14px] text-white/70">Total Harvests</span>
                  <span className="text-[18px] font-semibold text-[#d4ff00]">24</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-white/10">
                  <span className="text-[14px] text-white/70">Active Plants</span>
                  <span className="text-[18px] font-semibold text-[#8ac700]">18</span>
                </div>
                <div className="flex items-center justify-between py-3">
                  <span className="text-[14px] text-white/70">Robot Tasks</span>
                  <span className="text-[18px] font-semibold">142</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Garden Focus Bento */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-[32px] p-6 shadow-sm border-2 border-transparent hover:border-[#d4ff00] hover:shadow-[0_0_20px_rgba(212,255,0,0.15)] transition-all duration-300"
          >
            <h3 className="text-[17px] font-medium text-stone-900 mb-5">Garden Focus</h3>
            <div className="space-y-3">
              {[
                { name: 'Tomatoes', percentage: 35, color: '#d4ff00' },
                { name: 'Herbs', percentage: 25, color: '#8ac700' },
                { name: 'Leafy Greens', percentage: 20, color: '#6b9900' },
                { name: 'Root Vegetables', percentage: 20, color: '#4a7700' }
              ].map((crop) => (
                <div key={crop.name}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[13px] font-medium text-stone-700">{crop.name}</span>
                    <span className="text-[13px] font-semibold text-stone-900">{crop.percentage}%</span>
                  </div>
                  <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all duration-500"
                      style={{ 
                        width: `${crop.percentage}%`,
                        backgroundColor: crop.color
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Badge Collection Preview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-[#d4ff00] to-[#8ac700] rounded-[32px] p-6 text-stone-900 shadow-sm border-2 border-transparent hover:border-white hover:shadow-[0_0_20px_rgba(212,255,0,0.25)] transition-all duration-300"
          >
            <h3 className="text-[17px] font-semibold mb-4 flex items-center gap-2">
              <Award className="w-5 h-5" /> Achievement Progress
            </h3>
            <div className="space-y-3">
              <div className="bg-white/30 backdrop-blur-sm rounded-2xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[13px] font-medium">Master Gardener</span>
                  <span className="text-[13px] font-semibold">7/10</span>
                </div>
                <div className="w-full h-2 bg-white/40 rounded-full overflow-hidden">
                  <div className="h-full bg-stone-900 rounded-full" style={{ width: '70%' }} />
                </div>
              </div>
              <p className="text-[12px] text-stone-800 leading-relaxed">
                Complete 3 more successful harvests to unlock this achievement!
              </p>
            </div>
          </motion.div>

        </div>
      </div>

    </div>
  );
}

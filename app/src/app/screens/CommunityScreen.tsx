import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Heart, MessageCircle, Share2, MoreHorizontal, Search, TrendingUp, Users, Star, Award, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router';
import { cn } from '../../lib/utils';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';

// Mock Data
const POSTS = [
  {
    id: 1,
    type: 'post',
    author: {
      name: 'Elena Silva',
      handle: '@elenagrows',
      avatar: 'https://images.unsplash.com/photo-1594318223885-20dc4b889f9e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWlsaW5nJTIwd29tYW4lMjBwb3J0cmFpdHxlbnwxfHx8fDE3NzMwMDc4MjF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    timeAgo: '2 hours ago',
    content: "Look at these beautiful heirloom tomatoes from my backyard raised bed! The robot's automated pest scanning really paid off this season—it caught the aphids before they could spread. 🍅✨ #BackyardGarden #TomatoHarvest",
    image: 'https://images.unsplash.com/photo-1657411658702-7936cd6e59f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWNreWFyZCUyMHZlZ2V0YWJsZSUyMGdhcmRlbiUyMHRvbWF0b2VzfGVufDF8fHx8MTc3MzA5MDUwNXww&ixlib=rb-4.1.0&q=80&w=1080',
    likes: 342,
    comments: 28,
    isLiked: false,
    tags: ['Tomatoes', 'Harvest']
  },
  {
    id: 2,
    type: 'post',
    author: {
      name: 'Marcus Chen',
      handle: '@botanist_marc',
      avatar: 'https://images.unsplash.com/photo-1622812947502-0a643f17387e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWlsaW5nJTIwbWFuJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzczMDcxMzM0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    timeAgo: '5 hours ago',
    content: "Morning harvest from the courtyard garden. Pro tip for autumn planting: rotate your root vegetables with legumes to keep the soil nitrogen rich. Let the robot handle the daily watering schedule so you can enjoy the fruits! 🥕🌿",
    image: 'https://images.unsplash.com/photo-1478234257436-737de3109aca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob21lJTIwZ2FyZGVuJTIwaGFydmVzdCUyMGJhc2tldHxlbnwxfHx8fDE3NzMwOTA1MDl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    likes: 856,
    comments: 104,
    isLiked: true,
    tags: ['Outdoor Gardening', 'Tips & Tricks']
  }
];

const EXPERT_POSTS = [
  {
    id: 3,
    type: 'expert',
    author: {
      name: 'Dr. Sarah Jenkins',
      handle: '@agrobotanist',
      avatar: 'https://images.unsplash.com/photo-1733231291455-3c4de1c24e20?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWlsaW5nJTIwZXhwZXJ0JTIwcG9ydHJhaXR8ZW58MXx8fHwxNzczMDgzNTA4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    timeAgo: '1 day ago',
    content: "A quick tip on preparing your courtyard soil for winter: don't clear away all the fallen leaves! Let the robot mulch them directly into the topsoil. It creates a perfect overwintering habitat for beneficial microbes and earthworms. 🍂",
    image: 'https://images.unsplash.com/photo-1687687629334-095b8311cf49?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvdXRkb29yJTIwc29pbCUyMGdhcmRlbmluZyUyMHJhaXNlZCUyMGJlZHxlbnwxfHx8fDE3NzMwOTA1MTJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    likes: 1240,
    comments: 89,
    isLiked: false,
    tags: ['Expert Advice', 'Soil Health', 'Winter Prep']
  }
];

const EVENTS = [
  {
    id: 4,
    type: 'event',
    title: 'Courtyard Ecosystems Workshop: Companion Planting',
    date: 'Oct 28, 2026',
    time: '2:00 PM EST',
    attendees: 156,
    image: 'https://images.unsplash.com/photo-1764046860592-9931f0869fc6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWNreWFyZCUyMGdhcmRlbiUyMHBsYW50cyUyMGNyb3BzfGVufDF8fHx8MTc3MzA5MDUxN3ww&ixlib=rb-4.1.0&q=80&w=1080',
    organizer: {
      name: 'AgroFlow Team',
      avatar: 'https://images.unsplash.com/photo-1719154718540-8ef3d94e7712?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWlsaW5nJTIwZmFybWVyJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzczMDgzNTEyfDA&ixlib=rb-4.1.0&q=80&w=1080'
    },
    description: 'Join us for a live virtual workshop on how to pair crops in your outdoor garden for natural pest resistance, and how our robot can better monitor their growth.'
  }
];

const TRENDING_TOPICS = [
  { tag: '#BackyardGarden', count: '12.4k' },
  { tag: '#AgroBotHacks', count: '8.2k' },
  { tag: '#SoilHealth', count: '5.1k' },
  { tag: '#TomatoSeason', count: '3.9k' },
];

export default function CommunityScreen() {
  const [activeTab, setActiveTab] = useState('Discover');
  const [posts, setPosts] = useState(POSTS);
  const [expertPosts, setExpertPosts] = useState(EXPERT_POSTS);
  const navigate = useNavigate();

  const toggleLike = (postId: number, isExpert: boolean = false) => {
    if (isExpert) {
      setExpertPosts(expertPosts.map(post => {
        if (post.id === postId) {
          return {
            ...post,
            isLiked: !post.isLiked,
            likes: post.isLiked ? post.likes - 1 : post.likes + 1
          };
        }
        return post;
      }));
    } else {
      setPosts(posts.map(post => {
        if (post.id === postId) {
          return {
            ...post,
            isLiked: !post.isLiked,
            likes: post.isLiked ? post.likes - 1 : post.likes + 1
          };
        }
        return post;
      }));
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-light text-stone-900 tracking-tight">Community <span className="font-medium">Hub</span></h1>
          <p className="text-stone-500 mt-1 text-[15px]">Connect, share, and grow with fellow AgroFlow gardeners.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input 
              type="text" 
              placeholder="Search topics or users..." 
              className="pl-10 pr-4 py-2.5 rounded-full bg-white/60 border border-white/40 focus:outline-none focus:ring-2 focus:ring-[#d4ff00]/50 w-[240px] text-[14px] text-stone-800 placeholder-stone-400 shadow-sm transition-all"
            />
          </div>
          <Button className="rounded-full bg-stone-900 text-[#d4ff00] hover:bg-stone-800 px-6">
            New Post
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Main Feed Column */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Custom Tabs Bento Box */}
          <div className="bg-[#e4e4e4]/80 backdrop-blur-md rounded-full p-1.5 flex shadow-sm border border-white/20 w-fit">
            {['Discover', 'Following', 'Expert Advice', 'Events'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "px-6 py-2.5 rounded-full text-[14px] font-medium transition-all duration-300",
                  activeTab === tab 
                    ? "bg-white text-stone-900 shadow-sm" 
                    : "text-stone-500 hover:text-stone-800 hover:bg-white/40"
                )}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="space-y-6">
            {(activeTab === 'Discover' || activeTab === 'Following') && (activeTab === 'Following' ? [posts[1]] : posts).map((post) => (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                key={post.id} 
                className="bg-[#ffffff] rounded-[32px] p-6 shadow-sm border-2 border-transparent hover:border-[#d4ff00] hover:shadow-[0_0_20px_rgba(212,255,0,0.15)] transition-all duration-300 group"
              >
                {/* Post Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <img src={post.author.avatar} alt={post.author.name} className="w-12 h-12 rounded-full object-cover" />
                    <div>
                      <div className="font-medium text-stone-900 text-[15px]">{post.author.name}</div>
                      <div className="text-stone-500 text-[13px]">{post.author.handle} · {post.timeAgo}</div>
                    </div>
                  </div>
                  <button className="text-stone-400 hover:text-stone-600 p-2 rounded-full hover:bg-stone-100 transition-colors">
                    <MoreHorizontal className="w-5 h-5" />
                  </button>
                </div>

                {/* Post Content */}
                <p className="text-stone-700 text-[15px] leading-relaxed mb-4">
                  {post.content}
                </p>

                {/* Post Image */}
                <div className="w-full h-[320px] rounded-[24px] overflow-hidden mb-5">
                  <img src={post.image} alt="Post content" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                </div>

                {/* Tags & Actions */}
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    {post.tags.map(tag => (
                      <Badge key={tag} variant="secondary" className="bg-[#f0f0f0] text-stone-600 hover:bg-[#e8e8e8] font-medium px-3">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <button 
                      onClick={() => toggleLike(post.id, false)}
                      className={cn(
                        "flex items-center gap-1.5 text-[14px] font-medium transition-colors group/btn",
                        post.isLiked ? "text-[#8ac700]" : "text-stone-500 hover:text-stone-800"
                      )}
                    >
                      <Heart 
                        className={cn(
                          "w-5 h-5 transition-transform group-hover/btn:scale-110",
                          post.isLiked ? "fill-[#8ac700] text-[#8ac700]" : ""
                        )} 
                      />
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

            {activeTab === 'Expert Advice' && expertPosts.map((post) => (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                key={post.id} 
                className="bg-[#ffffff] rounded-[32px] p-6 shadow-sm border-2 border-transparent hover:border-[#8ac700] hover:shadow-[0_0_20px_rgba(138,199,0,0.15)] transition-all duration-300 group relative overflow-hidden"
              >
                {/* Expert Badge */}
                <div className="absolute top-0 right-0 bg-[#8ac700] text-white px-4 py-1.5 rounded-bl-[16px] text-[12px] font-medium flex items-center gap-1.5 shadow-sm z-10">
                  <Star className="w-3.5 h-3.5 fill-current" /> Verified Expert
                </div>

                {/* Post Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <img src={post.author.avatar} alt={post.author.name} className="w-12 h-12 rounded-full object-cover border-2 border-[#8ac700]" />
                    </div>
                    <div>
                      <div className="font-medium text-stone-900 text-[15px] flex items-center gap-1.5">
                        {post.author.name}
                      </div>
                      <div className="text-stone-500 text-[13px]">{post.author.handle} · {post.timeAgo}</div>
                    </div>
                  </div>
                  <button className="text-stone-400 hover:text-stone-600 p-2 rounded-full hover:bg-stone-100 transition-colors">
                    <MoreHorizontal className="w-5 h-5" />
                  </button>
                </div>

                {/* Post Content */}
                <div className="bg-[#f8f9f5] rounded-[24px] p-5 mb-5 border border-[#8ac700]/10">
                  <p className="text-stone-700 text-[15px] leading-relaxed">
                    {post.content}
                  </p>
                </div>

                {/* Post Image */}
                <div className="w-full h-[280px] rounded-[24px] overflow-hidden mb-5">
                  <img src={post.image} alt="Post content" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                </div>

                {/* Tags & Actions */}
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    {post.tags.map(tag => (
                      <Badge key={tag} variant="secondary" className="bg-[#f0f0f0] text-stone-600 hover:bg-[#e8e8e8] font-medium px-3">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <button 
                      onClick={() => toggleLike(post.id, true)}
                      className={cn(
                        "flex items-center gap-1.5 text-[14px] font-medium transition-colors group/btn",
                        post.isLiked ? "text-[#8ac700]" : "text-stone-500 hover:text-stone-800"
                      )}
                    >
                      <Heart 
                        className={cn(
                          "w-5 h-5 transition-transform group-hover/btn:scale-110",
                          post.isLiked ? "fill-[#8ac700] text-[#8ac700]" : ""
                        )} 
                      />
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

            {activeTab === 'Events' && EVENTS.map((event) => (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                key={event.id} 
                className="bg-[#ffffff] rounded-[32px] p-6 shadow-sm border-2 border-transparent hover:border-[#d4ff00] hover:shadow-[0_0_20px_rgba(212,255,0,0.15)] transition-all duration-300 group"
              >
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Event Image */}
                  <div className="w-full md:w-[280px] h-[200px] shrink-0 rounded-[24px] overflow-hidden relative">
                    <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-xl flex flex-col items-center shadow-sm">
                      <span className="text-[11px] font-medium text-stone-500 uppercase">{event.date.split(' ')[0]}</span>
                      <span className="text-[18px] font-bold text-stone-900 leading-none">{event.date.split(' ')[1].replace(',', '')}</span>
                    </div>
                  </div>

                  {/* Event Content */}
                  <div className="flex-1 flex flex-col">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-[20px] font-semibold text-stone-900 leading-tight">{event.title}</h3>
                      <button className="text-stone-400 hover:text-stone-600 p-2 rounded-full hover:bg-stone-100 transition-colors shrink-0">
                        <MoreHorizontal className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-[13px] text-stone-500 font-medium mb-4">
                      <div className="flex items-center gap-1.5">
                        <div className="w-5 h-5 rounded-full bg-stone-100 flex items-center justify-center text-stone-600">
                          <Users className="w-3 h-3" />
                        </div>
                        {event.attendees} attending
                      </div>
                      <div className="flex items-center gap-1.5">
                        <img src={event.organizer.avatar} alt={event.organizer.name} className="w-5 h-5 rounded-full object-cover" />
                        By {event.organizer.name}
                      </div>
                      <div className="bg-[#f4f4f4] px-2.5 py-1 rounded-full text-stone-600">
                        {event.time}
                      </div>
                    </div>

                    <p className="text-stone-600 text-[14px] leading-relaxed mb-6 flex-1">
                      {event.description}
                    </p>

                    <div className="flex items-center gap-3">
                      <Button className="flex-1 rounded-full bg-stone-900 text-white hover:bg-stone-800 shadow-sm">
                        RSVP Now
                      </Button>
                      <Button variant="outline" className="rounded-full border-stone-200 text-stone-600 hover:bg-stone-50 px-6">
                        Details
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>

        {/* Right Sidebar Widgets Column */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* User Profile Mini Bento */}
          <div 
            onClick={() => navigate('/profile')}
            className="bg-[#e4e4e4] rounded-[32px] p-6 hover:bg-[#e0e0e0] border-2 border-transparent hover:border-[#d4ff00] hover:shadow-[0_0_20px_rgba(212,255,0,0.15)] transition-all duration-300 cursor-pointer"
          >
            <div className="flex items-center gap-4 mb-5">
              <div className="w-14 h-14 bg-[#d4ff00] rounded-full flex items-center justify-center text-stone-900 font-semibold text-xl border-4 border-white">
                ME
              </div>
              <div>
                <h3 className="text-[17px] font-medium text-stone-900">My Profile</h3>
                <p className="text-[13px] text-stone-500">AgroFlow Novice</p>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-2 text-center border-t border-stone-300/50 pt-4">
              <div>
                <div className="text-[18px] font-semibold text-stone-900">12</div>
                <div className="text-[11px] font-medium text-stone-500 uppercase">Posts</div>
              </div>
              <div>
                <div className="text-[18px] font-semibold text-stone-900">84</div>
                <div className="text-[11px] font-medium text-stone-500 uppercase">Followers</div>
              </div>
              <div>
                <div className="text-[18px] font-semibold text-stone-900">1.2k</div>
                <div className="text-[11px] font-medium text-stone-500 uppercase">Likes</div>
              </div>
            </div>
          </div>

          {/* Trending Topics Bento Box */}
          <div className="bg-white rounded-[32px] p-6 shadow-sm border-2 border-transparent hover:border-[#d4ff00] hover:shadow-[0_0_20px_rgba(212,255,0,0.15)] transition-all duration-300">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-[17px] font-medium text-stone-900 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-[#8ac700]" /> Trending Topics
              </h3>
            </div>
            <div className="space-y-4">
              {TRENDING_TOPICS.map((topic, index) => (
                <div key={index} className="flex items-center justify-between group cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#f4f4f4] text-stone-600 flex items-center justify-center font-medium text-[13px] group-hover:bg-[#d4ff00] group-hover:text-stone-900 transition-colors">
                      {index + 1}
                    </div>
                    <div>
                      <div className="font-medium text-[14px] text-stone-800 group-hover:text-[#8ac700] transition-colors">{topic.tag}</div>
                      <div className="text-[12px] text-stone-500">{topic.count} posts</div>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-stone-300 group-hover:text-[#8ac700] transition-colors" />
                </div>
              ))}
            </div>
            <button className="w-full mt-5 py-2.5 rounded-full text-[13px] font-medium text-stone-600 hover:bg-[#f4f4f4] transition-colors">
              Show more tags
            </button>
          </div>

          {/* Top Creators Bento Box */}
          <div className="bg-[#1c1c1c] text-white rounded-[32px] p-6 relative overflow-hidden border-2 border-transparent hover:border-[#d4ff00] hover:shadow-[0_0_20px_rgba(212,255,0,0.15)] transition-all duration-300 cursor-pointer">
            {/* Decorative blurs */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#d4ff00] blur-[60px] rounded-full opacity-20 pointer-events-none"></div>
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-[#8ac700] blur-[60px] rounded-full opacity-20 pointer-events-none"></div>
            
            <div className="relative z-10">
              <h3 className="text-[17px] font-medium flex items-center gap-2 mb-5">
                <Award className="w-5 h-5 text-[#d4ff00]" /> Top Creators
              </h3>
              
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center justify-between p-2 rounded-[16px] hover:bg-white/10 transition-colors cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <img 
                          src={i === 1 ? POSTS[0].author.avatar : i === 2 ? POSTS[1].author.avatar : 'https://images.unsplash.com/photo-1594318223885-20dc4b889f9e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWlsaW5nJTIwd29tYW4lMjBwb3J0cmFpdHxlbnwxfHx8fDE3NzMwMDc4MjF8MA&ixlib=rb-4.1.0&q=80&w=1080'} 
                          alt="Creator" 
                          className="w-10 h-10 rounded-full object-cover border-2 border-[#1c1c1c]" 
                        />
                        {i === 1 && <div className="absolute -bottom-1 -right-1 bg-[#d4ff00] text-black w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold">1</div>}
                      </div>
                      <div>
                        <div className="font-medium text-[14px] leading-tight">GreenThumb{i}</div>
                        <div className="text-[12px] text-white/50">{8 - i}k followers</div>
                      </div>
                    </div>
                    <button className="bg-white/10 hover:bg-[#d4ff00] hover:text-black text-white px-3 py-1 rounded-full text-[12px] font-medium transition-colors">
                      Follow
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
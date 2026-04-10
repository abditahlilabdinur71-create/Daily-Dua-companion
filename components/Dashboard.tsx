
import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Flame, Star, Zap, Clock, ChevronRight, BookOpen, Sparkles } from 'lucide-react';
import { DailyRecord } from '../types';
import { DUAS, REFLECTIONS } from '../constants';

interface DashboardProps {
  records: DailyRecord[];
}

const Dashboard: React.FC<DashboardProps> = ({ records }) => {
  const navigate = useNavigate();

  const { stats, duaOfTheDay, dailyFocus, nextSalah, currentReflection } = useMemo(() => {
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    const todayRecord = records.find(r => r.date === today);
    const completedSalahCount = todayRecord ? Object.values(todayRecord.salah).filter(v => v).length : 0;
    
    const chartData = records.slice(-7).map(r => {
      const completedCount = Object.values(r.salah).filter(v => v).length;
      return {
        name: r.date.split('-').slice(1).join('/'),
        dhikr: r.dhikrCount,
        salah: Math.round((completedCount / 6) * 100),
      };
    });

    // Calculate Salah Streaks
    const sortedRecords = [...records].sort((a, b) => a.date.localeCompare(b.date));
    const isPerfectDay = (record: DailyRecord) => {
      const mandatory = ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'];
      return mandatory.every(p => record.salah[p as keyof typeof record.salah]);
    };

    let longestSalahStreak = 0;
    let currentSalahStreak = 0;
    let tempStreak = 0;

    sortedRecords.forEach((record, index) => {
      if (isPerfectDay(record)) {
        tempStreak++;
      } else {
        longestSalahStreak = Math.max(longestSalahStreak, tempStreak);
        tempStreak = 0;
      }
      
      // Check for gaps in dates to break streak
      if (index < sortedRecords.length - 1) {
        const d1 = new Date(record.date);
        const d2 = new Date(sortedRecords[index + 1].date);
        const diff = (d2.getTime() - d1.getTime()) / (1000 * 3600 * 24);
        if (diff > 1) {
          longestSalahStreak = Math.max(longestSalahStreak, tempStreak);
          tempStreak = 0;
        }
      }
    });
    longestSalahStreak = Math.max(longestSalahStreak, tempStreak);

    // Current streak logic
    if (sortedRecords.length > 0) {
      const lastRecord = sortedRecords[sortedRecords.length - 1];
      const lastDate = lastRecord.date;
      if (lastDate === today || lastDate === yesterday) {
        let count = 0;
        for (let i = sortedRecords.length - 1; i >= 0; i--) {
          if (isPerfectDay(sortedRecords[i])) {
            count++;
            if (i > 0) {
              const d1 = new Date(sortedRecords[i-1].date);
              const d2 = new Date(sortedRecords[i].date);
              if ((d2.getTime() - d1.getTime()) / (1000 * 3600 * 24) > 1) break;
            }
          } else {
            break;
          }
        }
        currentSalahStreak = count;
      }
    }

    // Deterministic "Dua of the Day" based on date
    const dateSeed = new Date().getDate() + new Date().getMonth() * 31;
    const duaIndex = dateSeed % DUAS.length;
    const duaOfTheDay = DUAS[duaIndex];

    // Robust daily seed for reflections
    const dayOfYear = Math.floor((new Date().getTime() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
    const reflectionIndex = dayOfYear % REFLECTIONS.length;
    const currentReflection = REFLECTIONS[reflectionIndex];

    const dailyFocusIndex = (dayOfYear + 7) % REFLECTIONS.length;
    const dailyFocus = REFLECTIONS[dailyFocusIndex].prompt;

    // Simple next prayer logic (mock times for demo)
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const currentTime = currentHour * 60 + currentMinute;

    const prayerTimes = [
      { name: 'Fajr', time: 5 * 60 + 30, display: '05:30' },
      { name: 'Dhuhr', time: 12 * 60 + 30, display: '12:30' },
      { name: 'Asr', time: 15 * 60 + 45, display: '15:45' },
      { name: 'Maghrib', time: 18 * 60 + 15, display: '18:15' },
      { name: 'Isha', time: 19 * 60 + 45, display: '19:45' },
    ];

    const next = prayerTimes.find(p => p.time > currentTime) || prayerTimes[0];

    return { 
      stats: { 
        completedSalahCount, 
        chartData, 
        streak: records.length,
        currentSalahStreak,
        longestSalahStreak
      },
      duaOfTheDay,
      dailyFocus,
      nextSalah: next,
      currentReflection
    };
  }, [records]);

  const curations = [
    { title: 'Morning Athkar', color: 'bg-orange-50 text-orange-700', icon: '☀️', category: 'Morning' },
    { title: 'Dua for Knowledge', color: 'bg-blue-50 text-blue-700', icon: '📖', query: 'knowledge' },
    { title: 'Evening Remembrance', color: 'bg-indigo-50 text-indigo-700', icon: '🌙', category: 'Evening' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Welcome & Streak */}
      <section className="bg-stone-900 dark:bg-stone-950 rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-[-20%] left-[-10%] w-48 h-48 bg-amber-500/10 rounded-full blur-3xl" />
        
        <div className="relative z-10">
          <div className="flex justify-between items-start mb-8">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-400 mb-3 block">Spiritual Journey</span>
              <h2 className="text-4xl font-serif-display leading-tight mb-2 italic">Assalamu Alaikum</h2>
              <p className="text-stone-400 text-sm font-serif-elegant italic max-w-[200px] leading-relaxed">
                {dailyFocus}
              </p>
            </div>
            <div className="flex flex-col items-end">
              <div className="w-12 h-12 bg-white/5 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/10 mb-2">
                <Flame size={24} className="text-amber-400" />
              </div>
              <span className="text-2xl font-bold">{stats.streak}</span>
              <span className="text-[10px] text-stone-500 uppercase tracking-widest">Days</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/5 backdrop-blur-md rounded-3xl p-5 border border-white/10">
              <div className="flex items-center space-x-2 text-stone-400 mb-2">
                <Zap size={14} className="text-emerald-400" />
                <span className="text-[10px] font-bold uppercase tracking-wider">Salah</span>
              </div>
              <div className="flex items-baseline space-x-1">
                <span className="text-2xl font-bold">{stats.completedSalahCount}</span>
                <span className="text-stone-500 text-xs">/ 6</span>
              </div>
            </div>
            <div className="bg-white/5 backdrop-blur-md rounded-3xl p-5 border border-white/10">
              <div className="flex items-center space-x-2 text-stone-400 mb-2">
                <Clock size={14} className="text-amber-400" />
                <span className="text-[10px] font-bold uppercase tracking-wider">Next</span>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold leading-none mb-1">{nextSalah.name}</span>
                <span className="text-stone-500 text-[10px]">{nextSalah.display}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Salah Streaks Section */}
      <section className="grid grid-cols-2 gap-4">
        <div className="bg-white dark:bg-stone-900 rounded-3xl p-5 border border-stone-100 dark:border-stone-800 shadow-sm flex flex-col items-center text-center transition-colors duration-300">
          <div className="w-10 h-10 bg-amber-50 dark:bg-amber-900/20 rounded-full flex items-center justify-center text-amber-600 dark:text-amber-400 mb-2">
            <Flame size={20} />
          </div>
          <span className="text-[10px] font-bold text-stone-400 dark:text-stone-500 uppercase tracking-widest mb-1">Current Salah Streak</span>
          <p className="text-2xl font-bold text-stone-800 dark:text-stone-100">{stats.currentSalahStreak} <span className="text-xs font-medium text-stone-400 dark:text-stone-500">Days</span></p>
        </div>
        <div className="bg-white dark:bg-stone-900 rounded-3xl p-5 border border-stone-100 dark:border-stone-800 shadow-sm flex flex-col items-center text-center transition-colors duration-300">
          <div className="w-10 h-10 bg-emerald-50 dark:bg-emerald-900/20 rounded-full flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-2">
            <Star size={20} />
          </div>
          <span className="text-[10px] font-bold text-stone-400 dark:text-stone-500 uppercase tracking-widest mb-1">Longest Salah Streak</span>
          <p className="text-2xl font-bold text-stone-800 dark:text-stone-100">{stats.longestSalahStreak} <span className="text-xs font-medium text-stone-400 dark:text-stone-500">Days</span></p>
        </div>
      </section>

      {/* Daily Reflection */}
      <section className="bg-stone-100 dark:bg-stone-900 rounded-[2rem] p-8 border border-stone-200 dark:border-stone-800 shadow-sm transition-colors duration-300 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl" />
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white dark:bg-stone-800 rounded-2xl flex items-center justify-center text-emerald-600 dark:text-emerald-400 shadow-sm border border-stone-100 dark:border-stone-700">
              <Sparkles size={20} />
            </div>
            <h3 className="text-lg font-serif-display italic text-stone-800 dark:text-stone-100">Reflection</h3>
          </div>
          <span className="text-[10px] font-bold text-stone-400 dark:text-stone-500 uppercase tracking-[0.2em]">{currentReflection.category}</span>
        </div>
        <p className="text-xl font-serif-elegant text-stone-700 dark:text-stone-300 mb-6 leading-relaxed italic">
          "{currentReflection.prompt}"
        </p>
        <button 
          onClick={() => navigate('/reflect')}
          className="w-full py-4 bg-stone-900 dark:bg-stone-800 text-white dark:text-emerald-400 rounded-2xl text-xs font-bold shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all"
        >
          Capture Your Thoughts
        </button>
      </section>

      {/* Dua of the Day */}
      <section className="bg-white dark:bg-stone-900 rounded-[2rem] p-8 border border-stone-100 dark:border-stone-800 shadow-sm transition-colors duration-300">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-stone-50 dark:bg-stone-800 rounded-2xl flex items-center justify-center text-stone-400 dark:text-stone-500 border border-stone-100 dark:border-stone-700">
            <BookOpen size={20} />
          </div>
          <h3 className="text-lg font-serif-display italic text-stone-800 dark:text-stone-100">Dua of the Day</h3>
        </div>
        <div className="space-y-6">
          <p className="arabic-font text-3xl text-stone-900 dark:text-emerald-300 leading-[1.8] text-right" dir="rtl">
            {duaOfTheDay.arabic}
          </p>
          <div className="pt-4 border-t border-stone-50 dark:border-stone-800">
            <p className="text-sm text-stone-500 dark:text-stone-400 font-serif-elegant italic leading-relaxed mb-4">
              {duaOfTheDay.translation}
            </p>
            <button 
              onClick={() => navigate(`/duas?q=${encodeURIComponent(duaOfTheDay.title)}`)}
              className="text-[10px] font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 flex items-center group"
            >
              Read Full Dua <ChevronRight size={14} className="ml-1 transform group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* Progress Chart */}
      <section className="bg-white dark:bg-stone-900 rounded-3xl p-6 border border-stone-100 dark:border-stone-800 shadow-sm transition-colors duration-300">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold text-stone-800 dark:text-stone-100">Spiritual Growth</h3>
          <div className="flex space-x-4">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-emerald-500 rounded-full" />
              <span className="text-[10px] text-stone-400 dark:text-stone-500 font-bold uppercase">Dhikr</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-amber-500 rounded-full" />
              <span className="text-[10px] text-stone-400 dark:text-stone-500 font-bold uppercase">Salah %</span>
            </div>
          </div>
        </div>
        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={stats.chartData}>
              <defs>
                <linearGradient id="colorDhikr" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorSalah" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f5f5f5" className="dark:stroke-stone-800" />
              <XAxis dataKey="name" fontSize={10} axisLine={false} tickLine={false} tick={{ fill: '#a8a29e' }} />
              <YAxis hide />
              <Tooltip 
                contentStyle={{ 
                  borderRadius: '12px', 
                  border: 'none', 
                  boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                  backgroundColor: '#ffffff'
                }} 
                itemStyle={{ fontSize: '12px' }}
                formatter={(value: any, name: string) => [
                  name === 'salah' ? `${value}%` : value,
                  name === 'salah' ? 'Salah Completion' : 'Dhikr Count'
                ]}
              />
              <Area type="monotone" dataKey="dhikr" stroke="#10b981" fillOpacity={1} fill="url(#colorDhikr)" />
              <Area type="monotone" dataKey="salah" stroke="#f59e0b" fillOpacity={1} fill="url(#colorSalah)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Quick Actions */}
      <section>
        <h3 className="font-bold text-stone-800 dark:text-stone-100 mb-4 px-1">Daily Curations</h3>
        <div className="grid gap-3">
          {curations.map((item, i) => (
            <button 
              key={i} 
              onClick={() => {
                const params = new URLSearchParams();
                if (item.category) params.set('category', item.category);
                if (item.query) params.set('q', item.query);
                navigate(`/duas?${params.toString()}`);
              }}
              className="flex items-center justify-between p-4 bg-white dark:bg-stone-900 rounded-2xl border border-stone-100 dark:border-stone-800 hover:border-emerald-200 dark:hover:border-emerald-800 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-all group"
            >
              <div className="flex items-center space-x-4">
                <span className={`w-10 h-10 ${item.color} dark:bg-opacity-20 rounded-xl flex items-center justify-center text-lg`}>{item.icon}</span>
                <span className="font-semibold text-stone-700 dark:text-stone-200">{item.title}</span>
              </div>
              <ChevronRight size={18} className="text-stone-300 dark:text-stone-600 group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transform group-hover:translate-x-1 transition-all" />
            </button>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;


import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
// Added BookOpen to the imports from lucide-react
import { Search, Heart, Filter, ChevronDown, Share2, BookOpen, X, Copy, Check } from 'lucide-react';
import { DUAS } from '../constants';
import { DuaCategory, Dua } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface DuaLibraryProps {
  bookmarks: string[];
  toggleBookmark: (id: string) => void;
}

const CATEGORIES: DuaCategory[] = ['General', 'Morning', 'Evening', 'Sleep', 'Travel', 'Hardship', 'Gratitude'];

const DuaLibrary: React.FC<DuaLibraryProps> = ({ bookmarks, toggleBookmark }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category') as DuaCategory | 'All' | null;
  const queryParam = searchParams.get('q') || '';

  const [activeCategory, setActiveCategory] = useState<DuaCategory | 'All'>(categoryParam || 'All');
  const [searchQuery, setSearchQuery] = useState(queryParam);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [sharingDua, setSharingDua] = useState<Dua | null>(null);
  const [copied, setCopied] = useState(false);

  const handleShare = async (dua: Dua) => {
    const shareData = {
      title: `Dua: ${dua.title}`,
      text: `${dua.title}\n\n${dua.arabic}\n\nTranslation: ${dua.translation}\n\nShared via Companion App`,
      url: window.location.href,
    };

    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          setSharingDua(dua);
        }
      }
    } else {
      setSharingDua(dua);
    }
  };

  const copyToClipboard = (dua: Dua) => {
    const text = `${dua.title}\n\n${dua.arabic}\n\nTranslation: ${dua.translation}\n\nShared via Companion App`;
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  // Sync state with URL params if they change externally
  useEffect(() => {
    if (categoryParam) setActiveCategory(categoryParam);
    if (queryParam) setSearchQuery(queryParam);
  }, [categoryParam, queryParam]);

  const updateFilters = (cat: DuaCategory | 'All', query: string) => {
    setActiveCategory(cat);
    setSearchQuery(query);
    
    const newParams = new URLSearchParams();
    if (cat !== 'All') newParams.set('category', cat);
    if (query) newParams.set('q', query);
    setSearchParams(newParams);
  };

  const filteredDuas = useMemo(() => {
    return DUAS.filter(dua => {
      const matchesCategory = activeCategory === 'All' || dua.category === activeCategory;
      const matchesSearch = dua.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          dua.translation.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  // Fix: Refactored DuaCard from a local component to a render function to avoid key prop TypeScript issues
  const renderDuaCard = (dua: Dua) => {
    const isBookmarked = bookmarks.includes(dua.id);
    const isExpanded = expandedId === dua.id;

    return (
      <div key={dua.id} className={`bg-white dark:bg-stone-900 rounded-[2rem] border border-stone-100 dark:border-stone-800 overflow-hidden transition-all duration-500 ${isExpanded ? 'ring-1 ring-emerald-500/30 shadow-xl shadow-emerald-900/5' : 'hover:shadow-lg hover:shadow-stone-200/50'}`}>
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-[9px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-0.5 rounded-full uppercase tracking-[0.15em]">
                  {dua.category}
                </span>
              </div>
              <h4 className="text-xl font-serif-display italic text-stone-800 dark:text-stone-100 leading-tight">{dua.title}</h4>
              <p className="text-[9px] text-stone-400 dark:text-stone-500 font-serif-elegant italic mt-1 tracking-wider">Ref: {dua.reference}</p>
            </div>
            <button 
              onClick={() => toggleBookmark(dua.id)}
              className={`p-3 rounded-2xl transition-all duration-300 ${isBookmarked ? 'text-rose-500 bg-rose-50 dark:bg-rose-900/20 scale-110' : 'text-stone-300 dark:text-stone-600 bg-stone-50 dark:bg-stone-800 hover:text-stone-400'}`}
            >
              <Heart size={18} fill={isBookmarked ? "currentColor" : "none"} />
            </button>
          </div>

          <div className="arabic-font text-3xl text-stone-900 dark:text-emerald-300 leading-[1.8] text-right my-8 px-2" dir="rtl">
            {dua.arabic}
          </div>

          <div className="space-y-4">
            <button 
              onClick={() => setExpandedId(isExpanded ? null : dua.id)}
              className="w-full flex items-center justify-center space-x-2 py-2 text-stone-400 dark:text-stone-500 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors group"
            >
              <ChevronDown size={14} className={`transform transition-transform duration-500 ${isExpanded ? 'rotate-180' : ''}`} />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em]">{isExpanded ? 'Hide Details' : 'View Translation'}</span>
            </button>

            <AnimatePresence>
              {isExpanded && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="pt-6 border-t border-stone-50 dark:border-stone-800 space-y-6">
                    <div>
                        <h5 className="text-[9px] uppercase tracking-[0.2em] text-stone-400 dark:text-stone-500 font-bold mb-2">Transliteration</h5>
                        <p className="text-sm text-stone-600 dark:text-stone-400 italic font-serif-elegant leading-relaxed">{dua.transliteration}</p>
                    </div>
                    <div>
                        <h5 className="text-[9px] uppercase tracking-[0.2em] text-stone-400 dark:text-stone-500 font-bold mb-2">Translation</h5>
                        <p className="text-sm text-stone-800 dark:text-stone-200 font-serif-elegant leading-relaxed">{dua.translation}</p>
                    </div>
                    <div className="flex justify-end items-center pt-2">
                        <button 
                          onClick={() => handleShare(dua)}
                          className="flex items-center space-x-2 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold uppercase tracking-widest hover:bg-emerald-50 dark:hover:bg-emerald-900/20 px-4 py-2 rounded-xl transition-all"
                        >
                            <Share2 size={14} />
                            <span>Share</span>
                        </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Search & Categories */}
      <div className="space-y-6">
        <div className="relative group">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-stone-400 group-focus-within:text-emerald-500 transition-colors" size={18} />
          <input 
            type="text" 
            placeholder="Search Duas, translations..." 
            value={searchQuery}
            onChange={(e) => updateFilters(activeCategory, e.target.value)}
            className="w-full pl-14 pr-6 py-5 bg-white dark:bg-stone-900 border border-stone-100 dark:border-stone-800 rounded-[1.5rem] text-sm dark:text-stone-100 focus:outline-none focus:ring-4 focus:ring-emerald-500/5 focus:border-emerald-200 dark:focus:border-emerald-800 transition-all shadow-sm placeholder:text-stone-300 dark:placeholder:text-stone-600"
          />
        </div>
        
        <div className="flex overflow-x-auto pb-4 -mx-6 px-6 no-scrollbar space-x-3">
          <button 
            onClick={() => updateFilters('All', searchQuery)}
            className={`px-6 py-3 rounded-2xl text-[10px] font-bold uppercase tracking-[0.2em] whitespace-nowrap transition-all duration-300 ${
              activeCategory === 'All' 
                ? 'bg-stone-900 text-white shadow-xl shadow-stone-900/20 scale-105' 
                : 'bg-white dark:bg-stone-900 text-stone-400 dark:text-stone-500 border border-stone-100 dark:border-stone-800 hover:border-stone-200'
            }`}
          >
            All Duas
          </button>
          {CATEGORIES.map(cat => (
            <button 
              key={cat}
              onClick={() => updateFilters(cat, searchQuery)}
              className={`px-6 py-3 rounded-2xl text-[10px] font-bold uppercase tracking-[0.2em] whitespace-nowrap transition-all duration-300 ${
                activeCategory === cat 
                  ? 'bg-stone-900 text-white shadow-xl shadow-stone-900/20 scale-105' 
                  : 'bg-white dark:bg-stone-900 text-stone-400 dark:text-stone-500 border border-stone-100 dark:border-stone-800 hover:border-stone-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Dua List */}
      <div className="grid gap-4">
        {filteredDuas.length > 0 ? (
          filteredDuas.map(dua => renderDuaCard(dua))
        ) : (
          <div className="text-center py-20 bg-white dark:bg-stone-900 rounded-3xl border border-stone-100 dark:border-stone-800">
             {/* Fix: Added missing BookOpen icon to imports */}
             <BookOpen size={48} className="mx-auto text-stone-100 dark:text-stone-800 mb-4" />
             <p className="text-stone-400 dark:text-stone-500 font-medium">No Duas found</p>
          </div>
        )}
      </div>

      {/* Share Modal Fallback */}
      <AnimatePresence>
        {sharingDua && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSharingDua(null)}
              className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-sm bg-white dark:bg-stone-900 rounded-3xl shadow-2xl overflow-hidden"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-bold text-stone-800 dark:text-stone-100">Share Dua</h3>
                  <button 
                    onClick={() => setSharingDua(null)}
                    className="p-2 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-full text-stone-400 dark:text-stone-500 transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="bg-stone-50 dark:bg-stone-800 rounded-2xl p-4 mb-6 max-h-60 overflow-y-auto border border-stone-100 dark:border-stone-700">
                  <h4 className="font-bold text-stone-800 dark:text-stone-100 mb-2">{sharingDua.title}</h4>
                  <p className="arabic-font text-xl text-emerald-900 dark:text-emerald-300 text-right mb-3" dir="rtl">{sharingDua.arabic}</p>
                  <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">{sharingDua.translation}</p>
                </div>

                <button 
                  onClick={() => copyToClipboard(sharingDua)}
                  className={`w-full py-4 rounded-2xl font-bold flex items-center justify-center space-x-2 transition-all ${
                    copied ? 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300' : 'bg-emerald-800 text-white hover:bg-emerald-900 shadow-lg shadow-emerald-900/20'
                  }`}
                >
                  {copied ? <Check size={18} /> : <Copy size={18} />}
                  <span>{copied ? 'Copied to Clipboard' : 'Copy to Clipboard'}</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DuaLibrary;

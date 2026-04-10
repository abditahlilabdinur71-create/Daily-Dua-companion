
export type DuaCategory = 'Morning' | 'Evening' | 'Sleep' | 'Travel' | 'Hardship' | 'Gratitude' | 'General';

export interface Dua {
  id: string;
  title: string;
  category: DuaCategory;
  arabic: string;
  transliteration: string;
  translation: string;
  reference?: string;
}

export interface SalahStatus {
  fajr: boolean;
  dhuhr: boolean;
  asr: boolean;
  maghrib: boolean;
  isha: boolean;
  tahajjud: boolean;
}

export interface Reflection {
  id: string;
  prompt: string;
  explanation: string;
  category: string;
}

export interface DailyRecord {
  date: string;
  salah: SalahStatus;
  dhikrCount: number;
  reflection?: string;
}

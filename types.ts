
export interface TimerConfig {
  id: string;
  label: string;
  duration: number; // in seconds
}

export interface Preset {
  name: string;
  timers: TimerConfig[];
}

export interface NewsItem {
  title: string;
  link: string;
  imageUrl: string;
}
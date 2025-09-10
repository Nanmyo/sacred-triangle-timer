import React from 'react';

interface TimerDisplayProps {
  label: string;
  timeLeft: number;
  totalDuration: number;
  isActive: boolean;
}

const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
};

const TimerDisplay: React.FC<TimerDisplayProps> = ({ label, timeLeft, totalDuration, isActive }) => {
  const progress = totalDuration > 0 ? ((totalDuration - timeLeft) / totalDuration) * 100 : 0;

  return (
    <div className={`relative w-20 h-20 rounded-full flex flex-col items-center justify-center bg-transparent`}>
      <svg className="absolute w-full h-full" viewBox="0 0 100 100">
        <circle
          className="text-brand-muted/20"
          stroke="currentColor"
          strokeWidth="4"
          cx="50"
          cy="50"
          r="46"
          fill="transparent"
        />
        <circle
          className={isActive ? 'text-brand-pink' : 'text-brand-muted/50'}
          stroke="currentColor"
          strokeWidth="4"
          cx="50"
          cy="50"
          r="46"
          fill="transparent"
          strokeDasharray={2 * Math.PI * 46}
          strokeDashoffset={2 * Math.PI * 46 * (1 - progress / 100)}
          transform="rotate(-90 50 50)"
          style={{ transition: 'stroke-dashoffset 0.5s linear' }}
        />
      </svg>
      <div className="relative z-10 text-center">
        <div className={`text-sm font-bold tracking-widest uppercase mb-1 ${isActive ? 'text-brand-text' : 'text-brand-muted'}`}>{label}</div>
        <div className={`text-2xl font-bold tracking-wider ${isActive ? 'text-brand-text' : 'text-brand-muted'}`}>
          {formatTime(timeLeft)}
        </div>
      </div>
    </div>
  );
};

export default TimerDisplay;
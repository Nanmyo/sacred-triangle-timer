import React, { useState, useEffect } from 'react';
import type { TimerConfig } from '../types';

interface TimerInputProps {
  config: TimerConfig;
  onUpdate: (updatedConfig: TimerConfig) => void;
  title: string;
}

const TimerInput: React.FC<TimerInputProps> = ({ config, onUpdate, title }) => {
  const [label, setLabel] = useState(config.label);
  const initialDuration = Math.min(config.duration, 900);
  const [minutes, setMinutes] = useState(Math.floor(initialDuration / 60));
  const [seconds, setSeconds] = useState(initialDuration % 60);

  useEffect(() => {
    setLabel(config.label);
    const totalSeconds = Math.min(config.duration, 900);
    setMinutes(Math.floor(totalSeconds / 60));
    setSeconds(totalSeconds % 60);
  }, [config]);

  const handleLabelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newLabel = e.target.value;
    setLabel(newLabel);
    onUpdate({ ...config, label: newLabel });
  };
  
  const handleTimeChange = (newMinutes: number, newSeconds: number) => {
    let totalSeconds = (newMinutes * 60) + newSeconds;
    
    if (totalSeconds > 900) {
        totalSeconds = 900;
    }

    const finalMinutes = Math.floor(totalSeconds / 60);
    const finalSeconds = totalSeconds % 60;
    
    setMinutes(finalMinutes);
    setSeconds(finalSeconds);
    onUpdate({ ...config, duration: totalSeconds });
  };
  
  const handleMinutesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newMinutes = parseInt(e.target.value, 10) || 0;
      handleTimeChange(newMinutes, seconds);
  };
  
  const handleSecondsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newSeconds = parseInt(e.target.value, 10) || 0;
      handleTimeChange(minutes, newSeconds);
  };

  return (
    <div className="w-full p-4 bg-brand-bg/50 rounded-lg border border-brand-muted">
      <h3 className="font-bold text-lg text-brand-pink mb-3">{title}</h3>
      <div className="mb-4">
        <label htmlFor={`label-${config.id}`} className="block text-sm font-medium text-brand-text/80 mb-1">
          Label
        </label>
        <input
          id={`label-${config.id}`}
          type="text"
          value={label}
          onChange={handleLabelChange}
          className="w-full bg-brand-surface border border-brand-muted rounded-md px-3 py-2 text-brand-text placeholder-brand-muted/70 focus:ring-2 focus:ring-brand-pink focus:border-brand-pink outline-none"
        />
      </div>
      <div className="flex items-center space-x-2">
        <div className="flex-1">
          <label htmlFor={`minutes-${config.id}`} className="block text-sm font-medium text-brand-text/80 mb-1">
            Minutes
          </label>
          <input
            id={`minutes-${config.id}`}
            type="number"
            min="0"
            max="15"
            value={minutes}
            onChange={handleMinutesChange}
            className="w-full bg-brand-surface border border-brand-muted rounded-md px-3 py-2 text-brand-text placeholder-brand-muted/70 focus:ring-2 focus:ring-brand-pink focus:border-brand-pink outline-none"
          />
        </div>
        <div className="pt-6 text-2xl font-bold">:</div>
        <div className="flex-1">
          <label htmlFor={`seconds-${config.id}`} className="block text-sm font-medium text-brand-text/80 mb-1">
            Seconds
          </label>
          <input
            id={`seconds-${config.id}`}
            type="number"
            min="0"
            max="59"
            value={seconds}
            disabled={minutes >= 15}
            onChange={handleSecondsChange}
            className="w-full bg-brand-surface border border-brand-muted rounded-md px-3 py-2 text-brand-text placeholder-brand-muted/70 focus:ring-2 focus:ring-brand-pink focus:border-brand-pink outline-none disabled:bg-brand-muted/20"
          />
        </div>
      </div>
    </div>
  );
};

export default TimerInput;
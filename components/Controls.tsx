import React from 'react';
import Icon from './Icon';

interface ControlsProps {
  isRunning: boolean;
  onStartPause: () => void;
  onReset: () => void;
}

const Controls: React.FC<ControlsProps> = ({ isRunning, onStartPause, onReset }) => {
  return (
    <div className="flex items-center space-x-6">
      <button
        onClick={onReset}
        className="p-4 rounded-full bg-brand-muted/50 text-brand-text hover:bg-brand-muted/80 transition-colors duration-200"
        aria-label="Reset Timer"
      >
        <Icon type="reset" className="w-6 h-6" />
      </button>
      <button
        onClick={onStartPause}
        className={`p-5 rounded-full text-brand-bg bg-brand-pink hover:bg-brand-pink-hover transition-all duration-200 transform hover:scale-105`}
        aria-label={isRunning ? "Pause Timer" : "Start Timer"}
      >
        <Icon type={isRunning ? 'pause' : 'play'} className="w-8 h-8" />
      </button>
      <div className="w-14 h-14"></div>
    </div>
  );
};

export default Controls;
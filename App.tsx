import React, { useState, useEffect, useCallback } from 'react';
import TimerDisplay from './components/TimerDisplay';
import Controls from './components/Controls';
import TimerInput from './components/TimerInput';
import Icon from './components/Icon';
import NewsTicker from './components/NewsTicker';
import type { TimerConfig } from './types';
import { gohonzonImageBase64, lotusSutraImageBase64 } from './sacred-image';

const initialTimers: TimerConfig[] = [
  { id: 'focus', label: 'WISDOM', duration: 10 * 60 },
  { id: 'rest', label: 'MEDITATION', duration: 5 * 60 },
];

const App: React.FC = () => {
  const [timers, setTimers] = useState<TimerConfig[]>(initialTimers);
  const [currentTimerIndex, setCurrentTimerIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(timers[0].duration);
  const [isRunning, setIsRunning] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isRepeatOn, setIsRepeatOn] = useState(true);

  const resetTimers = useCallback(() => {
    setIsRunning(false);
    setCurrentTimerIndex(0);
    setTimeLeft(timers[0].duration);
  }, [timers]);
  
  useEffect(() => {
    if (!isRunning) return;

    if (timeLeft <= 0) {
      const nextTimerIndex = (currentTimerIndex + 1) % timers.length;
      
      if (!isRepeatOn && nextTimerIndex === 0) {
        resetTimers();
      } else {
        setCurrentTimerIndex(nextTimerIndex);
        setTimeLeft(timers[nextTimerIndex].duration);
      }
      return;
    }

    const intervalId = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isRunning, timeLeft, currentTimerIndex, timers, resetTimers, isRepeatOn]);
  
  useEffect(() => {
      if (!isRunning) {
          setTimeLeft(timers[currentTimerIndex].duration);
      }
  }, [timers, currentTimerIndex, isRunning]);


  const handleStartPause = () => {
    if (timeLeft <= 0) {
        resetTimers();
    }
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    resetTimers();
  };

  const handleUpdateTimer = (updatedConfig: TimerConfig) => {
    const newTimers = timers.map((timer) =>
      timer.id === updatedConfig.id ? updatedConfig : timer
    );
    setTimers(newTimers);
  };
  
  if (isSettingsOpen) {
    return (
      <div className="min-h-screen bg-brand-bg text-brand-text flex flex-col items-center justify-center p-4 font-sans">
        <div className="w-full max-w-md mx-auto bg-brand-surface p-6 rounded-xl shadow-2xl">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-brand-pink">Settings</h2>
            <button
              onClick={() => setIsSettingsOpen(false)}
              className="p-2 rounded-full text-brand-text hover:bg-brand-muted/50 transition-colors"
              aria-label="Close Settings"
            >
              <Icon type="check" className="w-6 h-6" />
            </button>
          </div>
          <div className="space-y-4">
             <TimerInput
                key={timers[0].id}
                config={timers[0]}
                onUpdate={handleUpdateTimer}
                title="WISDOM Timer"
            />
            <TimerInput
                key={timers[1].id}
                config={timers[1]}
                onUpdate={handleUpdateTimer}
                title="MEDITATION Timer"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="relative min-h-screen w-full bg-brand-bg text-brand-text flex flex-col items-center justify-center p-4 font-sans overflow-hidden">
      {/* Top Banner */}
      <img 
        src={lotusSutraImageBase64} 
        alt="Myoho Renge Kyo"
        className="absolute top-2 left-0 w-full h-auto object-contain z-30 pointer-events-none"
      />

      <NewsTicker />

      {/* Middle Banner */}
      <img 
        src={lotusSutraImageBase64} 
        alt="Myoho Renge Kyo"
        className="absolute top-24 left-0 w-full h-auto object-contain z-30 pointer-events-none"
      />

      <div 
        className="fixed inset-0 z-0 text-brand-muted/10 text-4xl leading-none tracking-widest overflow-hidden pointer-events-none"
        aria-hidden="true"
        style={{ wordBreak: 'break-all' }}
      >
        {'🖤⛤'.repeat(1500)}
      </div>

       <iframe 
        src="https://nst.org/"
        title="New Straits Times"
        className="absolute top-28 left-4 w-[40vw] h-[60vh] z-20 rounded-lg shadow-2xl border-2 border-brand-muted/50 bg-brand-surface"
        style={{ transform: 'scale(0.75)', transformOrigin: 'top left' }}
      ></iframe>

      <div className="absolute top-4 left-4 z-20">
          <button
            onClick={() => setIsRepeatOn(!isRepeatOn)}
            className={`p-3 rounded-full text-brand-text transition-colors duration-200 ${
                isRepeatOn ? 'bg-brand-pink/30' : 'hover:bg-brand-muted/50'
            }`}
            aria-label="Toggle Repeat"
          >
            <Icon type="repeat" className={`w-7 h-7 ${isRepeatOn ? 'text-brand-pink' : ''}`} />
          </button>
      </div>
      <div className="absolute top-4 right-4 z-20">
          <button 
            onClick={() => setIsSettingsOpen(true)}
            className="p-3 rounded-full text-brand-text hover:bg-brand-muted/50 transition-colors"
            aria-label="Open Settings"
          >
            <Icon type="settings" className="w-7 h-7" />
          </button>
      </div>
      
      <div className="relative flex flex-col items-center justify-center">
        <img 
          src={gohonzonImageBase64} 
          alt="Sacred Calligraphy Scroll"
          className="w-[15vmin] h-auto object-contain rounded-sm shadow-lg shadow-brand-pink/20 mb-[-2vmin] z-20"
        />

        <div className="relative w-[90vmin] h-[78vmin] flex flex-col items-center justify-center">
          {/* Black Triangle Background */}
          <div 
            className="absolute top-0 left-0 w-full h-full bg-black z-10"
            style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}
          ></div>

          {/* Red Dot */}
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-red-600 rounded-full z-20 shadow-lg shadow-red-500/50 animate-pulse"></div>

        </div>

        <div className="absolute bottom-[-4vmin] w-[110%] flex justify-between items-center z-20">
            <TimerDisplay
              label={timers[0].label}
              timeLeft={currentTimerIndex === 0 ? timeLeft : timers[0].duration}
              totalDuration={timers[0].duration}
              isActive={currentTimerIndex === 0}
            />
            <TimerDisplay
              label={timers[1].label}
              timeLeft={currentTimerIndex === 1 ? timeLeft : timers[1].duration}
              totalDuration={timers[1].duration}
              isActive={currentTimerIndex === 1}
            />
        </div>
      </div>
        
      <div className="mt-20 z-20">
        <Controls
            isRunning={isRunning}
            onStartPause={handleStartPause}
            onReset={handleReset}
        />
      </div>
      
      {/* Bottom Banner */}
      <img 
        src={lotusSutraImageBase64} 
        alt="Myoho Renge Kyo"
        className="absolute bottom-2 left-0 w-full h-auto object-contain z-30 pointer-events-none"
      />
    </main>
  );
};

export default App;
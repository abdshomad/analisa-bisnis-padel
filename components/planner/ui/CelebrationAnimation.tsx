import React from 'react';

export const CelebrationAnimation: React.FC = () => (
    <div className="fixed inset-0 bg-black/60 z-[9999] flex flex-col justify-center items-center overflow-hidden backdrop-blur-sm">
        {[...Array(100)].map((_, i) => (
          <div key={i} className="absolute animate-fall" style={{ left: `${Math.random() * 100}%`, top: `-20%`, width: `${Math.random() * 0.5 + 0.25}rem`, height: `${Math.random() * 1 + 0.5}rem`, animationDuration: `${2 + Math.random() * 3}s`, animationDelay: `${Math.random() * 4}s`, backgroundColor: ['#14b8a6', '#22d3ee', '#f59e0b', '#ef4444', '#f9fafb'][Math.floor(Math.random() * 5)], transform: `rotate(${Math.random() * 360}deg)` }}/>
        ))}
         <div className="text-center z-10 animate-pop-in">
            <h2 className="text-4xl font-extrabold text-white">Lokasi Baru Terdeteksi!</h2>
            <p className="mt-2 text-lg text-slate-200">AI akan menyertakan analisis lokasi presisi untuk Anda.</p>
        </div>
    </div>
);

import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="py-20 text-center relative">
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-10" 
        style={{backgroundImage: "url('https://picsum.photos/seed/padel/1920/1080')"}}
      ></div>
      <div className="relative">
        <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Riset Pasar: Bisnis Padel Indonesia
        </h1>
        <p className="mt-4 text-xl text-slate-500 dark:text-brand-text-muted max-w-3xl mx-auto">
          Analisis Potensi dan Strategi untuk Industri Padel di Indonesia.
        </p>
      </div>
    </header>
  );
};

export default Header;
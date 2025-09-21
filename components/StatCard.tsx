
import React from 'react';
import type { Stat } from '../types';

const StatCard: React.FC<{ stat: Stat }> = ({ stat }) => {
  return (
    <div className="bg-white dark:bg-brand-light-dark p-6 rounded-lg shadow-lg flex flex-col items-center text-center transform hover:scale-105 transition-transform duration-300">
      <div className="text-brand-cyan text-4xl mb-3">{stat.icon}</div>
      <h3 className="text-lg font-semibold text-slate-500 dark:text-brand-text-muted">{stat.label}</h3>
      <p className="text-3xl font-bold text-slate-900 dark:text-white">{stat.value}</p>
    </div>
  );
};

export default StatCard;
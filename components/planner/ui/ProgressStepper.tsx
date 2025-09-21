import React from 'react';
import type { Stage } from '../../../types';
import { Check, Edit, FileText, Bot, Briefcase } from 'lucide-react';

const steps = [
  { name: 'Konfigurasi', icon: Edit, stages: ['initial', 'generating_outline'] },
  { name: 'Kerangka', icon: Bot, stages: ['outline_ready'] },
  { name: 'Analisis', icon: FileText, stages: ['generating_analysis', 'analysis_ready'] },
  { name: 'Rencana Bisnis', icon: Briefcase, stages: ['generating_business_plan', 'business_plan_ready'] },
];

const getStepStatus = (stepIndex: number, currentStepIndex: number) => {
  if (stepIndex < currentStepIndex) return 'completed';
  if (stepIndex === currentStepIndex) return 'current';
  return 'upcoming';
};

export const ProgressStepper: React.FC<{ currentStage: Stage }> = ({ currentStage }) => {
  const currentStepIndex = steps.findIndex(step => step.stages.includes(currentStage));

  return (
    <nav aria-label="Progress" className="mb-8">
      <ol role="list" className="flex items-center">
        {steps.map((step, stepIdx) => {
          const status = getStepStatus(stepIdx, currentStepIndex);
          const Icon = step.icon;

          return (
            <li key={step.name} className={`relative ${stepIdx !== steps.length - 1 ? 'flex-1' : ''}`}>
              {/* Connector line */}
              {stepIdx !== steps.length - 1 ? (
                <div
                  className={`absolute left-4 top-1/2 -ml-px mt-0.5 h-0.5 w-full ${
                    status === 'completed' ? 'bg-brand-cyan' : 'bg-slate-300 dark:bg-slate-700'
                  }`}
                  aria-hidden="true"
                />
              ) : null}
              
              <div className="relative flex items-center justify-center" aria-current={status === 'current' ? 'step' : undefined}>
                <span className="flex h-9 items-center">
                  <span
                    className={`relative z-10 flex h-8 w-8 items-center justify-center rounded-full ${
                      status === 'completed'
                        ? 'bg-brand-cyan'
                        : status === 'current'
                        ? 'border-2 border-brand-cyan bg-white dark:bg-brand-light-dark'
                        : 'border-2 border-slate-300 bg-white dark:border-slate-700 dark:bg-brand-light-dark'
                    }`}
                  >
                    {status === 'completed' ? (
                      <Check className="h-5 w-5 text-white" aria-hidden="true" />
                    ) : (
                      <Icon
                        className={`h-5 w-5 ${
                          status === 'current' ? 'text-brand-cyan' : 'text-slate-400 dark:text-slate-500'
                        }`}
                        aria-hidden="true"
                      />
                    )}
                  </span>
                </span>
                <span className="ml-4 hidden sm:flex flex-col">
                  <span
                    className={`text-sm font-medium ${
                      status === 'current' ? 'text-brand-cyan' : 'text-slate-700 dark:text-brand-text'
                    }`}
                  >
                    {step.name}
                  </span>
                </span>
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

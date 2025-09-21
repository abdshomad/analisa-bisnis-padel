import React from 'react';
import { ResponsiveContainer } from 'recharts';
import type { TooltipProps } from 'recharts';
// FIX: The props for a custom tooltip content component should be correctly typed.
// Re-enabling deep import for `ValueType` and `NameType` to correctly type `TooltipProps`.
import type {
  ValueType,
  NameType,
} from 'recharts/types/component/DefaultTooltipContent';


// FIX: Augmented the props type with an intersection to include `active`, `payload`, and `label`.
// This resolves TypeScript errors when the base `TooltipProps` from the library is incomplete.
export const CustomTooltip = (props: TooltipProps<ValueType, NameType> & { active?: boolean; payload?: any[]; label?: string | number }) => {
    if (props.active && props.payload && props.payload.length) {
      // Use `label` for cartesian charts, fallback to the first payload item's name for others (like PieChart).
      const title = props.label || props.payload[0].name;
      return (
        <div className="bg-white dark:bg-brand-light-dark p-2 border border-slate-200 dark:border-slate-700 rounded-md shadow-lg">
          <p className="font-bold text-brand-cyan">{`${title}`}</p>
          {props.payload.map((pld, index) => (
             <p key={index} style={{ color: pld.color }}>
                {/* If a label exists (BarChart), show the series name. If not (PieChart), just show the value to avoid redundancy. */}
                {props.label ? `${pld.name}: ${pld.value}` : `Value: ${pld.value}`}
            </p>
          ))}
        </div>
      );
    }
  
    return null;
};

// FIX: Changed children type from React.ReactNode to React.ReactElement to match ResponsiveContainer's expected child type.
export const ChartContainer: React.FC<{children: React.ReactElement}> = ({ children }) => (
    <div className="w-full h-80 bg-white dark:bg-brand-light-dark p-4 rounded-lg shadow-lg">
        <ResponsiveContainer width="100%" height="100%">
            {children}
        </ResponsiveContainer>
    </div>
);
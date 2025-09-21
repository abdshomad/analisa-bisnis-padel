import React from 'react';
import { ChevronDown } from 'lucide-react';

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onClick: () => void;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ title, children, isOpen, onClick }) => {
    return (
        <div className="border-b border-slate-200 dark:border-slate-700">
            <button onClick={onClick} className="w-full flex justify-between items-center text-left py-4 px-2 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                <span className="font-semibold text-lg text-slate-900 dark:text-white">{title}</span>
                <ChevronDown className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''} h-6 w-6`} />
            </button>
            <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-screen' : 'max-h-0'}`}>
                <div className="p-4 bg-slate-50 dark:bg-brand-dark/50">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default AccordionItem;
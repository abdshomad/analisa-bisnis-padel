import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { Moon, Sun, Menu, X, Download } from 'lucide-react';

interface NavBarProps {
    sectionRefs: { [key: string]: React.RefObject<HTMLElement> };
}

const navLinks = [
  { id: 'stats', label: 'Statistik' },
  { id: 'planner', label: 'Perencana AI' },
  { id: 'context', label: 'Konteks Pasar' },
  { id: 'distribution', label: 'Distribusi' },
  { id: 'projections', label: 'Proyeksi' },
  { id: 'opportunity', label: 'Peluang' },
  { id: 'risks', label: 'Risiko' },
  { id: 'strategy', label: 'Strategi' },
  { id: 'strategyDashboard', label: 'Audiens' },
  { id: 'investment', label: 'Investasi' },
  { id: 'ancillary', label: 'Model Bisnis' },
  { id: 'supplierMarket', label: 'Pemasok' },
  { id: 'investmentDetails', label: 'Rincian Investasi' },
  { id: 'faq', label: 'FAQ' },
];

const ThemeToggleButton: React.FC = () => {
    const { theme, toggleTheme } = useTheme();
    const commonClasses = "text-slate-500 dark:text-brand-text-muted hover:text-brand-cyan transition-colors duration-300 focus:outline-none";

    return (
        <button onClick={toggleTheme} className={commonClasses} aria-label="Toggle theme">
            {theme === 'light' ? (
                <Moon className="h-6 w-6" />
            ) : (
                <Sun className="h-6 w-6" />
            )}
        </button>
    );
}

const DownloadButton: React.FC = () => {
    const handleDownload = () => {
        // Triggers the browser's print dialog, which can be used to save as PDF
        window.print();
    };

    return (
        <button
            onClick={handleDownload}
            className="text-slate-500 dark:text-brand-text-muted hover:text-brand-cyan transition-colors duration-300 focus:outline-none flex items-center"
            aria-label="Unduh Laporan PDF"
        >
            <Download className="h-5 w-5" />
        </button>
    );
};


const NavBar: React.FC<NavBarProps> = ({ sectionRefs }) => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (id: string) => {
    sectionRefs[id]?.current?.scrollIntoView({ behavior: 'smooth' });
    setIsOpen(false);
  };

  return (
    <nav className="sticky top-0 bg-white/80 dark:bg-brand-light-dark/80 backdrop-blur-lg z-50 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="text-slate-900 dark:text-white font-bold text-xl">
            Bisnis<span className="text-brand-cyan">Padel</span>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="text-slate-500 dark:text-brand-text-muted hover:text-brand-cyan transition duration-300"
              >
                {link.label}
              </button>
            ))}
            <DownloadButton />
            <ThemeToggleButton />
          </div>
          <div className="md:hidden flex items-center gap-4">
            <DownloadButton />
            <ThemeToggleButton />
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-800 dark:text-white focus:outline-none">
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-brand-light-dark">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className="block w-full text-left py-2 px-4 text-slate-500 dark:text-brand-text-muted hover:bg-slate-100 dark:hover:bg-brand-dark hover:text-brand-cyan transition duration-300"
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};

export default NavBar;
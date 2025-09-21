import React, 'react';
import { ChevronDown, Search } from 'lucide-react';

interface SearchableDropdownProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

const SearchableDropdown: React.FC<SearchableDropdownProps> = ({ options, value, onChange, disabled, placeholder }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  const filteredOptions = value ? options.filter(option =>
    option.toLowerCase().includes(value.toLowerCase())
  ) : options; // Show all options if input is empty

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelect = (option: string) => {
    onChange(option);
    setIsOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
    if (!isOpen) {
      setIsOpen(true);
    }
  };

  const handleInputFocus = () => {
    if (!disabled) {
      onChange(''); // Kosongkan input saat fokus
      setIsOpen(true);
    }
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 pointer-events-none" />
        <input
          type="text"
          value={value}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          disabled={disabled}
          placeholder={placeholder || 'Pilih atau cari lokasi...'}
          className={`w-full bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md p-2 pl-10 pr-10 text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-cyan focus:border-brand-cyan transition ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
          role="combobox"
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-autocomplete="list"
        />
        <button 
            type="button" 
            onClick={() => setIsOpen(!isOpen)} 
            disabled={disabled}
            className="absolute right-1 top-1/2 -translate-y-1/2 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-cyan/50"
            aria-label="Toggle dropdown"
        >
            <ChevronDown 
              className={`h-5 w-5 text-slate-500 dark:text-brand-text-muted transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
            />
        </button>
      </div>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white dark:bg-brand-light-dark border border-slate-300 dark:border-slate-600 rounded-md shadow-lg max-h-60 overflow-y-auto">
          <ul role="listbox">
            {filteredOptions.length > 0 ? (
              filteredOptions.map(option => (
                <li
                  key={option}
                  onClick={() => handleSelect(option)}
                  className="px-4 py-2 hover:bg-brand-cyan/10 dark:hover:bg-brand-cyan/20 cursor-pointer text-slate-800 dark:text-brand-text"
                  role="option"
                  aria-selected={value === option}
                >
                  {option}
                </li>
              ))
            ) : (
                value && <li className="px-4 py-2 text-slate-500 dark:text-brand-text-muted">Tidak ada saran yang cocok.</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchableDropdown;
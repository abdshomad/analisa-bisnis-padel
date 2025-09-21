import React from 'react';
import type { Court } from '../../types';
import { Search, DollarSign } from 'lucide-react';

type InteractiveMapProps = ReturnType<typeof import('../../hooks/useDistributionData').useDistributionData>;

const FilterControls: React.FC<Pick<InteractiveMapProps, 'categoryFilter' | 'setCategoryFilter' | 'maxPriceFilter' | 'setMaxPriceFilter' | 'maxPossiblePrice'>> = 
({ categoryFilter, setCategoryFilter, maxPriceFilter, setMaxPriceFilter, maxPossiblePrice }) => (
    <div className="flex flex-col md:flex-row gap-6 justify-center items-center mb-6 bg-slate-50 dark:bg-brand-dark p-4 rounded-lg shadow-inner">
        <div className="flex items-center gap-2 flex-wrap justify-center">
            <span className="text-sm font-semibold text-slate-600 dark:text-brand-text-muted mr-2">Kategori:</span>
            {(['All', 'Indoor', 'Outdoor'] as const).map(cat => (
                <button key={cat} onClick={() => setCategoryFilter(cat)} className={`px-4 py-1.5 text-sm rounded-md transition-colors ${categoryFilter === cat ? 'bg-brand-cyan text-white font-semibold' : 'bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600'}`}>{cat === 'All' ? 'Semua' : cat}</button>
            ))}
        </div>
        <div className="hidden md:block border-l border-slate-300 dark:border-slate-600 h-8"></div>
        <div className="flex items-center gap-3 w-full max-w-xs px-2">
            <DollarSign className="h-6 w-6 text-brand-cyan flex-shrink-0" />
            <div className="w-full">
                <label htmlFor="price-range" className="flex justify-between items-center text-sm font-medium text-slate-600 dark:text-brand-text-muted mb-1">
                    <span>Harga Maks.</span><span className="font-bold text-brand-cyan text-base">Rp {(maxPriceFilter / 1000).toLocaleString('id-ID')}rb</span>
                </label>
                <input id="price-range" type="range" min="0" max={maxPossiblePrice} step={50000} value={maxPriceFilter} onChange={(e) => setMaxPriceFilter(Number(e.target.value))} className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer dark:bg-slate-700" />
            </div>
        </div>
    </div>
);

const CourtList: React.FC<{ courts: Court[]; selectedCourt: Court | null; onSelect: (court: Court) => void }> = ({ courts, selectedCourt, onSelect }) => (
    <div className="lg:col-span-1 h-96 lg:h-[600px] overflow-y-auto bg-slate-100 dark:bg-brand-dark rounded-md p-2 space-y-2">
        {courts.length > 0 ? courts.map(court => (
            <div key={court.id} onClick={() => onSelect(court)} className={`p-3 rounded-md cursor-pointer transition-colors ${selectedCourt?.id === court.id ? 'bg-brand-cyan/20' : 'hover:bg-slate-200 dark:hover:bg-slate-700'}`}>
                <div className="flex justify-between items-start">
                    <h4 className="font-bold text-slate-900 dark:text-white pr-2">{court.name}</h4>
                    <span className={`flex-shrink-0 text-xs font-semibold px-2 py-0.5 rounded-full ${court.category === 'Indoor' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300' : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300'}`}>{court.category}</span>
                </div>
                <p className="text-sm text-slate-500 dark:text-brand-text-muted mt-1">{court.address}, {court.city}</p>
                {court.price && <div className="flex items-center text-sm text-brand-cyan font-semibold mt-1"><DollarSign className="h-4 w-4 mr-1.5" /><span>{court.price}</span></div>}
            </div>
        )) : <div className="p-3 text-center text-slate-500 dark:text-brand-text-muted">Tidak ada lapangan yang cocok.</div>}
    </div>
);

export const InteractiveMap: React.FC<InteractiveMapProps> = (props) => (
    <div className="bg-white dark:bg-brand-light-dark p-6 rounded-lg mt-8 shadow-lg">
        <h3 className="text-2xl font-bold text-center mb-6 text-slate-900 dark:text-white">Peta & Direktori Interaktif</h3>
        <div className="no-print flex justify-center mb-4">
            <div className="relative w-full max-w-md">
                <input type="text" value={props.searchQuery} onChange={(e) => props.setSearchQuery(e.target.value)} placeholder="Cari nama, alamat, kota..." className="w-full bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md p-2 pl-10 focus:ring-2 focus:ring-brand-cyan transition"/>
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            </div>
        </div>
        <div className="no-print">
            <FilterControls {...props} />
        </div>
        <div className="grid lg:grid-cols-3 gap-6">
            <CourtList courts={props.filteredCourts} selectedCourt={props.selectedCourt} onSelect={props.setSelectedCourt} />
            <div className="no-print lg:col-span-2 h-96 lg:h-[600px] rounded-lg overflow-hidden relative">
                <iframe key={props.selectedCourt?.id || 'default'} src={props.mapUrl} width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                {props.selectedCourt && (
                    <div className="absolute top-4 left-4 bg-white/90 dark:bg-brand-dark/90 backdrop-blur-sm shadow-lg rounded-lg p-4 max-w-sm">
                        <h4 className="font-bold text-lg text-slate-900 dark:text-white">{props.selectedCourt.name}</h4>
                        <p className="text-sm text-slate-500 dark:text-brand-text-muted mt-1">{props.selectedCourt.address}</p>
                    </div>
                )}
            </div>
        </div>
    </div>
);
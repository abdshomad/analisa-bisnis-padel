import { useState, useMemo, useEffect } from 'react';
import { courtData } from '../data/courtData';
import type { Court } from '../types';

const parsePriceRange = (priceStr?: string): [number, number] | null => {
    if (!priceStr) return null;
    const numbers = priceStr.match(/\d+/g)?.map(Number);
    if (!numbers || numbers.length === 0) return null;
    const values = numbers.map(n => n * 1000); 
    if (values.length === 1) return [values[0], values[0]];
    return [Math.min(...values), Math.max(...values)];
};

export const useDistributionData = () => {
    const maxPossiblePrice = useMemo(() => {
        const max = courtData.reduce((currentMax, court) => {
            const range = parsePriceRange(court.price);
            return (range && range[1] > currentMax) ? range[1] : currentMax;
        }, 0);
        return max > 0 ? Math.ceil(max / 50000) * 50000 : 600000;
    }, []);

    const [searchQuery, setSearchQuery] = useState<string>('');
    const [categoryFilter, setCategoryFilter] = useState<'All' | 'Indoor' | 'Outdoor'>('All');
    const [maxPriceFilter, setMaxPriceFilter] = useState<number>(maxPossiblePrice);
    const [selectedCourt, setSelectedCourt] = useState<Court | null>(courtData[0]);

    const filteredCourts = useMemo(() => {
        return courtData.filter(court => {
            const matchesCategory = categoryFilter === 'All' || court.category === categoryFilter;
            const courtPriceRange = parsePriceRange(court.price);
            const matchesPrice = !courtPriceRange || courtPriceRange[0] <= maxPriceFilter;
            const lowercasedQuery = searchQuery.toLowerCase();
            const matchesSearch = !searchQuery || (
                court.name.toLowerCase().includes(lowercasedQuery) ||
                court.address.toLowerCase().includes(lowercasedQuery) ||
                court.city.toLowerCase().includes(lowercasedQuery) ||
                court.province.toLowerCase().includes(lowercasedQuery)
            );
            return matchesCategory && matchesSearch && matchesPrice;
        });
    }, [searchQuery, categoryFilter, maxPriceFilter]);

    const mapUrl = useMemo(() => {
        if (!selectedCourt) return `https://maps.google.com/maps?q=Indonesia&output=embed&z=5`;
        if (selectedCourt.latitude && selectedCourt.longitude) {
            return `https://maps.google.com/maps?q=${selectedCourt.latitude},${selectedCourt.longitude}&output=embed&z=17`;
        }
        return `https://maps.google.com/maps?q=${encodeURIComponent(selectedCourt.name + ', ' + selectedCourt.address)}&output=embed&z=15`;
    }, [selectedCourt]);

    useEffect(() => {
        if (filteredCourts.length > 0) {
            if (!selectedCourt || !filteredCourts.some(c => c.id === selectedCourt.id)) {
                setSelectedCourt(filteredCourts[0]);
            }
        } else {
            setSelectedCourt(null);
        }
    }, [filteredCourts, selectedCourt]);

    return {
        searchQuery, setSearchQuery,
        categoryFilter, setCategoryFilter,
        maxPriceFilter, setMaxPriceFilter,
        selectedCourt, setSelectedCourt,
        filteredCourts,
        mapUrl,
        maxPossiblePrice,
    };
};

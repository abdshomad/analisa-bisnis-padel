import { useState, useMemo } from 'react';
import { investmentData } from '../data/investmentData';

const parseValue = (str: string): number => {
    if (!str) return 0;
    const cleaned = str.replace(/Rp|\s/g, '');
    const value = parseFloat(cleaned.replace(',', '.'));
    if (cleaned.includes('Jt')) return value * 1000000;
    if (cleaned.includes('M')) return value * 1000000000;
    return value;
};

export const useROICalculator = () => {
    const defaultTier = investmentData[0];
    const [capex, setCapex] = useState(() => parseValue(defaultTier.capex.items.find(i => i.isTotal)?.value || '0'));
    const [monthlyOpex, setMonthlyOpex] = useState(() => parseValue(defaultTier.opex.items.find(i => i.isTotal)?.value || '0'));
    const [hourlyRate, setHourlyRate] = useState(250000);
    const [dailyHours, setDailyHours] = useState(6);
    const [operatingDays, setOperatingDays] = useState(30);

    const calculations = useMemo(() => {
        const monthlyRevenue = hourlyRate * dailyHours * operatingDays;
        const monthlyProfit = monthlyRevenue - monthlyOpex;
        const paybackPeriod = (monthlyProfit > 0) ? `~${(capex / (monthlyProfit * 12)).toFixed(1)} Tahun` : 'Tidak Tercapai';
        
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];
        const projectionData = monthNames.map((month, index) => ({
            month: month,
            "Pendapatan Bulanan": monthlyRevenue,
            "Akumulasi Tahunan": monthlyRevenue * (index + 1),
        }));
        
        return { 
            monthlyRevenue, 
            monthlyProfit, 
            annualRevenue: monthlyRevenue * 12, 
            annualProfit: monthlyProfit * 12, 
            paybackPeriod,
            projectionData
        };
    }, [capex, monthlyOpex, hourlyRate, dailyHours, operatingDays]);

    const handlePresetClick = (tierId: string) => {
        const tier = investmentData.find(t => t.id === tierId);
        if (tier) {
            setCapex(parseValue(tier.capex.items.find(i => i.isTotal)?.value || '0'));
            setMonthlyOpex(parseValue(tier.opex.items.find(i => i.isTotal)?.value || '0'));
            const rate = tier.roi.assumptions.find(a => a.label.includes('Harga'))?.label || '0';
            setHourlyRate(parseInt(rate.replace(/\D/g, '')) * 1000);
            const hours = tier.roi.assumptions.find(a => a.label.includes('Okupansi'))?.label || '0';
            setDailyHours(parseInt(hours.replace(/\D/g, '')));
        }
    };

    return {
        state: {
            capex,
            monthlyOpex,
            hourlyRate,
            dailyHours,
            operatingDays,
        },
        calculations,
        actions: {
            setCapex,
            setMonthlyOpex,
            setHourlyRate,
            setDailyHours,
            setOperatingDays,
            handlePresetClick,
        },
    };
};
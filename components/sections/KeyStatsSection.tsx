import React, { useMemo } from 'react';
import Section from '../Section';
import StatCard from '../StatCard';
import type { Stat } from '../../types';
import { Building2, TrendingUp, Trophy, Globe, Users, Map, Tag, DollarSign } from 'lucide-react';
import { courtData } from '../../data/courtData';
import AIInsight from '../ui/AIInsight';

const KeyStatsSection = React.forwardRef<HTMLElement>((props, ref) => {
    const averagePrice = useMemo(() => {
        const prices: number[] = [];
        courtData.forEach(court => {
            if (court.price) {
                // Extracts all numbers from the price string (e.g., "Rp 150rb - 200rb")
                const numbers = court.price.match(/\d+/g)?.map(Number);
                if (numbers && numbers.length > 0) {
                    // Calculates the average if it's a range
                    const avgForCourt = numbers.reduce((acc, val) => acc + val, 0) / numbers.length;
                    prices.push(avgForCourt);
                }
            }
        });

        if (prices.length === 0) return 'N/A';

        const overallAverage = prices.reduce((acc, val) => acc + val, 0) / prices.length;
        // Rounds to the nearest thousand and formats as "Rp XXXrb"
        return `~Rp ${Math.round(overallAverage)}rb`;
    }, []);

    const keyStats: Stat[] = [
        { label: "Total Lapangan", value: "369+", icon: <Building2 className="h-8 w-8" /> },
        { label: "Pertumbuhan Infrastruktur", value: ">900% (2th)", icon: <TrendingUp className="h-8 w-8" /> },
        { label: "Peringkat ASEAN (Lap.)", value: "#1", icon: <Trophy className="h-8 w-8" /> },
        { label: "Peringkat Pertumbuhan Dunia", value: "#29", icon: <Globe className="h-8 w-8" /> },
        { label: "Estimasi Pemain (2025)", value: "20.000+", icon: <Users className="h-8 w-8" /> },
        { label: "Proyeksi Lapangan (Jabodetabek)", value: "350+ ('26)", icon: <Map className="h-8 w-8" /> },
        { label: "Rata-Rata Harga Sewa/Jam", value: averagePrice, icon: <Tag className="h-8 w-8" /> },
        { label: "Pasar Global (2033)", value: "$450 Jt+", icon: <DollarSign className="h-8 w-8" /> }
    ];
    
    return (
        <Section ref={ref} id="stats" title="Ringkasan Statistik Kunci">
            <AIInsight 
                initialInsight="Pertumbuhan lapangan lebih dari 900% dalam 2 tahun menunjukkan pasar yang sangat panas. Investor awal memiliki keuntungan 'first-mover' yang signifikan di kota-kota lapis kedua."
                initialRecommendation="Fokuskan analisis kelayakan pada 3-5 kota lapis kedua dengan demografi kelas menengah yang kuat namun belum memiliki fasilitas padel (misalnya, Pekanbaru, Balikpapan) untuk memaksimalkan keuntungan 'first-mover'."
                topic="Statistik Kunci Pasar Padel Indonesia"
            />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {keyStats.map((stat, index) => <StatCard key={index} stat={stat} />)}
            </div>
        </Section>
    );
});

KeyStatsSection.displayName = 'KeyStatsSection';

export default KeyStatsSection;
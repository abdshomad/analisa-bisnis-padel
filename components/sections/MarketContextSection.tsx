import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import Section from '../Section';
import { ChartContainer, CustomTooltip } from '../charts/CustomChartComponents';
import { seaMarketData, globalMarketData } from '../../data/marketData';
import { useTheme } from '../../contexts/ThemeContext';
import AIInsight from '../ui/AIInsight';

const MarketContextSection = React.forwardRef<HTMLElement>((props, ref) => {
    const { theme } = useTheme();
    const axisStrokeColor = theme === 'dark' ? '#94a3b8' : '#475569';
    const gridStrokeColor = theme === 'dark' ? '#334155' : '#e2e8f0';

    return (
        <Section ref={ref} id="context" title="Konteks Global & Regional">
            <AIInsight 
                initialInsight="Meskipun Indonesia memimpin di ASEAN, jumlah lapangan per kapita masih sangat rendah dibandingkan dengan negara-negara Eropa seperti Spanyol. Ini menandakan ruang pertumbuhan vertikal yang sangat besar."
                initialRecommendation="Jangan hanya meniru model bisnis Eropa. Kembangkan program 'pengenalan padel' yang terjangkau dan bekerja sama dengan komunitas olahraga lokal (tenis, bulu tangkis) untuk mengakuisisi pemain baru dan mempercepat adopsi pasar."
                topic="Konteks Pasar Global dan Regional untuk Padel"
            />
            <div className="grid md:grid-cols-2 gap-8">
                <div>
                    <h3 className="text-xl font-semibold text-center mb-4 text-slate-900 dark:text-white">Perbandingan Pasar ASEAN (Lapangan)</h3>
                    <ChartContainer>
                        <BarChart data={seaMarketData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke={gridStrokeColor} />
                            <XAxis dataKey="name" stroke={axisStrokeColor} />
                            <YAxis stroke={axisStrokeColor} />
                            <Tooltip content={<CustomTooltip />} />
                            <Bar dataKey="courts" fill="#06b6d4" />
                        </BarChart>
                    </ChartContainer>
                </div>
                <div>
                    <h3 className="text-xl font-semibold text-center mb-4 text-slate-900 dark:text-white">Pertumbuhan Pasar Global (Juta USD)</h3>
                    <ChartContainer>
                        <BarChart data={globalMarketData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke={gridStrokeColor} />
                            <XAxis dataKey="year" stroke={axisStrokeColor} />
                            <YAxis stroke={axisStrokeColor} />
                            <Tooltip content={<CustomTooltip />} />
                            <Bar dataKey="value" name="Market Value" fill="#06b6d4" />
                        </BarChart>
                    </ChartContainer>
                </div>
            </div>
        </Section>
    );
});

MarketContextSection.displayName = 'MarketContextSection';

export default MarketContextSection;
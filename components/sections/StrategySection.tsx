import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import Section from '../Section';
import { ChartContainer, CustomTooltip } from '../charts/CustomChartComponents';
import { regionalMarketShareData } from '../../data/marketData';
import { useTheme } from '../../contexts/ThemeContext';
import AIInsight from '../ui/AIInsight';

const StrategySection = React.forwardRef<HTMLElement>((props, ref) => {
    const { theme } = useTheme();
    const axisStrokeColor = theme === 'dark' ? '#94a3b8' : '#475569';
    const gridStrokeColor = theme === 'dark' ? '#334155' : '#e2e8f0';

    return (
        <Section ref={ref} id="strategy" title="Strategi Pemasaran">
            <AIInsight 
                initialInsight="Strategi 'bundling' di mana layanan foto AI disertakan dalam harga sewa lapangan pada jam-jam sepi (off-peak) dapat menjadi cara efektif untuk meningkatkan okupansi sekaligus memperkenalkan teknologi kepada basis pengguna yang lebih luas tanpa biaya tambahan yang terasa."
                initialRecommendation="Luncurkan promosi 'Off-Peak Power Play' di hari kerja (misalnya, jam 10 pagi - 3 sore) di mana harga sewa lapangan sama, tetapi sudah termasuk paket foto AI dasar. Ini akan meningkatkan utilitas aset dan memperkenalkan layanan secara organik."
                topic="Strategi Pemasaran untuk Bisnis Padel di Indonesia"
            />
             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="bg-white dark:bg-brand-light-dark p-6 rounded-lg shadow-lg lg:col-span-2">
                   <h3 className="text-xl font-semibold text-center mb-4 text-slate-900 dark:text-white">Pangsa Operator Regional (Jakarta & Bali)</h3>
                    <ChartContainer>
                        <BarChart data={regionalMarketShareData}>
                            <CartesianGrid strokeDasharray="3 3" stroke={gridStrokeColor} />
                            <XAxis dataKey="market" stroke={axisStrokeColor}/>
                            <YAxis stroke={axisStrokeColor} unit="%"/>
                            <Tooltip content={<CustomTooltip />} />
                            <Legend />
                            <Bar dataKey="PadelPro Group" stackId="a" fill="#06b6d4" />
                            <Bar dataKey="Urban Padel" stackId="a" fill="#22d3ee" />
                            <Bar dataKey="Island Padel" stackId="a" fill="#67e8f9" />
                            <Bar dataKey="Others" stackId="a" fill="#a5f3fc" />
                        </BarChart>
                    </ChartContainer>
                </div>
                <div className="bg-white dark:bg-brand-light-dark p-6 rounded-lg shadow-lg">
                   <h3 className="text-xl font-semibold text-center mb-4 text-slate-900 dark:text-white">Target Audiens</h3>
                   <div className="space-y-4">
                        <div>
                            <h4 className="font-bold text-brand-cyan">Pemain & Penggemar Padel</h4>
                            <p className="text-sm text-slate-600 dark:text-brand-text-muted">Usia 20-40, profesional urban, eksekutif. Aktif, sosial, melek teknologi, dan menghargai pengalaman baru. Menginginkan konten visual berkualitas tinggi dari permainan mereka.</p>
                        </div>
                        <div>
                            <h4 className="font-bold text-brand-cyan">Pengguna Media Sosial Kreatif</h4>
                            <p className="text-sm text-slate-600 dark:text-brand-text-muted">Usia 18-34, milenial & Gen Z. Pembuat konten proaktif yang menghargai estetika, inovasi, dan personalisasi untuk memperkaya profil media sosial mereka.</p>
                        </div>
                   </div>
                </div>
             </div>
        </Section>
    );
});

StrategySection.displayName = 'StrategySection';

export default StrategySection;
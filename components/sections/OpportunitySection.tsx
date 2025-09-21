import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, Legend } from 'recharts';
import Section from '../Section';
import { ChartContainer, CustomTooltip } from '../charts/CustomChartComponents';
import { aiAdoptionData, playerSegmentsData } from '../../data/marketData';
import { useTheme } from '../../contexts/ThemeContext';
import AIInsight from '../ui/AIInsight';

const PIE_COLORS = ['#06b6d4', '#22d3ee', '#67e8f9', '#a5f3fc', '#cffafe'];

const OpportunitySection = React.forwardRef<HTMLElement>((props, ref) => {
    const { theme } = useTheme();
    const axisStrokeColor = theme === 'dark' ? '#94a3b8' : '#475569';
    const gridStrokeColor = theme === 'dark' ? '#334155' : '#e2e8f0';

    return (
        <Section ref={ref} id="opportunity" title="Validasi Peluang AI">
            <AIInsight 
                initialInsight="Dominasi segmen 'Recreational/Social' (70%) menunjukkan bahwa solusi teknologi yang fokus pada 'social sharing' dan kemudahan penggunaan lebih mungkin berhasil daripada solusi yang berorientasi pada analisis performa yang kompleks. Fitur seperti pembuatan video highlight otomatis untuk Instagram akan sangat menarik."
                initialRecommendation="Prioritaskan investasi teknologi pada sistem kamera AI yang terintegrasi dengan media sosial. Tawarkan paket 'Instagrammable Moment' di mana pemain bisa mendapatkan klip video pendek yang sudah diedit secara otomatis setelah sesi mereka."
                topic="Peluang Adopsi Teknologi AI di Pasar Padel"
            />
            <div className="grid md:grid-cols-2 gap-8">
                 <div>
                   <h3 className="text-xl font-semibold text-center mb-4 text-slate-900 dark:text-white">Sentimen Adopsi AI</h3>
                    <ChartContainer>
                        <BarChart data={aiAdoptionData} layout="vertical" margin={{ left: 40}}>
                            <CartesianGrid strokeDasharray="3 3" stroke={gridStrokeColor} />
                            <XAxis type="number" stroke={axisStrokeColor} domain={[0, 100]}/>
                            <YAxis type="category" dataKey="name" stroke={axisStrokeColor} width={100}/>
                            <Tooltip content={<CustomTooltip />} />
                            <Bar dataKey="value" fill="#06b6d4" unit="%" />
                        </BarChart>
                    </ChartContainer>
                </div>
                 <div>
                   <h3 className="text-xl font-semibold text-center mb-4 text-slate-900 dark:text-white">Segmen Pasar Pemain</h3>
                     <ChartContainer>
                        <PieChart>
                            <Pie data={playerSegmentsData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} isAnimationActive={false} animationDuration={0}>
                                {playerSegmentsData.map((entry, index) => <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />)}
                            </Pie>
                            <Tooltip content={<CustomTooltip />} />
                            <Legend />
                        </PieChart>
                    </ChartContainer>
                </div>
            </div>
        </Section>
    );
});

OpportunitySection.displayName = 'OpportunitySection';

export default OpportunitySection;
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line } from 'recharts';
import Section from '../Section';
import { ChartContainer, CustomTooltip } from '../charts/CustomChartComponents';
import { indonesianCourtGrowthData, projectedCourtGrowthData } from '../../data/marketData';
import { useTheme } from '../../contexts/ThemeContext';
import AIInsight from '../ui/AIInsight';

const ProjectionsSection = React.forwardRef<HTMLElement>((props, ref) => {
    const { theme } = useTheme();
    const axisStrokeColor = theme === 'dark' ? '#94a3b8' : '#475569';
    const gridStrokeColor = theme === 'dark' ? '#334155' : '#e2e8f0';

    return (
        <Section ref={ref} id="projections" title="Proyeksi Pertumbuhan">
            <AIInsight 
                initialInsight="Kurva pertumbuhan lapangan yang eksponensial (mirip 'hockey stick') menandakan pasar sedang dalam fase ekspansi cepat. Namun, ini juga mengindikasikan potensi saturasi di area tertentu dalam 24-36 bulan ke depan jika tren ini berlanjut tanpa diversifikasi geografis."
                initialRecommendation="Saat merencanakan ekspansi, buatlah model keuangan dengan skenario konservatif yang memperhitungkan penurunan okupansi sebesar 15-20% setelah 24 bulan untuk mengantisipasi peningkatan persaingan lokal."
                topic="Proyeksi Pertumbuhan Pasar Padel di Indonesia"
            />
            <div className="grid md:grid-cols-2 gap-8">
                <div>
                   <h3 className="text-xl font-semibold text-center mb-4 text-slate-900 dark:text-white">Pertumbuhan Lapangan Kumulatif</h3>
                    <ChartContainer>
                        <BarChart data={indonesianCourtGrowthData}>
                            <CartesianGrid strokeDasharray="3 3" stroke={gridStrokeColor} />
                            <XAxis dataKey="year" stroke={axisStrokeColor}/>
                            <YAxis stroke={axisStrokeColor}/>
                            <Tooltip content={<CustomTooltip />} />
                            <Bar dataKey="courts" name="Total Lapangan" fill="#06b6d4" />
                        </BarChart>
                    </ChartContainer>
                </div>
                <div>
                   <h3 className="text-xl font-semibold text-center mb-4 text-slate-900 dark:text-white">Proyeksi Pertumbuhan Lapangan (Area Kunci)</h3>
                    <ChartContainer>
                        <BarChart data={projectedCourtGrowthData}>
                            <CartesianGrid strokeDasharray="3 3" stroke={gridStrokeColor} />
                            <XAxis dataKey="area" stroke={axisStrokeColor}/>
                            <YAxis stroke={axisStrokeColor}/>
                            <Tooltip content={<CustomTooltip />} />
                            <Legend />
                            <Bar dataKey="current" name="Saat Ini" fill="#22d3ee" />
                            <Bar dataKey="projected" name="Proyeksi 2025/26" fill="#06b6d4" />
                        </BarChart>
                    </ChartContainer>
                </div>
            </div>
            <div className="mt-8">
                <h3 className="text-xl font-semibold text-center mb-4 text-slate-900 dark:text-white">Tren Pertumbuhan Lapangan di Indonesia (2022-Sekarang)</h3>
                <ChartContainer>
                    <LineChart data={indonesianCourtGrowthData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke={gridStrokeColor} />
                        <XAxis dataKey="year" stroke={axisStrokeColor} />
                        <YAxis stroke={axisStrokeColor} />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend />
                        <Line type="monotone" dataKey="courts" name="Total Lapangan" stroke="#14b8a6" strokeWidth={3} activeDot={{ r: 8 }} />
                    </LineChart>
                </ChartContainer>
            </div>
        </Section>
    );
});

ProjectionsSection.displayName = 'ProjectionsSection';

export default ProjectionsSection;
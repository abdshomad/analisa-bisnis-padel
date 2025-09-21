import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, Legend } from 'recharts';
import { ChartContainer, CustomTooltip } from '../charts/CustomChartComponents';
import { courtDistributionData, operatorMarketShareData } from '../../data/marketData';
import { useTheme } from '../../contexts/ThemeContext';

const PIE_COLORS = ['#06b6d4', '#22d3ee', '#67e8f9', '#a5f3fc', '#cffafe'];

export const DistributionCharts: React.FC = () => {
    const { theme } = useTheme();
    const axisStrokeColor = theme === 'dark' ? '#94a3b8' : '#475569';
    const gridStrokeColor = theme === 'dark' ? '#334155' : '#e2e8f0';

    return (
        <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
                <h3 className="text-xl font-semibold text-center mb-4 text-slate-900 dark:text-white">Distribusi Lapangan per Provinsi</h3>
                <ChartContainer>
                    <BarChart data={courtDistributionData} layout="vertical" margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke={gridStrokeColor} />
                        <XAxis type="number" stroke={axisStrokeColor} />
                        <YAxis type="category" dataKey="name" stroke={axisStrokeColor} width={80} />
                        <Tooltip content={<CustomTooltip />} />
                        <Bar dataKey="courts" fill="#06b6d4" name="Jumlah Lapangan" />
                    </BarChart>
                </ChartContainer>
            </div>
            <div>
                <h3 className="text-xl font-semibold text-center mb-4 text-slate-900 dark:text-white">Pangsa Pasar Operator</h3>
                <ChartContainer>
                    <PieChart>
                        <Pie data={operatorMarketShareData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#8884d8" paddingAngle={5}>
                            {operatorMarketShareData.map((_, index) => <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />)}
                        </Pie>
                        <Tooltip content={<CustomTooltip />} />
                        <Legend />
                    </PieChart>
                </ChartContainer>
            </div>
        </div>
    );
};

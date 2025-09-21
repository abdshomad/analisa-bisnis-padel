import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { ChartContainer, CustomTooltip } from '../../charts/CustomChartComponents';
import { useTheme } from '../../../contexts/ThemeContext';

interface ProjectionData {
    month: string;
    "Pendapatan Bulanan": number;
    "Akumulasi Tahunan": number;
}

interface RevenueProjectionChartProps {
    data: ProjectionData[];
}

const formatCurrencyForAxis = (value: number) => {
    if (value >= 1_000_000_000) return `${(value / 1_000_000_000).toFixed(1)} M`;
    if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(0)} Jt`;
    if (value >= 1_000) return `${(value / 1_000).toFixed(0)} rb`;
    // FIX: Changed to value.toString() to ensure the function always returns a string as required by the tickFormatter prop.
    return value.toString();
};


export const RevenueProjectionChart: React.FC<RevenueProjectionChartProps> = ({ data }) => {
    const { theme } = useTheme();
    const axisStrokeColor = theme === 'dark' ? '#94a3b8' : '#475569';
    const gridStrokeColor = theme === 'dark' ? '#334155' : '#e2e8f0';

    const tooltipFormatter = (value: number, name: string) => {
        const formattedValue = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(value);
        return [formattedValue, name];
    };

    return (
        <div className="mt-6 sm:col-span-2">
            <h4 className="text-center font-semibold text-slate-700 dark:text-slate-300 mb-4">Grafik Proyeksi Pendapatan (12 Bulan)</h4>
            <ChartContainer>
                 <LineChart data={data} margin={{ top: 5, right: 20, left: 15, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke={gridStrokeColor} />
                    <XAxis dataKey="month" stroke={axisStrokeColor} />
                    <YAxis stroke={axisStrokeColor} tickFormatter={formatCurrencyForAxis} />
                    <Tooltip content={<CustomTooltip />} formatter={tooltipFormatter} />
                    <Legend />
                    <Line type="monotone" dataKey="Pendapatan Bulanan" stroke="#22d3ee" strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="Akumulasi Tahunan" stroke="#14b8a6" strokeWidth={3} activeDot={{ r: 8 }} />
                </LineChart>
            </ChartContainer>
        </div>
    );
};
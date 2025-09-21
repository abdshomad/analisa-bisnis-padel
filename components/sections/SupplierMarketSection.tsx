import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import Section from '../Section';
import { ChartContainer, CustomTooltip } from '../charts/CustomChartComponents';
import { supplierMarketShareData, productCategoryShareData, racketPriceSegmentData } from '../../data/supplierData';
import AIInsight from '../ui/AIInsight';
import { useTheme } from '../../contexts/ThemeContext';
import { TrendingUp } from 'lucide-react';

const PIE_COLORS = ['#06b6d4', '#22d3ee', '#67e8f9', '#a5f3fc', '#cffafe'];

const SupplierMarketSection = React.forwardRef<HTMLElement>((props, ref) => {
    const { theme } = useTheme();
    const axisStrokeColor = theme === 'dark' ? '#94a3b8' : '#475569';
    const gridStrokeColor = theme === 'dark' ? '#334155' : '#e2e8f0';

    return (
        <Section ref={ref} id="supplierMarket" title="Analisis Pasar Pemasok Peralatan">
            <AIInsight 
                initialInsight="Dominasi merek-merek besar seperti Bullpadel menunjukkan bahwa kepercayaan dan reputasi merek sangat penting. Namun, pertumbuhan segmen 'Mid-Range' membuka peluang bagi merek-merek baru yang dapat menawarkan kualitas baik dengan harga yang kompetitif."
                initialRecommendation="Untuk klub baru, pertimbangkan untuk menjalin kemitraan ritel dengan distributor 2-3 merek teratas. Tawarkan paket 'starter kit' (raket, bola, tas) dari segmen entry-level dan mid-range untuk memudahkan pemain baru memulai."
                topic="Pasar Pemasok Peralatan Padel di Indonesia"
            />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1">
                    <h3 className="text-xl font-semibold text-center mb-4 text-slate-900 dark:text-white">Pangsa Pasar Merek</h3>
                    <ChartContainer>
                        <PieChart>
                            <Pie data={supplierMarketShareData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80}>
                                {supplierMarketShareData.map((entry, index) => <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />)}
                            </Pie>
                            <Tooltip content={<CustomTooltip />} />
                            <Legend />
                        </PieChart>
                    </ChartContainer>
                </div>
                <div className="lg:col-span-1">
                    <h3 className="text-xl font-semibold text-center mb-4 text-slate-900 dark:text-white">Penjualan per Kategori Produk (%)</h3>
                    <ChartContainer>
                        <BarChart data={productCategoryShareData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke={gridStrokeColor} />
                            <XAxis dataKey="name" stroke={axisStrokeColor} />
                            <YAxis stroke={axisStrokeColor} unit="%" />
                            <Tooltip content={<CustomTooltip />} />
                            <Bar dataKey="value" name="Pangsa Penjualan" fill="#06b6d4" />
                        </BarChart>
                    </ChartContainer>
                </div>
                <div className="lg:col-span-1">
                    <h3 className="text-xl font-semibold text-center mb-4 text-slate-900 dark:text-white">Segmen Harga Raket (%)</h3>
                    <ChartContainer>
                        <PieChart>
                            <Pie data={racketPriceSegmentData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80}>
                                {racketPriceSegmentData.map((entry, index) => <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />)}
                            </Pie>
                            <Tooltip content={<CustomTooltip />} />
                            <Legend />
                        </PieChart>
                    </ChartContainer>
                </div>
            </div>

            <div className="mt-12 bg-white dark:bg-brand-light-dark p-6 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold text-center mb-6 text-slate-900 dark:text-white flex items-center justify-center">
                    <TrendingUp className="h-7 w-7 mr-3 text-brand-cyan" /> Analisis Tren Produk Terkini
                </h3>
                <div className="grid md:grid-cols-2 gap-8 text-slate-700 dark:text-brand-text">
                    <div>
                        <h4 className="font-bold text-lg text-brand-cyan mb-3">Tren Raket Padel</h4>
                        <ul className="space-y-2 list-disc list-inside text-sm">
                            <li>
                                <strong className="font-semibold text-slate-800 dark:text-white">Bentuk Hibrida (Hybrid):</strong> Banyak pemain, terutama di tingkat menengah, mencari raket berbentuk 'air mata' (tear-drop) yang menawarkan keseimbangan antara kekuatan (power) dan kontrol, membuatnya sangat serbaguna.
                            </li>
                            <li>
                                <strong className="font-semibold text-slate-800 dark:text-white">Permukaan Bertekstur (Rough Surface):</strong> Permukaan raket yang kasar atau bertekstur 3D menjadi standar untuk membantu pemain menghasilkan lebih banyak spin pada bola, terutama untuk pukulan 'bandeja' dan 'vibora'.
                            </li>
                            <li>
                                <strong className="font-semibold text-slate-800 dark:text-white">Bobot Lebih Ringan:</strong> Merek merilis lebih banyak model dengan bobot yang lebih ringan (di bawah 360g) untuk menarik pemain wanita dan mereka yang rentan cedera, meningkatkan manuverabilitas dan kecepatan ayunan.
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-lg text-brand-cyan mb-3">Tren Sepatu & Aksesori</h4>
                         <ul className="space-y-2 list-disc list-inside text-sm">
                            <li>
                                <strong className="font-semibold text-slate-800 dark:text-white">Sol Herringbone (Pola Tulang Ikan):</strong> Karena sebagian besar lapangan di Indonesia menggunakan pasir, sepatu dengan sol 'clay' atau herringbone menjadi sangat populer karena memberikan cengkeraman (grip) optimal dan memungkinkan pergerakan geser (sliding) yang terkontrol.
                            </li>
                             <li>
                                <strong className="font-semibold text-slate-800 dark:text-white">Fokus pada Stabilitas Lateral:</strong> Merek sepatu terkemuka menekankan teknologi yang mendukung pergerakan sisi-ke-sisi yang cepat dan eksplosif, yang merupakan ciri khas permainan padel.
                            </li>
                             <li>
                                <strong className="font-semibold text-slate-800 dark:text-white">Warna Cerah & Mencolok:</strong> Sejalan dengan sifat sosial dan energik dari padel, sepatu dan pakaian dengan warna-warna neon dan desain yang berani sangat diminati, terutama di kalangan pemain muda.
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

             <p className="text-center text-xs text-slate-500 dark:text-brand-text-muted mt-8 max-w-4xl mx-auto">
                *Data pangsa pasar dan tren produk merupakan estimasi berdasarkan analisis tren pasar dan ketersediaan produk di platform e-commerce dan toko-toko olahraga di Indonesia.
            </p>
        </Section>
    );
});

SupplierMarketSection.displayName = 'SupplierMarketSection';

export default SupplierMarketSection;
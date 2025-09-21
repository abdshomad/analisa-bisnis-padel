import React, { useState } from 'react';
import { Treemap } from 'recharts';
import Section from '../Section';
import { ChartContainer } from '../charts/CustomChartComponents';
import { investmentFocusData } from '../../data/marketData';
import AccordionItem from '../ui/AccordionItem';
import { CustomizedTreemapContent } from '../ui/CustomizedTreemapContent';
import { useTheme } from '../../contexts/ThemeContext';
import AIInsight from '../ui/AIInsight';

const PIE_COLORS = ['#06b6d4', '#22d3ee', '#67e8f9', '#a5f3fc', '#cffafe'];

const InvestmentSection = React.forwardRef<HTMLElement>((props, ref) => {
    const { theme } = useTheme();
    const treemapTextColor = theme === 'dark' ? '#fff' : '#1e293b';
    const [openAccordion, setOpenAccordion] = useState<string | null>(null);

    return (
        <Section ref={ref} id="investment" title="Investasi & Peluang Tambahan">
            <AIInsight 
                initialInsight="Model bisnis 'Bayar per Sesi' sangat penting untuk akuisisi pelanggan baru, tetapi profitabilitas jangka panjang akan sangat bergantung pada konversi pemain biasa menjadi pelanggan 'Langganan'. Tawarkan paket uji coba langganan selama satu bulan dengan diskon untuk mendorong konversi ini."
                initialRecommendation="Implementasikan program 'Uji Coba Keanggotaan' selama satu bulan dengan diskon 50%. Setelah bulan pertama, tawarkan bonus (misalnya, satu sesi gratis untuk teman) jika mereka melanjutkan ke langganan penuh untuk meningkatkan tingkat konversi."
                topic="Strategi Investasi dan Peluang Pendapatan Tambahan di Padel"
            />
             <div className="grid lg:grid-cols-2 gap-8 mb-8">
                 <div>
                   <h3 className="text-xl font-semibold text-center mb-4 text-slate-900 dark:text-white">Fokus Investasi yang Direkomendasikan</h3>
                     <ChartContainer>
                        <Treemap
                            data={investmentFocusData.children}
                            dataKey="size"
                            aspectRatio={4/3}
                            stroke="#fff"
                            fill={theme === 'dark' ? '#0f172a' : '#f8fafc'}
                            content={<CustomizedTreemapContent colors={PIE_COLORS} textColor={treemapTextColor} />}
                        />
                    </ChartContainer>
                </div>
                <div className="bg-white dark:bg-brand-light-dark p-6 rounded-lg shadow-lg">
                    <h3 className="text-xl font-semibold text-center mb-4 text-slate-900 dark:text-white">Model Bisnis Tambahan</h3>
                    <AccordionItem title="Peluang Fisik" isOpen={openAccordion === 'physical'} onClick={() => setOpenAccordion(openAccordion === 'physical' ? null : 'physical')}>
                        <p className="text-slate-600 dark:text-brand-text-muted">Stan promosi di klub, kemitraan fotografi untuk turnamen, dan penawaran cetakan atau album foto bermerek.</p>
                    </AccordionItem>
                     <AccordionItem title="Peluang Digital" isOpen={openAccordion === 'digital'} onClick={() => setOpenAccordion(openAccordion === 'digital' ? null : 'digital')}>
                        <p className="text-slate-600 dark:text-brand-text-muted">Tingkat langganan untuk analisis performa berbasis AI (misalnya, analisis pukulan), integrasi dengan sistem pemesanan klub, dan pembuatan papan peringkat sosial online berdasarkan sorotan foto.</p>
                    </AccordionItem>
                </div>
             </div>

            <div className="overflow-x-auto bg-white dark:bg-brand-light-dark p-4 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold text-center mb-4 text-slate-900 dark:text-white">Tingkatan Layanan & Harga (Contoh)</h3>
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-600">
                    <th className="p-3 text-brand-cyan">Tingkat</th>
                    <th className="p-3 text-slate-900 dark:text-white">Target Audiens</th>
                    <th className="p-3 text-slate-900 dark:text-white">Model Harga</th>
                    <th className="p-3 text-slate-900 dark:text-white">Fitur Utama</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-slate-200 dark:border-slate-700">
                    <td className="p-3 font-semibold">Bayar per Sesi</td>
                    <td className="p-3">Pemain Santai / Pemula</td>
                    <td className="p-3">Rp 75rb - 150rb / sesi</td>
                    <td className="p-3">10-15 foto pilihan AI, akses galeri web.</td>
                  </tr>
                   <tr className="border-b border-slate-200 dark:border-slate-700">
                    <td className="p-3 font-semibold">Langganan Pemain Sosial</td>
                    <td className="p-3">Pemain rekreasi reguler</td>
                    <td className="p-3">Rp 300rb - 450rb / bulan</td>
                    <td className="p-3">Sesi tak terbatas, 50 foto/bulan, alat berbagi ke media sosial.</td>
                  </tr>
                   <tr>
                    <td className="p-3 font-semibold">Paket Pro / Klub</td>
                    <td className="p-3">Klub & Pemain Kompetitif</td>
                    <td className="p-3">Hubungi untuk Penawaran</td>
                    <td className="p-3">Semua fitur, sorotan video, analisis performa, branding klub.</td>
                  </tr>
                </tbody>
              </table>
            </div>
        </Section>
    );
});

InvestmentSection.displayName = 'InvestmentSection';

export default InvestmentSection;
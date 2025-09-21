import React from 'react';
import Section from '../Section';
import { investmentData } from '../../data/investmentData';
import RABTable from '../ui/RABTable';
import { InvestmentTierCard } from '../investment/InvestmentTierCard';
import { ROICalculator } from '../investment/ROICalculator';
import AIInsight from '../ui/AIInsight';

const InvestmentDetailsSection = React.forwardRef<HTMLElement>((props, ref) => {
    return (
        <Section ref={ref} id="investmentDetails" title="Estimasi Rincian Investasi (per Lapangan)">
             <AIInsight 
                initialInsight="Banyak investor terlalu fokus pada CAPEX (biaya konstruksi) dan meremehkan OPEX (operasional bulanan). Biaya listrik, terutama untuk lapangan indoor ber-AC, bisa menjadi komponen OPEX terbesar. Kalkulator ROI harus memperhitungkan ini secara akurat untuk proyeksi yang realistis."
                initialRecommendation="Saat menyusun RAB, alokasikan dana kontingensi sebesar 15% dari total OPEX tahunan. Selain itu, mintalah penawaran untuk panel surya sebagai bagian dari investasi awal (CAPEX) untuk mengurangi biaya listrik jangka panjang pada fasilitas indoor."
                topic="Rincian Investasi, Biaya Konstruksi, dan Proyeksi ROI untuk Lapangan Padel"
            />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
                {investmentData.map((tier) => (
                    <InvestmentTierCard key={tier.id} tier={tier} />
                ))}
            </div>

            <RABTable />
            
            <p className="text-center text-xs text-slate-500 dark:text-brand-text-muted mt-8 max-w-4xl mx-auto">
                *Catatan: Angka merupakan estimasi dan dapat bervariasi tergantung lokasi, kualitas, dan vendor. Proyeksi ROI bersifat hipotetis dan tidak termasuk pajak.
            </p>
            
            <div className="no-print">
                <ROICalculator />
            </div>

            <div className="no-print mt-12 bg-white dark:bg-brand-light-dark p-6 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold text-center mb-6 text-slate-900 dark:text-white">
                    Video Referensi & Analisis
                </h3>
                <div className="relative h-0 pb-[56.25%]">
                    <iframe
                        className="absolute top-0 left-0 w-full h-full rounded-lg"
                        src="https://www.youtube.com/embed/playlist?list=PL9ado8JXMRDWvvpX0BOgdAdR0xVdVI8La"
                        title="Referensi Bisnis Padel"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen>
                    </iframe>
                </div>
            </div>
        </Section>
    );
});

InvestmentDetailsSection.displayName = 'InvestmentDetailsSection';

export default InvestmentDetailsSection;
import React from 'react';
import Section from '../Section';
import { AudienceProfile } from '../strategy/AudienceProfile';
import { MarketingStrategy } from '../strategy/MarketingStrategy';
import AIInsight from '../ui/AIInsight';

const StrategyDashboardSection = React.forwardRef<HTMLElement>((props, ref) => {
    return (
        <Section ref={ref} id="strategyDashboard" title="Audience & Go-to-Market Strategy">
            <AIInsight 
                initialInsight="Kunci untuk menargetkan persona 'Kreator Konten' adalah kemitraan dengan 'micro-influencers' lokal (5k-50k pengikut) daripada selebriti besar. Keaslian dan keterlibatan mereka yang tinggi akan menghasilkan ROI pemasaran yang lebih baik untuk layanan berbasis visual seperti foto AI."
                initialRecommendation="Buat program 'Duta Padel Klub' dan rekrut 5-10 micro-influencer lokal. Berikan mereka akses bermain gratis dengan imbalan membuat sejumlah konten (misalnya, 4 Instagram Reels, 8 Instagram Stories) setiap bulan."
                topic="Persona Audiens dan Strategi Pemasaran untuk Padel"
            />
            <div className="grid lg:grid-cols-2 gap-8 items-start">
                <AudienceProfile />
                <MarketingStrategy />
            </div>
        </Section>
    );
});

StrategyDashboardSection.displayName = 'StrategyDashboardSection';

export default StrategyDashboardSection;
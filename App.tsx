import React, { useRef } from 'react';

import NavBar from './components/NavBar';
import Header from './components/Header';
import AIChat from './components/AIChat';
import ScreenReaderControl from './components/ui/ScreenReaderControl';

// Import newly created section components
import KeyStatsSection from './components/sections/KeyStatsSection';
import AIPlannerSection from './components/sections/AIPlannerSection';
import MarketContextSection from './components/sections/MarketContextSection';
import DistributionSection from './components/sections/DistributionSection';
import ProjectionsSection from './components/sections/ProjectionsSection';
import OpportunitySection from './components/sections/OpportunitySection';
import RisksSection from './components/sections/RisksSection';
import StrategySection from './components/sections/StrategySection';
import InvestmentSection from './components/sections/InvestmentSection';
import StrategyDashboardSection from './components/sections/StrategyDashboardSection';
import AncillaryBusinessModelSection from './components/sections/AncillaryBusinessModelSection';
import InvestmentDetailsSection from './components/sections/InvestmentDetailsSection';
import SupplierMarketSection from './components/sections/SupplierMarketSection';
import FAQSection from './components/sections/FAQSection';

const App: React.FC = () => {
    // Refs for navigation are kept in the parent component
    const sectionRefs = {
        stats: useRef<HTMLElement>(null),
        planner: useRef<HTMLElement>(null),
        context: useRef<HTMLElement>(null),
        distribution: useRef<HTMLElement>(null),
        projections: useRef<HTMLElement>(null),
        opportunity: useRef<HTMLElement>(null),
        risks: useRef<HTMLElement>(null),
        strategy: useRef<HTMLElement>(null),
        strategyDashboard: useRef<HTMLElement>(null),
        investment: useRef<HTMLElement>(null),
        ancillary: useRef<HTMLElement>(null),
        investmentDetails: useRef<HTMLElement>(null),
        supplierMarket: useRef<HTMLElement>(null),
        faq: useRef<HTMLElement>(null),
    };

    return (
        <div className="bg-slate-50 dark:bg-brand-dark text-slate-800 dark:text-brand-text transition-colors duration-300">
            <NavBar sectionRefs={sectionRefs} />
            <Header />

            <main className="container mx-auto px-4">
                <KeyStatsSection ref={sectionRefs.stats} />
                <AIPlannerSection ref={sectionRefs.planner} />
                <MarketContextSection ref={sectionRefs.context} />
                <DistributionSection ref={sectionRefs.distribution} />
                <ProjectionsSection ref={sectionRefs.projections} />
                <OpportunitySection ref={sectionRefs.opportunity} />
                <RisksSection ref={sectionRefs.risks} />
                <StrategySection ref={sectionRefs.strategy} />
                <StrategyDashboardSection ref={sectionRefs.strategyDashboard} />
                <InvestmentSection ref={sectionRefs.investment} />
                <AncillaryBusinessModelSection ref={sectionRefs.ancillary} />
                <SupplierMarketSection ref={sectionRefs.supplierMarket} />
                <InvestmentDetailsSection ref={sectionRefs.investmentDetails} />
                <FAQSection ref={sectionRefs.faq} />
            </main>

            <footer className="text-center py-8 mt-12 border-t border-slate-200 dark:border-slate-800">
                <p className="text-slate-500 dark:text-brand-text-muted">&copy; 2025 Bisnis Padel. Hak cipta dilindungi undang-undang.</p>
            </footer>
            
            <ScreenReaderControl />
            <AIChat />
        </div>
    );
};

export default App;
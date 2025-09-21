import React from 'react';
import Section from '../Section';
import { useDistributionData } from '../../hooks/useDistributionData';
import { DistributionCharts } from '../distribution/DistributionCharts';
import { InteractiveMap } from '../distribution/InteractiveMap';
import AIInsight from '../ui/AIInsight';

const DistributionSection = React.forwardRef<HTMLElement>((props, ref) => {
    const distributionDataProps = useDistributionData();

    return (
        <Section ref={ref} id="distribution" title="Distribusi Pasar Indonesia">
            <AIInsight 
                initialInsight="Konsentrasi lapangan yang tinggi di Jabodetabek menunjukkan pasar yang matang namun kompetitif. Peluang 'samudra biru' (blue ocean) terbesar saat ini ada di kota-kota besar di luar Jawa seperti Medan, Makassar, dan Balikpapan yang menunjukkan permintaan awal yang kuat."
                initialRecommendation="Untuk pasar Jabodetabek, fokus pada diferensiasi melalui layanan premium (misalnya, pelatih bersertifikat, fasilitas mewah). Untuk kota di luar Jawa, prioritaskan kecepatan masuk pasar dengan model 'Standard Outdoor' yang efisien biaya."
                topic="Distribusi dan Pangsa Pasar Padel di Indonesia"
            />
            <DistributionCharts />
            <InteractiveMap {...distributionDataProps} />
        </Section>
    );
});

DistributionSection.displayName = 'DistributionSection';

export default DistributionSection;
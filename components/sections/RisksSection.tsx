import React from 'react';
import Section from '../Section';
import { competitiveLandscapeData } from '../../data/marketData';
import { ShieldAlert } from 'lucide-react';
import AIInsight from '../ui/AIInsight';

const RisksSection = React.forwardRef<HTMLElement>((props, ref) => {
    return (
        <Section ref={ref} id="risks" title="Lanskap Kompetitif & Risiko">
            <AIInsight 
                initialInsight="Risiko terbesar telah bergeser dari 'apakah padel akan populer?' menjadi 'bagaimana cara bertahan di pasar yang ramai?'. Di kota-kota besar, saturasi pasar mulai menjadi ancaman nyata yang menekan margin keuntungan."
                initialRecommendation="Fokus pada diferensiasi non-harga. Kembangkan program loyalitas yang kuat, tawarkan pelatihan berkualitas tinggi, dan ciptakan pengalaman komunitas yang unik untuk membangun basis pelanggan setia yang tidak mudah beralih hanya karena harga yang lebih murah."
                topic="Risiko dan Lanskap Kompetitif dalam Bisnis Padel"
            />
            <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white dark:bg-brand-light-dark p-6 rounded-lg shadow-lg">
                   <h3 className="text-xl font-semibold text-center mb-4 text-slate-900 dark:text-white">Matriks Teknologi di Lapangan</h3>
                    <div className="relative w-full h-80 border-l-2 border-b-2 border-slate-300 dark:border-slate-600">
                        {/* Axis labels */}
                        <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-slate-500 dark:text-brand-text-muted">Biaya (Rendah → Tinggi)</span>
                        <span className="absolute -left-16 top-1/2 -translate-y-1/2 -rotate-90 text-slate-500 dark:text-brand-text-muted">Otomatisasi (Rendah → Tinggi)</span>
                        {/* Competitors */}
                        {competitiveLandscapeData.map(c => (
                            <div key={c.name} className="absolute group" style={{ top: c.position.top, left: c.position.left }}>
                                <div className="w-4 h-4 bg-brand-cyan rounded-full"></div>
                                <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max bg-slate-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                    {c.name}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
                 <div className="bg-white dark:bg-brand-light-dark p-6 rounded-lg shadow-lg">
                   <h3 className="text-xl font-semibold text-center mb-4 text-slate-900 dark:text-white">Risiko Pasar Utama</h3>
                    <ul className="space-y-4">
                        <li className="flex items-start">
                            <ShieldAlert className="h-6 w-6 text-yellow-400 mr-3 mt-1 flex-shrink-0" />
                            <div>
                                <h4 className="font-bold text-slate-900 dark:text-white">Saturasi Pasar & Perang Harga</h4>
                                <p className="text-slate-600 dark:text-brand-text-muted">Pertumbuhan lapangan yang sangat cepat di area kunci (misalnya, Jabodetabek) dapat menyebabkan persaingan ketat, menekan harga sewa dan margin keuntungan.</p>
                            </div>
                        </li>
                        <li className="flex items-start">
                            <ShieldAlert className="h-6 w-6 text-yellow-400 mr-3 mt-1 flex-shrink-0" />
                            <div>
                                <h4 className="font-bold text-slate-900 dark:text-white">Tantangan Operasional</h4>
                                <p className="text-slate-600 dark:text-brand-text-muted">Kesulitan mencari staf yang berkualitas, biaya perawatan lapangan yang tinggi, dan kenaikan biaya listrik (terutama untuk lapangan indoor) menjadi risiko berkelanjutan.</p>
                            </div>
                        </li>
                         <li className="flex items-start">
                            <ShieldAlert className="h-6 w-6 text-yellow-400 mr-3 mt-1 flex-shrink-0" />
                            <div>
                                <h4 className="font-bold text-slate-900 dark:text-white">Ketergantungan pada Tren</h4>
                                <p className="text-slate-600 dark:text-brand-text-muted">Popularitas padel saat ini sangat tinggi, namun keberlanjutan jangka panjangnya belum teruji. Pergeseran tren olahraga di masa depan dapat memengaruhi permintaan.</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </Section>
    );
});

RisksSection.displayName = 'RisksSection';

export default RisksSection;
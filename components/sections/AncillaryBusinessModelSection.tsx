import React, { useState } from 'react';
import Section from '../Section';
import AccordionItem from '../ui/AccordionItem';
import { ancillaryData } from '../../data/ancillaryData';
import AIInsight from '../ui/AIInsight';

const AncillaryBusinessModelSection = React.forwardRef<HTMLElement>((props, ref) => {
    const [openAccordion, setOpenAccordion] = useState<string | null>(null);

    const handleAccordionClick = (id: string) => {
        setOpenAccordion(openAccordion === id ? null : id);
    };

    return (
        <Section ref={ref} id="ancillary" title="Elaborasi Model Bisnis Tambahan">
            <AIInsight 
                initialInsight="Peluang pendapatan tambahan yang paling sering terlewatkan adalah 'Akademi & Pelatihan'. Membangun program junior yang kuat tidak hanya menciptakan aliran pendapatan yang konsisten tetapi juga membangun basis pelanggan masa depan yang loyal sejak usia dini."
                initialRecommendation="Rekrut satu pelatih kepala bersertifikat dan luncurkan 'Program Junior Akhir Pekan'. Tawarkan sesi uji coba gratis untuk anak-anak di sekitar komunitas untuk membangun minat dan mengisi kelas awal."
                topic="Model Bisnis Tambahan (Ancillary) untuk Klub Padel"
            />
            <div className="bg-white dark:bg-brand-light-dark p-6 rounded-lg shadow-lg">
                <p className="text-center text-slate-600 dark:text-brand-text-muted mb-8 max-w-4xl mx-auto">
                    Rincian model bisnis, kerja sama, harga, dan layanan untuk setiap peluang pendapatan tambahan (ancillary) yang teridentifikasi dalam dasbor Analisis Pasar Padel.
                </p>

                {ancillaryData.map((category) => (
                    <div key={category.id} className="mb-12">
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{category.title}</h3>
                        <p className="text-slate-500 dark:text-brand-text-muted mb-4">{category.description}</p>
                        
                        {category.opportunities.map((opp) => (
                            <AccordionItem
                                key={opp.id}
                                title={opp.title}
                                isOpen={openAccordion === opp.id}
                                onClick={() => handleAccordionClick(opp.id)}
                            >
                                <div className="space-y-6 text-slate-700 dark:text-brand-text">
                                    {opp.description && <p className="italic">{opp.description}</p>}
                                    
                                    <div>
                                        <h4 className="font-semibold text-brand-cyan mb-2">Layanan:</h4>
                                        <ul className="list-disc list-inside space-y-1 pl-2">
                                            {opp.services.map((service, index) => <li key={index}>{service}</li>)}
                                        </ul>
                                    </div>

                                    {opp.menu && (
                                        <div>
                                            <h4 className="font-semibold text-brand-cyan mb-2">Contoh Menu, Target Audiens & Harga:</h4>
                                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                                {opp.menu.map((menuCategory, index) => (
                                                    <div key={index} className="bg-slate-100 dark:bg-brand-dark p-3 rounded-md">
                                                        <p className="font-bold mb-2">{menuCategory.category}</p>
                                                        <ul className="space-y-1 text-sm">
                                                            {menuCategory.items.map(item => (
                                                                <li key={item.name} className="flex justify-between">
                                                                    <span>{item.name}</span>
                                                                    <span className="font-mono">{item.price}</span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    <div>
                                        <h4 className="font-semibold text-brand-cyan mb-3">Bentuk Kerja Sama & Model Bisnis:</h4>
                                        <div className="space-y-4">
                                            {opp.businessModels.map((model, index) => (
                                                <div key={index} className="border-l-4 border-brand-cyan/50 pl-4 py-2 bg-slate-100 dark:bg-brand-dark/50 rounded-r-md">
                                                    <h5 className="font-bold text-slate-900 dark:text-white">{model.title}</h5>
                                                    <p><strong className="font-medium text-slate-600 dark:text-slate-300">Model:</strong> {model.model}</p>
                                                    {model.price && <p><strong className="font-medium text-slate-600 dark:text-slate-300">Harga:</strong> {model.price}</p>}
                                                    {model.pros && <p><strong className="font-medium text-slate-600 dark:text-slate-300">Kelebihan:</strong> {model.pros}</p>}
                                                    {model.cons && <p><strong className="font-medium text-slate-600 dark:text-slate-300">Kekurangan:</strong> {model.cons}</p>}
                                                    {model.details && Object.entries(model.details).map(([key, value]) => (
                                                        <p key={key}><strong className="font-medium text-slate-600 dark:text-slate-300">{key}:</strong> {value}</p>
                                                    ))}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </AccordionItem>
                        ))}
                    </div>
                ))}
            </div>
        </Section>
    );
});

AncillaryBusinessModelSection.displayName = 'AncillaryBusinessModelSection';

export default AncillaryBusinessModelSection;
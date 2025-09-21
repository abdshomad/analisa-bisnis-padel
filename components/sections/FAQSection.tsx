import React, { useState } from 'react';
import Section from '../Section';
import AccordionItem from '../ui/AccordionItem';
import type { FAQItem } from '../../types';
import AIInsight from '../ui/AIInsight';

const staticFaqs: FAQItem[] = [
    { question: "Berapa perkiraan biaya untuk membangun satu lapangan padel?", answer: "Estimasi biaya bervariasi, namun umumnya berkisar antara Rp 600 Juta hingga Rp 1.5 Miliar per lapangan, tergantung pada kualitas material (outdoor vs. indoor), biaya sewa lahan, dan fasilitas pendukung. Contoh RAB dari berbagai kontraktor juga tersedia di bagian 'Rincian Investasi'." },
    { question: "Apakah bisnis padel di Indonesia menguntungkan?", answer: "Dengan pertumbuhan popularitas yang pesat, potensi keuntungannya sangat menjanjikan. Dengan okupansi yang baik, payback period bisa dicapai dalam waktu kurang dari 2 tahun, terutama di lokasi-lokasi strategis. Gunakan kalkulator ROI interaktif di atas untuk membuat simulasi." },
    { question: "Apa saja tren utama di pasar padel saat ini?", answer: "Tren utama meliputi permintaan yang tinggi di kota-kota besar, pertumbuhan komunitas pemain yang solid, dan peningkatan minat pada turnamen. Selain itu, ada peluang besar dalam bisnis tambahan seperti F&B, toko perlengkapan, dan layanan pelatihan." },
    { question: "Apa tantangan terbesar bagi operator baru?", answer: "Tantangan utama adalah mengamankan lokasi yang strategis dengan harga sewa yang wajar. Selain itu, membangun kesadaran merek dan komunitas yang loyal di tengah persaingan yang mulai ketat juga menjadi kunci sukses." },
    { question: "Mengapa membangun komunitas itu penting?", answer: "Komunitas adalah jantung dari bisnis padel yang sukses. Komunitas yang aktif memastikan okupansi lapangan yang konsisten, menciptakan loyalitas pelanggan, dan menjadi alat pemasaran dari mulut ke mulut yang paling efektif." }
];

const FAQSection = React.forwardRef<HTMLElement>((props, ref) => {
    // Setel item pertama agar terbuka secara default
    const [openAccordion, setOpenAccordion] = useState<string | null>(staticFaqs.length > 0 ? staticFaqs[0].question : null);

    const handleAccordionClick = (question: string) => {
        setOpenAccordion(openAccordion === question ? null : question);
    };

    return (
        <Section ref={ref} id="faq" title="Pertanyaan yang Sering Diajukan (FAQ)">
             <AIInsight 
                initialInsight="Pertanyaan yang paling sering ditanyakan, 'Apakah bisnis ini menguntungkan?', sangat bergantung pada satu faktor yang sering diabaikan: manajemen komunitas. Klub yang paling berhasil secara finansial adalah mereka yang berinvestasi dalam manajer komunitas untuk mengatur permainan reguler, turnamen, dan acara sosial."
                initialRecommendation="Anggarkan posisi 'Manajer Komunitas' (bisa paruh waktu) sejak awal dalam rencana OPEX Anda. Tugas utama mereka adalah mengorganisir 'social play' mingguan dan turnamen bulanan untuk memastikan lapangan terisi dan pemain kembali."
                topic="Pertanyaan Umum tentang Bisnis Padel di Indonesia"
            />
            <p className="text-center text-slate-600 dark:text-brand-text-muted mb-8 max-w-3xl mx-auto">
                Jawaban untuk pertanyaan umum seputar investasi, operasional, dan tren pasar Padel di Indonesia.
            </p>
            <div className="bg-white dark:bg-brand-light-dark p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
                {staticFaqs.map((faq, index) => (
                    <AccordionItem
                        key={index}
                        title={faq.question}
                        isOpen={openAccordion === faq.question}
                        onClick={() => handleAccordionClick(faq.question)}
                    >
                        <p className="text-slate-600 dark:text-brand-text-muted leading-relaxed">
                            {faq.answer}
                        </p>
                    </AccordionItem>
                ))}
            </div>
        </Section>
    );
});

FAQSection.displayName = 'FAQSection';

export default FAQSection;
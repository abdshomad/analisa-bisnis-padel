import React from 'react';
import { Megaphone, Users, Camera, Gift } from 'lucide-react';

const StrategyItem = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
    <div className="flex items-start">
        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-brand-cyan/10 flex items-center justify-center mr-4">
            {icon}
        </div>
        <div>
            <h4 className="font-bold text-lg text-slate-900 dark:text-white">{title}</h4>
            <p className="text-sm text-slate-600 dark:text-brand-text-muted">{description}</p>
        </div>
    </div>
);

export const MarketingStrategy: React.FC = () => (
    <div className="bg-white dark:bg-brand-light-dark p-6 rounded-lg shadow-lg">
        <h3 className="text-2xl font-bold text-center mb-6 text-slate-900 dark:text-white">Go-to-Market Strategy</h3>
        <div className="space-y-6">
            <StrategyItem
                icon={<Megaphone className="h-6 w-6 text-brand-cyan" />}
                title="Peluncuran & Kesadaran Awal"
                description="Bermitra dengan klub padel yang sudah ada untuk uji coba beta. Tawarkan layanan gratis atau diskon besar kepada pemain berpengaruh (influencers) dengan imbalan promosi di media sosial. Adakan acara peluncuran dengan demonstrasi langsung."
            />
            <StrategyItem
                icon={<Users className="h-6 w-6 text-brand-cyan" />}
                title="Akuisisi & Keterlibatan Pengguna"
                description="Tawarkan paket 'sesi pertama gratis' untuk menarik pengguna baru. Kembangkan program rujukan (referral) di mana pengguna yang ada mendapatkan diskon dengan mengajak teman. Adakan kompetisi foto mingguan dengan hadiah menarik."
            />
            <StrategyItem
                icon={<Camera className="h-6 w-6 text-brand-cyan" />}
                title="Pemasaran Berbasis Konten"
                description="Buat konten menarik di Instagram dan TikTok yang menampilkan foto-foto aksi terbaik yang dihasilkan AI. Bagikan tips dan trik padel, wawancara pemain, dan sorotan dari acara komunitas. Gunakan tagar yang relevan untuk meningkatkan jangkauan."
            />
            <StrategyItem
                icon={<Gift className="h-6 w-6 text-brand-cyan" />}
                title="Retensi & Loyalitas"
                description="Tawarkan model langganan bulanan untuk pemain reguler dengan harga yang lebih terjangkau. Kembangkan fitur premium seperti analisis video singkat atau statistik pemain berdasarkan foto, untuk meningkatkan nilai bagi pelanggan setia."
            />
        </div>
    </div>
);

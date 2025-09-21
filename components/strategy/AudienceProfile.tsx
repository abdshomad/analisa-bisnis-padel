import React from 'react';
import { Users, Wifi, Edit } from 'lucide-react';

const ProfileCard = ({ icon, title, description, tags }: { icon: React.ReactNode, title: string, description: string, tags: string[] }) => (
    <div className="bg-slate-100 dark:bg-brand-dark p-6 rounded-lg shadow-md h-full">
        <div className="flex items-center mb-3">
            {icon}
            <h4 className="ml-3 font-bold text-xl text-slate-900 dark:text-white">{title}</h4>
        </div>
        <p className="text-slate-600 dark:text-brand-text-muted text-sm mb-4">{description}</p>
        <div className="flex flex-wrap gap-2">
            {tags.map(tag => (
                <span key={tag} className="text-xs font-semibold bg-brand-cyan/10 text-brand-cyan px-2 py-1 rounded-full">{tag}</span>
            ))}
        </div>
    </div>
);

export const AudienceProfile: React.FC = () => (
    <div className="bg-white dark:bg-brand-light-dark p-6 rounded-lg shadow-lg">
        <h3 className="text-2xl font-bold text-center mb-6 text-slate-900 dark:text-white">Persona Target Audiens</h3>
        <div className="grid md:grid-cols-1 gap-6">
            <ProfileCard
                icon={<Users className="h-8 w-8 text-brand-cyan" />}
                title="Pemain & Penggemar Padel"
                description="Profesional urban, eksekutif, dan ekspatriat usia 25-45. Aktif secara sosial, melek teknologi, dan menghargai pengalaman baru. Mereka mencari konten visual berkualitas tinggi dari permainan mereka untuk dibagikan dan dianalisis."
                tags={["Kompetitif", "Sosial", "Berpenghasilan Menengah ke Atas", "Pecinta Olahraga"]}
            />
            <ProfileCard
                icon={<Wifi className="h-8 w-8 text-brand-cyan" />}
                title="Kreator Konten Media Sosial"
                description="Milenial & Gen Z usia 18-35. Mereka adalah pembuat konten proaktif yang sangat menghargai estetika, inovasi, dan personalisasi untuk memperkaya profil media sosial mereka. Foto berkualitas adalah mata uang sosial bagi mereka."
                tags={["Gen Z & Milenial", "Visual", "Trend-Setter", "Aktif di Instagram & TikTok"]}
            />
             <ProfileCard
                icon={<Edit className="h-8 w-8 text-brand-cyan" />}
                title="Keluarga & Pemain Rekreasi"
                description="Keluarga dengan anak-anak dan kelompok teman yang mencari aktivitas akhir pekan yang menyenangkan. Mereka kurang kompetitif dan lebih fokus pada pengalaman dan kenangan. Kemudahan dan hasil instan adalah kunci bagi segmen ini."
                tags={["Keluarga", "Rekreasi", "Aktivitas Grup", "Mencari Kenangan"]}
            />
        </div>
    </div>
);

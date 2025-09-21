import type { AncillaryCategory } from '../../types';

export const digitalOpportunities: AncillaryCategory = {
    id: 'digital',
    title: 'Bagian 2: Peluang Bisnis Digital & Teknologi',
    description: 'Peluang ini memanfaatkan teknologi untuk meningkatkan efisiensi operasional klub dan menjangkau audiens yang lebih luas.',
    opportunities: [
        {
            id: 'aggregator',
            title: '2.1. Website Agregator & Platform Booking',
            services: ['Sebuah platform terpusat (website atau aplikasi) tempat pemain dapat menemukan, membandingkan, dan memesan lapangan padel di berbagai lokasi. Mirip dengan Traveloka untuk hotel, tetapi khusus untuk padel.'],
            businessModels: [
                {
                    title: 'Komisi per Transaksi',
                    model: 'Platform mengambil persentase (misalnya, 5-10%) dari setiap pemesanan yang berhasil dilakukan melalui platform.',
                    details: { 'Harga': 'Komisi 5-10% dari total nilai transaksi.' },
                    pros: 'Model yang adil (bayar sesuai hasil), menarik bagi klub karena tidak ada biaya di muka.',
                },
                {
                    title: 'Biaya Langganan untuk Klub (SaaS Model)',
                    model: 'Klub membayar biaya bulanan atau tahunan untuk terdaftar dan menggunakan fitur-fitur platform (misalnya, manajemen jadwal, promosi).',
                    details: { 'Harga': 'Rp 300.000 - Rp 1.000.000 per bulan per klub, tergantung pada jumlah lapangan dan fitur.' },
                },
                {
                    title: 'Listing Premium/Iklan',
                    model: 'Klub membayar lebih untuk mendapatkan visibilitas yang lebih tinggi di hasil pencarian atau halaman utama.',
                }
            ]
        },
        {
            id: 'visualization',
            title: '2.2. Jasa Visualisasi 3D & Virtual Tour',
            services: ['Menyediakan jasa pembuatan model 3D interaktif dan tur virtual 360 derajat dari fasilitas klub. Aset digital ini dapat disematkan di situs web klub, media sosial, atau Google Maps untuk tujuan pemasaran.'],
            businessModels: [
                {
                    title: 'Biaya per Proyek (Project-Based)',
                    model: 'Kontraktor/agensi dibayar sekali untuk membuat aset digital.',
                    price: 'Sangat bervariasi, mulai dari Rp 5 Juta untuk tur virtual sederhana hingga Rp 25 Juta+ untuk model 3D yang kompleks dari seluruh fasilitas.',
                },
                {
                    title: 'Paket Pemasaran Digital',
                    model: 'Layanan ini dibundel dengan layanan lain seperti manajemen media sosial, SEO, atau pembuatan situs web, dan dijual sebagai paket berlangganan bulanan.',
                }
            ]
        },
        {
            id: 'saas',
            title: '2.3. Sistem Manajemen Klub (Software as a Service - SaaS)',
            services: ['Perangkat lunak khusus untuk membantu pemilik klub mengelola operasi sehari-hari secara efisien. Fitur meliputi: sistem pemesanan online, manajemen keanggotaan, penjadwalan pelatih, pelaporan keuangan, dan alat pemasaran (email/WhatsApp blast).'],
            businessModels: [
                {
                    title: 'Langganan Bulanan/Tahunan (Bertingkat)',
                    model: 'Klub membayar biaya berlangganan berulang untuk menggunakan perangkat lunak.',
                    details: {
                        'Paket Dasar (1-2 Lapangan)': 'Rp 500.000 - Rp 1 Juta / bulan. (Fitur: Kalender booking, manajemen anggota dasar).',
                        'Paket Pro (3-5 Lapangan)': 'Rp 1,5 Juta - Rp 3 Juta / bulan. (Fitur: Laporan lanjutan, integrasi pembayaran, alat pemasaran otomatis).',
                        'Paket Enterprise (Jaringan Klub)': 'Harga kustom. (Fitur: Manajemen multi-lokasi, analitik terpusat).',
                    }
                }
            ]
        }
    ]
};

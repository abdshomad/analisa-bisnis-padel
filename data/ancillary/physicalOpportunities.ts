import type { AncillaryCategory } from '../../types';

export const physicalOpportunities: AncillaryCategory = {
    id: 'physical',
    title: 'Bagian 1: Peluang Bisnis Fisik di Lokasi Klub',
    description: 'Peluang ini berfokus pada peningkatan pengalaman pemain secara langsung di lokasi dan menciptakan sumber pendapatan tambahan di luar sewa lapangan.',
    opportunities: [
      {
        id: 'fb',
        title: '1.1. Makanan & Minuman (F&B)',
        description: 'Menciptakan ruang sosial yang nyaman adalah kunci untuk membangun komunitas dan meningkatkan waktu yang dihabiskan pengunjung di lokasi.',
        services: [
          'Kafe/Jus Bar: Menawarkan kopi, teh, jus sehat, smoothies, dan minuman isotonik.',
          'Makanan Ringan: Menyediakan makanan ringan sehat (protein bar, buah-buahan) dan makanan cepat saji (kentang goreng, roti bakar).',
          'Katering Acara: Menyediakan paket makanan dan minuman untuk acara turnamen atau acara perusahaan.',
        ],
        menu: [
          {
            category: 'Untuk Pemain (Pra/Pasca-Pertandingan)',
            items: [
              { name: 'Minuman Isotonik', price: 'Rp 20rb' },
              { name: 'Protein Shake', price: 'Rp 45rb' },
              { name: 'Air Kelapa', price: 'Rp 25rb' },
              { name: 'Energy Bar', price: 'Rp 30rb' },
              { name: 'Pisang', price: 'Rp 8rb' },
            ],
          },
          {
            category: 'Untuk Keluarga/Penonton',
            items: [
              { name: 'Kopi Latte/Cappuccino', price: 'Rp 35rb' },
              { name: 'Teh Herbal Premium', price: 'Rp 30rb' },
              { name: 'Smoothie Bowl', price: 'Rp 55rb' },
              { name: 'Croissant/Pastry', price: 'Rp 25rb' },
              { name: 'Salad Sayur Segar', price: 'Rp 50rb' },
            ],
          },
          {
            category: 'Untuk Anak-Anak',
            items: [
              { name: 'Kentang Goreng', price: 'Rp 22rb' },
              { name: 'Sosis Bakar', price: 'Rp 20rb' },
              { name: 'Es Krim', price: 'Rp 15rb' },
              { name: 'Jus Buah Kemasan', price: 'Rp 12rb' },
              { name: 'Susu Cokelat', price: 'Rp 15rb' },
            ],
          },
        ],
        businessModels: [
          {
            title: 'Dikelola Sendiri',
            model: 'Klub memiliki dan mengoperasikan F&B sepenuhnya.',
            pros: 'Margin keuntungan 100%, kontrol penuh atas menu dan kualitas.',
            cons: 'Memerlukan investasi awal yang lebih tinggi (peralatan, staf) dan keahlian operasional F&B.',
          },
          {
            title: 'Sewa Ruang (Vendor/Tenant)',
            model: 'Klub menyewakan ruang kosong kepada vendor F&B pihak ketiga.',
            details: { 'Harga Sewa': 'Rp 3 Juta - Rp 10 Juta per bulan, tergantung pada ukuran, lokasi, dan fasilitas.' },
            pros: 'Pendapatan pasif yang stabil, tanpa risiko operasional.',
            cons: 'Kurangnya kontrol atas menu dan kualitas layanan vendor.',
          },
          {
            title: 'Bagi Hasil (Revenue Sharing)',
            model: 'Vendor F&B beroperasi di lokasi klub dengan kesepakatan bagi hasil (misalnya, 15-25% dari pendapatan kotor).',
            pros: 'Investasi awal rendah bagi kedua belah pihak, motivasi bersama untuk meningkatkan penjualan.',
            cons: 'Memerlukan sistem pencatatan penjualan yang transparan dan jujur.',
          },
        ],
      },
      {
        id: 'retail',
        title: '1.2. Toko & Penyewaan Perlengkapan (Retail & Rental)',
        description: 'Menyediakan akses mudah ke perlengkapan adalah layanan esensial, terutama bagi pemain pemula dan mereka yang lupa membawa peralatannya.',
        services: [
            'Penyewaan Perlengkapan: Raket (berbagai level) dan bola baru.',
            'Penjualan di Pro Shop: Menjual raket, bola, sepatu, tas, Pakaian (jersey, celana pendek), dan Aksesori (grip, peredam getar, pelindung).',
            'Layanan Pemasangan Senar (Stringing): Jasa profesional untuk memasang senar raket.',
        ],
        businessModels: [
            {
                title: 'Dikelola Sendiri',
                model: 'Klub mengelola inventaris dan penjualan/penyewaan sendiri.',
                details: {
                    'Harga Sewa': 'Raket: Rp 50.000 - Rp 75.000 per sesi. Bola: Rp 30.000 per tabung.',
                    'Harga Jasa': 'Pemasangan Senar: Rp 80.000 - Rp 150.000 (tergantung senar).',
                    'Strategi Ritel': 'Menetapkan markup 30-50% dari harga grosir.',
                },
                pros: 'Potensi margin keuntungan tertinggi & kontrol penuh atas merek/kualitas produk.',
                cons: 'Membutuhkan modal awal untuk stok barang dan manajemen inventaris yang baik.',
            },
            {
                title: 'Konsinyasi (Consignment)',
                model: 'Merek olahraga (misalnya, Bullpadel, Adidas Padel) menitipkan produk di toko. Klub hanya membayar produk yang terjual dan mendapatkan komisi (20-35%).',
                pros: 'Risiko inventaris sangat rendah, tidak perlu modal awal untuk barang.',
                cons: 'Margin keuntungan lebih rendah & pilihan produk bergantung pada ketersediaan dari mitra konsinyasi.',
            },
            {
                title: 'Kemitraan dengan Toko Olahraga',
                model: 'Bekerja sama dengan toko olahraga lokal sebagai pemasok utama atau operator toko di dalam klub.',
                pros: 'Mengurangi beban manajemen inventaris & memanfaatkan keahlian ritel mitra.',
                cons: 'Memerlukan pembagian keuntungan atau biaya sewa yang mengurangi margin.',
            },
        ]
      },
      {
        id: 'premium',
        title: '1.3. Fasilitas Tambahan Premium',
        description: 'Menawarkan fasilitas premium dapat menjadi pembeda utama dan justifikasi untuk harga sewa lapangan yang lebih tinggi.',
        services: ['Kamar mandi dengan shower air panas, loker pribadi yang aman, penyewaan handuk bersih.'],
        businessModels: [
            {
                title: 'Bundling Keanggotaan',
                model: 'Fasilitas ini gratis untuk anggota premium (yang membayar biaya bulanan/tahunan), meningkatkan nilai keanggotaan.',
            },
            {
                title: 'Pay-Per-Use',
                model: 'Pengguna non-anggota membayar biaya kecil untuk setiap penggunaan.',
                details: { 'Harga Sewa': 'Loker: Rp 15.000 per penggunaan. Handuk: Rp 20.000 per penggunaan.' },
            }
        ]
      },
      {
        id: 'sports',
        title: '1.4. Penawaran Olahraga Pelengkap',
        services: ['Menyediakan studio atau ruang untuk olahraga lain yang menarik bagi demografi target, terutama keluarga yang menunggu. Contoh: Yoga, Pilates, atau kelas kebugaran ringan (Zumba).'],
        businessModels: [
            {
                title: 'Dikelola Sendiri (Sewa Instruktur)',
                model: 'Klub menyediakan ruang dan menyewa instruktur per jam atau per sesi.',
                price: 'Menjual tiket per kelas (drop-in) seharga Rp 100.000 - Rp 150.000 atau paket keanggotaan bulanan (misalnya, Rp 500.000 untuk 4 sesi).',
            },
            {
                title: 'Sewa Ruang Studio',
                model: 'Menyewakan ruang studio kepada instruktur independen atau studio yoga/pilates kecil.',
                details: { 'Harga Sewa': 'Rp 150.000 - Rp 300.000 per jam.' },
            },
            {
                title: 'Bagi Hasil',
                model: 'Klub dan instruktur berbagi pendapatan dari setiap peserta yang mendaftar, biasanya dengan rasio 30/70 (Klub/Instruktur) hingga 50/50.',
            }
        ]
      },
      {
        id: 'academy',
        title: '1.5. Akademi & Pelatihan',
        description: 'Menyediakan pelatihan terstruktur adalah cara terbaik untuk meningkatkan keterampilan pemain, membangun loyalitas, dan menciptakan aliran pendapatan yang konsisten.',
        services: [
            'Sesi Pelatih Privat: Pelatihan satu-lawan-satu untuk pengembangan intensif.',
            'Klinik Grup: Sesi pelatihan untuk kelompok kecil (2-4 orang) berdasarkan tingkat keahlian.',
            'Program Junior: Kelas khusus untuk anak-anak dan remaja.',
        ],
        businessModels: [
            {
                title: 'Pelatih In-House',
                model: 'Klub mempekerjakan pelatih secara penuh waktu atau paruh waktu. Klub mengelola jadwal dan pembayaran.',
                price: 'Sesi Privat: Rp 300.000 - Rp 500.000 / jam. Klinik Grup: Rp 150.000 / orang per sesi.',
                pros: 'Kontrol penuh atas kualitas pengajaran dan standarisasi kurikulum. Margin keuntungan lebih tinggi.',
                cons: 'Beban biaya gaji tetap, risiko jika permintaan rendah.',
            },
            {
                title: 'Pelatih Independen (Bagi Hasil)',
                model: 'Pelatih independen menggunakan fasilitas klub untuk melatih klien mereka. Klub mengambil persentase dari biaya pelatihan.',
                details: { 'Harga': 'Bagi hasil 20-30% untuk klub dari biaya yang dikenakan pelatih.' },
                pros: 'Tidak ada biaya gaji tetap untuk pelatih. Menarik pelatih yang sudah memiliki klien.',
                cons: 'Kualitas pengajaran bisa bervariasi antar pelatih, dan pendapatan tidak stabil.',
            }
        ]
      },
      {
        id: 'events',
        title: '1.6. Manajemen Acara & Turnamen',
        description: 'Mengubah klub menjadi pusat kegiatan komunitas melalui acara yang menarik.',
        services: [
            'Turnamen Internal: Mengadakan kompetisi reguler untuk anggota klub.',
            'Turnamen Terbuka: Menyelenggarakan turnamen yang terbuka untuk umum, seringkali dengan sponsor.',
            'Liga Padel: Membuat liga internal yang berjalan selama beberapa minggu atau bulan.',
        ],
        businessModels: [
            {
                title: 'Biaya Pendaftaran',
                model: 'Peserta membayar biaya untuk mengikuti turnamen atau liga.',
                price: 'Rp 200.000 - Rp 500.000 per tim, tergantung skala acara dan hadiah.',
            },
            {
                title: 'Sponsor',
                model: 'Menjual paket sponsor kepada merek (minuman, olahraga, otomotif) untuk visibilitas selama acara.',
                price: 'Paket mulai dari Rp 5 Juta (logo di banner) hingga Rp 50 Juta+ (sponsor utama).',
                pros: 'Sumber pendapatan besar tanpa membebani pemain.',
            }
        ]
      },
      {
        id: 'corporate',
        title: '1.7. Paket Korporat & Team Building',
        description: 'Menargetkan pasar B2B untuk acara perusahaan, yang seringkali memiliki anggaran lebih besar.',
        services: [
            'Acara Team Building: Paket yang mencakup sewa lapangan, pelatih untuk sesi perkenalan, turnamen mini, dan F&B.',
            'Sewa Venue Eksklusif: Menyewakan seluruh fasilitas untuk acara pribadi perusahaan.',
        ],
        businessModels: [
            {
                title: 'Harga per Paket',
                model: 'Menawarkan paket berjenjang berdasarkan jumlah peserta dan layanan yang termasuk.',
                price: 'Paket "Dasar" (hingga 10 orang, 2 jam main + minuman): Mulai dari Rp 2,5 Juta. Paket "Premium" (20+ orang, 3 jam main, pelatih, katering): Mulai dari Rp 10 Juta.',
                pros: 'Penjualan bernilai tinggi, mengisi slot waktu yang biasanya sepi (misalnya, hari kerja siang hari).',
            }
        ]
      },
    ],
};

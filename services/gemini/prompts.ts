export const getLocationAnalysisPrompt = (): string => `Analyze the attached image. Identify the specific location name (including city and province if possible), and determine its geographical coordinates (latitude and longitude). Respond only in JSON format matching the provided schema. If the location cannot be identified, return null for all fields.`;

export const getReverseGeocodePrompt = (latitude: number, longitude: number): string => (
    `Berdasarkan koordinat berikut - Latitude: ${latitude}, Longitude: ${longitude} - berikan nama lokasi yang paling sesuai dalam format "Nama Tempat/Area, Kota, Provinsi" di Indonesia. Hanya kembalikan nama lokasi sebagai string teks biasa.`
);

export const getBusinessOutlinePrompt = (
    province: string, 
    courtCount: number, 
    city?: string, 
    cityCourtCount?: number, 
    coordinates?: { latitude: number; longitude: number }
): string => {
    const locationString = city ? `${city}, ${province}` : province;
    let courtInfo: string;
    
    let locationDetails = '';
    if (coordinates) {
        locationDetails = `Koordinat presisi untuk lokasi ini adalah Latitude: ${coordinates.latitude}, Longitude: ${coordinates.longitude}.`;
    }

    if (city) {
        courtInfo = cityCourtCount !== undefined && cityCourtCount > 0
            ? `Kota/kabupaten ini sudah memiliki ${cityCourtCount} lapangan padel yang terdata.`
            : "Saat ini belum ada lapangan padel yang terdata di kota/kabupaten ini.";
        courtInfo += ` Provinsi ${province} secara total memiliki ${courtCount} lapangan.`;
    } else {
        courtInfo = courtCount > 0
            ? `Provinsi ini sudah memiliki ${courtCount} lapangan padel yang terdata.`
            : "Saat ini belum ada lapangan padel yang terdata di provinsi ini.";
    }

    return `
        Sebagai seorang analis pasar untuk 'Bisnis Padel', buatlah kerangka (outline) analisis peluang bisnis untuk meluncurkan bisnis di ${locationString}, Indonesia.
        ${courtInfo}
        
        Kerangka harus mencakup bagian-bagian standar berikut:
        - Ringkasan Pasar
        - Analisa Lokasi Presisi
        - Peluang Bisnis Utama
        - Strategi Go-to-Market
        - Tantangan & Risiko
        - Rekomendasi

        Untuk bagian "Analisa Lokasi Presisi", berikan evaluasi mendalam tentang potensi bisnis padel di lokasi tersebut. ${locationDetails} Berdasarkan informasi ini atau data umum, tentukan apakah area tersebut merupakan kawasan perkantoran, perumahan padat, pedesaan (misalnya, sawah), industri, atau komersial. Jelaskan bagaimana karakteristik lingkungan tersebut mempengaruhi potensi keberhasilan bisnis padel (misalnya, aksesibilitas, demografi target, potensi pelanggan).
        
        Tambahkan juga 1-2 bagian dinamis yang relevan dengan kondisi jumlah lapangan di lokasi tersebut. 
        Contoh: Jika belum ada lapangan, tambahkan "Strategi Pionir & Edukasi Pasar". Jika sudah banyak lapangan, tambahkan "Analisis Lanskap Kompetitif".

        Hasilkan output dalam format JSON yang sesuai dengan skema yang diberikan.
    `;
};

export const getFullAnalysisPrompt = (province: string, outline: string[], city?: string): string => {
    const locationString = city ? `${city}, ${province}` : province;
    return `
        Sebagai seorang analis pasar untuk 'Bisnis Padel', kembangkan kerangka berikut menjadi analisis peluang bisnis yang komprehensif untuk ${locationString}, Indonesia.
        Gunakan nada yang profesional dan strategis, dan format output dalam Markdown.
        
        Kerangka Analisis:
        ${outline.map(item => `- ${item}`).join('\n')}

        Elaborasi setiap poin dalam kerangka secara mendalam dan berikan wawasan yang dapat ditindaklanjuti.
        
        **Pastikan untuk menyertakan sub-bagian baru yang mendalam berjudul "Analisis Pengaruh Cuaca dan Strategi Adaptasi".** Dalam sub-bagian ini, analisis bagaimana pola cuaca di ${locationString} (misalnya musim hujan, musim kemarau, panas ekstrem) dapat memengaruhi tren bermain dan pendapatan, terutama untuk lapangan outdoor. Berikan rekomendasi strategi penyesuaian yang konkret, seperti:
        - Model harga dinamis (misalnya, diskon saat jam panas atau cuaca kurang ideal).
        - Peningkatan fasilitas (area teduh, sistem pendingin/kipas angin).
        - Strategi promosi untuk mengatasi cuaca buruk (misalnya, "jaminan main lagi" jika hujan).
        - Pertimbangan investasi jangka panjang untuk atap atau konversi ke lapangan indoor.

        Dasarkan analisis Anda pada pemahaman bahwa pasar padel Indonesia sedang berkembang pesat (369+ lapangan per 2024, pertumbuhan >900% dalam 2 tahun) dan tingkat penerimaan AI yang tinggi (80% sentimen positif).
    `;
};


export const getBusinessPlanPrompt = (analysis: string, templateType: 'narrative' | 'formal', location: string): string => {
    const businessName = `Padel Maju ${location.split(',')[0]}`;
    let templateInstructions = '';

    if (templateType === 'narrative') {
        templateInstructions = `
                Gunakan struktur dan gaya naratif sederhana seperti contoh "We Can Do It Consulting".
                Rencana bisnis harus mencakup bagian-bagian utama berikut, diisi dengan konten yang relevan dari analisis yang diberikan:
                1.  **Ringkasan Eksekutif (Executive Summary):** Rangkuman singkat dari seluruh rencana.
                2.  **Deskripsi Perusahaan (Company Description):** Termasuk Misi, Anggota Utama (contoh), dan Struktur Hukum (misalnya, PT).
                3.  **Riset Pasar (Market Research):** Jelaskan Industri, Pelanggan Target, dan Keunggulan Kompetitif.
                4.  **Lini Layanan (Service Line):** Detailkan layanan yang ditawarkan (sewa lapangan, pelatihan, F&B) dan struktur harga awal.
                5.  **Pemasaran & Penjualan (Marketing & Sales):** Strategi untuk menjangkau pelanggan.
            `;
    } else { // 'formal'
        templateInstructions = `
                Gunakan struktur formal dan terperinci seperti templat SBA.
                Rencana bisnis harus mengikuti kerangka berikut, mengelaborasi setiap poin dengan informasi dari analisis yang diberikan:
                1.  **Ringkasan Eksekutif (Executive Summary):** Ringkasan dari poin-poin utama di bawah ini.
                2.  **Visi/Misi dan Tujuan (Vision/Mission Statement and Goals):** Pernyataan visi, tujuan finansial dan operasional, dan kunci kesuksesan.
                3.  **Ringkasan Perusahaan (Company Summary):** Latar belakang perusahaan, sumber daya yang dibutuhkan (fasilitas, SDM), metode pemasaran, manajemen, dan struktur kepemilikan.
                4.  **Produk dan/atau Layanan (Products and/or Services):** Deskripsi detail layanan yang akan dijual dan keunikannya.
                5.  **Penilaian Pasar (Market Assessment):** Analisis pasar umum, analisis pelanggan, dan analisis industri.
                6.  **Implementasi Strategis (Strategic Implementation):** Strategi produksi/operasional, kebutuhan sumber daya, strategi pemasaran.
                7.  **Rencana Keuangan (Financial Plan):** Proyeksi keuangan awal (berdasarkan data investasi dari analisis), rencana pendanaan, dan rencana kontingensi.
            `;
    }

    return `
        Sebagai konsultan bisnis ahli, buatlah rencana bisnis (business plan) yang komprehensif untuk mendirikan klub padel bernama "${businessName}" di ${location}.
        Gunakan analisis pasar berikut sebagai dasar utama untuk konten rencana bisnis:
        ---
        ANALISIS PASAR:
        ${analysis}
        ---
        
        Instruksi Template dan Struktur:
        ${templateInstructions}

        Pastikan output dalam format Markdown yang terstruktur dengan baik, profesional, dan siap presentasi.
    `;
};

export const getInsightPrompt = (topic: string, existingInsights: string[]): string => {
    const existingInsightsString = existingInsights.length > 0
        ? `Wawasan berikut sudah ditampilkan, jadi berikan sesuatu yang berbeda:\n${existingInsights.map(i => `- "${i}"`).join('\n')}`
        : '';

    return `
        Anda adalah seorang analis pasar ahli untuk industri padel di Indonesia.
        Tugas Anda adalah memberikan satu wawasan (insight) yang singkat dan tajam, beserta satu rekomendasi strategis yang dapat ditindaklanjuti.
        
        Topik: "${topic}"
        
        ${existingInsightsString}
        
        Wawasan Anda harus:
        - Berupa satu atau dua kalimat.
        - Memberikan perspektif baru atau menyoroti implikasi tersembunyi dari data.
        
        Rekomendasi Anda harus:
        - Berupa satu atau dua kalimat.
        - Praktis dan dapat ditindaklanjuti oleh calon investor atau pemilik klub.
        - Terkait langsung dengan wawasan yang diberikan.
        
        Hasilkan output dalam format JSON yang sesuai dengan skema yang diberikan.
    `;
};
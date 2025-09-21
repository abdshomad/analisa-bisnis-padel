# Bisnis Padel - Dasbor Analisis Pasar

Dasbor analisis pasar komprehensif untuk bisnis padel di Indonesia, menyediakan data, proyeksi, dan analisis yang didukung AI untuk membantu pengambilan keputusan strategis.

<!-- Placeholder for a screenshot of the application dashboard -->
![Screenshot Dasbor Bisnis Padel](https://storage.googleapis.com/fpl-assets/padel-dashboard-screenshot.png)

## ✨ Fitur Utama

-   **📊 Dasbor Statistik Komprehensif:** Visualisasi data kunci pasar, proyeksi pertumbuhan, distribusi regional, dan lanskap kompetitif.
-   **🤖 Perencana Bisnis AI:** Hasilkan analisis peluang, kerangka strategis, dan rencana bisnis lengkap untuk lokasi pilihan Anda menggunakan Google Gemini.
-   **📸 Analisis Lokasi Berbasis Gambar:** Unggah atau ambil foto lokasi, dan AI akan mengidentifikasi nama serta koordinat geografisnya.
-   **💬 Asisten Chat AI:** Dapatkan jawaban cepat atas pertanyaan Anda tentang pasar padel di Indonesia melalui chatbot yang didukung oleh Gemini.
-   **🗺️ Peta & Direktori Interaktif:** Jelajahi direktori lengkap lapangan padel di seluruh Indonesia dengan peta interaktif, fitur pencarian, dan filter.
-   **📈 Kalkulator ROI Interaktif:** Simulasikan potensi pengembalian investasi dengan menyesuaikan variabel seperti biaya modal, biaya operasional, dan harga sewa.
-   **💡 Wawasan AI Dinamis:** Setiap bagian dasbor dilengkapi dengan wawasan dan rekomendasi strategis yang dihasilkan oleh AI, yang dapat diperbarui sesuai permintaan.
-   **📄 Ekspor Laporan:** Unduh analisis dan rencana bisnis yang dihasilkan dalam format Markdown, atau cetak seluruh dasbor sebagai laporan PDF.
-   **🔊 Aksesibilitas Pembaca Layar:** Fitur text-to-speech terintegrasi untuk membacakan konten halaman, mendukung aksesibilitas.
-   **🎨 Mode Terang & Gelap:** Beralih antara tema terang dan gelap untuk kenyamanan visual.

## 🚀 Teknologi yang Digunakan

-   **Frontend:** React, TypeScript, Tailwind CSS
-   **AI Engine:** Google Gemini API (`@google/genai`)
-   **Visualisasi Data:** Recharts
-   **Ikon:** Lucide React

## 🛠️ Panduan Memulai (Getting Started)

Untuk menjalankan proyek ini secara lokal, ikuti langkah-langkah berikut:

### Prasyarat

-   Node.js (versi 18.x atau lebih tinggi)
-   npm atau package manager sejenis

### Instalasi

1.  **Kloning repositori:**
    ```bash
    git clone https://github.com/your-username/padel-business-dashboard.git
    cd padel-business-dashboard
    ```

2.  **Instal dependensi:**
    ```bash
    npm install
    ```

3.  **Konfigurasi Environment Variable:**
    Aplikasi ini memerlukan kunci API Google Gemini untuk berfungsi. Buat file `.env` di direktori root proyek dan tambahkan kunci API Anda.

    `.env`
    ```
    API_KEY="YOUR_GEMINI_API_KEY"
    ```
    *Catatan: Kunci API ini dimuat secara otomatis sebagai `process.env.API_KEY` dalam aplikasi.*

4.  **Jalankan server pengembangan:**
    ```bash
    npm start
    ```
    Buka `http://localhost:3000` di browser Anda untuk melihat aplikasi.

## 📂 Struktur Proyek

Struktur direktori utama proyek ini adalah sebagai berikut:

```
/
├── components/       # Komponen React UI yang dapat digunakan kembali
│   ├── charts/
│   ├── planner/
│   ├── sections/     # Komponen untuk setiap bagian utama dasbor
│   └── ui/           # Komponen UI generik (Tombol, Accordion, dll.)
├── contexts/         # React Context (misalnya, ThemeContext)
├── data/             # Data statis (lapangan, pasar, investasi, dll.)
├── hooks/            # Custom React Hooks untuk logika bisnis
├── services/         # Layanan untuk berinteraksi dengan API eksternal (Gemini)
├── types.ts          # Definisi tipe TypeScript global
├── App.tsx           # Komponen root aplikasi
└── index.tsx         # Titik masuk (entry point) aplikasi
```

## 🧠 Integrasi AI dengan Google Gemini

Aplikasi ini secara ekstensif menggunakan Google Gemini API untuk menyediakan fitur-fitur cerdas:

-   **Model `gemini-2.5-flash`** digunakan untuk:
    -   **Generasi Teks:** Membuat kerangka analisis, analisis pasar lengkap, rencana bisnis, dan wawasan strategis dinamis.
    -   **Chat:** Menjadi dasar untuk Asisten Chat AI.
    -   **Analisis Multimodal:** Menganalisis gambar yang diunggah pengguna untuk mengidentifikasi nama dan koordinat lokasi.
-   **Mode JSON & Skema:** Untuk tugas-tugas yang memerlukan output terstruktur (seperti analisis lokasi dan generasi kerangka), `responseMimeType: "application/json"` dan `responseSchema` digunakan untuk memastikan respons AI konsisten dan andal.
-   **Google Search Grounding:** Fitur pencarian Google diaktifkan saat membuat analisis pasar lengkap untuk memastikan data yang digunakan relevan dan terkini.

## 📄 Lisensi

Proyek ini dilisensikan di bawah Lisensi MIT.
